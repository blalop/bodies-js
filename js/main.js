import Graphics from "./graphics.js";
import Map from "./map.js";

const file = await retrieveFile("10k");
const map = new Map(file);
const graphics = new Graphics();

while (true) {
  step();
  await new Promise(r => setTimeout(r, 500));
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
