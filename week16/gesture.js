let element = document.getElementById('container');

element.addEventListener('mousedown', () => {
  let move = e => {
    console.log(e.clientX, event.clientY);
  };

  let end = e => {
    document.removeEventListener('mousemove', move);
    document.removeEventListener('mouseup', end);
  }

  document.addEventListener('mousemove', move);
  document.addEventListener('mouseup', end);
});