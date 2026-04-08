import { Calibration } from "./calibration.js";
import GL from "./lightgl.js";
import { config } from "./params.js";
import { Swimmer } from "./swimmer.js";
import { swimmersHelperFunctions } from "./swimmersHelperFunctions.js";

const MAX_SPARKS = 200;

export { MAX_SPARKS };

const sparksHelper = `
/// The amount of 'sparks' to use (spark count between about 73-206 is known to crash Win7/Chrome)
uniform float iTime;
uniform vec2 iResolution;
uniform float sparksGlow;
uniform float sparksLengthFactor;
uniform float sparksGlowOffset;
uniform float sparksStroke;
uniform float sparksNumber;
uniform float sparksSizeFactor;
uniform float fov;
#define MAX_SPARKS ` + MAX_SPARKS + `
/// The amount of 'sparks' to use (spark count between about 73-206 is known to crash Win7/Chrome)
#define SPARKS 40    // Low-end
//#define SPARKS 100   // Low-mid
//#define SPARKS 210   // Mid-high (recommended)
//#define SPARKS 500   // High
//#define SPARKS 1000  // Really High
//#define SPARKS 2000  // Insane

/// Switch between defines to choose different sets of settings
//#define ORIGINAL_SPARKS
//#define WATER_SPOUT
#define FIRE_STREAM
//#define STAR_BOMB
//#define WATER_LINE

#define SIZE_FACTOR 50.

#define BRIGHTNESS 1.0   /// 0.0 == auto-brightness

#ifdef ORIGINAL_SPARKS
	#define SPEED_FACTOR 1.5
	#define LENGTH_FACTOR 0.6
	#define GROUP_FACTOR 1.0
	#define SPREAD_FACTOR 0.3
	#define MIN_ANGLE 0.1
	#define RAND_FACTOR 1.0
#endif

#ifdef WATER_SPOUT
	#define SPEED_FACTOR 1.5
	#define LENGTH_FACTOR 1.5
	#define GROUP_FACTOR 0.5
	#define SPREAD_FACTOR 0.1
	#define MIN_ANGLE 0.1
	#define RAND_FACTOR 1.0
	#define BLUE
#endif

#ifdef FIRE_STREAM
	#define SPEED_FACTOR 1.5
	#define LENGTH_FACTOR 1.5
	#define GROUP_FACTOR 1.0
	#define SPREAD_FACTOR 0.1
	#define MIN_ANGLE 0.1
	#define RAND_FACTOR 0.0
#endif

#ifdef STAR_BOMB
	#define SPEED_FACTOR 0.5
	#define LENGTH_FACTOR 0.2
	#define GROUP_FACTOR 1.0
	#define SPREAD_FACTOR 0.2
	#define MIN_ANGLE 0.3
	#define RAND_FACTOR 0.0
	#define DOT_SPREAD
#endif

#ifdef WATER_LINE
	#define SPEED_FACTOR 1.5
	#define LENGTH_FACTOR 1.5
	#define GROUP_FACTOR 0.7
	#define SPREAD_FACTOR 0.1
	#define MIN_ANGLE 0.1
	#define RAND_FACTOR 1.0
	#define LINEAR_SPREAD
	#define BLUE
#endif

const float brightness = (float(BRIGHTNESS) == 0.0) ? 200.0 / (float(SPARKS) + 40.0) : float(BRIGHTNESS);

vec3 sampleAngle(float u1) {
	float r = sqrt(u1);
	return r * sparkDirection -sqrt(1.0 - u1) * waterNormal;
	return r * sparkDirection + vec3(0., -sqrt(1.0 - u1), 0.);
	return vec3(-r * -0.809017, -sqrt(1.0 - u1), r * 0.587785);
}

float rand(vec2 co) {
    return fract(sin(dot(co.xy, vec2(12.9898,78.233))) * 43758.5453);
}

float spread(vec2 co) {
#ifdef LINEAR_SPREAD
	return fract(co.x * 0.618033988749895);
#else
	#ifdef DOT_SPREAD
		return fract(co.x * 1.0);
	#else
    	return fract(sin(dot(co.xy, vec2(12.9898,78.233))) * 43758.5453);
	#endif
#endif
}

float planeIntersection(vec3 rpos, vec3 rdir, vec3 n) {
	return -dot(n, rpos) / dot(rdir, n);
}

float cylinder(vec3 pos, vec3 dir, float len) {
	float x = dot(pos, dir);
	return max(max(length(pos - dir * x) - sparksStroke, x), -x-len);
}

vec4 color(float age) {
	float f = 1.0 - age * 0.05;
	#ifdef BLUE
	return vec4(0.2*f*f, 0.5*f*f+0.05, 0.5*f+0.4, min(f*2.0, 1.0));
	#else
	return vec4(0.5*f+0.4, 0.5*f*f+0.05, 0.2*f*f, min(f*2.0, 1.0));
	#endif
}

vec3 trace(vec3 rpos, vec3 rdir, vec2 fragCoord, vec3 center, float reactionTime) {
    // center *= 0.;

	float sparkT = planeIntersection(rpos - center, rdir, sparkPlaneNormal);
	float floorT = planeIntersection(rpos - center, rdir, waterNormal);

	// float sparkT = planeIntersection(rpos - center, rdir, vec3(0.587785, 0.0, -0.809017));
	// float floorT = planeIntersection(rpos - center, rdir, vec3(0., 1., 0.));
	
	vec4 col = vec4(0.0, 0.0, 0.0, rdir.y < 0.0 ? 1.0 : 1.0);
	vec3 sparkCol = vec3(0.0, 0.0, 0.0);
	
	vec3 floorPos = rpos + rdir * floorT;
	vec3 sparkPos = rpos + rdir * sparkT;

    float maxSparksSubstraction = 3.*sparksNumber / 4.;

    float attenuation = min(.9, (reactionTime - .1) / .2);

    float sizeFactor =  sparksSizeFactor / (1. - attenuation);

    float sparksSubstraction = maxSparksSubstraction * attenuation;
	
	float time = iTime * SPEED_FACTOR;
    if (time < 0. || time > 2. ) return vec3(0., 0., 0.);
	for (int i = 0; i < MAX_SPARKS; i++)
	{
        float float_i = float(i);
        if (float_i >= sparksNumber - sparksSubstraction) break;
		// Calculate spark position and velocity
		float a = spread(vec2(i, 1.0))*SPREAD_FACTOR+MIN_ANGLE;
		float b = spread(vec2(i, 3.0))*RAND_FACTOR;
		float startTime = spread(vec2(i, 5.0)) * GROUP_FACTOR;
		vec3 dir = sampleAngle(a) * 10.0 * (1. - attenuation);
        vec3 gravity = -1.2 * 2. * waterNormal / sizeFactor;
	
		vec3 start = -dir * (1.35 + b * 0.3) / sizeFactor;
		vec3 force = start * 0.02 + gravity;

		float c = (time + startTime) * 20.0;
        if (c > 20.) break;
		vec3 offset = center + start * c + force * c * c * 0.5;
        bool visible = true;
        if (dot(offset - center, waterNormal) < 0.) {
            visible = false;
        }
		
		vec3 v = start + force * c;
		float vel = length(v) * sparksLengthFactor;
		vec3 vdir = normalize(v);
		vec4 sc = color(c);
				
		// Shade floor
		if (true || rdir.y < 0.0) {
			vec3 spos = floorPos - offset;
			float h = cylinder(spos, vdir, vel);
						
			float invRad = 10.0;
			float dist = h * 0.5;
			float atten = 1.0 / (1.0 + 2.0 * invRad * dist + invRad * invRad * dist * dist);
			if (floorT <= sparkT && sparkT > 0.0) {
				dist += 0.8;
				atten += 1.0 / (1.0 + 100.0*dist*dist*dist);
			}
            atten /= sizeFactor;
			col += vec4(sc.xyz * sc.w * atten, 0.0) * brightness;
		}
	
		// Shade sparks
		if (visible) {
			vec3 spos = sparkPos - offset;			
			float h = cylinder(spos, vdir, vel);
				
			if (h < 0.0) {
				sparkCol += vec3(sc.xyz * sc.w);
			} else {
				float dist = h * 0.05 * sizeFactor + sparksGlowOffset;
				float atten = 1.0 / (1.0 + 100.0 * pow(dist, sparksGlow));
				sparkCol += sc.xyz * sc.w * (atten);
				// sparkCol += sc.xyz * sc.w * (atten + clamp(1.0 - h * sparkT * 0.05, 0.0, 1.0));
			}
		}
	}
	
	vec3 final =  col.xyz + sparkCol * brightness;
	return final + vec3(rand(vec2(fragCoord.x * fragCoord.y, iTime))) * 0.000002;
	return final + vec3(rand(vec2(fragCoord.x * fragCoord.y, iTime))) * 0.00002;
	return final + vec3(rand(vec2(fragCoord.x * fragCoord.y, iTime))) * 0.002;
}

// Ray-generation
vec3 sparks(vec2 px, vec3 offset, float reactionTime) {
	vec2 rd = (px / iResolution.yy - vec2(iResolution.x/iResolution.y*0.5-0.5, 0.0)) * 2.0 - 1.0;
    rd *= -1.;
    float d = 1. / tan(fov / 2.); // TODO pre compute this before shader
	vec3 rdir = normalize(vec3(rd.x , rd.y, d));
    vec3 center = (gl_ModelViewMatrix * vec4(offset, 1.)).xyz;
	return pow(trace(vec3(0., 0., 0.), rdir, px, center, reactionTime), vec3(0.4545));
}

`;

