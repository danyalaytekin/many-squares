import _ from 'lodash';

const shapeCount = 7;
const sideLength = 150;

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
    calculate ();
}

function onDrop (e) {
    event.preventDefault ();
    event.stopPropagation ();
    return false;
}

function buildShapeElement (index) {
    const element = document.createElement ('div');
    element.draggable = true;
    element.addEventListener('dragstart', onDragStart);
    element.addEventListener('drag', _.throttle (onDrag, 10));
    element.classList.add ('square');
    element.style.width = `${sideLength}px`;
    element.style.height = element.style.width;
    element.innerHTML = `Square ${index}`;
    return element;
}

function generateRandomPosition () {
    return {
        x: Math.random () * (limits.width - sideLength),
        y: Math.random () * (limits.height - sideLength)
    };
};

function overlaps (element1, element2) {
    const r1 = element1.getBoundingClientRect ();
    const r2 = element2.getBoundingClientRect ();
    const separated = r1.right < r2.left || r1.left > r2.right || r1.bottom < r2.top || r1.top > r2.bottom;
    return ! separated;
}

let shapes;

document.getElementById ('game').addEventListener('drop', onDrop);
document.getElementById ('game').addEventListener('dragover', function (e) {
    console.log ('over');
    e.preventDefault ();
    return false;
});
document.getElementById ('game').addEventListener('dragenter', function (e) {
    console.log ('enter');
    e.preventDefault ();
    return false;
});


function build () {
    shapes = [];

    document.getElementById ('game').innerHTML = '';
    
    // Build elements.
    for (let i = 0; i < shapeCount; ++i) {
        const shapeElement = buildShapeElement (i);
    
        const position = generateRandomPosition ();
        shapeElement.style.left = `${position.x}px`;
        shapeElement.style.top = `${position.y}px`;
    
        shapeElement.id = `shape${i}`;
        
        document.getElementById ('game').appendChild (shapeElement);
    
        // TODO: Consider extracting this concern.
        shapes.push ([shapeElement]);
    }
}

function calculate() {
    let areas = [];

    // Find groups of shapes.
    let groupsOfShapes = [];
    for (let i = 0; i < shapeCount; ++i) {
        const element1 = document.getElementById (`shape${i}`);

        let group = groupsOfShapes.find (function (element) {
            return element.indexOf (element1) > -1;
        });
        if (group === undefined) {
            group = [element1];
            groupsOfShapes.push (group);
        }

        for (let j = i + 1; j < shapeCount; ++j) {
            const element2 = document.getElementById (`shape${j}`);

            if (overlaps (element1, element2)) {
                group.push(element2);
            }
        }
    }

    console.log (groupsOfShapes);
    
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
        console.log (extremes);
    
        // Create a two-dimensional canvas, and initialise all elements to zero.
        let canvasLimits = {
            width: extremes.right - extremes.left,
            height: extremes.bottom - extremes.top
        };
        console.log (canvasLimits.width);
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

    // Create table
//    const tableElement = document.createElement ('table');
    let rowHtml = '';
    rowHtml += `<tr><th>Names</th><th>Area (pixels squared)</th></tr>`;
    for (let i = 0; i < areas.length; ++i) {
        rowHtml += `<tr><td>${areas[i].group[0].innerHTML}</td><td>${areas[i].area}</td></tr>`;
    }
    const tableElement = document.getElementById ('results');
    tableElement.innerHTML = rowHtml;
//     document.getElementById ('game').appendChild (tableElement);
}

build ();
calculate ();


