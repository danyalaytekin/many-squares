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
    for (let i = 0; i < groupCount; ++i) {
        const group = shapeGroups[i];
    
        // Find extremes.
        let extremes = {
            left: Number.MAX_VALUE,
            right: 0,
            top: Number.MAX_VALUE,
            bottom: 0
        };
        for (let j = 0; j < group.length; ++j) {
            const shape = group[j];
            const r = shape.getBoundingClientRect ();
            if (r.left < extremes.left) {
                extremes.left = r.left;
            }
            if (r.right > extremes.right) {
                extremes.right = r.right;
            }
            if (r.top < extremes.top) {
                extremes.top = r.top;
            }
            if (r.bottom > extremes.bottom) {
                extremes.bottom = r.bottom;
            }
        }
    
        // Create a two-dimensional canvas and initialise all elements to zero.
        const canvasLimits = {
            width: Math.floor(extremes.right - extremes.left),
            height: Math.floor(extremes.bottom - extremes.top)
        };
        let canvas = [];
        for (let i = 0; i < canvasLimits.width; ++i) {
            const column = new Array(canvasLimits.height).fill (0);
            canvas.push (column);
        }

        // Paint each shape onto the canvas.
        for (let k = 0; k < group.length; ++k) {
            const shapeElement = group[k];
            const rect = shapeElement.getBoundingClientRect ();
            const r = {
                left: Math.floor(rect.left - extremes.left),
                right: Math.floor(rect.right - extremes.left),
                top: Math.floor(rect.top - extremes.top),
                bottom: Math.floor(rect.bottom - extremes.top)
            };
            for (let m = r.left; m < r.right; ++m) {
                for (let n = r.top; n < r.bottom; ++n) {
                    canvas[m][n] = 1;
                }
            }
        }

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
