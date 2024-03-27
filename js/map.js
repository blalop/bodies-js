import Body from './body.js';
import BHTree from './bhtree.js';
import Quadrant from './quadrant.js';

const THETA = 0.5;




class Map {
    #bodies;
    #radius;
    #quadrant;

    constructor(radius, bodies) {
        this.#radius = radius;
        this.#bodies = bodies;
        this.#quadrant = new Quadrant([0, 0], radius * 2);
    }

    get bodies() {
        return this.#bodies;
    }

    get radius() {
        return this.#radius;
    }

    compute(deltatime) {
        const bhthree = new BHTree(this.#quadrant);

        this.#bodies
        .filter(body => this.#quadrant.contains(body))
        .forEach(body => bhthree.insert(body));

        for (let body of this.#bodies) {
            body.resetForce();
            bhthree.updateForce(body);
            body.calculateVelocity(deltatime);
            body.calculatePosition(deltatime);
        }
    }

    computeOld(deltatime) {
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
