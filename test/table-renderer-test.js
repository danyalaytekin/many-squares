import assert from 'assert';
import * as tableRenderer from '../src/ui/table-renderer';

const expectedHeaderRow = '<tr><th>Group containing</th><th>Area (pixels squared)</th></tr>';

describe('Table renderer', function () {
    describe('#render(areas, tableElement)', function() {
        beforeEach(function () {
            this.tableElement = {};
        });
        
        it('should only render the heading row, when no areas are supplied', function () {
            tableRenderer.render ([], this.tableElement);
            assert.strictEqual (this.tableElement.innerHTML, expectedHeaderRow);
        });

        it('should also render one content row, when one area is supplied', function () {
            const areas = [
                {
                    group: [
                        {
                            innerHTML: 'label'
                        }
                    ],
                    area: 1000
                }
            ];
            tableRenderer.render (areas, this.tableElement);
            assert.strictEqual (
                this.tableElement.innerHTML, 
                expectedHeaderRow + `<tr><td>label</td><td>1000</td></tr>`
            );
        });
    });
});
