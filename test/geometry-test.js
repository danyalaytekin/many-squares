import assert from 'assert';
import * as geometry from '../src/model/geometry';

describe('Geometry', function () {
    class SquareElement {
        constructor (rectangle) {
            this.rectangle = rectangle;
        }
        
        static create (left, top, side) {
            return new SquareElement({
                left,
                top,
                right: left + side,
                bottom: top + side
            });
        }

        getBoundingClientRect () {
            return this.rectangle;
        }
    };

    describe('#findShapeGroups(shapeElements)', function () {
        it('given no shapes, should find no groups', function () {
            assert.strictEqual (geometry.findShapeGroups ( [] ).length, 0);
        });

        it('given one shape, should find the single group', function () {
            const element = SquareElement.create (0, 0, 10);
            const groups = geometry.findShapeGroups ( [ element ] );
            assert.strictEqual (groups.length, 1);
            assert.strictEqual (groups[0].length, 1);
            assert.strictEqual (groups[0][0], element);
        });

        it('given two non-overlapping shapes, should find the two groups', function () {
            const elements = [ 
                SquareElement.create (0, 0, 10),
                SquareElement.create (20, 20, 10)
            ];
            const groups = geometry.findShapeGroups (elements);
            assert.strictEqual (groups.length, 2);
            groups.forEach (function (group, index) {
                assert.strictEqual (groups[index].length, 1);
                assert.strictEqual (groups[index][0], elements[index]);
            });
        });
        });
        
    });

    describe('#findExtremitiesOfGroup(group)', function () {        
        function createRectangle (left, right, top, bottom) {
            return { left, right, top, bottom };
        }
        
        it('finds the extremes of one massive square', function () {
            const rectangle = createRectangle (0, Number.MAX_VALUE, 0, Number.MAX_VALUE);
            const group = [ new SquareElement (rectangle) ];
            const extremes = geometry.findExtremitiesOfGroup (group);
            assert.deepStrictEqual (extremes, rectangle);
        });

        it('finds the extremes of one zero square', function () {
            const rectangle = createRectangle (0, 0, 0, 0);
            const group = [ new SquareElement (rectangle) ];
            const extremes = geometry.findExtremitiesOfGroup (group);
            assert.deepStrictEqual (extremes, rectangle);
        });

        it('finds the extremes of two squares', function () {
            const rectangles = [
                createRectangle (0, 20, 10, 30),
                createRectangle (10, 30, 0, 40)
            ];
            const group = rectangles.map (r => new SquareElement (r));
            const extremes = geometry.findExtremitiesOfGroup (group);
            assert.deepStrictEqual (extremes, {
                left: 0,
                right: 30,
                top: 0,
                bottom: 40
            });
        })
    });

    describe('#createPaintableCanvasForGroup(rectangle)', function () {
        function createSmallRectangle () {
            return {
                left: 1,
                right: 2,
                top: 1,
                bottom: 2
            };
        }

        it('should return an empty array, when a rectangle with zero area is provided', function () {
            const rectangle = {
                left: 1,
                right: 1,
                top: 1,
                bottom: 1
            };
            const canvas = geometry.createPaintableCanvasForGroup (rectangle);
            assert.strictEqual(canvas.length, 0);
        });

        it('should create a two-dimensional array, when a rectangle with non-zero area is provided', function () {
            const rectangle = createSmallRectangle ();
            const canvas = geometry.createPaintableCanvasForGroup (rectangle);
            assert.notStrictEqual(canvas.length, 0);
            assert.notStrictEqual(canvas[0].length, 0);
        });

        it('should ignore a rectangle\'s position', function () {
            const rectangle = createSmallRectangle ();
            const canvas = geometry.createPaintableCanvasForGroup (rectangle);
            assert.strictEqual(canvas.length, 1);
            assert.strictEqual(canvas[0].length, 1);
        });
    });

    describe('#countPaintedPixels(canvas)', function() {
        it('should return zero for an empty canvas', function () {
            assert.strictEqual (
                geometry.countPaintedPixels([ 
                    [] 
                ]),
                0
            );
        });

        it('should cope with a canvas filled in one dimension', function () {
            assert.strictEqual (
                geometry.countPaintedPixels([
                    [1]
                ]),
                1
            );

            assert.strictEqual (
                geometry.countPaintedPixels([ 
                    [0, 1, 1, 0]
                ]),
                2
            );

            assert.strictEqual (
                geometry.countPaintedPixels([
                    [1, 0, 1, 0, 1, 0, 1]
                ]),
                4
            );
        });

        it('should cope with a canvas filled in two dimensions', function () {
            assert.strictEqual (
                geometry.countPaintedPixels([
                    [0, 0],
                    [0, 1]
                ]),
                1
            );

            assert.strictEqual (
                geometry.countPaintedPixels([
                    [1, 0],
                    [0, 1]
                ]),
                2
            );

            assert.strictEqual (
                geometry.countPaintedPixels([
                    [1, 0, 1],
                    [0, 0, 0],
                    [1, 1, 1],
                ]),
                5
            );

            assert.strictEqual (
                geometry.countPaintedPixels([
                    [1, 1, 1],
                    [1, 1, 1],
                    [1, 1, 1]
                ]),
                9
            );            
        });
    });
});
