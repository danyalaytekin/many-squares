let groupsOfShapes = [];
let areas = [];

// TODO: Pass this in or work it out.
const shapeCount = 7;

function areOverlapping (element1, element2) {
    const r1 = element1.getBoundingClientRect ();
    const r2 = element2.getBoundingClientRect ();
    const separated = r1.right < r2.left || r1.left > r2.right || r1.bottom < r2.top || r1.top > r2.bottom;
    return ! separated;
}

function findGroups () {
    for (let i = 0; i < shapeCount; ++i) {
        const element1 = document.getElementById(`shape${i}`);
    
        let group = groupsOfShapes.find(function (element) {
            return element.indexOf(element1) > -1;
        });
        if (group === undefined) {
            group = [element1];
            groupsOfShapes.push(group);
        }
    
        for (let j = i + 1; j < shapeCount; ++j) {
            const element2 = document.getElementById(`shape${j}`);
    
            if (areOverlapping(element1, element2)) {
                group.push(element2);
            }
        }
    }
    return groupsOfShapes;
}

function sortByArea () {
    areas.sort ((a, b) => b.area - a.area);
}

function calculate () {
    findGroups ();

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

    sortByArea();
}

export {
    calculate,
    areas
};