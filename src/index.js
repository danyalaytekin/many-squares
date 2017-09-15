import _ from 'lodash';
import * as gameBuilder from './ui/game-builder';
import * as calculator from  './ui/calculator';
import * as tableRenderer from  './ui/table-renderer';

gameBuilder.build ();
calculator.calculate();
tableRenderer.render (calculator.areas);