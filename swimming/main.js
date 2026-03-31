/*
 * WebGL Water
 * http://madebyevan.com/webgl-water/
 *
 * Copyright 2011 Evan Wallace
 * Released under the MIT license
 */

import { Renderer } from './renderer.js';
import { Cubemap } from './cubemap.js';
import { Sphere } from './sphere.js';
import GL from './lightgl.js';
import { Video } from './video.js';
import { config } from './params.js';
import { Swimmer } from './swimmer.js';
import { MAX_SPARKS } from './video.js';
import { createGUI } from './gui.js';
import { createEventEditor } from './eventEditor.js';
import { Calibration } from './calibration.js';
import { Water } from './water.js';
import { drawChronoPhotography } from './chronophotography.js';


function text2html(text) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>');
}

function handleError(text) {
  var html = text2html(text);
  if (html == 'WebGL not supported') {
    html = 'Your browser does not support WebGL.<br>Please see\
    <a href="http://www.khronos.org/webgl/wiki/Getting_a_WebGL_Implementation">\
    Getting a WebGL Implementation</a>.';
  }
  var loading = document.getElementById('loading');
  loading.innerHTML = html;
  loading.style.zIndex = 1;
}

window.onerror = handleError
var cubemap;
/**@type {Renderer} */
var renderer;
const numSwimmers = 10;
const gl = config.gl;

// const videoStartTime = 17;
var flagCenter;
var flagSize;


Swimmer.initAttributes();
function updateResolutionWarning() {
  document.getElementById('warning').hidden = !(config.resolution.x * config.resolution.y > 300000 && (config.water && config.params.visualizations.areaConservationEnabled));
}

let timeSinceFrameRateUpdate = 0;
let frameRate = 0;
let frameRateCounter = 0;
function updateFrameRateHTML(dt) {
  timeSinceFrameRateUpdate += dt;
  frameRate += 1 / dt;
  frameRateCounter++;
  if (timeSinceFrameRateUpdate >= 1) {
    frameRate /= frameRateCounter;
    document.getElementById('fps').innerText = `${(1 / dt).toFixed(1)} FPS`;
    timeSinceFrameRateUpdate = 0;
    frameRateCounter = 0;
  }
}
function reset() {
  console.log("reset");
  document.getElementById('resolution').innerText = `Resolution: ${config.resolution.x} x ${config.resolution.y}`;
  updateResolutionWarning();
  flagCenter = new GL.Vector(0., -config.params.simulation.poolSize.z / 2. + 1.);
  config.water.reset(config.resolution);
  renderer.flagCenter = flagCenter;
  renderer.flagSize = flagSize;
  renderer.reset();

  const dx = config.params.simulation.poolSize.x / numSwimmers;
  let x = config.params.simulation.poolSize.x / 2 - dx / 2;
  let i = 0;
  for (let swimmer of config.swimmers) {
    swimmer.body.center.x = x;
    swimmer.startingPoint.x = x;
    // swimmer.parseData("./assets/race-data/" + i + ".csv");
    i++;
    x -= dx;
  }
}

// handler called when time slider value changes
function onTimeSliderChange(event) {
  const t = parseFloat(event.target.value);
  if (isNaN(t)) return;

  // update parameters and video playback
  config.setRaceTime(t);
  config.swimmers.forEach(swimmer => swimmer.setCurrentDataIndex());

  // optionally pause simulation while dragging
  // paused = true;
}




