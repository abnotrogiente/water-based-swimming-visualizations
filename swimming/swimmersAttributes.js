import GL from "./lightgl";
import { config } from "./params";
import { Sphere } from "./sphere";
import { Swimmer } from "./swimmer";
import { ARM_DELTA_X, FOOT_DELTA_X, FOOT_DELTA_Z, MAX_NUM_SWIMMER, NUM_VEC_ATTRIBUTES } from "./swimmersConstants";

const pointVertexShaderSource = `#version 300 es
    const float ARM_DELTA_X = float(`+ ARM_DELTA_X + `);
    const float FOOT_DELTA_X = float( `+ FOOT_DELTA_X + `);
    const float FOOT_DELTA_Z = float( `+ FOOT_DELTA_Z + `);
    uniform vec2 invPoolSize;
    in vec4 iData1;
    in vec4 iData2;
    in vec4 iData3;
    out float fragAltitude;
    out float fragCyclePhase;
    void main() {
        fragCyclePhase = iData3.r;
        fragAltitude = iData2.a;
        vec2 center = iData1.rg;
        vec2 ips = vec2(.5, .5);
        gl_Position = vec4(center * 2. * invPoolSize, 0., 1.); // TODO SET ips TO invPoolSize
        gl_PointSize = 1.;
    }

`;

const pointFragmentShaderSource = `#version 300 es
    precision highp float;
    in float fragCyclePhase;
    in float fragAltitude;
    const float PI = 3.141592;
    out vec4 fragColor;
    void main() {
        fragColor = vec4(fragAltitude, fragCyclePhase / (2. * PI), 1., 1.);
    }
`;

const volumeVertexShaderSource = `#version 300 es
    in vec2 iVertex;
    out vec2 fragCoord;
    void main() {
        fragCoord = iVertex * .5 + .5;
        gl_Position = vec4(iVertex.xy, 0., 1.);
    }
`;

const volumeFragmentShaderSource = `#version 300 es
    precision highp float;
    uniform sampler2D tex;
    uniform vec2 poolSize;
    uniform bool horizontal;
    uniform bool show;
    uniform bool swapColor;
    uniform bool blur;
    in vec2 fragCoord;
    out vec4 fragColor;

    float volumeInSphere(vec2 diff, float altitude, float cyclePhase) {
        vec3 toCenter = vec3(diff.x, -altitude, diff.y);
        const float radius = .25;
        float t = length(toCenter) / radius;
        float dy = exp(-pow(t * 1.5, 6.0));
        float ymin = min(0.0, altitude - dy);
        float ymax = min(max(0.0, altitude + dy), ymin + 2.0 * dy);
        return (ymax - ymin) * 0.1;
    }

    vec4 horizontalPass(float radius, vec2 delta, int rx) {
        float radiusSq = radius*radius;
        vec4 res = vec4(0., 0., 0., .5);
        int N = textureSize(tex, 0).x;
        // float dx_texel = fragCoord.x * float(N) - floor(fragCoord.x * float(N)) - .5;
        // dx_texel /= float(N);
        // dx_texel *= poolSize.x;
        for(int i = -rx; i < rx; i++) {
            float i_float = float(i);
            //TODO tester si vraiment dans kernel
            float j_float = 0.;
            float diff = i_float * delta.x;
            vec2 p = fragCoord + vec2(diff, 0.);
            vec4 info = texture(tex, p);
            if(info.b != 0.) {
                float X = diff * poolSize.x;
                float Y = sqrt(radiusSq - X*X);
                res.g = Y;
                res.r = X;
                //res.r += volumeInSphere(vec2(-X, 0.), info.r, info.g) * 5.;
                res.b = info.r;
            }
        }
        return res;
    }

    vec4 verticalPass(float radius, vec2 delta, int ry) {
        // vec4 info = texture(tex, fragCoord);
        // return info;
        float radiusSq = radius*radius;
        int M = textureSize(tex, 0).y;
        float dy_texel = fragCoord.y * float(M) - floor(fragCoord.y * float(M)) - .5;
        dy_texel /= float(M);

        
        
        int N = textureSize(tex, 0).x;
        float dx_texel = fragCoord.x * float(N) - floor(fragCoord.x * float(N)) - .5;
        dx_texel /= float(N);

        vec2 d_texel = vec2(dx_texel, dy_texel);

        float dy = dy_texel * poolSize.y;
        vec4 res = vec4(0., 0., 0., .5);
        for(int j = -ry; j < ry; j++) {
            float j_float = float(j);
            //TODO tester si vraiment dans kernel
            float diff = j_float * delta.y;
            vec2 p = fragCoord + vec2(0., diff);
            vec2 p_centered = p - d_texel;
            vec4 info_centered = texture(tex, p_centered);
            p -= vec2(0., dy_texel);
            vec4 info = texture(tex, p);
            // info = info_centered;
            float Y = diff * poolSize.y;
            Y -= dy;
            if(info_centered.rgb != vec3(0., 0., 0.) && abs(Y) <= info.g) {
                float X = info_centered.r;
                res.r = volumeInSphere(vec2(X, Y), 2.*info_centered.b, info.g) * 5.;
            }
        }
        return res;
    }

    void main() {

        if (show) {
            fragColor = vec4(texture(tex, fragCoord).rgb, .7);
            if (swapColor) fragColor = vec4(texture(tex, fragCoord).grb, .7);
            return;
        }

        ivec2 textureSizeInt = textureSize(tex, 0);
        vec2 textureSize = vec2(float(textureSizeInt.x), float(textureSizeInt.y));
        vec2 delta = vec2(1./textureSize.x, 1./textureSize.y);
        const float radius = .25;
        float radiusSq = radius*radius;
        int rx = int(radius * textureSize.x / poolSize.x);
        int ry = int(radius * textureSize.y / poolSize.y);

        if (horizontal) fragColor = horizontalPass(radius, delta, rx);
        else fragColor = verticalPass(radius, delta, ry);
    }
`;


