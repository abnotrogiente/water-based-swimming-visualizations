import { Calibration } from "./calibration";
import GL from "./lightgl";
import { Scene } from "./Scene";
import { Swimmer } from "./swimmer";
import { Water } from "./water";
import { Video } from "./video";
import { SplashParticles } from "./splash";
import { Sphere } from "./sphere";

function listToDict(L) {
    const dict = {};
    for (let i = 0; i < L.length; i++) {
        dict[L[i]] = i;
    }
    return dict;
}

const AWAY = new GL.Vector(1000, 0, -1000);

const swimmersLinesList = ["none", "only medals", "all"];
const swimmersLinesModeList = ["neighbours", "per swimmer"];
const customParametersList = ["none", "cycle frequency", "speed", "acceleration"];
const customParametersDict = {
    "none": { value: 0, name: "PARAMETER_NONE" },
    "cycle frequency": { value: 1, name: "PARAMETER_CYCLES" },
    "speed": { value: 2, name: "PARAMETER_SPEED" },
    "acceleration": { value: 3, name: "PARAMETER_ACCELERATION" }
};
const renderingList = ["realistic", "height field", "lambert", "toon"];
const renderingDict = {
    "realistic": { value: 0, name: "RENDERING_REALISTIC" },
    "height field": { value: 1, name: "RENDERING_HEIGHT_FIELD" },
    "lambert": { value: 2, name: "RENDERING_LAMBERT" },
    "toon": { value: 3, name: "RENDERING_TOON" },
}
class Config {
    constructor() {
        this.params = {
            numSteps: 2, fov: 45,
            visualizations: {
                enabled: true, showFlags: false, showWR: false, showSpeed: false, showDivingDistance: true,
                showFinishTimes: false, showStreaks: false,
                customWaterPerturbation: "none",
                waterColorParameter: "none", customParametersList: customParametersList, customParametersDict: customParametersDict,
                PARAMETER_NONE: "none", PARAMETER_CYCLES: "cycle frequency", PARAMETER_SPEED: "speed", PARAMETER_ACCELERATION: "acceleration",
                showSwimmersLines: "none", swimmersLinesList: swimmersLinesList, showSwimmersLinesDict: listToDict(swimmersLinesList),
                swimmersLinesMode: "neighbours", swimmersLinesModeList: swimmersLinesModeList, swimmersLinesModeDict: listToDict(swimmersLinesModeList),
                medalsModeBeforeFinish: "none", medalsModesDict: { "none": 0, "stars": 1, "bright": 2, "lanes": 3 },
                medalsModeAfterFinish: "none",
                areaConservationEnabled: true,
                rendering: "realistic", renderingList: renderingList, renderingDict: renderingDict,
                transitionBeginTime: null,

                shadow: { enabled: true, shadowRadius: .5, shadowPower: .5, showCircle: true, circleRadius: .6, circleStroke: .15 },
                sparks: { enabled: false, glow: 5., glowOffset: .5, lengthFactor: 1., stroke: .01, num: 40, sizeFactor: 50, fov: Math.PI / 4 }
            },
            swimmers: { showSpheres: true, useTracking: false },
            video: { thresholdBlending: false, blendingThreshold: .41, show: false, opacity: 1., hideObstructions: false, hideObstructionThreshold: .35 },
            simulation: {
                heightLimit: .04,
                optimized: false, waterDamping: .02, poolSize: new GL.Vector(4.0, 1.0, 4.0), buoyancyFactor: 1.1,
                // foam: { enabled: true, velThreshold: .5, velMax: 3., dispersion: 0.015 }
                foam: { enabled: true, velThreshold: .35, velMax: 3., dispersion: 0.015, timeVariation: 2.5, spaceVariation: 25, attenuation: .015 },
                splashes: { enabled: true, strengthThreshold: 2. }
            },
            quiver: { amplitudeFactor: 0.78, frequencyFactor: 1.2, amplitude: .1, omega: 2., waveLength: 1. },
            cornerView: { show: true },
            chronoPhotography: { available: false }
        };

        this.resolution = new GL.Vector(256, 256);

        /**@type {WebGLRenderingContext} */
        this.gl = GL.create({ preserveDrawingBuffer: true });
        this.gl.canvas.tabIndex = 0;


        this.originalVisParams = JSON.parse(JSON.stringify(this.params.visualizations));
        delete this.originalVisParams.shadow;
        delete this.originalVisParams.sparks;
        this.useConfigFile = false;
        this.time = 0;
        /**@type {Swimmer[]} */
        this.swimmers = [];

        this.translateX = 0.;
        this.translateY = 0.;
        this.zoomDistance = 4.;
        this.angleX = -25;
        this.angleY = -200.5;
        this.angleZ = 0.;

        /**@type {Water} */
        this.water = null;

        const defaultScene = new Scene("—",
            {
                poolSize: new GL.Vector(2, 1, 2),
                waterResolution: new GL.Vector(256, 256),
                numSwimmers: 1
            });
        const calibration0 = new Calibration({});
        defaultScene.addVideo(new Video(this.gl, "", calibration0));

        const raceScene = new Scene("100m freestyle",
            {
                poolSize: new GL.Vector(25, 2, 50),
                waterResolution: new GL.Vector(1024, 2048),
                numSwimmers: 10,
                thresholdBlending: true,
                dataFolder: "./assets/race-data/"
            }
        );
        const calibration1 = new Calibration({ tx: -0.53, ty: 1.25, zoom: 47.86, ax: -29, ay: -260.5, az: -5, fov: 39.98 });
        raceScene.addVideo(new Video(this.gl, "swimming-race.mp4", calibration1, 16.5));
        this.currentVideo = raceScene.videos[0];

        const synchronizedSwimmingScene = new Scene("synchronized swimming",
            {
                poolSize: new GL.Vector(25, 2, 30),
                waterResolution: new GL.Vector(1024, 2048),
                numSwimmers: 2,
                dataFolder: "./assets/synchronized-swimming-data/"
            }
        );
        const calibration2 = new Calibration({ tx: -1.32, ty: .4, zoom: 32.41, ax: -18, ay: -291.5, az: 1, fov: 42.8 });
        synchronizedSwimmingScene.addVideo(new Video(this.gl, "synchronized-swimming.mp4", calibration2, 0));


        /**@type {Scene[]} */
        this.scenesList = [defaultScene, raceScene, synchronizedSwimmingScene];
        this.scenes = {};
        this.scenesList.forEach(scene => this.scenes[scene.title] = scene);
        /**@type {Scene} */
        this.currentScene = defaultScene;

        this.paused = false;

        this.configPlayButton();

        this.transitions = {};
        this.playingDemo = false;
        this.renderWater = true;
        this.renderCube = true;
        this.spheresRadiusCoeff = 1.;
        this.distanceFixed = 0.;
        this.chronoFrameBuffer = this.gl.createFramebuffer();
        this.drawingFrameBuffer = null;
        this.drawingFameBufferB = this.gl.createFramebuffer();
        this.drawingTextureB = this.gl.createTexture();
        // this.drawingFrameBuffer = null;
        this.drawingTexture = this.gl.createTexture();
        this.resetDrawingTexture();
        this.cornerView = false;

        this.splashParticles = new SplashParticles(this.gl);

        /**@type {Sphere[]} */
        this.floaters = [];

        this.showTimeline = true;

        this.MVPMI = null;

        /**@type {Sphere[]} */
        this.bubbleSpheres = [];

        this.classicalOverlayEnabled = false;
    }

