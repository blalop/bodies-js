import Graphics  from './graphics.js';
import Map from './map.js';

const map = new Map(await retrieveFile());
console.log(map);

const graphics = new Graphics();
graphics.represent(map);

async function retrieveFile() {
    const url = `${window.location.href}/inputs/10k.txt`;
    const response = await fetch(url);
    const data = await response.text();
    return data;
}
