
class Graphics {
    #ctx = document.getElementById('canvas').getContext('2d');

    draw(x, y) {
        this.#ctx.fillStyle = 'white';
        this.#ctx.fillRect(x, y, 1, 1);
    
    }

    empty() {
        this.#ctx.fillStyle = 'black';
        this.#ctx.fillRect(0, 0, 800, 800);
    }

}

export default Graphics;
