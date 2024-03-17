class Graphics {
    #ctx = document.getElementById("canvas").getContext("2d");

    paint(x, y) {
        this.#ctx.fillStyle = "white";
        this.#ctx.fillRect(x, y, 2, 2);
    }

    empty() {
        this.#ctx.fillStyle = "black";
        this.#ctx.fillRect(0, 0, 800, 800);
    }
}

export default Graphics;
