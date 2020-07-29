export class Timeline {
  constructor() {
    this.animations = new Set();
    this.finishedAnimations = new Set();
    this.startTime = null;
    this.pauseTime = null;
    this.rafId = null; 
    this.state = 'init';
  }

  tick() {
    let t = Date.now() - this.startTime;

    for (let animation of this.animations) {
      let {object, property, template, start, end, duration, delay, timingFunction, addTime, valueFromProgression} = animation;

      let progression = timingFunction((t - delay - addTime)/duration);

      if (t > duration + delay + addTime) {
        progression = 1;
        this.animations.delete(animation);
        this.finishedAnimations.add(animation);
        // animation.finished = true;
      }

      // let value = start + progression * (end - start);
      let value = valueFromProgression(progression);

      object[property] = template(value);
      // console.log(property, template(value));
    }

    if (this.animations.size) {
      this.rafId = requestAnimationFrame(() => this.tick())
    } else {
      this.rafId = null;
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
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  resume() {
    if (this.state !== 'paused') {
      return;
    }
    this.state = 'playing';
    this.startTime += Date.now() - this.pauseTime;
    this.tick();
  }

  reset() {
    if (this.state === 'playing') {
      this.pause();
    }

    this.animations = new Set();
    this.finishedAnimations = new Set();
    this.state = 'init';
    this.rafId = null;
    this.startTime = Date.now();
    this.pauseTime = null;
  }

  restart() {
    if (this.state === 'playing') {
      this.pause();
    }

    for (const animation of this.finishedAnimations) {
      this.animations.add(animation);
    }
    this.state = 'playing';
    this.rafId = null;
    this.startTime = Date.now();
    this.pauseTime = null;
    this.tick();
  }

  add(animation, addTime) {
    this.animations.add(animation);
    if (this.state === 'playing' && this.rafId === null) this.tick();

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
    this.valueFromProgression = this.valueFromProgression.bind(this);
  }

  valueFromProgression(progression) {
    return this.start + progression * (this.end - this.start);
  }
}

export class ColorAnimation {
			constructor(config) {
				this.object = config.object;
				this.property = config.property;
				this.template =
					config.template ||
					((v) => `rgba(${v.r}, ${v.g}, ${v.b}, ${v.a})`);
				this.start = config.start;
				this.end = config.end;
				this.duration = config.duration;
				this.delay = config.delay;
				this.finished = false;
        this.timingFunction = config.timingFunction;
        this.valueFromProgression = this.valueFromProgression.bind(this);
			}

			valueFromProgression(progression) {
				return {
					r: this.start.r + progression * (this.end.r - this.start.r),
					g: this.start.g + progression * (this.end.g - this.start.g),
					b: this.start.b + progression * (this.end.b - this.start.b),
					a: this.start.a + progression * (this.end.a - this.start.a),
				};
			};
		}