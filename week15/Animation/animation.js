export class Timeline {
  tick() {
    requestAnimationFrame(() => this.tick())
  }

  start() {
    this.tick();
  }
}

export class Animation {
  constructor(config) {
    this.object = config.object;
    this.property = config.property;
    this.start = config.start;
    this.end = config.end;
    this.duration = config.duration;
    this.delay = config.delay || 0;
    this.timingFunction = config.timingFunction || ((config.start, config.end) => {
			return (t) => config.start + t * (config.end - config.start);
		});
  }
}