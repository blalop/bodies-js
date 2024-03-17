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

    x() {
        return this.#position[0];
    }

    y() {
        return this.#position[1];
    }

    resetForce() {
        this.#force = ORIGIN;
    }

    calculateForce(body) {
        const [dx, dy] = [body.x() - this.x(), body.y() - this.y()];
        const distance = Math.sqrt(dx * dx + dy * dy);
        const force =
            (G * this.#mass * body.#mass) / (distance * distance + EPS * EPS);
        const [fx, fy] = [(force * dx) / distance, (force * dy) / distance];
        this.#force = [this.#force[0] + fx, this.#force[1] + fy];
    }

    calculateVelocity(deltatime) {
        const [vx, vy] = this.#velocity;
        const [fx, fy] = this.#force;
        const [ax, ay] = [fx / this.#mass, fy / this.#mass];
        this.#velocity = [vx + ax * deltatime, vy + ay * deltatime];
    }

    calculatePosition(deltatime) {
        const [x, y] = this.#position;
        const [vx, vy] = this.#velocity;
        this.#position = [x + vx * deltatime, y + vy * deltatime];
    }
}

export default Body;
