import { gapSize } from "three/tsl";
import GL from "./lightgl";
import { AWAY, config } from "./params";
import { Sphere } from "./sphere";
import { SwimmersAttributes } from "./swimmersAttributes";
import { ARM_DELTA_X, FOOT_DELTA_X, FOOT_DELTA_Z, MAX_NUM_SWIMMER, NUM_VEC_ATTRIBUTES } from "./swimmersConstants";

function gaussianRandom(mean = 0, stdev = 1) {
    const u = 1 - Math.random(); // Converting [0,1) to (0,1]
    const v = Math.random();
    const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    // Transform to the desired mean and standard deviation:
    return z * stdev + mean;
}

const armAmplitude = 0.5;
const armFrequency = 2;


const TIME_KEY = "Temps (s)";
const EVENT_KEY = "event";
const Z_KEY = "eventX"; // "distance (m)"
const X_KEY = "eventY";

const FREQUENCY_KEY = "frequence (cylce/min)";


class Swimmer {
    static useGravity = false;
    static raceHasStarted = false;
    static swimming = false;

    /**@type {SwimmersAttributes} */
    static attributes;

    static initAttributes = () => {
        Swimmer.attributes = new SwimmersAttributes();
    }

    static updateAttributesTexture = () => {
        Swimmer.attributes.update();
    }

    static getAttributesTexture = () => {
        return Swimmer.attributes.texture;
    }

    static bindDisplacementTexture = (i) => {
        Swimmer.attributes.displacementTexture.bind(i);
    }

    static bindOldDisplacementTexture = (i) => {
        Swimmer.attributes.oldDisplacementTexture.bind(i);
    }


    static reset = (resolution) => {
        Swimmer.attributes.createRenderingTexture(resolution.x, resolution.y);
    }

    constructor(center) {
        this.startingPoint = new GL.Vector(center.x, center.y, center.z);
        this.center = new GL.Vector(center.x, center.y, center.z); // TODO not this
        this.force = new GL.Vector(0, 0, 190 + gaussianRandom(0, 20));

        this.reactionTime = Math.max(0.1, gaussianRandom(0.15, 0.02));

        const radius = .25;
        const armRadius = .15;

        this.body = new Sphere(center, radius);
        this.body.showStreak = true;
        this.leftArm = new Sphere(AWAY, armRadius);
        this.rightArm = new Sphere(AWAY, armRadius);
        this.leftFoot = new Sphere(AWAY, armRadius);
        this.rightFoot = new Sphere(AWAY, armRadius);

        this.body.cinematic = !Swimmer.useGravity;
        this.leftArm.cinematic = true;
        this.rightArm.cinematic = true;
        this.leftFoot.cinematic = true;
        this.rightFoot.cinematic = true;

        /**@type {Sphere[]} */
        this.spheres = [this.body, this.leftArm, this.rightArm, this.leftFoot, this.rightFoot];

        this.divingDistance = 0;
        this.divingTime = 1000;

        this.breakoutDistance = 0;
        this.breakoutTime = 1000;

        this.nationality = Math.random() > .5 ? 0 : 1;

        this.currendDataIndex = 0;

        this.useTracking = false;

        this.armPulsation = 2 * Math.PI * armFrequency;
        this.cycleTime = 0.;
        this.cyclePhase = 0.;
        this.finishTime = 0;

        this.waterDamping = config.params.simulation.waterDamping;
    }

    async parseData(source) {
        await fetch(source)
            .then(res => {
                const contentType = res.headers.get("content-type");
                if (!contentType || !contentType.includes("text/csv")) {
                    console.log("no file found : " + source);
                    return null;
                }
                return res.text();
            })
            .then(text => {
                if (!text) return;
                const rows = text.split('\n');
                const headers = rows[0].split(/,|;/);
                this.data = rows.slice(1).map(row => {
                    const values = row.split(/,|;/);
                    return Object.fromEntries(
                        headers.map((h, i) => [h, values[i]])
                    );
                }
                );
                if (config.params.swimmers.useTracking) this.armPulsation = 0.;
                //console.log("data parsed");
                //console.log("data : " + JSON.stringify(this.data, null, 2));
                //console.log("time0 : " + this.data[0]["Temps (s)"]);
            });

    }

    getDistanceTraveled() {
        const speed = this.body.velocity.z;
        const D = config.params.simulation.poolSize.z;
        const z = this.body.center.z + D / 2;
        return speed >= 0. ? z : 2 * D - z;
    }

    startRace() {
        this.hasBrokeOut = false;
        this.hasDove = false;
        this.hasReacted = false;
    }

