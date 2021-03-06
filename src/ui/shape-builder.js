import randomcolor from 'randomcolor';

let limits;
let sideLength;

function generateRandomPosition () {
    return {
        x: Math.random () * (limits.width - sideLength),
        y: Math.random () * (limits.height - sideLength)
    };
};

function getColourSeedFromGroupIndex (groupIndex) {
    return groupIndex * 1000000000;
}

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
    element.innerHTML = `Square ${index + 1}`;
    return element;
}

export function setRandomPosition (element) {
    const position = generateRandomPosition ();
    element.style.left = `${position.x}px`;
    element.style.top = `${position.y}px`;
}

export function setGroupColour (groupIndex, group) {
    const backgroundColour = randomcolor ({
        seed: getColourSeedFromGroupIndex(groupIndex)
    });
    for (const element of group) {
        element.style.backgroundColor = backgroundColour;
    }
}