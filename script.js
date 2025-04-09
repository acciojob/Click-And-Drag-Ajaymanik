<script>
  const container = document.querySelector('.items');
  const cubes = document.querySelectorAll('.item');

  let selectedCube = null;
  let offsetX = 0;
  let offsetY = 0;

  cubes.forEach(cube => {
    cube.style.position = 'absolute'; // Make cubes movable
    const rect = cube.getBoundingClientRect();
    cube.style.left = `${cube.offsetLeft}px`;
    cube.style.top = `${cube.offsetTop}px`;

    cube.addEventListener('mousedown', (e) => {
      selectedCube = cube;
      const rect = cube.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;
      cube.style.zIndex = 1000;
    });
  });

  document.addEventListener('mousemove', (e) => {
    if (!selectedCube) return;

    const containerRect = container.getBoundingClientRect();
    const cubeRect = selectedCube.getBoundingClientRect();
    let x = e.clientX - containerRect.left - offsetX;
    let y = e.clientY - containerRect.top - offsetY;

    // Constraint boundaries
    x = Math.max(0, Math.min(container.clientWidth - cubeRect.width, x));
    y = Math.max(0, Math.min(container.clientHeight - cubeRect.height, y));

    selectedCube.style.left = x + 'px';
    selectedCube.style.top = y + 'px';
  });

  document.addEventListener('mouseup', () => {
    if (selectedCube) {
      selectedCube.style.zIndex = 0;
    }
    selectedCube = null;
  });
</script>
