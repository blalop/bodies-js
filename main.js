import Graphics  from './graphics.js';
import Map from './map.js';

const graphics = new Graphics();
graphics.empty();
graphics.draw(10, 10);

const map = new Map(await retrieveFile());
console.log(map);

async function retrieveFile() {
    const url = `${window.location.href}/inputs/planets.txt`;
    const response = await fetch(url);
    const data = await response.text();
    return data;
}
