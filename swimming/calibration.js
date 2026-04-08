class Calibration {
    constructor({ tx = 0, ty = 0, zoom = 4, ax = -25, ay = -200, az = 0, fov = 45 }) {
        this.tx = tx;
        this.ty = ty;
        this.zoom = zoom;
        this.ax = ax;
        this.ay = ay;
        this.az = az;
        this.fov = fov;
    }

    /**
     * 
     * @param {Calibration} other 
     * @param {*} t 
     * @param {*} a 
     * @returns 
     */
    interpolate(other, t, a = 1) {
        const interp = (x, y, t, alpha = 1) => Math.pow(t, alpha) * y + (1. - Math.pow(t, alpha)) * x;
        return new Calibration({
            tx: interp(this.tx, other.tx, t, a),
            ty: interp(this.ty, other.ty, t, a),
            zoom: interp(this.zoom, other.zoom, t, a),
            ax: interp(this.ax, other.ax, t, a),
            ay: interp(this.ay, other.ay, t, a),
            az: interp(this.az, other.az, t, a),
            fov: interp(this.fov, other.fov, t, a)
        });
    }

}

export { Calibration };