    jump(velocity = 4.5) {
        this.body.cinematic = false;
        this.body.velocity = new GL.Vector(0, 0, velocity + gaussianRandom(0, 1));
        this.body.center = new GL.Vector(this.startingPoint.x, 1, -config.params.simulation.poolSize.z / 2.);
    }

    swim(start) {
        this.hasReacted = start;
        this.isSwimming = start;
        this.finishTime = 0;
        if (!start) this.body.followTarget = false;
        if (start) {
            this.body.cinematic = false;
            this.useGravity = true;
            if (!this.useTracking) this.body.center = new GL.Vector(this.startingPoint.x, 0, -config.params.simulation.poolSize.z / 2.);
            else this.moveToBeginning();
        }
        else {
            this.body.velocity = new GL.Vector(0, 0, 0);
            this.body.center = new GL.Vector(this.startingPoint.x, 0, 0);
        }
    }

    #getEventPosition(event) {
        let z = parseFloat(event[Z_KEY]);
        let x = this.body.center.x;
        if (config.isSceneSynchronizedSwimming()) {
            z = config.params.simulation.poolSize.z - z * 30 / 25;
            if (event[X_KEY]) x = parseFloat(event[X_KEY]) - config.params.simulation.poolSize.x / 2;
        }
        z -= config.params.simulation.poolSize.z / 2;
        return new GL.Vector(x, 1., z);
    }

    moveToBeginning() {
        if (!this.useTracking) console.warn("tried to use tracking on untracked swimmer");
        const firstEvent = this.data[0];
        this.body.center = this.#getEventPosition(firstEvent);
    }

    hasFinished() {
        return this.finishTime > .1;
    }

    getArmOffset(time, phase) {
        phase += this.cyclePhase;
        const omega = this.body.velocity.z >= 0 ? this.armPulsation : -this.armPulsation;
        return new GL.Vector(0., Math.cos(omega * time + phase), Math.sin(omega * time + phase)).multiply(armAmplitude);
    }

    setCurrentDataIndex() {
        console.log("set current data index");
        this.currendDataIndex = 0;
        if (!this.data) return;
        while (this.data[this.currendDataIndex] && this.data[this.currendDataIndex][TIME_KEY] < config.getRaceTime()) this.currendDataIndex++;
        if (this.currendDataIndex + 1 < this.data.length) {
            if (this.currendDataIndex - 1 >= 0) {
                const dist = parseFloat(this.data[this.currendDataIndex][Z_KEY]);
                let z = dist;
                const D = config.params.simulation.poolSize.z;
                if (dist > D) z = 2 * D - z;
                z -= D / 2;
                const pos = this.body.center;
                let x = pos.x;
                if (config.isSceneSynchronizedSwimming()) {
                    //TODO z
                    x = parseFloat(this.data[this.currendDataIndex][X_KEY]) - config.params.simulation.poolSize.x / 2;
                }
                this.body.move(new GL.Vector(pos.x, pos.y, z));
                const vz = Math.sign(50 - dist) * .1;
                this.body.velocity = new GL.Vector(0, 0, vz);
                console.log("vz : " + vz);
            }
            this.body.setTarget(null);
            this.body.followTarget = true;
            this.finishTime = 0.;
        }
    }

    findNextCycle() {
        let nextCycleIndex = this.currendDataIndex + 1;
        if (!this.data) return null;
        while (this.data[nextCycleIndex] && this.data[nextCycleIndex][EVENT_KEY] != "cycle") nextCycleIndex++;
        if (!this.data[nextCycleIndex]) return null;
        return parseFloat(this.data[nextCycleIndex][TIME_KEY]);
    }

    setDamping(eventData) {
        if (config.params.visualizations.customWaterPerturbation == config.params.visualizations.PARAMETER_CYCLES) {
            const freq = parseFloat(eventData[FREQUENCY_KEY]);
            if (freq < 50) return;
            if (freq > 0) {
                console.log("FREQ : " + freq);
                const freqMax = 80.;
                const freqMin = 50.;
                let intensity = (freq - freqMin) / (freqMax - freqMin);
                intensity = Math.max(Math.min(intensity, 1.), 0.);
                const dampingMin = .015;
                const dampingMax = .25;
                this.waterDamping = dampingMin + (dampingMax - dampingMin) * (1. - intensity);
            }
        }
        else {
            this.waterDamping = config.params.simulation.waterDamping;
        }
    }

    handleTracking(time) {
        // console.log("current data index : " + this.currendDataIndex);
        // if (this.data && this.data[this.currendDataIndex]) console.log("next event time : " + this.data[this.currendDataIndex][TIME_KEY]);
        // if (this.data && this.data[this.currendDataIndex]) console.log("next event : " + JSON.stringify(this.data[this.currendDataIndex]));
        // console.log("current time : " + time);
        // console.log("use tracking : " + this.useTracking);
        // console.log("hasReacted : " + this.hasReacted);
        // console.log("\n\n");
        if (this.hasReacted && this.useTracking && this.currendDataIndex < this.data.length && this.data[this.currendDataIndex][TIME_KEY] < time) {
            // console.log("enter handle tracking");
            // if (this.currendDataIndex == 0) {
            //     this.body.center.z = 0.;
            // }

            this.setDamping(this.data[this.currendDataIndex]);

            let nextDistanceTarget = null;
            let nextXTarget = this.startingPoint.x;
            let nextEventTime = time;
            const nextData = this.data[this.currendDataIndex + 1];
            if (this.currendDataIndex + 1 < this.data.length) {
                nextDistanceTarget = parseFloat(nextData[Z_KEY]);
                if (config.isSceneSynchronizedSwimming()) {
                    nextDistanceTarget = config.params.simulation.poolSize.z - nextDistanceTarget * 30 / 25;
                    if (nextData[X_KEY]) nextXTarget = parseFloat(nextData[X_KEY]) - config.params.simulation.poolSize.x / 2;
                }
                // console.log("next distance target : " + nextDistanceTarget);
                nextEventTime = parseFloat(nextData[TIME_KEY]);
            }
            const D = config.params.simulation.poolSize.z;
            let y = -this.body.radius / 2;
            const currentEvent = this.data[this.currendDataIndex][EVENT_KEY];

            if (currentEvent == "enter" || currentEvent == "turn" && nextData[EVENT_KEY] != "under") {
                nextEventTime = (time + nextEventTime) / 2;
                nextDistanceTarget = (this.body.center.z + D / 2 + nextDistanceTarget) / 2;
                const event = {
                    [TIME_KEY]: nextEventTime,
                    [Z_KEY]: nextDistanceTarget,
                    [EVENT_KEY]: "under"
                };
                this.data.splice(this.currendDataIndex + 1, 0, event);
                y = -1.5;
            }
            if (nextData && nextData[EVENT_KEY] == "under") y = -1.5;

            if (nextDistanceTarget > D) nextDistanceTarget = 2 * D - nextDistanceTarget;
            nextDistanceTarget -= config.params.simulation.poolSize.z / 2;
            const targetPos = new GL.Vector(nextXTarget, y, nextDistanceTarget);
            if (this.currendDataIndex + 1 < this.data.length) {
                this.body.setTarget(targetPos, nextEventTime - time);
            }
            else this.body.setTarget(null);
            if (currentEvent == "figure") {
                console.log("FIGURE");
                config.splashParticles.spawnSplash(targetPos, null, 10000., null, { speed0: 4., maxParticles: 400 });
                config.chronoPhotography({ circle: true });
                // config.splashParticles.spawnSplash(this.body.center, null, 1., null, { fixed: true, color: new GL.Vector(1., 1., 0.), maxParticles: 1, size: 0.5, shrinking: 0 });

            }

            if (currentEvent == "cycle") {
                const currentCycleTime = parseFloat(this.data[this.currendDataIndex][TIME_KEY]);
                const nextCyleTime = this.findNextCycle();
                if (nextCyleTime) {
                    const period = nextCyleTime - currentCycleTime;
                    const frequency = 1. / period;
                    this.armPulsation = 2 * Math.PI * frequency;

                    this.cycleTime = 0;
                    if (this.cyclePhase == 0.) this.cyclePhase = Math.PI;
                    else this.cyclePhase = 0.;
                }
            }

            else if (currentEvent == "finish") {
                this.finishTime = this.data[this.currendDataIndex][TIME_KEY];
                this.body.followTarget = false;
                this.isSwimming = false;

            }

            this.currendDataIndex++;
        }
    }

    moveSpheresAway() {
        this.rightArm.move(AWAY);
        this.leftArm.move(AWAY);
        this.rightFoot.move(AWAY);
        this.leftFoot.move(AWAY);
    }

    moveSpheres(dt) {
        this.cycleTime += dt;
        const offset1 = this.getArmOffset(.5 * this.cycleTime, 0);
        const offset2 = this.getArmOffset(.5 * this.cycleTime, Math.PI);
        const offset3 = this.getArmOffset(.5 * this.cycleTime * 2, 0);
        const offset4 = this.getArmOffset(.5 * this.cycleTime * 2, Math.PI);
        this.rightArm.move(this.body.center.add(offset1).add(new GL.Vector(ARM_DELTA_X, 0, 0)));
        this.leftArm.move(this.body.center.add(offset2).add(new GL.Vector(-ARM_DELTA_X, 0, 0)));
        const dz = this.body.velocity.z >= 0 ? -FOOT_DELTA_Z : FOOT_DELTA_Z;
        this.rightFoot.move(this.body.center.add(new GL.Vector(FOOT_DELTA_X, offset3.y * 0.5, dz)));
        this.leftFoot.move(this.body.center.add(new GL.Vector(-FOOT_DELTA_X, offset4.y * 0.5, dz)));
    }

    update(dt) {
        const raceTime = config.getRaceTime();
        if (!Swimmer.raceHasStarted && this.data) {
            this.useTracking = config.params.swimmers.useTracking;
        }
        if (!this.hasReacted && Swimmer.raceHasStarted) {
            if (this.useTracking || raceTime > this.reactionTime && !config.params.swimmers.useTracking) {
                this.swim(true);
                this.waterDamping = config.params.simulation.waterDamping;
                if (!this.useTracking) this.jump();
                if (this.useTracking) {
                    this.body.cinematic = true;
                    this.body.followTarget = true;
                    this.body.setTarget(null);
                }
            } else {
                this.swim(false);
                this.body.cinematic = true;
                if (config.playingDemo) this.body.move(new GL.Vector(this.body.center.x, 1, -config.params.simulation.poolSize.z / 2));
                else this.body.move(AWAY); //TODO fix this mess
            }
            this.currendDataIndex = 0;
        }

        // this.moveSpheresAway();

        if (this.isSwimming) {
            if (!this.useTracking) this.body.addForce(this.force);
            if (this.body.center.y > -this.body.radius && !config.isSceneSynchronizedSwimming()) {
                this.moveSpheres(dt);
            }
            else this.moveSpheresAway();
        }

        this.handleTracking(raceTime);

        for (let sphere of this.spheres) {
            sphere.update(dt);
            sphere.spawnSplashes(dt);
        }


        if (this.body.center.z > -config.params.simulation.poolSize.z / 2 + 20) return;

        if (config.isSceneSynchronizedSwimming()) return;

        if (Swimmer.raceHasStarted && !this.hasDove && this.body.center.y < 0 && this.body.oldCenter.y >= 0) {
            this.divingDistance = this.body.center.z + config.params.simulation.poolSize.z / 2;
            this.divingTime = raceTime;
            this.hasDove = true;
        }

        const radius = this.body.radius;
        if (Swimmer.raceHasStarted && !this.hasBrokeOut && this.body.center.y > -radius && this.body.oldCenter.y <= -radius) {
            this.breakoutDistance = this.body.center.z + config.params.simulation.poolSize.z / 2;
            this.breakoutTime = raceTime;
            this.hasBrokeOut = true;
        }
    }
}