    hideEditorPanel(v) {
        const el = document.getElementById('event-editor');
        if (el) el.style.display = v ? 'block' : 'none';
    }

    resetDrawingTexture() {
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.chronoFrameBuffer);

        this.gl.bindTexture(this.gl.TEXTURE_2D, this.drawingTexture);

        const width = this.gl.canvas.width;
        const height = this.gl.canvas.height;

        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, width, height, 0,
            this.gl.RGBA, this.gl.UNSIGNED_BYTE, null);

        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);

        this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0,
            this.gl.TEXTURE_2D, this.drawingTexture, 0);


        const depthBuffer = this.gl.createRenderbuffer();
        this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, depthBuffer);

        this.gl.renderbufferStorage(this.gl.RENDERBUFFER, this.gl.DEPTH_COMPONENT16, width, height);

        this.gl.framebufferRenderbuffer(
            this.gl.FRAMEBUFFER,
            this.gl.DEPTH_ATTACHMENT,
            this.gl.RENDERBUFFER,
            depthBuffer
        );


        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.drawingFameBufferB);

        this.gl.bindTexture(this.gl.TEXTURE_2D, this.drawingTextureB);

        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, width, height, 0,
            this.gl.RGBA, this.gl.UNSIGNED_BYTE, null);

        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);

        this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0,
            this.gl.TEXTURE_2D, this.drawingTextureB, 0);


        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
    }

    configStopButton() {
        this.stopButton = document.getElementById("stop-button");
        this.stopButton.addEventListener("click", () => {
            this.stopRace();
        })
    }

    configPlayButton() {
        this.configStopButton();
        this.playButton = document.getElementById("play-button");
        this.playButton.addEventListener("click", () => {
            if (this.playButton.textContent == "pause") {
                this.pause();

                // this.stopButton.hidden = true;
            }
            else {
                if (!Swimmer.raceHasStarted) this.startRace();
                this.play();

            }
        })
    }

    #updateGLMatrices() {
        this.gl.matrixMode(this.gl.PROJECTION);
        this.gl.loadIdentity();
        this.gl.perspective(this.params.fov, this.gl.canvas.width / this.gl.canvas.height, 0.01, 100);
        this.gl.matrixMode(this.gl.MODELVIEW);

        this.gl.loadIdentity();
        this.gl.translate(this.translateX, this.translateY, -this.zoomDistance);
        this.gl.rotate(-this.angleZ, 0, 0, 1);
        this.gl.rotate(-this.angleX, 1, 0, 0);
        this.gl.rotate(-this.angleY, 0, 1, 0);
        this.gl.translate(0, 0.5, 0);
    }

    /**
     * 
     * @param {Calibration} calibration 
     */
    setCalibration(calibration) {
        this.translateX = calibration.tx;
        this.translateY = calibration.ty;
        this.zoomDistance = calibration.zoom;
        this.angleX = calibration.ax;
        this.angleY = calibration.ay;
        this.angleZ = calibration.az;
        this.params.fov = calibration.fov;

        this.gl.matrixMode(this.gl.PROJECTION);
        this.gl.loadIdentity();
        this.gl.perspective(this.params.fov, this.gl.canvas.width / this.gl.canvas.height, 0.01, 100);
        this.gl.matrixMode(this.gl.MODELVIEW);
    }

    #setPoolSize(poolSize) {
        console.log("SET POOL SIZE : " + poolSize.z);
        this.params.simulation.poolSize.x = poolSize.x;
        this.params.simulation.poolSize.y = poolSize.y;
        this.params.simulation.poolSize.z = poolSize.z;
    }


    #addFloaters() {
        // return;
        this.floaters = [];
        const floaterRadius = .1;
        const poolSize = this.params.simulation.poolSize;
        const laneSize = poolSize.x / 10;
        const floatersPerLine = poolSize.z / (2 * floaterRadius);
        const z0 = -poolSize.z / 2;
        const x0 = -poolSize.x / 2;

        const green = new GL.Vector(0., 1. / 2, 0.);
        const yellow = new GL.Vector(1. / 2, 1. / 2, 0.);
        const blue = new GL.Vector(0., 0.5 / 2, 1. / 2);
        const red = new GL.Vector(1. / 2, 0., 0.);
        const colors = [green, blue, blue, yellow, yellow, yellow, blue, blue, green];
        for (let i = 1; i < 10; i++) {
            for (let j = 0; j < floatersPerLine; j++) {
                const center = new GL.Vector(x0 + i * laneSize, 0., z0 + floaterRadius + j * 2 * floaterRadius);
                let color = colors[i - 1];
                if (Math.abs(center.z) >= 20. || Math.abs(center.z) <= .5 || Math.abs(Math.abs(center.z) - 10.) <= .25) color = red;
                this.floaters.push(new Sphere(center, floaterRadius, color, 2.5));
            }
        }
    }

    updateFloaters(dt) {
        // this.floaters.forEach(floater => floater.update(dt));
    }

    isSceneSynchronizedSwimming() {
        return this.currentScene.title == "synchronized swimming";
    }

    setMVPMI() {
        const MVM = this.gl.modelviewMatrix;
        const PM = this.gl.projectionMatrix;

        const MVPM = PM.multiply(MVM);

        this.MVPMI = MVPM.inverse();
        console.log("MVPMI set");
    }


    async setScene(sceneName) {
        console.log("SET SCENE : " + sceneName);
        this.currentScene = this.scenes[sceneName];
        if (this.currentScene) {
            this.#setPoolSize(this.currentScene.poolSize);
            if (this.currentScene.title == "100m freestyle") this.#addFloaters();
            else this.floaters = [];
            const timeSliderContainer = document.getElementById("time-slider-container");
            this.currentVideo = this.currentScene.videos[0];
            this.params.video.show = this.currentVideo.video ? true : false;
            this.params.swimmers.showSpheres = this.currentVideo.video ? false : true;
            timeSliderContainer.hidden = this.currentVideo.video ? false : true;
            if (this.currentScene.title != "—") this.params.simulation.waterDamping = 0.1;
            else this.params.simulation.waterDamping = .02;
            const numSwimmers = this.currentScene.numSwimmers;
            console.log("num swimmers : " + numSwimmers);
            if (this.swimmers.length != numSwimmers) {
                for (let i = this.swimmers.length; i < numSwimmers; i++) {
                    const s = new Swimmer(new GL.Vector(0, 0, 0));
                    this.swimmers.push(s);
                }
                for (let i = this.swimmers.length; i > numSwimmers; i--) {
                    // this.swimmers[i].
                    this.swimmers = this.swimmers.slice(1);
                }
                this.swimmers.forEach(swimmer => swimmer.waterDamping = this.params.simulation.waterDamping);
            }
            this.params.swimmers.useTracking = true;
            await this.currentScene.parseData(this.swimmers);
            this.swimmers.forEach(swimmer => swimmer.update(0));
            console.log("scene name : " + this.currentScene.title);
            this.setCalibration(this.currentVideo.calibration);

            this.resolution = this.currentScene.waterResolution;
            this.params.video.thresholdBlending = this.currentScene.thresholdBlending;
            if (!this.currentScene.thresholdBlending) this.params.video.opacity = .5;
            else this.params.video.opacity = 1.;
            this.params.visualizations.areaConservationEnabled = false;

            this.stopRace();
            this._reset();

            this.params.simulation.optimized = this.currentVideo.video ? true : false;

            this.useConfigFile = !this.isSceneSynchronizedSwimming();

            this._setPannelMinimized(this.currentScene.title != "100m freestyle");

            if (this.isSceneSynchronizedSwimming()) {
                this.params.simulation.foam.velThreshold = 0.;
                this.params.simulation.foam.velMax = 2.2;
                this.params.simulation.foam.dispersion = 0.0025;
                this.params.simulation.foam.timeVariation = 2.5;
                this.params.simulation.foam.spaceVariation = 10;
                this.params.simulation.foam.attenuation = 0.0002;
            }

        }

    }
    useGravity(value) {
        Swimmer.useGravity = value;
        for (let swimmer of config.swimmers) swimmer.body.cinematic = !Swimmer.useGravity;
    }
    isOneVisualizationEnabled() {
        return this.params.visualizations.showFlags ||
            this.params.visualizations.medalsModeBeforeFinish != "none" ||
            this.params.visualizations.medalsModeAfterFinish != "none" ||
            this.params.visualizations.showWR ||
            this.params.visualizations.showSpeed ||
            this.params.visualizations.showDivingDistance;
    }
    updateTime(dt) {
        this.time += dt;
        if (this._updateDistanceMarker) this._updateDistanceMarker();
    }
    getRaceTime() {
        if (!Swimmer.raceHasStarted) return 0;
        return this.time - this.currentVideo.videoStartTime;
    }
    resetParams() {
        // this.params.visualizations = JSON.parse(JSON.stringify(this.originalVisParams));
        Object.entries(this.originalVisParams).forEach(pair => {
            const key = pair[0];
            const value = pair[1];
            this.params.visualizations[key] = value;
        })
        this.params.visualizations.areaConservationEnabled = false;
    }
    updateEventIndex() {
        this.currentEventIndex = 0;
        while (this.events[this.currentEventIndex] && this.events[this.currentEventIndex].time < this.getRaceTime()) this.currentEventIndex++;
        if (this.currentEventIndex > 0) this.currentEventIndex--;
    }
    setRaceTime(t) {
        const startTime = this.currentVideo.videoStartTime ? this.currentVideo.videoStartTime : 0;
        this.time = startTime + t;
        if (this.currentVideo.video) this.currentVideo.setTime(this.time);
        if (!this.events) return;
        this.updateEventIndex();
        this.resetParams();
    }
    showTexts(show) {
        document.getElementById("h").hidden = !show;
        if (!show) {
            this.showCommands = !document.getElementById("commands").hidden;
            document.getElementById("commands").hidden = true;
            // this._gui.hide();
        }
        else {
            if (this.showCommands) document.getElementById("commands").hidden = false;
            // this._gui.show();
        }
    }
    startRace() {
        if (this.currentVideo.videoStartTime >= 3.) this.setRaceTime(-3);
        else this.setRaceTime(0);
        if (this.currentVideo.video) this.currentVideo.video.play();
        this.swimmers.forEach(swimmer => swimmer.startRace());
        Swimmer.raceHasStarted = true;
        Swimmer.useGravity = true;
        this.water.resetTextures();
        this.water.WR_position = 0;
        this.stopButton.hidden = false;
        this._clearChronoTexture(this.gl.canvas.width, this.gl.canvas.height, this.gl);
        this.showTexts(false);

        // if (this.isSceneSynchronizedSwimming()) this.params.visualizations.showStreaks = true;
    }
    stopRace() {
        if (this.paused) this.play();
        this.setRaceTime(0);
        if (this.currentVideo.video) this.currentVideo.video.pause();
        this.swimmers.forEach(swimmer => swimmer.swim(false));
        Swimmer.raceHasStarted = false;
        this.water.resetTextures();

        this.playButton.textContent = "play";
        this.stopButton.hidden = true;
        this.showTexts(true);
    }
    pause() {
        this.paused = true;
        this.pauseVideo();
        this.playButton.textContent = "play";
    }
    play() {
        this.paused = false;
        if (!Swimmer.raceHasStarted) return;
        this.playVideo();
        this.playButton.textContent = "pause";
    }
    pauseVideo() {
        if (this.currentVideo.video) this.currentVideo.video.pause();
    }
    playVideo() {
        if (this.currentVideo.video) {
            this.currentVideo.video.play();
            this.currentVideo.video.currentTime = this.time;
        }
    }
    renderVideo() {
        if (this.currentVideo.video) this.currentVideo.render();
    }
    parseConfigFile(source) {
        fetch(source)
            .then(res => res.text())
            .then(text => {
                this.events = JSON.parse(text);
                this.currentEventIndex = 0;
                // refresh editor if one exists
                if (this._renderTimeline) this._renderTimeline();
            });
    }
    updateTransitions() {
        Object.entries(this.transitions).forEach(pair => {
            const key = pair[0];
            const value = pair[1];
            const dt = this.getRaceTime() - value.beginTime;
            if (dt > value.duration) {
                delete this.transitions[key];
                return;
            }
            if (value.show) {
                value.opacity = dt / value.duration;
            }
            else value.opacity = 1. - dt / value.duration;
        })
    }

    updateParams() {
        if (!Swimmer.raceHasStarted) return;
        if (!this.events || !this.useConfigFile) return;
        const event = this.events[this.currentEventIndex];
        if (!event) return;
        let rankSwimmerToggle = event.rankSwimmerToggle;
        if (!rankSwimmerToggle) rankSwimmerToggle = 1;
        if (event.distance && this.swimmers[rankSwimmerToggle - 1].getDistanceTraveled() >= event.distance || event.time !== undefined && this.getRaceTime() >= event.time) {
            // console.log("event : " + JSON.stringify(event));
            this.currentEventIndex++;
            const dissolve = event.transition && event.transition.type == "dissolve";
            Object.entries(event.params).forEach((pair) => {
                const key = pair[0];
                const value = pair[1];
                if (key === "transition") return;
                if (dissolve && (value === true || value === false)) {
                    this.transitions[key] = { opacity: 1. - 1. * value, show: value, beginTime: this.getRaceTime(), duration: event.transition.duration };
                }
                this.params.visualizations[key] = value;
                // console.log("key : " + key);
                // console.log("value : " + value);
                // console.log("value or false : " + (value || false));
                // console.log("show finish time : " + this.params.visualizations.showFinishTimes);
                // console.log("\n\n\n")
            });
        }
    }
    chronoPhotography({ circle = false }) {
        console.log("shoot");
        this.distanceFixed = this.swimmers[0].getDistanceTraveled();
        console.log("distance fixed : " + this.distanceFixed);
        this._fixTexture(circle);
        // if (!circle) this._fixTexture();
        // else this.chronoPhotoCircleTime = this.time + .2;
        // fixTexture();

        // gl.enable(gl.SCISSOR_TEST);
        // gl.scissor(0, 0, gl.canvas.width / 2, gl.canvas.height / 2);
    }
    recalibrate() {
        if (this.currentVideo) this.setCalibration(this.currentVideo.calibration);
    }
    async updateVideoForOfflineRendering() {
        if (this.currentVideo && this.currentVideo.video) {
            if (this.time < 0 || this.time > this.currentVideo.video.duration) return;
            await this.currentVideo.setTime(this.time);
        }
    }

    #prepareDemoPart2() {
        this.classicalOverlayEnabled = false;
        this.params.chronoPhotography.available = false;
        this.drawingFrameBuffer = null;
        this.parseConfigFile("./assets/vis-config.json");
        this.stopRace();
        // this.swimmers.forEach(swimmer => swimmer.body.move(AWAY));
        this.params.simulation.splashes.enabled = true;
        this.params.visualizations.shadow.enabled = true;

        this.startRace();
        this.params.video.hideObstructions = true;
        this.params.cornerView.show = false;
        this.water.resetTextures();
        this.demoTime = 0;
        this.demoSecondPartStarted = true;
    }
    #prepareDemoPart3() {
        this.stopRace();
        this.params.video.hideObstructions = false;
        this.demoTime = 0;
        this.params.visualizations.shadow.enabled = false;
        this.setScene("—").then(() => {
            this.useGravity(true);
            this.swimmers[0].body.center.y = .5;
            this.translateX = 200.;
            this.params.simulation.splashes.enabled = false;
            this.pause();
        });

        this.demoPart3Started = true;

        // this.demoSecondPartStarted = true;
    }
    #prepareDemoPart4() {
        this.params.cornerView.show = false;
        this.params.simulation.splashes.enabled = true;
        this.hideFloaters = true;
        this.stopRace();
        this.parseConfigFile("./assets/vis-config-demo-2.json");
        this.setScene("100m freestyle").then(() => {
            this.translateX = 200
            this.swimmers.forEach(swimmer => swimmer.body.move(AWAY));
        });
        this.classicalOverlayEnabled = false;
        // await this.setScene("100m freestyle");
        this.params.video.show = false;
        this.params.swimmers.showSpheres = true;
        this.spheresRadiusCoeff = 1.;


        this.swimmersShown = 0;

        // this.params.swimmers.useTracking = false;
        this.useGravity(true);
        this.params.simulation.buoyancyFactor = 1.5;
        this.params.visualizations.shadow.enabled = false;
        this.renderWater = false;
        // this.parseConfigFile("./assets/vis-config-demo-2.json");

        // this.angleY = this.currentVideo.calibration.ay + 360;
        // this.playButton.hidden = true;
        // this.stopButton.hidden = true;
        // this.renderCube = false;
        // this.setCalibration(new Calibration({}));



        this.hideFloaters = true;

        this.demoTime = 0;
        this.demoPart4Started = true;

    }

    #prepareDemoPart5() {
        this.stopRace();
        this.parseConfigFile("./assets/vis-config-classical-overlay.json");
        this.setScene("synchronized swimming").then(() => {
            this.startRace();
            this.params.video.hideObstructions = false;
        });
        this.demoPart5Started = true;
        this.demoTime = 0;
    }
    async launchDemo() {


        this.playingDemo = true;

        this.parseConfigFile("./assets/vis-config-classical-overlay.json");
        this.params.chronoPhotography.available = true;
        this.drawingFrameBuffer = this.chronoFrameBuffer;
        console.log("Launch demo");
        await this.setScene("100m freestyle").then(() => {
            this.params.video.show = false;
            this.translateX = 200;

        });
        this._gui.hide();
        document.getElementById("event-editor").hidden = true;
        document.getElementById("time-slider-container").hidden = true;
        document.getElementById("h").hidden = true;
        this.demoTime = 0;

        this.classicalOverlayEnabled = true;
        this.startRace();
        this.params.visualizations.showDivingDistance = false;
        this.params.visualizations.shadow.enabled = false;
        this.params.simulation.splashes.enabled = false;
        // this.params.chronoPhotography.available = true;

        this.demoEvents = [
            { time: 0, text: "Situated Water-Based Visual Effects for Sports Video Augmentation \n Submission to IEEE Vis 2026 #1528", duration: 4, pause: true },
            {
                time: 0, text: "Reproduction of the current TV approach", duration: 2, action: () => {
                    this.params.video.show = true;
                    this.translateX = this.currentVideo.calibration.tx;
                }
            },
            { time: 8, text: "Currently they use an overlay projection plan.", duration: 2, action: () => this.showOverlayPlane = true, pause: false },
            { time: 10, text: "Then the flags are drawn on the overlay.", duration: 2, action: () => this.params.visualizations.showFlags = true, pause: false },
            { time: 12, text: "The overlay is transparent where nothing is drawn.", duration: 3, action: () => this.showOverlayPlane = false, pause: false },
            { time: 16, text: "Our method", duration: 3, action: () => this.#prepareDemoPart2(), pause: false },
            { time: 4, text: "We use water-based visual effects to amplify swimming race data", duration: 5, pause: false },
            { time: 15, text: "Method breakdown", duration: 3, action: () => this.#prepareDemoPart3(), pause: true },
            { time: 0.5, text: "Evan Wallace's WebGL water", duration: 3.5, pause: false },
            { time: 4, text: "nothing", duration: 0, action: () => this.#prepareDemoPart4(), pause: false },
            { time: 0, text: "We adapted to swimming", duration: 2, action: () => this.showOverlayPlane = false, pause: true },
            { time: .5, text: "Pool", duration: 1, pause: false },
            { time: 1.5, text: "Water", duration: 1, pause: false },
            { time: 2.5, text: "Floaters", duration: 1, action: () => this.hideFloaters = false, pause: false },
            { time: 3.5, text: "Spheres", duration: 2, pause: false },
            { time: 6., text: "Let\' start a swimming race", duration: 1 },
            {
                time: 7.5, text: "Flag appear with water-based transition", duration: 2.5, pause: true, calib: new Calibration({
                    tx: 16.9,
                    ty: 6.9,
                    zoom: 20.5,
                    ax: -37,
                    ay: -126.5,
                    az: -5,
                    fov: 39.98
                })
            },
            {
                time: 11.5, text: "Diving points and swimmers' shadows", duration: 2.5, pause: true, calib: new Calibration({
                    tx: 9,
                    ty: -10,
                    zoom: 3,
                    ax: -30,
                    ay: -15,
                    az: 0,
                    fov: 39.98
                })
            },
            {
                time: 14.8, text: "Breakout points", duration: 2, pause: true, calib: new Calibration({
                    tx: -3,
                    ty: -7,
                    zoom: 12,
                    ax: -30,
                    ay: 10,
                    az: 0,
                    fov: 39.98
                })
            },
            { time: 15.7, text: "Speeds", duration: 1.5, pause: false },
            { time: 17.2, text: "First swimmers lines", duration: 1.5, pause: false },
            { time: 18.7, text: "Potential medals", duration: 1.5, pause: false },
            { time: 20.2, text: "World record line", duration: 1.5, pause: false },
            // { time: 16, text: "World record line", duration: 2, pause: false },
            { time: 22.5, text: "Embedding in the original swimming race video", duration: 2, pause: false },
            { time: 24.5, text: "Hiding spheres", duration: 2.5, pause: false },
            { time: 27, text: "Hiding obstructions", duration: 2, pause: false },
            { time: 28.5, text: "Corner view from above", duration: 2, action: () => this.params.cornerView.show = true, pause: false },
            { time: 33.5, text: "Transferring to synchronized swimming", duration: 20, action: () => this.#prepareDemoPart5(), pause: false },
            { time: 27.5, text: "Artificially enhanced foam to draw the trajectory", duration: 2, pause: false },
            { time: 30.1, text: "Splashes to emphasize an event", duration: 2, pause: true },
        ];
        this.currentDemoEvent = this.demoEvents.shift();
    }
    stopDemo() {
        this.playingDemo = false;
        this.setScene("—");
        document.getElementById("event-editor").hidden = false;
        document.getElementById("time-slider-container").hidden = false;
        document.getElementById("h").hidden = false;
        this.renderWater = true;
        this.renderCube = true;
        this.params.visualizations.shadow.enabled = true;
        this._gui.show();
        this.params.simulation.buoyancyFactor = 1.1;

    }

    #demoAddSwimmers(t, beginTime) {
        const dt_showSwimmers = .1;

        const nextSwimmerIdx = Math.floor((t - beginTime) / dt_showSwimmers)
        if (this.swimmersShown < 10 && nextSwimmerIdx >= this.swimmersShown) {
            console.log("swimmers shown : " + this.swimmersShown);
            console.log("next index swimmer : " + nextSwimmerIdx);
            console.log("num swimmers : " + this.swimmers.length);
            const width = this.params.simulation.poolSize.x;
            const x0 = -width / 2 + width / 20;
            const x = x0 + nextSwimmerIdx * width / 10;
            const swimmer = this.swimmers[nextSwimmerIdx];
            swimmer.body.move(new GL.Vector(swimmer.body.initCenter.x, .5, 0));
            this.swimmersShown++;
        }
    }

    #getInterpFactor(t0, tf, t) {
        if (t < t0) return 0;
        if (t > tf) return 1;
        const t_norm = (t - t0) / (tf - t0);
        return 1. - (Math.cos(t_norm * Math.PI) + 1.) / 2.;
    }

    /**
     * 
     * @param {GL.Vector} p1 
     * @param {GL.Vector} p2 
     * @param {*} t0 
     * @param {*} tf 
     * @param {*} t 
     * @returns 
     */
    #moveInterp(p1, p2, t0, tf, t) {
        const t_norm = this.#getInterpFactor(t0, tf, t);
        console.log("t norm : " + t_norm);
        const interp = (x, y, t, alpha = 1) => Math.pow(t, alpha) * y + (1. - Math.pow(t, alpha)) * x;
        return new GL.Vector(interp(p1.x, p2.x, t_norm), interp(p1.y, p2.y, t_norm, 20), interp(p1.z, p2.z, t_norm, 2));

    }
    updateDemo(dt) {
        if (!this.playingDemo) return;
        if (this.demoEventDisplayed) {
            this.demoEventDuration += dt;
            if (this.currentDemoEvent.calib) {
                const duration = this.currentDemoEvent.duration;
                let intensity;
                if (this.demoEventDuration < duration / 6 || this.demoEventDuration > 5 * duration / 6) intensity = 0.;
                else if (this.demoEventDuration <= duration / 2) intensity = (this.demoEventDuration - duration / 6) / (duration / 3);
                else intensity = 1 - (this.demoEventDuration - duration / 2) / (duration / 3);
                if (!this.demoShowVideoTime) this.demoSavedCalib.ay += 15 * dt;
                this.setCalibration(this.demoSavedCalib.interpolate(this.currentDemoEvent.calib, intensity, .33));
            }
            if (this.demoEventDuration > this.currentDemoEvent.duration) {
                this.demoEventDisplayed = false;
                this.play();
                if (this.demoSavedCalib) this.setCalibration(this.demoSavedCalib);
                this.demoSavedCalib = null;
                this.currentDemoEvent = this.demoEvents.shift();
                document.getElementById("demo-text").innerText = '';
            }
            else if (this.currentDemoEvent.pause) return;
        }
        this.demoTime += dt;
        // console.log("demo time : " + this.demoTime);
        // console.log("demo event time : " + this.currentDemoEvent);
        if (!this.demoEventDisplayed && this.currentDemoEvent && this.demoTime > this.currentDemoEvent.time) {
            // console.log("START DEMO EVENT");
            this.demoEventDisplayed = true;
            this.demoEventDuration = 0.;
            if (this.currentDemoEvent.pause) this.pause();
            document.getElementById("demo-text").innerText = this.currentDemoEvent.text;
            if (this.currentDemoEvent.action) this.currentDemoEvent.action();
            if (this.currentDemoEvent.calib) {
                this.demoSavedCalib = new Calibration({
                    tx: this.translateX,
                    ty: this.translateY,
                    zoom: this.zoomDistance,
                    ax: this.angleX,
                    ay: this.angleY,
                    az: this.angleZ,
                    fov: this.params.fov
                });
                // this.setCalibration(this.currentDemoEvent.calib);
            }
        }
        // if (this.demoTime >= 0 && !this.demoSecondPartStarted) {
        //     this.#prepareDemoSecondPart();

        // }
        const t = this.demoTime;
        // console.log("demo time : " + t);
        if (!this.demoPart3Started || this.demoPart5Started) return;
        const showWaterTime = 1.5;
        const beginShowSwimmersTime = 3.5;
        const startMoveTime = 4.5;
        const startRaceTime = 6.5;
        const poolSlidingTime = 1.;
        if (t <= poolSlidingTime) {
            const t_norm = this.#getInterpFactor(0., poolSlidingTime, t);
            this.translateX = t_norm * this.currentVideo.calibration.tx + (1. - t_norm) * 200;
            // if (t >= poolSlidingTime) this.demoCalibrated = true;
        }


        if (!this.demoPart4Started) return;


        else if (!this.demoShowVideoTime) this.angleY += 15 * dt;
        // if (!this.renderCube && t > .5) this.renderCube = true;
        if (!this.renderWater && t > showWaterTime) {
            this.renderWater = true;
            // this.hideFloaters = false;

        }
        if (t > showWaterTime && t < showWaterTime + .5) {
            for (var i = 0; i < 10; i++) {
                this.water.addDrop(Math.random() * 2 - 1, Math.random() * 2 - 1, 0.06, (i & 1) ? 0.6 : -0.6);
            }
        }
        this.#demoAddSwimmers(t, beginShowSwimmersTime);
        if (!Swimmer.raceHasStarted && t >= startMoveTime && t < startRaceTime) {
            this.params.simulation.splashes.enabled = false;
            this.swimmers.forEach(swimmer => {
                swimmer.body.cinematic = true;
                const p1 = new GL.Vector(swimmer.body.center.x, 0, 0);
                const p2 = new GL.Vector(swimmer.body.center.x, 1, -this.params.simulation.poolSize.z / 2);
                swimmer.body.move(this.#moveInterp(p1, p2, startMoveTime, startRaceTime, t));
            });
        }
        if (!Swimmer.raceHasStarted && t >= startRaceTime) {
            this.params.simulation.buoyancyFactor = 1.1;
            this.params.simulation.splashes.enabled = true;
            this.params.visualizations.shadow.enabled = true;
            this.startRace();
        }

        if (!this.demoShowVideoTime && this.angleY >= this.currentVideo.calibration.ay + 360) {
            //this.params.video.show = true;
            this.demoShowVideoTime = 22.5;
        }
        if (!this.params.video.show && this.demoShowVideoTime && t >= this.demoShowVideoTime) {
            this.params.video.show = true;
            this.params.video.opacity = 0.;
        }
        const videoAppearDuration = 2.;
        if (this.params.video.show && t <= this.demoShowVideoTime + videoAppearDuration) {
            this.params.video.opacity = (t - this.demoShowVideoTime) / videoAppearDuration;
            console.log("opacity : " + this.params.video.opacity);
        }
        const spheresDisparitionDuration = 2.;
        let sphereDisapearedTime = null;
        if (this.demoShowVideoTime) sphereDisapearedTime = this.demoShowVideoTime + videoAppearDuration + spheresDisparitionDuration;
        if (this.params.video.show && t > this.demoShowVideoTime + videoAppearDuration && t < sphereDisapearedTime) {
            this.spheresRadiusCoeff = 1. - (t - (this.demoShowVideoTime + videoAppearDuration)) / spheresDisparitionDuration;
        }

        let hideObstructionTime = null;
        if (sphereDisapearedTime) hideObstructionTime = sphereDisapearedTime + .5;
        const hideObstructionDuration = 2.;
        if (hideObstructionTime && t > hideObstructionTime && t < hideObstructionTime + hideObstructionDuration) {
            this.params.video.hideObstructions = true;
            this.params.video.hideObstructionThreshold = (t - hideObstructionTime) / hideObstructionDuration * .5;
        }

    }
}

const config = new Config();
config.parseConfigFile("./assets/vis-config.json");
// config.parseConfigFile("./assets/vis-config-classical-overlay.json");


export { config, AWAY };