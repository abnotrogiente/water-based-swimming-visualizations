import GL from "./lightgl";
import { config } from "./params";

const mesh = new GL.Mesh.plane({ width: 2., height: 2., coords: true, normals: true });

const vertexShaderSrc = `
    out highp vec2 pos;
    out highp vec2 vTextureCoord;

    void main(void) {
        gl_Position = vec4(gl_Vertex.xy, 0., 1.);
        pos = gl_Vertex.xy;

        vTextureCoord = gl_TexCoord.st;
    }
`

const fixShader = new GL.Shader(`
    out highp vec2 pos;
    out highp vec2 vTextureCoord;


    void main(void) {
        gl_Position = vec4(gl_Vertex.xy, 0., 1.);
        pos = gl_Vertex.xy;

        vTextureCoord = gl_TexCoord.st;
    }
`, `
    in highp vec2 pos;
    in highp vec2 vTextureCoord;
    uniform float distanceFixed;
    uniform vec3 poolSize;
    uniform vec3 clearColor;
    uniform sampler2D screen;
    uniform sampler2D videoTex;
    uniform sampler2D oldPicture;
    uniform vec2 linep1;
    uniform vec2 linep2;
    uniform vec2 center;
    uniform float circleZone;
    out vec4 fragColor;




    bool isInFixedPart(vec2 p) {
        if (circleZone > .1) {
            float deltaY = .3;
            p.y -= 2.*deltaY;
            vec3 waterColor1 = vec3(.39, .98, .9);
            vec3 waterColor2 = vec3(.08, .57, .59);
            vec3 skinColor1 = vec3(1., 1., .9);
            vec3 skinColor2 = vec3(.39, .3, .2);
            vec3 color = texture(videoTex, vTextureCoord - vec2(0., deltaY)).rgb;
            vec2 diff = p - center;
            diff.x *= 2.;
            float d1 = length(color - waterColor1);
            float d2 = length(color - waterColor2);
            float d3 = length(color - skinColor1);
            float d4 = length(color - skinColor2);
            // bool isSkin = d3 < d2 && d3 < d1 || d4 < d2 && d4 < d1 || d3 + d4 < d1 + d2;
            bool isSkin = color.r > color.b * 0.9;
            // isSkin = !(d1 < .4 || d2 < .4);
            return dot(diff, diff) <= .01;
            return dot(diff, diff) <= .02 && isSkin;
        }
        // vec4 P1 = vec4(poolSize.x/2., 0., distanceFixed - poolSize.z / 2., 1.);
        // vec4 P2 = vec4(-poolSize.x/2., 0., distanceFixed - poolSize.z / 2., 1.);
        // vec4 P1 = vec4(12.5, 0., distanceFixed - 12.52, 1.);
        // vec4 P2 = vec4(-12.5, 0., distanceFixed - 12.52, 1.);
        // vec2 p1 = (gl_ModelViewMatrix * P1).xy;
        // vec2 p2 = (gl_ModelViewMatrix * P2).xy;
        vec2 p1 = linep1;
        vec2 p2 = linep2;
        // p1 = vec2(-.4, -.8);
        // p2 = vec2(.2, .5);
        // p1 = vec2(-1., 0.);
        // p2 = vec2(1., 0.);
        vec2 d = p2 - p1;
        vec2 n = vec2(-d.y, d.x);
        // return dot(vec2(0.5, .5)-p1, n) <= 0.;
        return dot(p-p1, n) <= 0.;
    }

    bool isInPinPointLine(vec2 p) {
        vec2 diff = p - center;
        return abs(diff.x) <= .005 && diff.y >= 0. && diff.y <= 2.*.3;
    }

    void main() {
        vec4 oldPix = texture(oldPicture, vTextureCoord);
        if (oldPix.rgb != vec3(0)) {
            fragColor = oldPix;
            if (circleZone == 0.) return;
        }
        if (circleZone > .1 && isInPinPointLine(vTextureCoord*2.-1.)) fragColor = vec4(1.);
        if (isInFixedPart(vTextureCoord*2.-1.)) {
            if(circleZone > .01) fragColor = texture(videoTex, vTextureCoord - vec2(0., 0.3));
            else fragColor = texture(screen, vTextureCoord);
        }
        // if(circleZone && isInFixedPart(vTextureCoord*2.-1.)) fragColor = texture(videoTex, vTextureCoord);
        // if(isInFixedPart(vTextureCoord*2.-1.)) fragColor = vec4(1., 0., 0., 1.);
        // if(isInFixedPart(vTextureCoord*2.-1.)) texture(screen, vTextureCoord);
        // if(isInFixedPart(pos)) fragColor = texture(screen, vTextureCoord);
        // else fragColor = vec4(0., 0., 0., 0.);
    }
`);

