
class Graphics {
    #ctx = document.getElementById('canvas').getContext('2d');

    represent(map) {
        this.#empty();
        map.bodies().forEach(body => {
            const [x, y] = map.scale(body);
            this.#paint(x, y);
        });
    }

    #paint(x, y) {
        this.#ctx.fillStyle = 'white';
        this.#ctx.fillRect(x, y, 1, 1);
    
    }

    #empty() {
        this.#ctx.fillStyle = 'black';
        this.#ctx.fillRect(0, 0, 800, 800);
    }

}

export default Graphics;
