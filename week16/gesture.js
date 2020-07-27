let element = document.getElementById('container');

element.addEventListener('mousedown', e => {
  start(e);
  let mouseMove = e => {
    move(e);
  };

  let mouseEnd = e => {
    end(e);
    document.removeEventListener('mousemove', mouseMove);
    document.removeEventListener('mouseup', mouseEnd);
  }

  document.addEventListener('mousemove', mouseMove);
  document.addEventListener('mouseup', mouseEnd);
});

element.addEventListener('touchstart', (e) => {
  for(let touch of e.changedTouches) {
    start(touch);
  }
})

element.addEventListener('touchmove', (e) => {
  for(let touch of e.changedTouches) {
    move(touch);
  }
})

element.addEventListener('touchend', (e) => {
  for(let touch of e.changedTouches) {
    end(touch);
  }
})

element.addEventListener('touchcancel', (e) => {
  for(let touch of e.changedTouches) {
    cancel(touch);
  }
})

let start = (point) => {
  console.log('start');
  console.log(point.clientX, point.clientY);
}

let move = (point) => {
  console.log('move');
  console.log(point.clientX, point.clientY);
}

let end = (point) => {
  console.log('end');
  console.log(point.clientX, point.clientY);
}

let cancel = (point) => {
  console.log('cancel');
  console.log(point.clientX, point.clientY);
}