const drawShader = new GL.Shader(`
    out highp vec2 pos;
    out highp vec2 vTextureCoord;


    void main(void) {
        gl_Position = vec4(gl_Vertex.xy, 0., 1.);
        pos = gl_Vertex.xz;

        vTextureCoord = gl_TexCoord.st;
    }
`, `
    in highp vec2 pos;
    in highp vec2 vTextureCoord;

    uniform vec3 poolSize;
    uniform sampler2D picture;
    uniform sampler2D screen;

    out vec4 fragColor;


    void main() {
        vec2 coord = (pos + 1.) / 2.;
        // vec4 pix = texture(screen, coord);
        vec4 pix = texture(screen, vTextureCoord);
        vec4 pixPicture = texture(picture, vTextureCoord);
        fragColor = pix;
        if(pixPicture.rgb != vec3(0)) fragColor = pixPicture;
        
    }
`);




let textureA = new GL.Texture();
let textureB = new GL.Texture();
let init = false;
let frameBuffer = null;

/**
 * 
 * @param {*} w 
 * @param {*} h 
 * @param {WebGLRenderingContext} gl 
 */
const initTextures = (w, h, gl) => {
    init = true;
    textureA = new GL.Texture(w, h, { type: gl.FLOAT, filter: gl.NEAREST });
    textureB = new GL.Texture(w, h, { type: gl.FLOAT, filter: gl.NEAREST });
    frameBuffer = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);
    const attachmentPoint = gl.COLOR_ATTACHMENT0;
    gl.framebufferTexture2D(gl.FRAMEBUFFER, attachmentPoint, gl.TEXTURE_2D, textureA.id, 0);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
}

function toClipSpace(p) {
    p.x /= config.gl.canvas.width / 2;
    p.x -= 1;
    p.y /= config.gl.canvas.height / 2;
    p.y -= 1;
}

const clearTexture = () => {
    config.gl.activeTexture(config.gl.TEXTURE0);
    config.gl.bindTexture(config.gl.TEXTURE_2D, textureA.id);
    config.gl.texSubImage2D(config.gl.TEXTURE_2D, 0, 0, 0, textureA.width, textureA.height, config.gl.RGBA, config.gl.FLOAT, 0);
}

const fixTexture = (circle) => {
    console.log("take chrono photo : " + circle);
    if (!init) initTextures(config.gl.canvas.width, config.gl.canvas.height, config.gl);

    const poolSize = config.params.simulation.poolSize;
    const p1 = config.gl.project(poolSize.x / 2, 0, config.distanceFixed + 1 - poolSize.z / 2);
    const p2 = config.gl.project(-poolSize.x / 2, 0, config.distanceFixed + 1 - poolSize.z / 2);
    toClipSpace(p1);
    toClipSpace(p2);

    const P = config.swimmers[0].body.center;
    const center = config.gl.project(P.x, P.y, P.z);
    toClipSpace(center);


    textureB.drawTo(() => {
        textureA.bind(0);
        config.gl.activeTexture(config.gl.TEXTURE1);
        config.gl.bindTexture(config.gl.TEXTURE_2D, config.drawingTexture);

        config.gl.activeTexture(config.gl.TEXTURE2);
        config.gl.bindTexture(config.gl.TEXTURE_2D, config.currentVideo.texture);
        fixShader.uniforms({
            oldPicture: 0,
            screen: 1,
            videoTex: 2,
            distanceFixed: config.distanceFixed,
            poolSize: [config.params.simulation.poolSize.x,
            config.params.simulation.poolSize.y,
            config.params.simulation.poolSize.z],
            linep1: [p1.x, p1.y],
            linep2: [p2.x, p2.y],
            center: [center.x, center.y],
            circleZone: circle

            // clearColor: [color.x, color.y, color.z]
        }).draw(mesh);

    });
    textureA.swapWith(textureB);
    config.gl.bindFramebuffer(config.gl.FRAMEBUFFER, config.drawingFrameBuffer);
}

const drawChronoPhotography = () => {
    if (config.chronoPhotoCircleTime && config.time >= config.chronoPhotoCircleTime) {
        config.chronoPhotoCircleTime = null;
        fixTexture(true);
    }
    config.gl.bindFramebuffer(config.gl.FRAMEBUFFER, null);

    textureA.bind(7);

    config.gl.activeTexture(config.gl.TEXTURE8);
    config.gl.bindTexture(config.gl.TEXTURE_2D, config.drawingTexture);

    drawShader.uniforms({
        picture: 7,
        screen: 8,
        // clearColor: [color.x, color.y, color.z]
    }).draw(mesh);
}

config._fixTexture = fixTexture;
config._clearChronoTexture = initTextures;

export { fixTexture, drawChronoPhotography };