window.onload = function () {
  var ratio = window.devicePixelRatio || 1;
  var help = document.getElementById('help');

  function onresize() {
    var width = innerWidth;
    var height = innerHeight;
    gl.canvas.width = width * ratio;
    gl.canvas.height = height * ratio;
    gl.canvas.style.width = width + 'px';
    gl.canvas.style.height = height + 'px';
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.matrixMode(gl.PROJECTION);
    gl.loadIdentity();
    gl.perspective(config.params.fov, gl.canvas.width / gl.canvas.height, 0.01, 100);
    gl.matrixMode(gl.MODELVIEW);

    config.resetDrawingTexture();
    draw();
  }

  document.body.appendChild(gl.canvas);
  gl.canvas.oncontextmenu = function (e) { e.preventDefault(); };
  gl.clearColor(0., 0., 0., 1);

  flagCenter = new GL.Vector(0., -config.params.simulation.poolSize.z / 2. + 1.);
  flagSize = 0.7;

  // attach slider listener
  const slider = document.getElementById('time-slider');
  if (slider) {
    slider.addEventListener('input', onTimeSliderChange);
  }

  // Drop zone for MP4 files
  const dropZone = document.getElementById('drop-zone');
  let dragCounter = 0;

  document.addEventListener('dragenter', (e) => {
    dragCounter++;
    dropZone.style.display = 'flex';
  });

  document.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  });

  document.addEventListener('dragleave', (e) => {
    dragCounter--;
    if (dragCounter === 0) {
      dropZone.style.display = 'none';
    }
  });

  // document.addEventListener('drop', (e) => {
  //   e.preventDefault();
  //   dragCounter = 0;
  //   dropZone.style.display = 'none';
  //   const files = e.dataTransfer.files;
  //   if (files.length > 0 && (files[0].type.startsWith('video/') || files[0].name.endsWith('.mp4'))) {
  //     const url = URL.createObjectURL(files[0]);
  //     video.video.src = url;
  //     video.video.play();
  //     console.log('Loaded:', files[0].name);
  //   }
  // });

  createGUI(gl, reset);
  config._reset = reset;
  // render the event timeline/editor once configuration has been loaded
  // config.parseConfigFile is asynchronous; give it a small delay or hook
  setTimeout(() => {
    createEventEditor('event-editor', config);
  }, 50);
  // folder.add(config.params, 'numSteps', 1, 10).step(1).name("number of simulation steps");
  renderer = new Renderer(gl, config.water, flagCenter, flagSize);
  cubemap = new Cubemap({
    xneg: document.getElementById('xneg'),
    xpos: document.getElementById('xpos'),
    yneg: document.getElementById('ypos'),
    ypos: document.getElementById('ypos'),
    zneg: document.getElementById('zneg'),
    zpos: document.getElementById('zpos')
  }, gl);

  const swimmer = new Swimmer(new GL.Vector(0, 0, 0));
  config.swimmers.push(swimmer);
  config.water = new Water(config.gl);

  if (!config.water.textureA.canDrawTo() || !config.water.textureB.canDrawTo()) {
    throw new Error('Rendering to floating-point textures is required but not supported');
  }


  reset();

  for (var i = 0; i < 20; i++) {
    config.water.addDrop(Math.random() * 2 - 1, Math.random() * 2 - 1, 0.06, (i & 1) ? 0.01 : -0.01);
  }

  document.getElementById('loading').innerHTML = '';
  onresize();

  var requestAnimationFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    function (callback) { setTimeout(callback, 0); };

  var prevTime = new Date().getTime();
  function animate() {
    var nextTime = new Date().getTime();
    if (!config.paused) {
      update((nextTime - prevTime) / 1000);
      draw(nextTime);
    }
    prevTime = nextTime;
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);

  window.onresize = onresize;

  var prevHit;
  var planeNormal;
  var swimmerSelected;
  var mode = -1;
  var MODE_ADD_DROPS = 0;
  var MODE_MOVE_SPHERE = 1;
  var MODE_ORBIT_CAMERA = 2;
  const MODE_TRANSLATE_CAMERA = 3;

  var oldX, oldY;

  function startDrag(x, y, event) {
    oldX = x;
    oldY = y;
    if (!event || event.button === 0) {
      var tracer = new GL.Raytracer();
      var ray = tracer.getRayForPixel(x * ratio, y * ratio);
      var pointOnPlane = tracer.eye.add(ray.multiply(-tracer.eye.y / ray.y));
      for (let swimmer of config.swimmers) {
        var sphereHitTest = GL.Raytracer.hitTestSphere(tracer.eye, ray, swimmer.body.center, swimmer.body.radius);
        if (sphereHitTest) {
          mode = MODE_MOVE_SPHERE;
          swimmerSelected = swimmer;
          swimmer.body.cinematic = true;
          prevHit = sphereHitTest.hit;
          planeNormal = tracer.getRayForPixel(gl.canvas.width / 2, gl.canvas.height / 2).negative();
          return;
        }
      }
      if (Math.abs(pointOnPlane.x) < config.params.simulation.poolSize.x / 2 && Math.abs(pointOnPlane.z) < config.params.simulation.poolSize.z / 2) {
        mode = MODE_ADD_DROPS;
        duringDrag(x, y);
      }
    } else if (event.button === 2) {
      mode = MODE_ORBIT_CAMERA;
    }
    else if (event.button === 1) {
      mode = MODE_TRANSLATE_CAMERA;
    }
  }

  function duringDrag(x, y, e) {
    switch (mode) {
      case MODE_ADD_DROPS: {
        var tracer = new GL.Raytracer();
        var ray = tracer.getRayForPixel(x * ratio, y * ratio);
        var pointOnPlane = tracer.eye.add(ray.multiply(-tracer.eye.y / ray.y));
        config.water.addDrop(pointOnPlane.x / config.params.simulation.poolSize.x * 2, pointOnPlane.z / config.params.simulation.poolSize.z * 2, 0.06, 0.03);
        if (config.paused) {
          config.water.updateNormals();
          renderer.updateCaustics(config.water);
        }
        break;
      }
      case MODE_MOVE_SPHERE: {
        var tracer = new GL.Raytracer();
        var ray = tracer.getRayForPixel(x * ratio, y * ratio);
        var t = -planeNormal.dot(tracer.eye.subtract(prevHit)) / planeNormal.dot(ray);
        var nextHit = tracer.eye.add(ray.multiply(t));
        const center = swimmerSelected.body.center.add(nextHit.subtract(prevHit));
        const radius = swimmerSelected.body.radius;
        const x_sphere = Math.max(radius - config.params.simulation.poolSize.x / 2, Math.min(config.params.simulation.poolSize.x / 2 - radius, center.x));
        const y_sphere = Math.max(radius - config.params.simulation.poolSize.y, Math.min(10, center.y));
        const z_sphere = Math.max(radius - config.params.simulation.poolSize.z / 2, Math.min(config.params.simulation.poolSize.z / 2 - radius, center.z));
        swimmerSelected.body.move(new GL.Vector(x_sphere, y_sphere, z_sphere));
        prevHit = nextHit;
        if (config.paused) renderer.updateCaustics(config.water);
        break;
      }
      case MODE_ORBIT_CAMERA: {
        if (e && e.shiftKey) {
          config.angleZ -= x - oldX;
          config.angleZ = Math.max(-89.999, Math.min(89.999, config.angleZ));
          break;
        }
        config.angleY -= x - oldX;
        config.angleX -= y - oldY;
        config.angleX = Math.max(-89.999, Math.min(89.999, config.angleX));
        break;
      }
      case MODE_TRANSLATE_CAMERA: {
        const factor = .001 * config.zoomDistance;
        config.translateX += factor * (x - oldX);
        config.translateY -= factor * (y - oldY);
      }
    }
    oldX = x;
    oldY = y;
    if (config.paused) draw();
  }

  function stopDrag() {
    mode = -1;
    if (swimmerSelected) swimmerSelected.body.cinematic = !Swimmer.useGravity;
  }

  function isHelpElement(element) {
    return element === help || element.parentNode && isHelpElement(element.parentNode);
  }

  function isEditorElement(element) {
    // return true if the node is inside the event-editor panel
    return element && (element.id === 'event-editor' || (element.parentNode && isEditorElement(element.parentNode)));
  }

  function zoom(delta) {
    config.zoomDistance *= 1 - delta * 0.0002;
    config.zoomDistance = Math.max(2, Math.min(1000, config.zoomDistance));
    if (config.paused) draw();
  };

  addEventListener('wheel', function (e) {
    // disable zoom when hovering over editor panel so the slider/timeline can scroll
    if (isEditorElement(e.target)) return;
    var delta = e.deltaY;
    zoom(-delta);
  });

  document.onmousedown = function (e) {
    gl.canvas.focus();
    if (!isHelpElement(e.target)) {
      //e.preventDefault();
      startDrag(e.pageX, e.pageY, e);
    }
  };

  document.onmousemove = function (e) {
    duringDrag(e.pageX, e.pageY, e);
  };

  document.onmouseup = function () {
    stopDrag();
  };

  document.ontouchstart = function (e) {
    if (e.touches.length === 1 && !isHelpElement(e.target)) {
      e.preventDefault();
      startDrag(e.touches[0].pageX, e.touches[0].pageY, false);
    }
  };

  document.ontouchmove = function (e) {
    if (e.touches.length === 1) {
      duringDrag(e.touches[0].pageX, e.touches[0].pageY);
    }
  };

  document.ontouchend = function (e) {
    if (e.touches.length == 0) {
      stopDrag();
    }
  };


  function pause() {
    if (config.paused) config.play();
    else config.pause();
  }

  const onkeydown = async function (e) {
    if (e.which == ' '.charCodeAt(0)) pause();
    else if (e.which == 'G'.charCodeAt(0)) {
      config.useGravity(!Swimmer.useGravity);
    }
    else if (e.which == 'L'.charCodeAt(0) && config.paused) draw();
    else if (e.which == 'J'.charCodeAt(0)) {
      config.swimmers.forEach(swimmer => swimmer.jump(2));
    }
    else if (e.which == 'C'.charCodeAt(0)) {
      config.params.visualizations.areaConservationEnabled = !config.params.visualizations.areaConservationEnabled;
      updateResolutionWarning();
      console.log("Area conservation " + (config.params.visualizations.areaConservationEnabled ? "enabled." : "disabled."));
    }
    else if (e.which == 'P'.charCodeAt(0)) {
      config.water.showProjectionGrid = !config.water.showProjectionGrid;
      console.log("Projection grid " + (config.water.showProjectionGrid ? "enabled." : "disabled."));
    }
    else if (e.which == 'A'.charCodeAt(0)) {
      config.water.showAreaConservedGrid = !config.water.showAreaConservedGrid;
      console.log("Area conserved grid " + (config.water.showAreaConservedGrid ? "enabled." : "disabled."));
    }
    else if (e.which == 'S'.charCodeAt(0)) {
      Swimmer.swimming = !Swimmer.swimming;
      if (Swimmer.swimming) {
        for (let swimmer of config.swimmers) swimmer.swim(true);
      }
      else {
        stopRace();
      }
      console.log("Swimming " + (Swimmer.swimming ? "enabled." : "disabled."));
    }
    else if (e.which == 'V'.charCodeAt(0)) {
      config.params.video.show = !config.params.video.show;
    }
    else if (e.which == 'H'.charCodeAt(0)) {
      document.getElementById("commands").hidden = !document.getElementById("commands").hidden;
      document.getElementById("h").hidden = !document.getElementById("h").hidden;
    }
    else if (e.which == 'D'.charCodeAt(0)) {
      if (!config.playingDemo) await config.launchDemo();
      else config.stopDemo();
    }
    else if (e.which == 'Q'.charCodeAt(0)) {
      config.chronoPhotography({});
    }
    else if (e.which == 'R'.charCodeAt(0)) {
      config.setScene("100m freestyle").then(() => config.startRace());
      config._setPannelMinimized(true);
    }
    else if (e.which == 'K'.charCodeAt(0)) {
      config.recalibrate();
    }
    else if (e.which == 40) { // down
      if (config.resolution.x > 129)
        config.resolution.x = Math.round(config.resolution.x / 2);
      reset();
      console.log("decreasing x resolution");
    }
    else if (e.which == 38) { // up
      if (config.resolution.x < 16384)
        config.resolution.x = Math.round(config.resolution.x * 2);
      reset();
      console.log("increasing x resolution");
    }
    else if (e.which == 37) { // left
      if (config.resolution.y > 129)
        config.resolution.y = Math.round(config.resolution.y / 2);
      reset();
      console.log("decreasing y resolution");
    }
    else if (e.which == 39) { // right
      if (config.resolution.y < 16384)
        config.resolution.y = Math.round(config.resolution.y * 2);
      reset();
      console.log("increasing y resolution");
    }
  };

  gl.canvas.addEventListener("keydown", onkeydown);

  var frame = 0;
  // config.setScene("100m freestyle");

  function update(dt) {
    if (dt > 1) return;
    frame += dt * 2;

    if (mode == MODE_MOVE_SPHERE) {
      // Start from rest when the player releases the mouse after moving the sphere
      for (let swimmer of config.swimmers) swimmer.body.velocity = new GL.Vector(0, 0, 0);
    }

    gl.clearColor(0., 0., 0., 1.);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


    // Update the water simulation and graphics
    for (let swimmer of config.swimmers) swimmer.update(dt);
    config.updateFloaters(dt);
    config.water.updateSpheres(dt);
    for (let i = 0; i < config.params.numSteps; i++) {
      config.water.stepSimulation(dt);
    }

    renderer.updateCaustics(config.water);
    if (true) config.updateTime(dt);
    config.updateParams();
    slider.value = config.getRaceTime();
    updateFrameRateHTML(dt);
    config.updateDemo(dt);

    config.splashParticles.update(dt);

  }

  function printCalib() {
    console.log(config.translateX);
    console.log(config.translateY);
    console.log(config.zoomDistance);
    console.log(config.angleX);
    console.log(config.angleY);
    console.log(config.angleZ);
    console.log(config.params.fov);
    console.log("\n\n\n");
  }

  function drawCornerView() {
    if (!Swimmer.raceHasStarted || !config.params.cornerView.show) return;
    config.cornerView = true;

    gl.loadIdentity();
    gl.translate(0, 0, -35);
    gl.rotate(90, 1, 0, 0);
    gl.rotate(-90, 0, 1, 0);
    gl.translate(0, 0.5, 0);

    const h = gl.canvas.height / 3;
    const w = 16 * h / 9;
    const x = 0;
    const y = gl.canvas.height - h;
    gl.viewport(x, y, w, h);
    renderer.renderWater(config.water, cubemap, config.params.visualizations.shadow);
    if (config.isSceneSynchronizedSwimming() && (config.params.visualizations.showStreaks || config.params.simulation.splashes.enabled)) config.splashParticles.draw({});

    renderer.renderSpheres(config.water);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    gl.loadIdentity();
    gl.translate(config.translateX, config.translateY, -config.zoomDistance);
    gl.rotate(-config.angleZ, 0, 0, 1);
    gl.rotate(-config.angleX, 1, 0, 0);
    gl.rotate(-config.angleY, 0, 1, 0);
    gl.translate(0, 0.5, 0);

    config.cornerView = false
  }

  function draw() {
    // Change the light direction to the camera look vector when the L key is pressed
    if (GL.keys.L) {
      renderer.lightDir = GL.Vector.fromAngles((90 - config.angleY) * Math.PI / 180, -config.angleX * Math.PI / 180);
      if (config.paused) renderer.updateCaustics(config.water);
    }
    Swimmer.updateAttributesTexture();
    config.water.addOrRemoveVisualizationWaves(true);
    config.water.updateNormals();

    gl.clearColor(.1, .2, .5, 1);
    gl.bindFramebuffer(gl.FRAMEBUFFER, config.drawingFrameBuffer);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.loadIdentity();
    gl.translate(config.translateX, config.translateY, -config.zoomDistance);
    gl.rotate(-config.angleZ, 0, 0, 1);
    gl.rotate(-config.angleX, 1, 0, 0);
    gl.rotate(-config.angleY, 0, 1, 0);
    gl.translate(0, 0.5, 0);

    // printCalib();

    gl.enable(gl.DEPTH_TEST);
    gl.disable(gl.BLEND);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    renderer.sphereCenter = config.swimmers[0].body.center;
    renderer.sphereRadius = config.swimmers[0].body.radius;
    renderer.renderCube(config.water);
    renderer.renderWater(config.water, cubemap, config.params.visualizations.shadow);
    // gl.matrixMode(gl.PROJECTION);
    // console.log("MVM : " + gl.projectionMatrix.m[0]);
    renderer.renderSpheres(config.water);
    // Swimmer.attributes.draw();
    gl.disable(gl.DEPTH_TEST);
    const particlesOption = {};
    // if (config.isSceneSynchronizedSwimming()) particlesOption.showStreaks = false;
    config.renderVideo();
    if (config.params.visualizations.showStreaks || config.params.simulation.splashes.enabled) config.splashParticles.draw(particlesOption);
    if (config.params.chronoPhotography.available) drawChronoPhotography();

    drawCornerView();

    config.water.addOrRemoveVisualizationWaves(false);

  }
};