import Body from "./body.js";

class BHTree {
    #body;
    #quadrant;
    #nw;
    #ne;
    #sw;
    #se;

    constructor(quadrant, nw, ne, sw, se) {
        this.#quadrant = quadrant;
        this.#nw = nw;
        this.#ne = ne;
        this.#sw = sw;
        this.#se = se;
        this.#body = Body.sum([nw, ne, sw, se]);
    }

    insert(body) {
        if (!this.#body) {
            this.#body = body;
        } else if (this.#isInternal()) {
            this.#body.add(body);
            this.#placeBody(body);
        } else {
            this.#nw = new BHTree(this.#quadrant.nw());
            this.#ne = new BHTree(this.#quadrant.ne());
            this.#sw = new BHTree(this.#quadrant.sw());
            this.#se = new BHTree(this.#quadrant.se());
            this.#placeBody(this.#body);
            this.#placeBody(body);
            this.#body.add(body);
        }
    }

    updateForce(body) {
        if (!this.#body || this.#body.equals(body)) {
            return;
        }

        if (!this.#isInternal()) {
            const s = this.#quadrant.d;
            const d = this.#body.distanceTo(body);
            if (s / d < THETA) {
                body.computeForce(this.#body);
            } else {
                this.#nw.updateForce(body);
                this.#ne.updateForce(body);
                this.#sw.updateForce(body);
                this.#se.updateForce(body);
            }
        } else {
            body.calculateForce(this.#body);
        }
    }

    #isInternal() {
        return this.#nw || this.#ne || this.#sw || this.#se;
    }

    #placeBody(body) {
        if (this.#nw.#quadrant.contains(body)) {
            this.#nw.insert(body);
        } else if (this.#ne.#quadrant.contains(body)) {
            this.#ne.insert(body);
        } else if (this.#sw.#quadrant.contains(body)) {
            this.#sw.insert(body);
        } else if (this.#se.#quadrant.contains(body)) {
            this.#se.insert(body);
        }
    }
}

export default BHTree;
