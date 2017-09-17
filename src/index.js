import * as geometry from './model/geometry';
import * as tableRenderer from './ui/table-renderer';
import * as shapeBuilder from './ui/shape-builder';
import * as listeners from './ui/listeners';

const options = {
    shapeCount: 7,
    sideLength: 150
};

const limits = {
    width: 920,
    height: 400
};

let shapeElements;

function build () {
    shapeElements = [];

    const gameElement = document.getElementById ('game');
    gameElement.innerHTML = '';
    
    for (let i = 0; i < options.shapeCount; ++i) {
        const shapeElement = shapeBuilder.build (i);
        shapeElement.id = `shape${i}`;
        listeners.makeShapeDraggable (shapeElement);

        gameElement.appendChild (shapeElement);
        shapeBuilder.setRandomPosition (shapeElement);
        
        shapeElements.push (shapeElement);
    }

    listeners.initialiseGameListeners (gameElement);
    listeners.emitter.on(listeners.eventNameForShapeDrag, onViewChanged);
}

function onViewChanged () {
    const areas = calculate ();
    tableRenderer.render (areas);
}

function calculate() {
    const shapeGroups = geometry.findShapeGroups (shapeElements);
    
    // For each group of shapes, find its area.
    let areas = [];
    const groupCount = shapeGroups.length;
    for (const group of shapeGroups) {
        const extremes = geometry.findExtremitiesOfGroup (group);
        const canvas = geometry.createPaintableCanvasForGroup (extremes);
        geometry.paintGroupOntoCanvas (group, canvas, extremes);

        const area = geometry.countPaintedPixels (canvas);
        areas.push ({
            group: group,
            area: area
        });
    }

    areas.sort ((a, b) => b.area - a.area);
    return areas;
}

shapeBuilder.init ({
    sideLength: options.sideLength,
    limits
});

build ();
onViewChanged ();
