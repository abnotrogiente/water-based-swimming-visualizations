/*
 * WebGL Water
 * http://madebyevan.com/webgl-water/
 *
 * Copyright 2011 Evan Wallace
 * Released under the MIT license
 */

import GL from './lightgl.js';
import { Sphere } from './sphere.js';
import { Swimmer } from './swimmer.js';
import { swimmersHelperFunctions } from './swimmersHelperFunctions.js';
import { config } from './params.js';
import { Foam } from './foam.js';

// The data in the texture is (position.y, velocity.y, normal.x, normal.z)
function Water(gl, resolution = null) {
  /**@type {WebGLRenderingContext} */
  this.gl = gl;
  this.visualizationWavesEnabled = true;
  this.sqrt_2_PI = Math.sqrt(2 * Math.PI);
  this.foam = new Foam();
  var vertexShader = `
    out vec2 coord;
    uniform vec2 invPoolSizeVertex;
    void main() {
      coord = gl_Vertex.xy * invPoolSizeVertex + 0.5;
      gl_Position = vec4(gl_Vertex.xy * 2. * invPoolSizeVertex, 0., 1.0);
    }
  `;

  this.reset(resolution);
  if (!GL.Texture.canUseFloatingPointTextures()) {
    //throw new Error('This demo requires the OES_texture_float extension');
  }

  this.dropShader = new GL.Shader(vertexShader, `
    const float PI = 3.141592653589793;
    uniform sampler2D tex;
    uniform vec2 center;
    uniform vec3 poolSize;
    uniform float radius;
    uniform float strength;
    in vec2 coord;
    out vec4 fragColor;
    void main() {
      /* get vertex info */
      vec4 info = texture(tex, coord);
      
      /* add the drop to the height */
      float drop = max(0.0, 1.0 - length(center * 0.5 + 0.5 - coord) / (radius / poolSize.z));
      drop = 0.5 - cos(drop * PI) * 0.5;
      info.r += drop * strength;
      
      fragColor = info;
    }
  `);
  this.updateShader = new GL.Shader(vertexShader, `
    uniform sampler2D tex;
    uniform vec2 delta;
    uniform float prev_wr;
    uniform float damping;
    uniform float sqrt_2_PI;
    uniform vec3 poolSize;
    `+ swimmersHelperFunctions + `
    in vec2 coord;
    out vec4 fragColor;


    void main() {
      /* get vertex info */
      vec4 info = texture(tex, coord);

      /* calculate average neighbor height */
      vec2 dx = vec2(delta.x, 0.0);
      vec2 dy = vec2(0.0, delta.y);
      float average = (
      texture(tex, coord - dx).r +
      texture(tex, coord - dy).r +
      texture(tex, coord + dx).r +
      texture(tex, coord + dy).r
    ) * 0.25;

    /* change the velocity to move toward the average */
    info.g += (average - info.r) * 2.0;

    /* attenuate the velocity a little so waves do not last forever */
    float d = damping;
    vec2 pos = (coord - .5) * poolSize.xz;
    float halfLane = poolSize.x / 20.;
    for (int i = 0; i < 10; i++) {
    float i_float = float(i);
      if (i_float > swimmersNumber - 0.1) break;
      vec2 swimmerPos = getSwimmerPosition(i);
      if (abs(swimmerPos.x - pos.x) <= halfLane) {
        d = getSwimmerWaterDamping(i);
        break;
      }
    }
    info.g *= 1. - d;/*TODO parametriser ça*/

    /* move the vertex along the velocity */
    info.r += info.g;
      

    fragColor = info;
  }
  `);
  this.normalShader = new GL.Shader(vertexShader, `
    uniform sampler2D tex;
    uniform vec2 delta;
    in vec2 coord;
    out vec4 fragColor;
  void main() {
      /* get vertex info */
      vec4 info = texture(tex, coord);

      /* update the normal */
      vec3 dx = vec3(delta.x, texture(tex, vec2(coord.x + delta.x, coord.y)).r - info.r, 0.0);
      vec3 dy = vec3(0.0, texture(tex, vec2(coord.x, coord.y + delta.y)).r - info.r, delta.y);
    info.ba = normalize(cross(dy, dx)).xz;

    fragColor = info;
  }
  `);
  this.sphereShader = new GL.Shader(`
    out vec2 coord;
    uniform vec2 invPoolSizeVertex;
    void main() {
      coord = gl_Vertex.xy * invPoolSizeVertex + 0.5;
      // displacement = texture(displacementTexture, coord).r;
      // oldDisplacement = texture(oldDisplacementTexture, coord).r;

      gl_Position = vec4(gl_Vertex.xy * 2. * invPoolSizeVertex, 0., 1.0);
    }
  `, `
    uniform sampler2D tex;
    
    
    uniform vec3 poolSize;
    in vec2 coord;
    uniform sampler2D oldDisplacementTexture;
    uniform sampler2D displacementTexture;
    uniform bool optimized;
    uniform float radius;
    uniform vec3 newCenter;
    uniform vec3 oldCenter;

    out vec4 fragColor;
    
    float volumeInSphere(vec3 center) {
      vec3 toCenter = vec3((coord.x - 0.5) * poolSize.x, 0.0, (coord.y - 0.5) * poolSize.z) - center;
      float t = length(toCenter) / radius;
      float dy = exp(-pow(t * 1.5, 6.0));
      float ymin = min(0.0, center.y - dy);
      float ymax = min(max(0.0, center.y + dy), ymin + 2.0 * dy);
    return (ymax - ymin) * 0.1;
  }

  void main() {

  vec4 info = texture(tex, coord);
  
  if (optimized) {
      float displacement = texture(displacementTexture, coord).r;
      float oldDisplacement = texture(oldDisplacementTexture, coord).r;

      
      info.r += oldDisplacement - displacement;
      fragColor = info;
      return;
    }

    fragColor = info;

    // vec2 diff = oldCenter.xz - newCenter.xz;
    // float distSq = dot(diff, diff);
    // float eps = poolSize.x * .5;
    if (abs(newCenter.z) > 2.*poolSize.z) return;

    // /* add the old volume */
    info.r += volumeInSphere(oldCenter);

    // /* subtract the new volume */
    info.r -= volumeInSphere(newCenter);

    fragColor = info;
  }
  `);

  this.visualizationWavesShader = new GL.Shader(vertexShader, `
    uniform sampler2D tex;
    uniform bool add;
    uniform vec3 poolSize;
    uniform bool showWR;
    uniform bool showDivingDistance;
    in vec2 coord;
    out vec4 fragColor;
    uniform float t;

    ` + swimmersHelperFunctions + `

    const int order = 20;

    uniform float amplitudeFactor;
    uniform float frequencyFactor;
    uniform float amplitude;
    uniform float omega0;
    uniform float waveLength0;

    float rand(vec2 co){return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);}

    float waveFunctionExp(vec2 pos) {
      float y = 0.0;
      for (int i = 0; i < 20; i++) {
        float i_float = float(i); 
        float seed = i_float + .5;
        float kx = rand(vec2(seed, seed));
        float ky = rand(vec2(seed, -seed));
        float omega = rand(vec2(-seed, seed));
        vec2 k = normalize(vec2(kx, ky));
        k *= waveLength0 * pow(frequencyFactor, i_float);
        omega = omega0 * (omega - .5) * pow(frequencyFactor, i_float);
        float s = sin(dot(k, pos) + omega * t) * amplitude * pow(amplitudeFactor, i_float);
        y += exp(s - 1.0) - .37;
      }
      return y;
    }

    float interpIntensity(float intensity) {
      return 1. - sqrt(2.*intensity - intensity * intensity);
    }

    void main() {
      vec4 info = texture(tex, coord);
      float w = 0.;
      if(showDivingDistance) w += getDivingWaves(coord).x;
      if(showWR) w += getRecordWave(coord);
      info.r += add ? w : -w;
      float h = 0.;
      if (time < 0.) {
        float interval = 5.;
        float intensity = -time / interval;
        // intensity = .5;
        intensity = min(max(intensity, 0.), 1.);
        intensity = 1. - intensity;
        intensity = interpIntensity(intensity);
        h = waveFunctionExp(coord*poolSize.xz) * intensity;
      }
      info.r += add ? h : -h;
      fragColor = info;

    }
    `);
}