//
// start here
//
class Video {
    /**
     * 
     * @param {WebGLRenderingContext} gl 
     * @param {*} src 
     * @param {Calibration} calibration 
     * @returns 
     */
    constructor(gl, src, calibration, videoStartTime) {
        /**@type {WebGLRenderingContext} */
        this.gl = gl;
        /**@type {Calibration} */
        this.calibration = calibration;
        this.copyVideo = false;
        this.show = false;
        this.videoStartTime = videoStartTime;
        // Only continue if WebGL is available and working
        if (gl === null) {
            alert(
                "Unable to initialize WebGL. Your browser or machine may not support it."
            );
            return;
        }
        // Set clear color to black, fully opaque
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        // Clear the color buffer with specified clear color
        gl.clear(gl.COLOR_BUFFER_BIT);

        // Vertex shader program

        this.shader = new GL.Shader(`
    out highp vec2 vTextureCoord;
    out vec3 waterNormal;
    out vec3 sparkPlaneNormal;
    out vec3 sparkDirection;
    out vec2 posScreen;

    uniform float ratio_screen;
    uniform float dx_screen;
    uniform mat4 calib_MVPMI;

    void main(void) {
        // vec4 posAbsolute = calib_MVPMI * vec4(gl_Vertex.xz*1000., 0., 1.);
        // vec4 posAbsolute = gl_ModelViewProjectionMatrixInverse * vec4(gl_Vertex.xz, 0., 1.);
        // gl_Position = gl_ModelViewProjectionMatrix * posAbsolute;
        gl_Position = vec4(gl_Vertex.xz, 0., 1.);
        gl_Position.x *= ratio_screen;

        waterNormal = (gl_ModelViewMatrix * vec4(0., 1., 0., 0.)).xyz;
        sparkPlaneNormal = (gl_ModelViewMatrix * vec4(-1., 0., 0., 0.)).xyz;
        sparkDirection = (gl_ModelViewMatrix * vec4(0., 0., 1., 0.)).xyz;
        vTextureCoord = gl_TexCoord.st;
        posScreen = gl_Position.xy;
    }
`, `
    in highp vec2 vTextureCoord;
    in vec3 waterNormal;
    in vec3 sparkPlaneNormal;
    in vec3 sparkDirection;
    in vec2 posScreen;
    out vec4 fragColor;

    uniform sampler2D uSampler;
    uniform sampler2D screen;
    uniform bool screenAvailabe;
    uniform bool sparksEnabled;
    uniform vec3 poolSize;
    uniform bool thresholdBlending;
    uniform float blendingThreshold;
    uniform float opacity;
    uniform float distanceFixed;
    uniform bool hideObstructions;
    uniform float hideObstructionThreshold;

    ` + sparksHelper + `` + swimmersHelperFunctions + /*glsl*/`

    float cross2D(vec2 a, vec2 b) {
        return a.x * b.y - a.y * b.x;
    }

    bool isOverPool(vec2 p) {
        vec4 A = vec4(-poolSize.x/2., 0., poolSize.z/2., 1.);
        vec4 B = vec4(-poolSize.x/2., 0., -poolSize.z/2., 1.);
        vec4 C = vec4(poolSize.x/2., 0., -poolSize.z/2., 1.);
        vec4 D = vec4(poolSize.x/2., 0., poolSize.z/2., 1.);

        vec4 a_hom = gl_ModelViewProjectionMatrix*A;
        vec4 b_hom = gl_ModelViewProjectionMatrix*B;
        vec4 c_hom = gl_ModelViewProjectionMatrix*C;
        vec4 d_hom = gl_ModelViewProjectionMatrix*D;

        vec2 a = a_hom.xy / a_hom.w;
        vec2 b = b_hom.xy / b_hom.w;
        vec2 c = c_hom.xy / c_hom.w;
        vec2 d = d_hom.xy / d_hom.w;


        float c1 = cross2D(b-a, p-a);
        float c2 = cross2D(c-b, p-b);
        float c3 = cross2D(d-c, p-c);
        float c4 = cross2D(a-d, p-d);

        
        return c1 <= 0. && c2 <= 0. && c3 <= 0. && c4 <= 0.;


    }

    void main(void) {
        highp vec4 texelColor = texture(uSampler, vTextureCoord);

        if (screenAvailabe) {
            vec4 screenColor = texture(screen, posScreen/2. + .5);
            float alpha = screenColor.a;
            if (alpha < .9) {
                fragColor = vec4(0., 0., 0., 0.);
                return;
                // fragColor.a = 0.;
            }
            else {
                fragColor = texelColor;
                return;
            }
        }
        // if (max(max(texelColor.r, texelColor.g), texelColor.b) < .2){
        //     fragColor = vec4(0., 0., 0., 0.);
        //     return;
        // }
        
        vec3 waterColor = vec3(.294, .812, 1.);

        vec3 waterColor1 = vec3(.39, .98, .9);
        vec3 waterColor2 = vec3(.08, .57, .59);

        float r = opacity;
        if (thresholdBlending) {
            if (length(waterColor - texelColor.rgb) < blendingThreshold ||
             length(texelColor.rgb) > 1.5 && texelColor.b > .1 + (texelColor.r + texelColor.g) * .5) r = 0.3 * opacity;
        }
        fragColor = vec4(texelColor.rgb, r);

        if (hideObstructions && isOverPool(posScreen)){
            if (max(max(texelColor.r, texelColor.g), texelColor.b) < hideObstructionThreshold) fragColor = vec4(0., 0., 0., 0.);
            // return;
        }

        

        // vec4 backgroundCol = texture(screen, (posScreen+1.)/2.);
        // if (backgroundCol.r > .6) {
        //     fragColor = vec4(0., 0., 0., 1.);
        // }
        //fragColor.a += 1. - r;
        if (!sparksEnabled) return;
        vec3 spark1 = sparks(gl_FragCoord.xy, vec3(2., 1., -poolSize.z / 2.), .1);
        vec3 spark2 = sparks(gl_FragCoord.xy, vec3(-2., 1., -poolSize.z / 2.), .1);
        vec3 spark = vec3(0., 0., 0.);
        // spark = spark1 + spark2;
        for (int i = 0; i < 10; i++) {
            float i_float = float(i);
            vec3 sparkPos = vec3(25. / 2. - 25. / 10. / 2. - i_float * 25./10., 1., -25.);
            float reactionTime = getSwimmerReactionTime(i);
            spark += sparks(gl_FragCoord.xy, sparkPos, reactionTime);
        }
        // fragColor = vec4(mix(fragColor.rgb, spark, .5), max(0.5, 2.*length(spark)));
        fragColor = vec4(mix(fragColor.rgb, spark, 2.*length(spark)), max(0.5, 2.*length(spark)));
        if (thresholdBlending) {
            fragColor.a = r;
        }
        // fragColor = vec4(fragColor.rgb + spark, max(0.5, 2.*length(spark)));
        // float m = max(fragColor.r, max(fragColor.g, fragColor.b));
        // if (m > 1.) fragColor.rgb /= m;
        // fragColor = vec4(spark, 2.*length(spark));
        // fragColor = vec4(1, 0, 0, 1);
    }
`);

        this.mesh = GL.Mesh.plane({ width: 2., height: 2., coords: true, normals: true });
        this.mesh.transform(GL.Matrix.rotate(90, 1, 0, 0));
        this.mesh.transform(GL.Matrix.translate(0, .1, 0));
        // Using `this.shader` (lightgl) for rendering; skip manual
        // initShaderProgram/vsSource/fsSource which were undefined.
        this.programInfo = null;

        // Here's where we call the routine that builds all the
        // objects we'll be drawing.
        // this.buffers = initBuffers(gl);

        this.texture = this.initTexture();

        // Flip image pixels into the bottom-to-top order that WebGL expects.
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        if (src == "") return;
        this.video = this.setupVideo(src);

    }

