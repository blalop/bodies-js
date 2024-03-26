class Canvas {
    #ctx;
    #size;
    #fillSize = 2;

    constructor(canvas) {
        this.#ctx = canvas.getContext("2d");
        this.#size = canvas.width;
    }

    get size() {
        return this.#size;
    }

    paint(x, y) {
        this.#ctx.fillStyle = "white";
        this.#ctx.fillRect(x, y, this.#fillSize, this.#fillSize);
    }

    empty() {
        this.#ctx.fillStyle = "black";
        this.#ctx.fillRect(0, 0, this.#size, this.#size);
    }
}

export default Canvas;