Water.prototype.resetTextures = function () {
  /**@type {WebGLRenderingContext} */
  const g = this.gl;
  if (this.textureA) g.deleteTexture(this.textureA.id);
  if (this.textureB) g.deleteTexture(this.textureB.id);
  this.textureA = new GL.Texture(this.W, this.H, { type: this.gl.FLOAT, filter: filter });
  this.textureB = new GL.Texture(this.W, this.H, { type: this.gl.FLOAT, filter: filter });
  this.foam.resetTextures(this.W, this.H, this.textureA);
  this.areaConservationTexture = new GL.Texture(this.W, this.H, { type: this.gl.FLOAT, filter: filter });
  this.showAreaConservedGrid = false;
  this.showProjectionGrid = false;

  this.invPoolSize = new GL.Vector(1 / config.params.simulation.poolSize.x, 1 / config.params.simulation.poolSize.y, 1 / config.params.simulation.poolSize.z);
  var filter = GL.Texture.canUseFloatingPointLinearFiltering() ? this.gl.LINEAR : this.gl.NEAREST;
  if ((!this.textureA.canDrawTo() || !this.textureB.canDrawTo()) && GL.Texture.canUseHalfFloatingPointTextures()) {
    console.log("No draw");
    filter = GL.Texture.canUseHalfFloatingPointLinearFiltering() ? this.gl.LINEAR : this.gl.NEAREST;
    this.textureA = new GL.Texture(this.W, this.H, { type: this.gl.FLOAT, filter: filter });
    this.textureB = new GL.Texture(this.W, this.H, { type: this.gl.FLOAT, filter: filter });
  }
}

