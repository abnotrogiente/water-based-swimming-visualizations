import GL from './lightgl.js';
import { config } from './params.js';

const GRAVITY = new GL.Vector(0, -4, 0);

class Sphere {
    /**
     * 
     * @param {GL.Vector} center 
     * @param {float} radius 
     */
    constructor(center, radius, color = new GL.Vector(1, 1, 1), buoyancyFactor = null) {
        this.initCenter = new GL.Vector(center.x, center.y, center.z);
        this.center = new GL.Vector(center.x, center.y, center.z);
        this.oldCenter = new GL.Vector(center.x, center.y, center.z);
        this.radius = radius;
        this.cinematic = false;
        this.velocity = new GL.Vector(0, 0, 0);
        this.acceleration = new GL.Vector(0, 0, 0);
        this.mass = (4 / 3) * Math.PI * Math.pow(radius, 3) * 1000;
        this.invMass = 1 / this.mass;
        this.radiusSquared = radius * radius;
        this.mesh = GL.Mesh.sphere({ detail: 10 });
        this.followTarget = false;
        this.showStreak = false;
        this.buoyancyFactor = buoyancyFactor;
        this.color = color;
    }

    spawnSplashes(dt) {
        if (!config.params.simulation.splashes.enabled && !config.params.visualizations.showStreaks) return;
        const speed = this.center.subtract(this.oldCenter).multiply(1. / dt);
        const phi = speed.z > 0 ? -Math.PI / 2 : Math.PI / 2;
        const v_sq = speed.dot(speed);
        let splashPos = this.center.subtract(this.velocity.unit());
        if (config.isSceneSynchronizedSwimming()) splashPos = this.center.clone();
        splashPos.y = .15;
        if (!config.isSceneSynchronizedSwimming() && config.params.simulation.splashes.enabled && this.center.x < 100 && Math.abs(this.center.y) <= this.radius) config.splashParticles.spawnSplash(splashPos, phi, Math.sqrt(v_sq), config.params.simulation.splashes.strengthThreshold, {});
        let streakColor = (this.velocity.length() - 1.6) / 0.9;
        const particleOptions = { fixed: true };
        if (config.isSceneSynchronizedSwimming()) {
            particleOptions.shrinking = 0.02;
        }
        else {
            const col = new GL.Vector(streakColor, 0., 1. - streakColor);
            col.multiply(1. / col.max());
            particleOptions.color = col;
        }
        particleOptions.shrinking = 0.2;
        if (config.params.visualizations.showStreaks && this.showStreak && this.velocity.length() > 0.01) config.splashParticles.spawnSplash(this.center, 0., streakColor, 0, particleOptions);
    }

    /**
     * 
     * @param {float} dt 
     * @param {boolean} isSwimming 
    */
    update(dt) {
        if (!this.moved) this.oldCenter = new GL.Vector(this.center.x, this.center.y, this.center.z);
        this.moved = false;
        if (!this.cinematic) {
            const percentUnderWater = Math.max(0, Math.min(1, (this.radius - this.center.y) / (2 * this.radius)));
            const buoyancyFactor = this.buoyancyFactor ? this.buoyancyFactor : config.params.simulation.buoyancyFactor;
            const floatingForce = GRAVITY.multiply(-buoyancyFactor * this.mass * percentUnderWater); // 1.1 before // then 1.35
            const drag = this.velocity.unit().multiply(-1000 * this.radiusSquared * percentUnderWater * this.velocity.dot(this.velocity)); // 1000 before
            this.addForce(drag);
            this.addForce(floatingForce);
            this.addForce(GRAVITY.multiply(this.mass));
            this.velocity = this.velocity.add(this.acceleration.multiply(dt));
            this.acceleration = new GL.Vector(0, 0, 0);
            this.center = this.center.add(this.velocity.multiply(dt));

            // Bounce off the bottom
            if (this.center.y < this.radius - config.params.simulation.poolSize.y) {
                this.center.y = this.radius - 1;
                this.velocity.y = Math.abs(this.velocity.y) * 0.7;
            }
        }
        else {
            if (!this.followTarget) this.velocity = new GL.Vector(0, 0, 0);
            if (!this.targetPos || !this.followTarget) return;
            let alpha = dt / this.targetTime;
            alpha = Math.min(Math.max(alpha, 0), 1);
            this.center = this.center.multiply(1 - alpha).add(this.targetPos.multiply(alpha));
            this.velocity = this.center.subtract(this.oldCenter).multiply(1 / dt);
            this.targetTime -= dt;
            if (this.targetTime < 0) this.targetPos = null;
        }

    }

    setTarget(position, time) {
        this.targetPos = position;
        this.targetTime = time;
    }

    /**
     * 
     * @param {GL.Vector} force 
     */
    addForce(force) {
        if (!this.cinematic) {
            this.acceleration = this.acceleration.add(force.multiply(this.invMass));
        }
        else console.warn("Trying to add force to a cinematic sphere.");
    }

    /**
     * 
     * @param {GL.Vector} newCenter 
     */
    move(newCenter) {
        this.moved = true;
        this.oldCenter = new GL.Vector(this.center.x, this.center.y, this.center.z);
        this.center = new GL.Vector(newCenter.x, newCenter.y, newCenter.z);
        if (!this.cinematic) console.warn("Moving a non cinematic sphere.");
    }
}

export { Sphere };