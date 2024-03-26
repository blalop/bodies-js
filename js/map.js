class Map {
    #bodies;
    #radius;

    constructor(radius, bodies) {
        this.#radius = radius;
        this.#bodies = bodies;
    }

    get bodies() {
        return this.#bodies;
    }

    get radius() {
        return this.#radius;
    }

    compute(deltatime) {
        for (let i = 0; i < this.#bodies.length; i++) {
            this.#bodies[i].resetForce();
            for (let j = 0; j < this.#bodies.length; j++) {
                if (i !== j) {
                    this.#bodies[i].calculateForce(this.#bodies[j]);
                }
            }
        }

        this.#bodies.forEach((body) => {
            body.calculateVelocity(deltatime);
            body.calculatePosition(deltatime);
        });
    }
}

export default Map;
