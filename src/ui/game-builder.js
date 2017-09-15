import * as shapeBuilder from './shape-builder';

const limits = {
    width: 920,
    height: 400
};

function onDrop (e) {
    event.preventDefault ();
    event.stopPropagation ();
    return false;
}

let shapes;

document.getElementById ('game').addEventListener('drop', onDrop);
document.getElementById ('game').addEventListener('dragover', function (e) {
    e.preventDefault ();
    return false;
});
document.getElementById ('game').addEventListener('dragenter', function (e) {
    e.preventDefault ();
    return false;
});

function generateRandomPosition () {
    // TODO: Detect the limits and remove their hard-coding here.
    return {
        x: Math.random () * limits.width,
        y: Math.random () * limits.height
    };
};

function build (options) {
    shapes = [];
    
    document.getElementById ('game').innerHTML = '';
    
    for (let i = 0; i < options.squareCount; ++i) {
        const shapeElement = shapeBuilder.build (i, options.sideLength);
    
        const position = generateRandomPosition ();
        shapeElement.style.left = `${position.x}px`;
        shapeElement.style.top = `${position.y}px`;
    
        shapeElement.id = `shape${i}`;
        
        document.getElementById ('game').appendChild (shapeElement);
    
        // TODO: Consider extracting this concern.
        shapes.push ([shapeElement]);
    }
}

export { 
    build 
};
