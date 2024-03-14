import Body from "./body.js";

class Map {
    #bodies;

    constructor(data) {
        const [n, radius, ...bodyData] = data.split('\n');
        this.#bodies = bodyData
        .filter(line => line)
        .map(line => {
            const [mass, x, y, vx, vy] = line.split(' ');
            return new Body(mass, [x, y], [vx, vy]);
        });
    }

}

export default Map;
