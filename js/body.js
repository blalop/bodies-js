const G = 6.67e-11;
const EPS = 3e4; // softening factor
const ORIGIN = [0, 0];

class Body {
    #mass;
    #position;
    #velocity;
    #force;

    constructor(mass, position, velocity) {
        this.#mass = mass;
        this.#position = position;
        this.#velocity = velocity;
        this.#force = ORIGIN;
    }

    get x() {
        return this.#position[0];
    }

    get y() {
        return this.#position[1];
    }

    get m() {
        return this.#mass;
    }

    get vx() {
        return this.#velocity[0];
    }

    get vy() {
        return this.#velocity[1];
    }

    get fx() {
        return this.#force[0];
    }

    get fy() {
        return this.#force[1];
    }

    resetForce() {
        this.#force = ORIGIN;
    }

    calculateForce(body) {
        const [dx, dy] = [body.x - this.x, body.y - this.y];
        const d = Math.sqrt(dx * dx + dy * dy);
        const f = (G * this.m * body.m) / (d * d + EPS * EPS);
        const [fx, fy] = [(f * dx) / d, (f * dy) / d];
        this.#force = [this.fx + fx, this.fy + fy];
    }

    calculateVelocity(dt) {
        const [ax, ay] = [this.fx / this.m, this.fy / this.m];
        this.#velocity = [this.vx + ax * dt, this.vy + ay * dt];
    }

    calculatePosition(dt) {
        this.#position = [this.x + this.vx * dt, this.y + this.vy * dt];
    }
}

export default Body;
