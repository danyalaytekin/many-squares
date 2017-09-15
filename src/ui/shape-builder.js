import _ from 'lodash';
import * as calculator from  './calculator';
import * as tableRenderer from  './table-renderer';

const sideLength = 150;

const currentDragOffsets = {
    left: 0,
    top: 0
};

function onDragStart (e) {
    console.log ('start');

    const shape = e.target;
    const bounds = shape.getBoundingClientRect ();

    currentDragOffsets.left = e.clientX - bounds.left;
    currentDragOffsets.top = e.clientY - bounds.top;

    e.dataTransfer.effectAllowed = 'move';
    console.log ('start');
}

function onDrag (e) {
    console.log ('drag');
    const shape = e.target;
    const bounds = shape.getBoundingClientRect ();
    e.target.style.left = `${e.pageX - currentDragOffsets.left}px`;
    e.target.style.top = `${e.pageY - currentDragOffsets.top}px`;

    // TODO: Emit event instead of calling directly.
    calculator.calculate ();
    tableRenderer.render (calculator.areas);
}

function build (index) {
    const element = document.createElement ('div');
    element.classList.add ('square');
    element.style.width = `${sideLength}px`;
    element.style.height = element.style.width;

    element.innerHTML = `Square ${index}`;

    element.draggable = true;
    element.addEventListener('dragstart', onDragStart);
    element.addEventListener('drag', _.throttle (onDrag, 10));

    return element;
}

export {
    build
};