    // #swapTextures(t1, t2) {
    //     let temp;
    //     temp = t1.id; t1.id = t2.id; t2.id = temp;
    //     temp = t1.width; t1.width = t2.width; t2.width = temp;
    //     temp = t1.height; t1.height = t2.height; t2.height = temp;
    // }

    #swapFBOS() {
        // swap textures
        const prevTextureB = config.drawingTextureB;
        config.drawingTextureB = config.drawingTexture;
        config.drawingTexture = prevTextureB;

        //bind textures to according FBOs
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, config.drawingFameBufferB);
        this.gl.bindTexture(this.gl.TEXTURE_2D, config.drawingTextureB);
        this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0,
            this.gl.TEXTURE_2D, config.drawingTextureB, 0);


        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, config.drawingFrameBuffer);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.drawingTexture);
        this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0,
            this.gl.TEXTURE_2D, config.drawingTexture, 0);
    }

    render() {
        let screenAvailabe = false;
        const sparksParams = config.params.visualizations.sparks;
        const poolSize = config.params.simulation.poolSize;
        if (!config.params.video.show) return;
        if (this.copyVideo) {
            this.updateTexture();
        }

        // Set up the mesh if not already compiled
        if (!this.mesh.vertexBuffers || !this.mesh.vertexBuffers.vertex) {
            this.mesh.compile();
        }

        // this.gl.enable(this.gl.CULL_FACE);
        this.gl.enable(this.gl.BLEND);
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
        // this.gl.blendFunc(this.gl.ONE, this.gl.ONE);
        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);

        const H = this.gl.canvas.height;
        const W = 16 * H / 9;
        const x = (this.gl.canvas.width - W) / 2;
        // this.gl.viewport(x, 0, W, H);

        const MVM = this.gl.modelviewMatrix;
        const PM = this.gl.projectionMatrix;

        const MVPM = PM.multiply(MVM);

        const MVPMI = MVPM.inverse();
        // config.setMVPMI();

        if (Swimmer.swimmersAttributesTexture) Swimmer.swimmersAttributesTexture.bind(1);
        screenAvailabe = config.classicalOverlayEnabled && (config.drawingFameBuffer !== null)
        // console.log("render video : " + screenAvailabe);
        if (screenAvailabe) {
            // screenAvailabe = true;
            // console.log("SCREEN AVAILABLE");
            this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, config.drawingFameBufferB);
            config.gl.activeTexture(config.gl.TEXTURE15);
            config.gl.bindTexture(config.gl.TEXTURE_2D, config.drawingTexture);
        }

        this.shader.uniforms({
            ratio_screen: W / this.gl.canvas.width,
            dx_screen: x / this.gl.canvas.width,
            // calib_MVPMI: MVPMI.m,
            calib_MVPMI: config.MVPMI ? config.MVPMI.m : new Float32Array(16),
            uSampler: 0,
            swimmersHelperFunctions: 1,
            screen: 15,
            screenAvailabe: screenAvailabe,
            iTime: config.getRaceTime(),
            poolSize: [poolSize.x, poolSize.y, poolSize.z],
            iResolution: [this.gl.canvas.width, this.gl.canvas.height],
            sparksEnabled: sparksParams.enabled,
            sparksGlow: sparksParams.glow,
            sparksGlowOffset: sparksParams.glowOffset,
            sparksStroke: sparksParams.stroke,
            sparksNumber: sparksParams.num,
            sparksLengthFactor: sparksParams.lengthFactor,
            sparksSizeFactor: sparksParams.sizeFactor,
            fov: sparksParams.fov,
            thresholdBlending: config.params.video.thresholdBlending,
            blendingThreshold: config.params.video.blendingThreshold,
            opacity: config.params.video.opacity,
            distanceFixed: config.distanceFixed,
            hideObstructions: config.params.video.hideObstructions,
            hideObstructionThreshold: config.params.video.hideObstructionThreshold
        }).draw(this.mesh);
        this.gl.disable(this.gl.BLEND);
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);

        if (screenAvailabe) {
            this.#swapFBOS();
        }
    }

    async setTime(t) {
        if (!this.copyVideo) return;
        if (Math.abs(this.video.currentTime - t) < 1e-6) return;

        const video = this.video;
        let resolveFrame;
        const frameReady = new Promise(resolve => {
            resolveFrame = resolve;
        });

        video.currentTime = t;

        if (video.requestVideoFrameCallback) {
            video.requestVideoFrameCallback(() => resolveFrame());
        } else {
            const onSeeked = () => {
                video.removeEventListener('seeked', onSeeked);
                resolveFrame();
            };
            video.addEventListener('seeked', onSeeked, { once: true });
        }

        await frameReady;
    }


    initTexture() {
        const texture = this.gl.createTexture();
        this.gl.bindTexture(this.gl.TEXTURE_2D, texture);

        // Because video has to be download over the internet
        // they might take a moment until it's ready so
        // put a single pixel in the texture so we can
        // use it immediately.
        const level = 0;
        const internalFormat = this.gl.RGBA;
        const width = 1;
        const height = 1;
        const border = 0;
        const srcFormat = this.gl.RGBA;
        const srcType = this.gl.UNSIGNED_BYTE;
        const pixel = new Uint8Array([0, 0, 255, 255]); // opaque blue
        this.gl.texImage2D(
            this.gl.TEXTURE_2D,
            level,
            internalFormat,
            width,
            height,
            border,
            srcFormat,
            srcType,
            pixel
        );

        // Turn off mips and set wrapping to clamp to edge so it
        // will work regardless of the dimensions of the video.
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);

        return texture;
    }

    updateTexture() {
        const level = 0;
        const internalFormat = this.gl.RGBA;
        const srcFormat = this.gl.RGBA;
        const srcType = this.gl.UNSIGNED_BYTE;
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
        // this.video.currentTime = config.time;
        this.gl.texImage2D(
            this.gl.TEXTURE_2D,
            level,
            internalFormat,
            srcFormat,
            srcType,
            this.video
        );
    }

    #pauseFirstTime() {
        if (this.hasPausedFirstTime) return;
        this.hasPausedFirstTime = true;
        this.video.pause();
    }

    setupVideo(url) {
        const video = document.createElement("video");

        let playing = false;
        let timeupdate = false;

        video.playsInline = true;
        video.muted = true;
        video.loop = false;

        // Waiting for these 2 events ensures
        // there is data in the video

        video.addEventListener(
            "playing",
            () => {
                playing = true;
                checkReady();
            },
            true
        );

        video.addEventListener(
            "timeupdate",
            () => {
                timeupdate = true;
                checkReady();
            },
            true
        );

        video.src = url;
        video.play();
        // video.pause();
        const this_ = this;
        const checkReady = () => {
            if (playing && timeupdate) {
                this_.copyVideo = true;
                if (!video.paused)
                    this.#pauseFirstTime();
            }
        }

        return video;
    }
}

export { Video };