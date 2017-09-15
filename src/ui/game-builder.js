import * as shapeBuilder from './shape-builder';

const shapeCount = 7;
const limits = {
    width: 920,
    height: 400
};

let shapes;

function generateRandomPosition () {
    // TODO: Detect the limits and remove their hard-coding here.
    return {
        x: Math.random () * limits.width,
        y: Math.random () * limits.height
    };
};

function build (index) {
    shapes = [];
    
    document.getElementById ('game').innerHTML = '';
    
    for (let i = 0; i < shapeCount; ++i) {
        const shapeElement = shapeBuilder.build (i);
    
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
