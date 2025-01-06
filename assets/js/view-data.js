const tooltip = document.getElementById('tooltip');

document.querySelectorAll('.area').forEach(function(area) {
    area.addEventListener('mouseover', function(event) {
        tooltip.innerHTML = area.getAttribute('data-id');
        tooltip.style.display = 'block';
        tooltip.style.left = event.pageX + 'px';
        tooltip.style.top = (event.pageY - 30) + 'px'; // Adjusted to display above the path area
    });

    area.addEventListener('mousemove', function(event) {
        tooltip.style.left = event.pageX + 'px';
        tooltip.style.top = (event.pageY - 30) + 'px'; // Adjusted to display above the path area
    });

    area.addEventListener('mouseout', function() {
        tooltip.style.display = 'none';
    });

    area.addEventListener('click', function() {
        window.location.href = 'graph-main.html';
    });
});

