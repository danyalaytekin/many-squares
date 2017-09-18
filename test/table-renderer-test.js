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

        it('should render one content row, when one area is supplied', function () {
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

        it('should render two content rows, when two areas are supplied', function () {
            const areas = [
                {
                    group: [
                        {
                            innerHTML: 'label1'
                        }
                    ],
                    area: 1000
                },
                {
                    group: [
                        {
                            innerHTML: 'label2'
                        }
                    ],
                    area: 2000
                }
                
            ];
            tableRenderer.render (areas, this.tableElement);
            assert.strictEqual (
                this.tableElement.innerHTML, 
                expectedHeaderRow + `<tr><td>label1</td><td>1000</td></tr><tr><td>label2</td><td>2000</td></tr>`
            );
        });

    });
});
