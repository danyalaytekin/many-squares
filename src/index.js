import _ from 'lodash';
import * as gameBuilder from './ui/game-builder';
import * as calculator from  './ui/calculator';
import * as tableRenderer from './ui/table-renderer';

const options = {
    sideLength: 150,
    squareCount: 7
};

calculator.init (options);

gameBuilder.build (options);
calculator.calculate();
tableRenderer.render (calculator.areas);