// const swimmersHelperFunctions = `
//     uniform float wr;
//     #define sqrt_2_PI 2.50662827
//     #define PI 3.1415926536
//     uniform sampler2D swimmersAttributesTexture;
//     const int SWIMMERS_NUM_ATTRIBUTES = 4;
//     const vec2 TEXTURE_SIZE = vec2(`+ NUM_VEC_ATTRIBUTES + `, ` + MAX_NUM_SWIMMER + `);
//     uniform float swimmersNumber;
//     uniform float time;

//     vec2 getSwimmerPosition(int i) {
//         float i_float = float(i);
//         vec2 pixel = vec2(0., i_float);
//         vec4 attributes = texture(swimmersAttributesTexture, (pixel + .5) / TEXTURE_SIZE);
//         return attributes.rg;
//     }

//     float getSwimmerSpeed(int i) {
//         float i_float = float(i);
//         vec2 pixel = vec2(1., i_float);
//         vec4 attributes = texture(swimmersAttributesTexture, (pixel + .5) / TEXTURE_SIZE);
//         return attributes.g;
//     }

//     vec2 getSwimmerDivingInfo(int i) {
//         float i_float = float(i);
//         vec2 pixel = vec2(0., i_float);
//         vec4 attributes = texture(swimmersAttributesTexture, (pixel + .5) / TEXTURE_SIZE);
//         return attributes.ba;
//     }

