export function render (areas) {
    let rowHtml = '';
    rowHtml += `<tr><th>Group containing</th><th>Area (pixels squared)</th></tr>`;
    for (let i = 0; i < areas.length; ++i) {
        rowHtml += `<tr><td>${areas[i].group[0].innerHTML}</td><td>${areas[i].area}</td></tr>`;
    }
    const tableElement = document.getElementById ('results');
    tableElement.innerHTML = rowHtml;
}
