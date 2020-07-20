export class Timeline {
  constructor() {
    this.animations = [];
    this.startTime = null;
    this.pauseTime = null;
    this.rafId = null; 
  }

  tick() {
    let t = Date.now() - this.startTime;
    console.log(t);

    this.animations = this.animations.filter(animation => !animation.finished);
    for (let animation of this.animations) {
      let {object, property, template, start, end, duration, delay, timingFunction} = animation;

      let progression = timingFunction((t - delay)/duration);

      if (t > duration + delay) {
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
    this.startTime = Date.now();
    this.tick();
  }

  pause() {
    this.pauseTime = Date.now();
    cancelAnimationFrame(this.rafId);
  }

  resume() {
    this.startTime += Date.now() - this.pauseTime;
    this.tick();
  }

  add(animation) {
    this.animations.push(animation);
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