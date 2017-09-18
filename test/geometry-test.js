import assert from 'assert';
import * as geometry from '../src/model/geometry';

describe('Geometry', function () {
    describe('#countPaintedPixels(canvas)', function() {
        it('should return zero for an empty canvas', function () {
            assert.strictEqual (
                geometry.countPaintedPixels( [ [] ] ),
                0
            );
        });

        it('should cope with a filled canvas', function () {
            assert.strictEqual (
                geometry.countPaintedPixels( [ [1] ] ),
                1
            );

            assert.strictEqual (
                geometry.countPaintedPixels( [ [0, 1, 1, 0] ] ),
                2
            );

            assert.strictEqual (
                geometry.countPaintedPixels( [ [1, 0, 1, 0, 1, 0, 1]] ),
                4
            );
        });  
    });
});