Water.prototype.reset = function (resolution = null) {
  this.WR_position = 100000;
  this.prev_WR_position = 0;
  if (resolution !== null) {
    console.log("resolution.y : " + resolution.y);
    this.W = Math.round(resolution.x);
    this.H = Math.round(resolution.y);
    console.log("Using custom resolution:", this.W, this.H);
  } else {
    this.W = 256;
    this.H = 256;
  }
  Swimmer.reset(new GL.Vector(this.W, this.H));
  //Swimmer.attributes.createRenderingTexture(this.W, this.H);
  this.plane = GL.Mesh.plane({ detail: 255, width: config.params.simulation.poolSize.x, height: config.params.simulation.poolSize.z });
  this.delta = new GL.Vector(1 / this.W, 1 / this.H);
  this.resetTextures();
};

Water.prototype.addDrop = function (x, y, radius, strength) {
  var this_ = this;
  this.textureB.drawTo(function () {
    this_.textureA.bind();
    this_.dropShader.uniforms({
      invPoolSizeVertex: [this_.invPoolSize.x, this_.invPoolSize.z],
      center: [x, y],
      radius: radius,
      strength: strength,
      poolSize: [config.params.simulation.poolSize.x, config.params.simulation.poolSize.y, config.params.simulation.poolSize.z]
    }).draw(this_.plane);
  });
  this.textureB.swapWith(this.textureA);
};

/**
 * 
 * @param {boolean} add 
 * @returns 
 */
