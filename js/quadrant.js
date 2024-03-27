class Quadrant {
    #center;
    #diameter;

    constructor(center, diameter) {
        this.#center = center;
        this.#diameter = diameter;
    }

    get x() {
        return this.#center[0];
    }

    get y() {
        return this.#center[1];
    }

    get d() {
        return this.#diameter;
    }

    contains(body) {
        const radius = this.d / 2;
        return body.x > this.x - radius &&
            body.x <= this.x + radius &&
            body.y > this.y - radius &&
            body.y <= this.y + radius;
    }

    nw() {
        const x = this.x - this.d / 4;
        const y = this.y - this.d / 4;
        return new Quadrant([x, y], this.d / 2);
    }

    ne() {
        const x = this.x + this.d / 4;
        const y = this.y - this.d / 4;
        return new Quadrant([x, y], this.d / 2);
    }

    sw() {
        const x = this.x - this.d / 4;
        const y = this.y + this.d / 4;
        return new Quadrant([x, y], this.d / 2);
    }

    se() {
        const x = this.x + this.d / 4;
        const y = this.y + this.d / 4;
        return new Quadrant([x, y], this.d / 2);
    }
}

export default Quadrant;
