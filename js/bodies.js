import Canvas from "./canvas.js";
import Body from "./body.js";
import Map from "./map.js";

document.getElementById("start").addEventListener("click", start);

async function start() {
    const filename = document.getElementById("maps").value;
    const data = await readFile(filename);
    const map = new Map(data.radius, data.bodies);
    const canvas = new Canvas(document.getElementById("canvas"));

    while (true) {
        step(canvas, map);
        await sleep(100);
    }
}

function step(canvas, map) {
    canvas.empty();
    console.log(map);
    map.compute(1);
    map.bodies.forEach(body => {
        const [x, y] = scale(canvas.size, map.radius, body);
        canvas.paint(x, y);
    });
}

function scale(scale, radius, body) {
    const x = (scale * (body.x + radius)) / (radius * 2);
    const y = (scale * (body.y + radius)) / (radius * 2);
    return [x, y];
}

async function sleep(ms) {
    await new Promise(r => setTimeout(r, ms));
}

async function readFile(filename) {
    const data = await retrieveFile(filename);
    return parseFile(data);
}

async function retrieveFile(filename) {
    const url = `${window.location.href}/inputs/${filename}.txt`;
    const response = await fetch(url);
    return await response.text();
}

function parseFile(data) {
    const lines = data.split("\n");
    const radius = Number(lines[1]);
    const bodies = lines
        .slice(2)
        .filter(line => line)
        .map(line => {
            const [mass, x, y, vx, vy] = line.split(" ").map(Number);
            return new Body(mass, [x, y], [vx, vy]);
        });

    return { radius, bodies };
}
