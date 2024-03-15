import Body from "./body.js";

class Map {
  #bodies;
  #center;
  #dimension;
  #radius;

  constructor(data) {
    const [n, radius, ...bodyData] = data.split("\n");
    this.#dimension = Number(radius * 2);
    this.#radius = Number(radius);
    this.#bodies = bodyData
      .filter((line) => line)
      .map((line) => {
        const [mass, x, y, vx, vy] = line.split(" ").map(Number);
        return new Body(mass, [x, y], [vx, vy]);
      });
  }

  bodies() {
    return this.#bodies;
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

    this.#bodies.forEach(body => {
      body.calculateVelocity(deltatime);
      body.calculatePosition(deltatime);
    });
  }

  scale(body) {
    const x = 800 * (body.x() + this.#radius) / this.#dimension;
    const y = 800 * (body.y() + this.#radius) / this.#dimension;
    return [x, y];
  }
}

export default Map;
