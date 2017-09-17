import _ from 'lodash';
import randomcolor from 'randomcolor';

let limits;
let sideLength;

function generateRandomPosition () {
    return {
        x: Math.random () * (limits.width - sideLength),
        y: Math.random () * (limits.height - sideLength)
    };
};

export function init (options) {
    limits = options.limits;
    sideLength = options.sideLength;
}

export function build (index) {
    const element = document.createElement ('div');
    element.classList.add ('square');
    element.style.width = `${sideLength}px`;
    element.style.height = element.style.width;
    element.style.lineHeight = element.style.width;
    element.innerHTML = `Square ${index}`;
    return element;
}

export function setRandomPosition (element) {
    const position = generateRandomPosition ();
    element.style.left = `${position.x}px`;
    element.style.top = `${position.y}px`;
}

export function applyRandomColourToGroup (elements) {
    const backgroundColour = randomcolor ();
    for (const element of elements) {
        element.style.backgroundColor = backgroundColour;
    } 
}