//     vec2 getSwimmerBreakoutInfo(int i) {
//         float i_float = float(i);
//         vec2 pixel = vec2(2., i_float);
//         vec4 attributes = texture(swimmersAttributesTexture, (pixel + .5) / TEXTURE_SIZE);
//         return attributes.rg;
//     }

//     float getSwimmerFinishTime(int i) {
//         float i_float = float(i);
//         vec2 pixel = vec2(2., i_float);
//         vec4 attributes = texture(swimmersAttributesTexture, (pixel + .5) / TEXTURE_SIZE);
//         return attributes.b;
//     }

//     float getSwimmerReactionTime(int i ) {
//         float i_float = float(i);
//         vec2 pixel = vec2(1., i_float);
//         vec4 attributes = texture(swimmersAttributesTexture, (pixel + .5) / TEXTURE_SIZE);
//         return attributes.r;
//     }

//     float getSwimmerNationality(int i ) {
//         float i_float = float(i);
//         vec2 pixel = vec2(1., i_float);
//         vec4 attributes = texture(swimmersAttributesTexture, (pixel + .5) / TEXTURE_SIZE);
//         return attributes.b;
//     }

//     float getSwimmerAltitude(int i ) {
//         float i_float = float(i);
//         vec2 pixel = vec2(1., i_float);
//         vec4 attributes = texture(swimmersAttributesTexture, (pixel + .5) / TEXTURE_SIZE);
//         return attributes.a;
//     }


