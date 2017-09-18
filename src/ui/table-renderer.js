export function render (areas) {
    // TODO: Improve naming of `area` given that `area.area` appears below.
    const tableElement = document.getElementById ('results');
    const headerHtml = '<tr><th>Group containing</th><th>Area (pixels squared)</th></tr>';
    const rowsHtml = areas.map(area => `<tr><td>${area.group[0].innerHTML}</td><td>${area.area}</td></tr>`).join();
    tableElement.innerHTML = headerHtml + rowsHtml;
}