const vertexBuffer = new Float32Array([
    -1, -1,
    1, -1,
    1, 1,
    -1, 1,
]);

const indices = new Uint16Array([
    0, 1, 2,
    2, 3, 0
]);

class SwimmersAttributes {
    constructor() {
        this.numVecAttributes = NUM_VEC_ATTRIBUTES;
        this.maxNumSwimmer = MAX_NUM_SWIMMER;
        this.gl = config.gl;
        const filter = this.gl.NEAREST;
        this.texture = new GL.Texture(this.numVecAttributes, this.maxNumSwimmer, { type: this.gl.FLOAT, filter: filter });

        this.initPrograms();

        this.indexBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, indices, this.gl.STATIC_DRAW);

        this.vboPlane = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vboPlane);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, vertexBuffer, this.gl.STATIC_DRAW);


        this.vboPoints = this.gl.createBuffer();
    }

    /**
     * 
     * @param {Swimmer[]} swimmers 
     */
    #rankSwimmers(swimmers) {
        /**
         * 
         * @param {Swimmer} swimmer1 
         * @param {Swimmer} swimmer2 
         */
        const compareSwimmers = function (swimmer1, swimmer2) {
            return swimmer2.getDistanceTraveled() - swimmer1.getDistanceTraveled();
        }
        let sortFrom = 0;
        swimmers.forEach(s => {
            if (s.hasFinished() > .1) sortFrom++;
        })
        const rankedSwimmers = swimmers.slice(0, sortFrom).concat(swimmers.slice(sortFrom).sort(compareSwimmers));
        for (let i = 0; i < swimmers.length; i++) swimmers[i] = rankedSwimmers[i];
        return swimmers
    }

    /**
     * 
     * @param {*} index 
     * @param {Sphere} sphere 
     */
    #addSphereInformation(index, sphere) {
        this.swimmersAttributes[this.numVecAttributes * 4 * index] = sphere.center.x;
        this.swimmersAttributes[this.numVecAttributes * 4 * index + 1] = sphere.center.z;
        this.swimmersAttributes[this.numVecAttributes * 4 * index + 7] = sphere.center.y;
    }


    /**
     * 
     * @param {*} index 
     * @param {Swimmer} swimmer 
     */
    #addSwimmerInformation(index, swimmer) {
        this.#addSphereInformation(index, swimmer.body);

        this.swimmersAttributes[this.numVecAttributes * 4 * index + 2] = swimmer.divingDistance;
        this.swimmersAttributes[this.numVecAttributes * 4 * index + 3] = swimmer.divingTime;

        //Second row of attributes
        this.swimmersAttributes[this.numVecAttributes * 4 * index + 4] = swimmer.reactionTime;
        this.swimmersAttributes[this.numVecAttributes * 4 * index + 5] = swimmer.body.velocity.z;
        this.swimmersAttributes[this.numVecAttributes * 4 * index + 6] = swimmer.nationality;

        this.swimmersAttributes[this.numVecAttributes * 4 * index + 8] = swimmer.breakoutDistance;
        this.swimmersAttributes[this.numVecAttributes * 4 * index + 9] = swimmer.breakoutTime;
        this.swimmersAttributes[this.numVecAttributes * 4 * index + 10] = swimmer.finishTime;
        this.swimmersAttributes[this.numVecAttributes * 4 * index + 11] = swimmer.waterDamping;
    }

    update() {
        this.numSwimmers = config.swimmers.length;
        const numSpheres = 5;
        this.swimmersAttributes = new Float32Array(this.numVecAttributes * 4 * this.maxNumSwimmer * numSpheres);
        const rankedSwimmers = this.#rankSwimmers(config.swimmers);
        for (let i = 0; i < config.swimmers.length; i++) {
            const swimmer = rankedSwimmers[i];
            this.#addSwimmerInformation(i, swimmer);
            this.#addSphereInformation(config.swimmers.length + i, swimmer.leftArm);
            this.#addSphereInformation(2 * config.swimmers.length + i, swimmer.rightArm);
            this.#addSphereInformation(3 * config.swimmers.length + i, swimmer.leftFoot);
            this.#addSphereInformation(4 * config.swimmers.length + i, swimmer.rightFoot);

        }
        // Write back to textureA
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture.id);
        this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, false);
        this.gl.texSubImage2D(this.gl.TEXTURE_2D, 0, 0, 0, this.numVecAttributes, this.maxNumSwimmer, this.gl.RGBA, this.gl.FLOAT, this.swimmersAttributes);
        this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, true);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vboPoints);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, this.swimmersAttributes, this.gl.DYNAMIC_DRAW);
    };

    buildShader(shaderSource, shaderType) {
        const shader = this.gl.createShader(shaderType); // Create the shader object
        this.gl.shaderSource(shader, shaderSource); // Load the shader source
        this.gl.compileShader(shader); // Compile the shader
        return shader;
    }

    createProgram(shaders) {
        const program = this.gl.createProgram();
        shaders.forEach((shader) => {
            this.gl.attachShader(program, shader);
        });
        this.gl.linkProgram(program);
        return program;
    }
    checkShaders(vs, fs, program) {
        if (!this.gl.getShaderParameter(vs, this.gl.COMPILE_STATUS))
            console.error(this.gl.getShaderInfoLog(vs));

        if (!this.gl.getShaderParameter(fs, this.gl.COMPILE_STATUS))
            console.error(this.gl.getShaderInfoLog(fs));

        if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS))
            console.error(this.gl.getProgramInfoLog(program));
    }

    createRenderingTexture(width, height) {
        this.pointsTexture = new GL.Texture(width, height, { type: this.gl.FLOAT, filter: this.gl.NEAREST }); // TODO try unsigned bytes here.
        this.pointsFrameBuffer = this.gl.createFramebuffer();
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.pointsFrameBuffer);
        const attachmentPoint = this.gl.COLOR_ATTACHMENT0;
        this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, attachmentPoint, this.gl.TEXTURE_2D, this.pointsTexture.id, 0);
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);

        this.horizontalPassTexture = new GL.Texture(width, height, { type: this.gl.FLOAT, filter: this.gl.LINEAR }); // TODO try unsigned bytes here.
        this.horizontalPassFrameBuffer = this.gl.createFramebuffer();
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.horizontalPassFrameBuffer);
        this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, attachmentPoint, this.gl.TEXTURE_2D, this.horizontalPassTexture.id, 0);
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);

        const N = height / 4;
        const W = N;
        const H = N;

        this.displacementTexture = new GL.Texture(W, H, { type: this.gl.FLOAT, filter: this.gl.LINEAR }); // TODO try unsigned bytes here.
        this.displacementFrameBuffer = this.gl.createFramebuffer();
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.displacementFrameBuffer);
        this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, attachmentPoint, this.gl.TEXTURE_2D, this.displacementTexture.id, 0);
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);

        this.oldDisplacementTexture = new GL.Texture(W, H, { type: this.gl.FLOAT, filter: this.gl.LINEAR }); // TODO try unsigned bytes here.

    }

    buildProgram(vertexSource, fragmentSource) {
        const vs = this.buildShader(vertexSource, this.gl.VERTEX_SHADER);
        const fs = this.buildShader(fragmentSource, this.gl.FRAGMENT_SHADER);

        const program = this.createProgram([vs, fs]);

        this.checkShaders(vs, fs, program);

        return program;
    }

    initPrograms() {
        this.programPoints = this.buildProgram(pointVertexShaderSource, pointFragmentShaderSource);
        this.programVolume = this.buildProgram(volumeVertexShaderSource, volumeFragmentShaderSource);

        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    }

    volumePass() {
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.horizontalPassFrameBuffer);
        this.gl.useProgram(this.programVolume);

        const vertexLocation = this.gl.getAttribLocation(this.programVolume, "iVertex");

        const poolSizeLocation = this.gl.getUniformLocation(this.programVolume, "poolSize");
        this.gl.uniform2f(poolSizeLocation, config.params.simulation.poolSize.x, config.params.simulation.poolSize.z);

        const horizontalLocation = this.gl.getUniformLocation(this.programVolume, "horizontal");
        this.gl.uniform1i(horizontalLocation, true);

        const showLocation = this.gl.getUniformLocation(this.programVolume, "show");
        this.gl.uniform1i(showLocation, false);

        const swapColorLocation = this.gl.getUniformLocation(this.programVolume, "swapColor");
        this.gl.uniform1i(swapColorLocation, false);

        const sizeVertex = 2;
        const type = this.gl.FLOAT;
        const normalize = false;
        const sizeof_float = 4;
        const stride = 0;
        const offset = 0;
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vboPlane);
        this.gl.vertexAttribPointer(vertexLocation, sizeVertex, type, normalize, stride, offset);
        this.gl.enableVertexAttribArray(vertexLocation);

        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.pointsTexture.id);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        this.gl.drawElements(this.gl.TRIANGLES, 6, this.gl.UNSIGNED_SHORT, 0);

        //VERTICAL PASS

        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.displacementFrameBuffer);

        this.gl.uniform1i(horizontalLocation, false);

        this.gl.uniform1i(showLocation, false);


        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.horizontalPassTexture.id);

        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        this.gl.viewport(0, 0, this.displacementTexture.width, this.displacementTexture.height);
        this.gl.drawElements(this.gl.TRIANGLES, 6, this.gl.UNSIGNED_SHORT, 0);
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);

        // // SHOW

        // this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);

        // this.gl.uniform1i(showLocation, true);



        // this.gl.activeTexture(this.gl.TEXTURE0);
        // this.gl.bindTexture(this.gl.TEXTURE_2D, this.displacementTexture.id);

        // // this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        // //this.gl.drawElements(this.gl.TRIANGLES, 6, this.gl.UNSIGNED_SHORT, 0);


        // // SHOW OLD

        // this.gl.uniform1i(showLocation, true);

        // this.gl.uniform1i(swapColorLocation, true);



        // this.gl.activeTexture(this.gl.TEXTURE0);
        // this.gl.bindTexture(this.gl.TEXTURE_2D, this.oldDisplacementTexture.id);

        // //this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        // this.gl.drawElements(this.gl.TRIANGLES, 6, this.gl.UNSIGNED_SHORT, 0);
    }

    pointPass() {
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.pointsFrameBuffer);
        this.gl.useProgram(this.programPoints);
        const data1Location = this.gl.getAttribLocation(this.programPoints, 'iData1');

        const data2Location = this.gl.getAttribLocation(this.programPoints, 'iData2');

        const data3Location = this.gl.getAttribLocation(this.programPoints, 'iData3');

        const invPoolSizeLocation = this.gl.getUniformLocation(this.programPoints, "invPoolSize");
        this.gl.uniform2f(invPoolSizeLocation, 1. / config.params.simulation.poolSize.x, 1. / config.params.simulation.poolSize.z);



        const size = 4;
        const type = this.gl.FLOAT;
        const normalize = false;

        const sizeof_float = 4;
        const stride = 12 * sizeof_float;
        let offset = 0;

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vboPoints);

        if (data1Location >= 0) {
            this.gl.vertexAttribPointer(data1Location, size, type, normalize, stride, offset);
            this.gl.enableVertexAttribArray(data1Location);
        }

        offset = 4 * sizeof_float;
        if (data2Location >= 0) {
            this.gl.vertexAttribPointer(data2Location, size, type, normalize, stride, offset);
            this.gl.enableVertexAttribArray(data2Location);
        }

        offset = 2 * 4 * sizeof_float;
        if (data3Location >= 0) {
            this.gl.vertexAttribPointer(data3Location, size, type, normalize, stride, offset);
            this.gl.enableVertexAttribArray(data3Location);
        }

        this.gl.viewport(0, 0, this.pointsTexture.width, this.pointsTexture.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        this.gl.drawArrays(this.gl.POINTS, 0, 5 * this.numSwimmers);
    }

    updateOldDisplacementTexture() {
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.displacementFrameBuffer);
        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.oldDisplacementTexture.id);
        this.gl.copyTexSubImage2D(this.gl.TEXTURE_2D, 0, 0, 0, 0, 0, this.oldDisplacementTexture.width, this.oldDisplacementTexture.height);
        // this.gl.copyTexImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, 0, 0, this.oldDisplacementTexture.width, this.oldDisplacementTexture.height, 0);
    }

    draw() {

        this.updateOldDisplacementTexture();

        this.gl.enable(this.gl.BLEND);
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);

        this.pointPass();
        this.volumePass();

        this.gl.disable(this.gl.BLEND);
    }
}

export { SwimmersAttributes };