Water.prototype.addOrRemoveVisualizationWaves = function (add) {
  if (config.classicalOverlayEnabled) return;
  const speed = 2.155;
  this.prev_WR_position = this.WR_position;
  this.WR_position = config.getRaceTime() * speed;
  if (this.WR_position > config.params.simulation.poolSize.z) this.WR_position = 2 * config.params.simulation.poolSize.z - this.WR_position;
  if (!this.visualizationWavesEnabled || !Swimmer.raceHasStarted) return;
  var this_ = this;

  // console.log("time : " + config.time);

  this.textureB.drawTo(function () {
    this_.textureA.bind();
    const swimmersAttributesTexture = Swimmer.getAttributesTexture();
    if (swimmersAttributesTexture) swimmersAttributesTexture.bind(1);
    this_.visualizationWavesShader.uniforms({
      swimmersAttributesTexture: 1,
      showDivingDistance: config.params.visualizations.showDivingDistance,
      showWR: config.params.visualizations.showWR,
      invPoolSizeVertex: [this_.invPoolSize.x, this_.invPoolSize.z],
      poolSize: [config.params.simulation.poolSize.x, config.params.simulation.poolSize.y, config.params.simulation.poolSize.z],
      wr: this_.WR_position,
      sqrt_2_PI: this_.sqrt_2_PI,
      add: add,
      swimmersNumber: config.swimmers.length,
      time: config.getRaceTime(),
      t: config.time,
      amplitudeFactor: config.params.quiver.amplitudeFactor,
      frequencyFactor: config.params.quiver.frequencyFactor,
      amplitude: config.params.quiver.amplitude,
      omega0: config.params.quiver.omega,
      waveLength0: config.params.quiver.waveLength
    }).draw(this_.plane);
  });
  this.textureB.swapWith(this.textureA);

}

Water.prototype.updateSpheres = function (dt) {
  if (config.params.simulation.optimized) {
    Swimmer.attributes.draw();

    this.textureB.drawTo(() => {
      this.textureA.bind();
      Swimmer.bindDisplacementTexture(1);
      Swimmer.bindOldDisplacementTexture(2);
      this.sphereShader.uniforms({
        oldDisplacementTexture: 2,
        displacementTexture: 1,
        invPoolSizeVertex: [this.invPoolSize.x, this.invPoolSize.z],
        poolSize: [config.params.simulation.poolSize.x, config.params.simulation.poolSize.y, config.params.simulation.poolSize.z],
        optimized: true
      }).draw(this.plane);
      this.textureB.swapWith(this.textureA);
      Swimmer.attributes.draw();

    })
  }

  else {
    const spheres = [];
    config.swimmers.forEach(swimmer => swimmer.spheres.forEach(sphere => spheres.push(sphere)));
    for (let i = 0; i < spheres.length; i++) {
      const sphere = spheres[i];
      this.moveSphere(sphere.oldCenter, sphere.center, sphere.radius);
    }
  }
};

Water.prototype.moveSphere = function (oldCenter, newCenter, radius) {
  var this_ = this;
  this.textureB.drawTo(function () {
    this_.textureA.bind();
    this_.sphereShader.uniforms({
      invPoolSizeVertex: [this_.invPoolSize.x, this_.invPoolSize.z],
      oldCenter: oldCenter,
      newCenter: newCenter,
      radius: radius,
      poolSize: [config.params.simulation.poolSize.x, config.params.simulation.poolSize.y, config.params.simulation.poolSize.z],
      optimized: false
    }).draw(this_.plane);
  });
  this.textureB.swapWith(this.textureA);
};

Water.prototype.stepSimulation = function (dt) {
  var this_ = this;
  this.textureB.drawTo(function () {
    this_.textureA.bind();
    const swimmersAttributesTexture = Swimmer.getAttributesTexture();
    if (swimmersAttributesTexture) swimmersAttributesTexture.bind(2);
    this_.updateShader.uniforms({
      swimmersAttributesTexture: 2,
      swimmersNumber: config.swimmers.length,
      invPoolSizeVertex: [this_.invPoolSize.x, this_.invPoolSize.z],
      delta: [this_.delta.x, this_.delta.y],
      time: config.time,
      wr: this_.WR_position,
      prev_wr: this_.prev_WR_position,
      poolSize: [config.params.simulation.poolSize.x, config.params.simulation.poolSize.y, config.params.simulation.poolSize.z],
      sqrt_2_PI: this_.sqrt_2_PI,
      damping: config.params.simulation.waterDamping
    }).draw(this_.plane);
  });
  this.textureB.swapWith(this.textureA);

  if (config.params.simulation.foam.enabled) this.foam.updateFoam(dt);

  this.updateAreaConservation();
};

