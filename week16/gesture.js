let element = document.getElementById('container');

let contexts = Object.create(null);

let MOUSE_SYMBOL = Symbol('mouse');

element.addEventListener('mousedown', e => {
  contexts[MOUSE_SYMBOL] = Object.create(null);
  start(e, contexts[MOUSE_SYMBOL]);
  let mouseMove = e => {
    move(e, contexts[MOUSE_SYMBOL]);
  };

  let mouseEnd = e => {
    end(e, contexts[MOUSE_SYMBOL]);
    document.removeEventListener('mousemove', mouseMove);
    document.removeEventListener('mouseup', mouseEnd);
  }

  document.addEventListener('mousemove', mouseMove);
  document.addEventListener('mouseup', mouseEnd);
});

element.addEventListener('touchstart', (e) => {
  for(let touch of e.changedTouches) {
    contexts[touch.identifier] = Object.create(null);
    start(touch, contexts[touch.identifier]);
  }
})

element.addEventListener('touchmove', (e) => {
  for(let touch of e.changedTouches) {
    move(touch, contexts[touch.identifier]);
  }
})

element.addEventListener('touchend', (e) => {
  for(let touch of e.changedTouches) {
    end(touch, contexts[touch.identifier]);
    delete contexts[touch.identifier];
  }
})

element.addEventListener('touchcancel', (e) => {
  for(let touch of e.changedTouches) {
    cancel(touch, contexts[touch.identifier]);
    delete contexts[touch.identifier];
  }
})

let start = (point, context) => {
  context.startX = point.clientX;
  context.startY = point.clientY;
  context.isTap = true;
  context.isPan = false;
  context.isPress = false;

  context.timeoutHandler = setTimeout(() => {
    if (context.isPan) {
      return;
    }

    context.isTap = false;
    context.isPan = false;
    context.isPress = true;
    console.log('pressStart');
  }, 500)
}

let move = (point, context) => {
  let dx = point.clientX - context.startX;
  let dy = point.clientY - context.startY;

  if (dx ** 2 + dy ** 2 > 100 && !context.isPan) {
    context.isTap = false;
    context.isPan = true;
    context.isPress = false;
    console.log('panStart');
  }

  if (context.isPan) {
    console.log('pan');
  }
}

let end = (point, context) => {
  if (context.isPan) {
    console.log('panEnd');
  }

  if (context.isPress) {
    console.log('pressEnd');
  }

  if (context.isTap) {
    console.log('tapEnd');
  }

  clearTimeout(context.timeoutHandler);
}

let cancel = (point, context) => {
  console.log('cancel');
  clearTimeout(context.timeoutHandler);
}