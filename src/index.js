import _ from 'lodash';
import * as tableRenderer from './ui/table-renderer';
import * as shapeBuilder from './ui/shape-builder';

const options = {
    shapeCount: 7,
    sideLength: 150
};

const limits = {
    width: 920,
    height: 400
};

const currentDragOffsets = {
    left: 0,
    top: 0
};

function onDragStart (e) {
    const shape = e.target;
    const bounds = shape.getBoundingClientRect ();
    currentDragOffsets.left = e.clientX - bounds.left;
    currentDragOffsets.top = e.clientY - bounds.top;
    e.dataTransfer.effectAllowed = 'move';
}

function onDrag (e) {
    const shape = e.target;
    const bounds = shape.getBoundingClientRect ();
    e.target.style.left = `${e.pageX - currentDragOffsets.left}px`;
    e.target.style.top = `${e.pageY - currentDragOffsets.top}px`;
    const areas = calculate ();
    tableRenderer.render (areas);
}

function onDrop (e) {
    event.preventDefault ();
    event.stopPropagation ();
    return false;
}

function overlaps (element1, element2) {
    const r1 = element1.getBoundingClientRect ();
    const r2 = element2.getBoundingClientRect ();
    const separated = r1.right < r2.left || r1.left > r2.right || r1.bottom < r2.top || r1.top > r2.bottom;
    return ! separated;
}

let shapes;

function onDragOverGame (e) {
    e.preventDefault ();
    return false;
}

function initialiseGameListeners (gameElement) {
    gameElement.addEventListener('drop', onDrop);
    gameElement.addEventListener('dragover', onDragOverGame);
    gameElement.addEventListener('dragenter', onDragOverGame);    
}

function build () {
    shapes = [];

    const gameElement = document.getElementById ('game');
    gameElement.innerHTML = '';
    
    for (let i = 0; i < options.shapeCount; ++i) {
        const shapeElement = shapeBuilder.build (i);
        shapeElement.id = `shape${i}`;

        shapeElement.draggable = true;
        shapeElement.addEventListener('dragstart', onDragStart);
        shapeElement.addEventListener('drag', _.throttle (onDrag, 10));    
        
        gameElement.appendChild (shapeElement);
        shapeBuilder.setRandomPosition (shapeElement);
        
        shapes.push ([shapeElement]);
    }

    initialiseGameListeners (gameElement); 
}

function calculate() {
    let areas = [];

    // Find groups of shapes.
    let groupsOfShapes = [];
    for (let i = 0; i < options.shapeCount; ++i) {
        const element1 = document.getElementById (`shape${i}`);

        let group = groupsOfShapes.find (function (element) {
            return element.indexOf (element1) > -1;
        });
        if (group === undefined) {
            group = [element1];
            groupsOfShapes.push (group);
        }

        for (let j = i + 1; j < options.shapeCount; ++j) {
            const element2 = document.getElementById (`shape${j}`);

            if (overlaps (element1, element2)) {
                group.push(element2);
            }
        }
    }
    
    // For each group of shapes, find its area.
    let groupCount = groupsOfShapes.length;
    for (let i = 0; i < groupCount; ++i) {
        let group = groupsOfShapes[i];
    
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
    
        // Create a two-dimensional canvas, and initialise all elements to zero.
        let canvasLimits = {
            width: extremes.right - extremes.left,
            height: extremes.bottom - extremes.top
        };
        let canvas = new Array(Math.floor(canvasLimits.width)).fill(
            new Array(Math.floor(canvasLimits.height)).fill (0)
        );
    
        // Paint each shape onto the canvas.
        for (let k = 0; k < group.length; ++k) {
            let shapeElement = group[k];
            let rect = shapeElement.getBoundingClientRect ();
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
    
        // Count the number of ones on the canvas.
        let area = canvas.reduce (function (a1, c1) {
            return a1 + c1.reduce (function (a2, c2) {
                return a2 + c2;
            }, 0);
        }, 0);
        areas.push ({
            group: group,
            area: area
        });
    }

    areas.sort (function (a, b) {
        return b.area - a.area;
    });

    return areas;
}

shapeBuilder.init ({
    sideLength: options.sideLength,
    limits
});

build ();

const areas = calculate();
tableRenderer.render (areas);
