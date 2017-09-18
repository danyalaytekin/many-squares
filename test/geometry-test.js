import assert from 'assert';
import * as geometry from '../src/model/geometry';

describe('Geometry', function () {
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
