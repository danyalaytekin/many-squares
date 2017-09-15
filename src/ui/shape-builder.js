function build (index) {
    const element = document.createElement ('div');
    element.draggable = true;
    // element.addEventListener('dragstart', onDragStart);
    // element.addEventListener('drag', _.throttle (onDrag, 10));
    element.classList.add ('square');
    element.innerHTML = `Square ${index}`;
    return element;
}

export {
    build
};