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
}

export default Body;
