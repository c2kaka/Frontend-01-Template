import {createElement, Text, Wrapper} from './createElement';
import {Timeline, Animation} from './animation'
import {ease, linear} from './cubicBezier'
import {enableGesture} from './gesture'

export class Carousel {
	constructor(config) {
		this.children = [];
		this.attributes = new Map();
		this.properties = new Map();
	}

	setAttribute(name, value) {
		this[name] = value;
	}

	appendChild(child) {
		this.children.push(child);
	}

	render() {
    let timeLine = new Timeline;
    timeLine.start();

    let nextPicStopHandler = null;

    let position = 0;

    let children = this.data.map((url, currentPosition) => {
      const length = this.data.length;
      let lastPosition = (currentPosition - 1 + length) % length;
      let nextPosition = (currentPosition + 1) % length;
      let offset = 0;

      let onStart = () => {
        timeLine.pause();
        clearTimeout(nextPicStopHandler);

        let currentElement = children[currentPosition];
        const currentTransformValue = Number(currentElement.style.transform.match(/^translateX\(([\s\S]+)px\)/)[1]);
        offset = currentTransformValue + 500 * currentPosition;
      }

      let onPan = event => {
        let lastElement = children[lastPosition];
        let currentElement = children[currentPosition];
        let nextElement = children[nextPosition];
        let currentTransformValue = -500 * currentPosition + offset;
        let lastTransformValue = -500 - 500 * lastPosition + offset;
        let nextTransformValue = 500 - 500 * nextPosition + offset;

        let dx = event.clientX - event.startX;

        currentElement.style.transform = `translateX(${currentTransformValue + dx}px)`;
        lastElement.style.transform = `translateX(${lastTransformValue + dx}px)`;
        nextElement.style.transform = `translateX(${nextTransformValue + dx}px)`
      }

      let element = <img src={url} onStart={onStart} onPan={onPan} enableGesture={true}/>;
      element.style.transform = 'translateX(0px)';
			element.addEventListener("dragstart", event => event.preventDefault());
			return element;
		});

		let root = <div class="carousel">
			{children}
		</div>

		let nextPic = () => {
			let nextPosition = (position + 1) % this.data.length;

			let current = children[position];
			let next = children[nextPosition];

			let currentAnimation = new Animation({
				object: current.style,
				property: 'transform',
				start: -100 * position,
				end: -100 - 100 * position,
				duration: 500,
				delay: 0,
				timingFunction: ease,
				template: v => `translateX(${5 * v}px)`,
			});

			let nextAnimation = new Animation({
				object: next.style,
				property: 'transform',
				start: 100 - 100 * nextPosition,
				end: -100 * nextPosition,
				duration: 500,
				delay: 0,
				timingFunction: ease,
				template: v => `translateX(${5 * v}px)`,
			});

			timeLine.add(currentAnimation);
			timeLine.add(nextAnimation);

			position = nextPosition;
			nextPicStopHandler = setTimeout(nextPic, 3000);
		};
		nextPicStopHandler = setTimeout(nextPic, 3000);

		// root.addEventListener('mousedown', (event) => {
		// 	let startX = event.clientX;
		// 	let startY = event.clientY;

		// 	const length = this.data.length;
		// 	let lastPosition = (position - 1 + length) % length;
		// 	let nextPosition = (position + 1) % length;

		// 	let last = children[lastPosition];
		// 	let current = children[position];
		// 	let next = children[nextPosition];

		// 	let move = (event) => {
		// 		last.style.transition = 'ease 0s';
		// 		current.style.transition = 'ease 0s';
		// 		next.style.transition = 'ease 0s';

		// 		last.style.transform = `translateX(${
		// 			event.clientX - startX - 500 - 500 * lastPosition
		// 		}px)`;
		// 		current.style.transform = `translateX(${
		// 			event.clientX - startX - 500 * position
		// 		}px)`;
		// 		next.style.transform = `translateX(${
		// 			event.clientX - startX + 500 - 500 * nextPosition
		// 		}px)`;
		// 	};

		// 	let up = (event) => {
		// 		let offset = 0;
		// 		if (event.clientX - startX > 250) {
		// 			offset = 1;
		// 		} else if (event.clientX - startX < -250) {
		// 			offset = -1;
		// 		}

		// 		last.style.transition = '';
		// 		current.style.transition = '';
		// 		next.style.transition = '';

		// 		last.style.transform = `translateX(${
		// 			offset * 500 - 500 - 500 * lastPosition
		// 		}px)`;
		// 		current.style.transform = `translateX(${
		// 			offset * 500 - 500 * position
		// 		}px)`;
		// 		next.style.transform = `translateX(${
		// 			offset * 500 + 500 - 500 * nextPosition
		// 		}px)`;

		// 		position =
		// 			(position - offset + this.data.length) % this.data.length;

		// 		document.removeEventListener('mousemove', move);
		// 		document.removeEventListener('mouseup', up);
		// 	};

		// 	document.addEventListener('mousemove', move);
		// 	document.addEventListener('mouseup', up);
		// });

		return root;
	}

	mountTo(parent) {
		this.render().mountTo(parent);
	}
}