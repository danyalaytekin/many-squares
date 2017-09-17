export function findGroupsOfShapes (shapeElements) {
    let groupsOfShapes = [];
    for (let i = 0; i < shapeElements.length; ++i) {
        const element1 = shapeElements[i];

        let group = groupsOfShapes.find (function (element) {
            return element.indexOf (element1) > -1;
        });
        if (group === undefined) {
            group = [element1];
            groupsOfShapes.push (group);
        }

        for (let j = i + 1; j < shapeElements.length; ++j) {
            const element2 = shapeElements[j];

            if (overlaps (element1, element2)) {
                group.push(element2);
            }
        }
    }
    return groupsOfShapes;
}

export function countPaintedPixels (canvas) {
    return canvas.reduce (function (a1, c1) {
        return a1 + c1.reduce (function (a2, c2) {
            return a2 + c2;
        }, 0);
    }, 0);
}
