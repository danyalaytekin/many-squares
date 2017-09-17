function areElementsOverlapping (e0, e1) {
    const r0 = e0.getBoundingClientRect ();
    const r1 = e1.getBoundingClientRect ();
    const separated = r0.right < r1.left || r0.left > r1.right || r0.bottom < r1.top || r0.top > r1.bottom;
    return ! separated;
}

function areGroupsOverlapping (g0, g1) {
    return g0.some (s0 => g1.some (s1 => areElementsOverlapping (s1, s0)));
}

export function findShapeGroups (shapeElements) {
    let groups = shapeElements.map (shape => [shape]);
    do {
        groups = groups.filter (g => g.length > 0);
        for (let i = 0; i < groups.length; ++i) {
            for (let j = i + 1; j < groups.length; ++j) {
                if (areGroupsOverlapping (groups[i], groups[j])) {
                    groups[i] = groups[i].concat (groups[j]);
                    groups[j].length = 0;
                }
            }
        }
    }
    while (groups.find (g => g.length === 0));
    return groups;
}

export function countPaintedPixels (canvas) {
    return canvas.reduce (function (a0, c0) {
        return a0 + c0.reduce (function (a1, c1) {
            return a1 + c1;
        }, 0);
    }, 0);
}

export function paintGroupOntoCanvas (group, canvas, extremes) {
    for (const shapeElement of group) {
        const rect = shapeElement.getBoundingClientRect ();
        const r = {
            left: Math.floor(rect.left - extremes.left),
            right: Math.floor(rect.right - extremes.left),
            top: Math.floor(rect.top - extremes.top),
            bottom: Math.floor(rect.bottom - extremes.top)
        };
        for (let x = r.left; x < r.right; ++x) {
            for (let y = r.top; y < r.bottom; ++y) {
                canvas[x][y] = 1;
            }
        }
    }
}