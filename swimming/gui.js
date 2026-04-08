import GUI from "three/examples/jsm/libs/lil-gui.module.min.js";
import { config } from "./params";
import { MAX_SPARKS } from "./video";

const gui = new GUI();

/**
 * 
 * @param {WebGLRenderingContext} gl 
 * @param {*} reset 
 */
const createGUI = function (gl, reset) {
    //const folder = gui.addFolder('variables');

    const visualizationsFolder = gui.addFolder("visualizations");
    visualizationsFolder.close();
    // visualizationsFolder.add(params.visualizations,"enabled").name('enabled').listen().onChange((value) => {
    //     params.visualizations.showFlags = value;
    //     params.visualizations.show
    // });
    visualizationsFolder.add(config, "useConfigFile").name('use configuration file');
    // toggle event editor (timeline) visibility
    visualizationsFolder.add(config, "showTimeline").name('show event timeline').listen().onChange((v) => {
        config.hideEditorPanel(v);
    });
    visualizationsFolder.add(config.params.visualizations, "showFlags").name('show flags').listen();
    visualizationsFolder.add(config.params.visualizations, "showStreaks").name('show streaks').listen();
    visualizationsFolder.add(config.params.visualizations, "showWR").name('show world record').listen();
    visualizationsFolder.add(config.params.visualizations, "showSwimmersLines", config.params.visualizations.swimmersLinesList).name('show neighbours lines').listen();
    visualizationsFolder.add(config.params.visualizations, "swimmersLinesMode", config.params.visualizations.swimmersLinesModeList).name('show neighbours lines').listen();
    visualizationsFolder.add(config.params.visualizations, "customWaterPerturbation", config.params.visualizations.customParametersList).name('custom water perturbation').listen();
    visualizationsFolder.add(config.params.visualizations, "waterColorParameter", config.params.visualizations.customParametersList).name('water color parameter').listen();
    visualizationsFolder.add(config.params.visualizations, "medalsModeBeforeFinish", ["none", "stars", "bright", "lanes"]).name('show potential medals').listen();
    visualizationsFolder.add(config.params.visualizations, "medalsModeAfterFinish", ["none", "stars", "bright", "lanes"]).name('show potential medals after finish').listen();
    visualizationsFolder.add(config.params.visualizations, "showSpeed").name('show speed').listen();
    visualizationsFolder.add(config.params.visualizations, "showDivingDistance").name('show diving distance').listen();
    visualizationsFolder.add(config.params.visualizations.shadow, "enabled").name("show shadow");
    visualizationsFolder.add(config.params.visualizations, 'areaConservationEnabled', 'areaConservationEnabled').name('area conservation').listen();
    visualizationsFolder.add(config.params.visualizations, "rendering", config.params.visualizations.renderingList).name('rendering').listen().onChange(() => {
        if (config.params.visualizations.rendering == "toon") config.params.simulation.waterDamping = .35
    });

    const videoFolder = gui.addFolder("video");
    videoFolder.close();
    videoFolder.add(config.params.video, "opacity").name("opacity").listen();
    videoFolder.add(config.params.video, "thresholdBlending").name("threshold blending").listen();
    videoFolder.add(config.params.video, "blendingThreshold", .1, 1.5).name("blending threshold");
    videoFolder.add(config.params.video, 'show').name("show").listen();
    videoFolder.add(config.params.video, "hideObstructions").name("hide obstructions");
    videoFolder.add(config.params.video, "hideObstructionThreshold", 0., 0.5).name("obstructions threshold");

    // lengthFactor: 1.5, stroke: .004, num: 40 
    const sparksFolder = visualizationsFolder.addFolder("Sparks");
    sparksFolder.close();
    sparksFolder.add(config.params.visualizations.sparks, 'enabled').name("sparks enabled");
    sparksFolder.add(config.params.visualizations.sparks, 'glow', 1, 30).name("sparks glow factor");
    sparksFolder.add(config.params.visualizations.sparks, 'lengthFactor', 0.1, 10).name("sparks length factor");
    sparksFolder.add(config.params.visualizations.sparks, 'glowOffset', .1, 3).name("sparks glow offset");
    sparksFolder.add(config.params.visualizations.sparks, 'stroke', .001, .05).name("sparks stroke");
    sparksFolder.add(config.params.visualizations.sparks, 'num', 10, MAX_SPARKS).step(1).name("sparks number");
    sparksFolder.add(config.params.visualizations.sparks, 'sizeFactor', 10, 100).name("size factor");

    const shadowFolder = visualizationsFolder.addFolder("Swimmers shadows");
    shadowFolder.close();
    shadowFolder.add(config.params.visualizations.shadow, "shadowRadius", 0, 2).name("shadow radius");
    shadowFolder.add(config.params.visualizations.shadow, "shadowPower", 0.1, 2).name("shadow power");
    shadowFolder.add(config.params.visualizations.shadow, "showCircle").name("circle");
    shadowFolder.add(config.params.visualizations.shadow, "circleRadius", .5, 2).name("circle radius");
    shadowFolder.add(config.params.visualizations.shadow, "circleStroke", .1, .5).name("circle stroke");

    const simulationFolder = gui.addFolder("Simulation");
    simulationFolder.close();
    // simulationFolder.add(config.params.simulation, "heightLimit", 0.01, 0.25).name("height limit").listen();
    simulationFolder.add(config.params.simulation, "optimized").name("optimized").listen();
    simulationFolder.add(config.params.simulation.poolSize, 'x', 1, 25).name('pool width').onChange(function (value) { reset(); }).listen();
    simulationFolder.add(config.params.simulation.poolSize, 'z', 1, 50).name('pool height').onChange(function (value) { reset(); }).listen();
    simulationFolder.add(config.params.simulation.poolSize, 'y', 1, 3).name('pool depth').onChange(function (value) { reset(); }).listen();
    simulationFolder.add(config.params.simulation, 'waterDamping', 0.005, 0.4).name('water damping').listen();

    const foamFolder = simulationFolder.addFolder("foam");
    foamFolder.close();
    foamFolder.add(config.params.simulation.foam, "enabled").name("enabled").listen();
    foamFolder.add(config.params.simulation.foam, "velThreshold", 0., 15.).name("velocity threshold");
    foamFolder.add(config.params.simulation.foam, "velMax", 0., 20.).name("max velocity");
    foamFolder.add(config.params.simulation.foam, "dispersion", 0., .1).name("dispersion");
    foamFolder.add(config.params.simulation.foam, "timeVariation", 0., 10.).name("time variation");
    foamFolder.add(config.params.simulation.foam, "spaceVariation", 0., 100.).name("space variation");
    foamFolder.add(config.params.simulation.foam, "attenuation", 0., .2).name("attenuation");

    const splashFolder = simulationFolder.addFolder("splash");
    splashFolder.close();
    splashFolder.add(config.params.simulation.splashes, "enabled").name("enabled");
    splashFolder.add(config.params.simulation.splashes, "strengthThreshold", 0.1, 10.).name("strength threshold");

    const swimmersFolder = gui.addFolder("swimmers");
    swimmersFolder.close();
    swimmersFolder.add(config.params.swimmers, "showSpheres").name('show spheres').listen();
    swimmersFolder.add(config.params.swimmers, "useTracking").name('use tracking data').listen();


    const cameraFolder = gui.addFolder("camera");
    cameraFolder.close();
    cameraFolder.add(config.params, 'fov', 28, 45).name('fov').listen().onChange(function (value) {
        config.params.visualizations.sparks.fov = value * 2 * Math.PI / 360;
        gl.matrixMode(gl.PROJECTION);
        gl.loadIdentity();
        gl.perspective(config.params.fov, gl.canvas.width / gl.canvas.height, 0.01, 100);
        gl.matrixMode(gl.MODELVIEW);
        console.log("perspective : " + config.params.fov);
    });

    const quiverFolder = gui.addFolder("quiver");
    quiverFolder.close();
    quiverFolder.add(config.params.quiver, "amplitude", .01, 1).name("amplitude");
    quiverFolder.add(config.params.quiver, "omega", .5, 5).name("omega");
    quiverFolder.add(config.params.quiver, "amplitudeFactor", .5, .9).name("amplitude factor");
    quiverFolder.add(config.params.quiver, "frequencyFactor", 1.1, 2).name("frequency factor");
    quiverFolder.add(config.params.quiver, "waveLength", 1, 30).name("wave length");

    const cornerViewFolder = gui.addFolder("corner view");
    cornerViewFolder.close();
    cornerViewFolder.add(config.params.cornerView, "show").name("show");

    const chronoPhotographyFolder = gui.addFolder("chrono-photography");
    chronoPhotographyFolder.close();
    chronoPhotographyFolder.add(config.params.chronoPhotography, "available").name("available").onChange(() => {
        if (config.params.chronoPhotography.available) config.drawingFrameBuffer = config.chronoFrameBuffer;
        else config.drawingFrameBuffer = null;
    });



    config._gui = gui;
}

export { createGUI };