import Graphics from "./graphics.js";
import Map from "./map.js";

document.getElementById("start").addEventListener("click", start);

async function start() {
    const filename = document.getElementById("maps").value;
    const file = await retrieveFile(filename);
    const map = new Map(file);
    const graphics = new Graphics();

    while (true) {
        step();
        await sleep(100);
    }

    function step() {
        graphics.empty();
        console.log(map);
        map.compute(1);
        map.bodies().forEach((body) => {
            const [x, y] = map.scale(body);
            graphics.paint(x, y);
        });
    }

    async function retrieveFile(filename) {
        const url = `${window.location.href}/inputs/${filename}.txt`;
        const response = await fetch(url);
        return await response.text();
    }

    async function sleep(ms) {
        await new Promise((r) => setTimeout(r, ms));
    }
}