Water.prototype.updateNormals = function () {
  var this_ = this;
  this.textureB.drawTo(function () {
    this_.textureA.bind();
    this_.normalShader.uniforms({
      invPoolSizeVertex: [this_.invPoolSize.x, this_.invPoolSize.z],
      delta: [this_.delta.x, this_.delta.y]
      // delta: [Math.max(this_.poolSize.x, this_.poolSize.z) / this_.poolSize.x / Math.max(this_.textureA.width, this_.textureA.height), Math.max(this_.poolSize.x, this_.poolSize.z) / this_.poolSize.z / Math.max(this_.textureA.width, this_.textureA.height)]
    }).draw(this_.plane);
  });
  this.textureB.swapWith(this.textureA);
};


Water.prototype.updateAreaConservation = function () {

  if (!config.params.visualizations.areaConservationEnabled) {
    return;
  }
  var this_ = this;

  var readType, readArrayType, readExt;
  if (this.textureA.type === this.gl.FLOAT) {
    readType = this.gl.FLOAT;
    readArrayType = Float32Array;
    readExt = 'EXT_color_buffer_float';
  } else if (this.textureA.type === this.gl.HALF_FLOAT_OES) {
    readType = this.gl.HALF_FLOAT_OES;
    readArrayType = Uint16Array; // Assuming 4 components * 2 bytes each
    readExt = 'EXT_color_buffer_half_float';
  } else {
    console.warn('Unsupported texture type for reading');
    return;
  }

  if (!this.gl.getExtension(readExt)) {
    console.warn(readExt + ' not available; cannot read pixels');
    return;
  }

  // Create framebuffer if not exists
  if (!this.fb) {
    this.fb = this.gl.createFramebuffer();
  }

  // Attach textureA to framebuffer
  this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.fb);
  this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, this.textureA.id, 0);

  // Check framebuffer
  const status = this.gl.checkFramebufferStatus(this.gl.FRAMEBUFFER);
  if (status !== this.gl.FRAMEBUFFER_COMPLETE) {
    console.error('Framebuffer incomplete: ' + status + ' for texture type ' + this.textureA.type);
    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
    return;
  }

  // Read pixels
  this.gl.pixelStorei(this.gl.PACK_ALIGNMENT, 1);
  const readBuf = new readArrayType(this.W * this.H * 4);
  // const writeBuf = new readArrayType(this.W * this.H * 4);
  const writeBuf = new Float32Array(this.W * this.H * 4);
  this.gl.readPixels(0, 0, this.W, this.H, this.gl.RGBA, readType, readBuf);
  for (let i = 0; i < this.W; i++) {
    writeBuf[i * 4 + 1] = 1.0;
  }
  // Example: modify and write back (only for float)
  const dx_proj = config.params.simulation.poolSize.x / this.W;
  const dz_proj = config.params.simulation.poolSize.z / this.H;
  const dx_proj_sq = dx_proj * dx_proj;
  const dz_proj_sq = dz_proj * dz_proj;
  if (this.textureA.type === this.gl.FLOAT) {
    // Increase red channel
    for (let j = 0; j < this.H; j += 1) {
      for (let i = 0; i < this.W; i += 1) {
        const index = (j * this.W + i) * 4;
        const indexAreaConservation = ((this.H - 1 - j) * this.W + i) * 4;
        const x = writeBuf[indexAreaConservation];
        const z = writeBuf[indexAreaConservation + 1];
        if (i + 1 < this.W) {
          const dy = readBuf[index] - readBuf[index + 4];
          const dx = Math.sqrt(dy * dy + dx_proj_sq);
          writeBuf[indexAreaConservation + 4] = x + dx;
        }
        if (j + 1 < this.H) {
          const dy = readBuf[index] - readBuf[index + this.W * 4];
          const dz = Math.sqrt(dy * dy + dz_proj_sq);
          writeBuf[indexAreaConservation - 4 * this.W + 1] = z + dz;
        }
      }
    }


    // Write back to textureA
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.areaConservationTexture.id);
    this.gl.pixelStorei(this.gl.UNPACK_ALIGNMENT, 1);
    this.gl.texSubImage2D(this.gl.TEXTURE_2D, 0, 0, 0, this.W, this.H, this.gl.RGBA, this.gl.FLOAT, writeBuf);
  }

  // Cleanup
  this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
  this.gl.bindTexture(this.gl.TEXTURE_2D, null);
};

export { Water };