//     float gaussian(float x, float mean, float std) {
//         return exp(-(x - mean) * (x - mean) / (2. * std * std)) / (std * sqrt_2_PI);
//     }

//     float getRecordWave(vec2 coord) {
//         float z = poolSize.z * coord.y;
//         if (true || abs(z - wr) < 1.) {
//             return .2 * gaussian(z, wr, .4);
//         }
//         return 0.;
//     }

//     void ripples(in vec2 coord, in vec2 eventPosition, in float eventTime, float intensity, out vec3 res) {
//         float timeSinceDiving = time - eventTime;
//         const float rippleSpeed = .5;
//         const float maxTime = 10.;
//         const float lambda = 2. * PI / 0.6;
//         float frequency = 2.;
//         float omega = 2. * PI * frequency;
//         vec2 center = eventPosition;
//         vec2 pos = (coord - .5) * poolSize.xz;
//         vec2 diff = pos - center;
//         float d = sqrt(dot(diff, diff));
//         d*=2.;

//         float r_max_max = 0.5;

//         float r_max = max(0.3, intensity * r_max_max);
//         float attenuationDist = r_max;

//         float duration = 1.5;
//         float c =  cos(lambda * d - omega * timeSinceDiving);
//         float attenuation = exp(-d / attenuationDist - timeSinceDiving / duration);
//         bool condition = timeSinceDiving > d / frequency;
//         if (condition) res.x += .05 * attenuation * c;
//         if (c > 0.8 && condition) {
//             res.y = max(res.y, min(1., 15.*attenuation));
//             res.z = 1.;
//         }
//     }

//     void divingRipples(in vec2 coord, in vec2 swimmerPosition, in vec2 divingInfo, out vec3 res) {
//         float swimmer_x = swimmerPosition.x;
//         float divingDistance = divingInfo.x;
//         float divingTime = divingInfo.y;

//         vec2 divingLocation = vec2(swimmer_x, divingDistance - poolSize.z / 2.);

//         float divingDistRange = 2.;
//         float divingDistMin = 2.;
//         float intensity = (divingDistance - divingDistMin) / divingDistRange;

//         ripples(coord, divingLocation, divingTime, intensity, res);
//     }

//     void breakoutRipples(in vec2 coord, in vec2 swimmerPosition, in vec2 breakoutInfo, out vec3 res) {
//         float swimmer_x = swimmerPosition.x;
//         float breakoutDistance = breakoutInfo.x;
//         float breakoutTime = breakoutInfo.y;

//         vec2 breakoutLocation = vec2(swimmer_x, breakoutDistance - poolSize.z / 2.);

//         float breakoutDistRange = 8.;
//         float breakoutDistMin = 5.;
//         float intensity = (breakoutDistance - breakoutDistMin) / breakoutDistRange;

//         ripples(coord, breakoutLocation, breakoutTime, intensity, res);
//     }



//     vec3 getDivingWaves(vec2 coord) {
//         vec3 res = vec3(0., 0., -1.);

//         for (int i = 0; i < 10; i++) {
//             float i_float = float(i);
//             if (i_float > swimmersNumber - 0.1) break;
//             vec2 swimmerPos = getSwimmerPosition(i);
//             vec2 divingInfo = getSwimmerDivingInfo(i);
//             vec2 breakoutInfo = getSwimmerBreakoutInfo(i);

//             divingRipples(coord, swimmerPos, divingInfo, res);
//             breakoutRipples(coord, swimmerPos, breakoutInfo, res);

//         }
//         return res;
//     }
// `
// export { swimmersHelperFunctions };
export { Swimmer };