export class Timeline {
  constructor() {
    this.animations = [];
    this.startTime = null;
    this.pauseTime = null;
    this.rafId = null; 
    this.state = 'init';
  }

  tick() {
    let t = Date.now() - this.startTime;
    console.log(t);

    this.animations = this.animations.filter(animation => !animation.finished);
    for (let animation of this.animations) {
      let {object, property, template, start, end, duration, delay, timingFunction, addTime} = animation;

      let progression = timingFunction((t - delay - addTime)/duration);

      if (t > duration + delay + addTime) {
        progression = 1;
        animation.finished = true;
      }

      let value = start + progression * (end - start);

      object[property] = template(value);
    }

    if (this.animations.length) {
      this.rafId = requestAnimationFrame(() => this.tick())
    }
  }

  start() {
    if (this.state !== 'init') {
      return;
    }
    this.state = 'playing';
    this.startTime = Date.now();
    this.tick();
  }

  pause() {
    if (this.state !== 'playing') {
      return;
    }
    this.state = 'paused';
    this.pauseTime = Date.now();
    cancelAnimationFrame(this.rafId);
  }

  resume() {
    if (this.state !== 'paused') {
      return;
    }
    this.state = 'playing';
    this.startTime += Date.now() - this.pauseTime;
    this.tick();
  }

  restart() {
    if (this.state === 'playing') {
      this.pause();
    }

    this.animations = [];
    this.state = 'playing';
    this.rafId = null;
    this.startTime = Date.now();
    this.pauseTime = null;
    this.tick();
  }

  add(animation, addTime) {
    this.animations.push(animation);
    if (this.state === 'playing') {
      animation.addTime = addTime !== void 0 ? addTime : Date.now() - this.startTime;
    } else {
      animation.addTime = addTime !== void 0 ? addTime : 0;
    }
  }
}

export class Animation {
  constructor(config) {
    this.object = config.object;
    this.property = config.property;
    this.template = config.template;
    this.start = config.start;
    this.end = config.end;
    this.duration = config.duration;
    this.delay = config.delay;
    this.finished = false;
    this.timingFunction = config.timingFunction;
  }
}