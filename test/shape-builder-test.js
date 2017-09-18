import assert from 'assert';
import * as shapeBuilder from '../src/ui/shape-builder';

describe('Shape builder', function () {
    describe('#setRandomPosition(element)', function() {
        beforeEach(function () {
            shapeBuilder.init ({
                limits: {
                    width: 0,
                    height: 0
                }
            });
            this.element = {
                style: {}
            };
        });
        
        it('should set the element\'s left style', function () {
            shapeBuilder.setRandomPosition (this.element);
            assert.notStrictEqual (this.element.style.left, undefined);
        });

        it('should set the element\'s top style', function () {
            shapeBuilder.setRandomPosition (this.element);
            assert.notStrictEqual (this.element.style.top, undefined);
        });
    });
});
