import EventEmitter from 'events';
import { throttle } from 'lodash';

const currentDragOffsets = {
    left: 0,
    top: 0
};

function onDropOnGame (e) {
    event.preventDefault ();
    event.stopPropagation ();
    return false;
}

function onDragOverGame (e) {
    e.preventDefault ();
    return false;
}

function onShapeDragStart (e) {
    const shape = e.target;
    const bounds = shape.getBoundingClientRect ();
    currentDragOffsets.left = e.clientX - bounds.left;
    currentDragOffsets.top = e.clientY - bounds.top;
    e.dataTransfer.effectAllowed = 'move';
}

function onShapeDrag (e) {
    const shape = e.target;
    const bounds = shape.getBoundingClientRect ();
    e.target.style.left = `${e.pageX - currentDragOffsets.left}px`;
    e.target.style.top = `${e.pageY - currentDragOffsets.top}px`;
    emitter.emit (eventNameForShapeDrag);
}

export const emitter = new EventEmitter ();
export const eventNameForShapeDrag = 'shapeDragged';

export function initialiseGameListeners (gameElement) {
    gameElement.addEventListener('drop', onDropOnGame);
    gameElement.addEventListener('dragover', onDragOverGame);
    gameElement.addEventListener('dragenter', onDragOverGame);    
}

export function makeShapeDraggable (shapeElement) {
    shapeElement.draggable = true;
    shapeElement.addEventListener('dragstart', onShapeDragStart);
    shapeElement.addEventListener('drag', throttle (onShapeDrag, 100));    
}

