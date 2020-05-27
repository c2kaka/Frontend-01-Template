function getStyle(element) {
	if (!element.style) {
		element.style = {};
	}

	for (const prop in element.computedStyle) {
		let p = element.computedStyle.value;
		element.style[prop] = element.computedStyle[prop].value;

		if (element.style[prop].toString().match(/px$/)) {
			element.style[prop] = parseInt(element.style[prop]);
		}
		if (element.style[prop].toString().match(/^[0-9\.]+$/)) {
			element.style[prop] = parseInt(element.style[prop]);
		}
	}

	return element.style;
}

function layout(element) {
	if (!element.computedStyle) {
		return;
	}

	let elementStyle = getStyle(element);

	// console.log('elementStyle:', elementStyle);

	if (elementStyle.display !== 'flex') {
		return;
	}

	let items = element.children.filter((e) => e.type === 'element');
	items.sort((a, b) => {
		return (a.order || 0) - (b.order || 0);
	});

	let style = elementStyle;
	['width', 'height'].forEach((size) => {
		if (style[size] === 'auto' || style[size] === '') {
			style[size] = null;
		}
	});

	if (!style.flexDirection || style.flexDirection === 'auto') {
		style.flexDirection = 'row';
	}
	if (!style.alignItems || style.alignItems === 'auto') {
		style.alignItems = 'stretch';
	}
	if (!style.justifyContent || style.justifyContent === 'auto') {
		style.justifyContent = 'flex-start';
	}
	if (!style.flexWrap || style.flexWrap === 'auto') {
		style.flexWrap = 'nowrap';
	}
	if (!style.alignContent || style.alignContent === 'auto') {
		style.alignContent = 'stretch';
	}

	let mainSize,
		mainStart,
		mainEnd,
		mainSign,
		mainBase,
		crossSize,
		crossStart,
		crossEnd,
		crossSign,
		crossBase;

	if (style.flexDirection === 'row') {
		mainSize = 'width';
		mainStart = 'left';
		mainEnd = 'right';
		mainSign = +1;
		mainBase = 0;

		crossSize = 'height';
		crossStart = 'top';
		crossEnd = 'bottom';
	}

	if (style.flexDirection === 'row-reverse') {
		mainSize = 'width';
		mainStart = 'right';
		mainEnd = 'left';
		mainSign = -1;
		mainBase = style.width;

		crossSize = 'height';
		crossStart = 'top';
		crossEnd = 'bottom';
	}

	if (style.flexDirection === 'column') {
		mainSize = 'height';
		mainStart = 'top';
		mainEnd = 'bottom';
		mainSign = +1;
		mainBase = 0;

		crossSize = 'width';
		crossStart = 'left';
		crossEnd = 'right';
	}

	if (style.flexDirection === 'column-reverse') {
		mainSize = 'height';
		mainStart = 'bottom';
		mainEnd = 'top';
		mainSign = -1;
		mainBase = style.height;

		crossSize = 'width';
		crossStart = 'left';
		crossEnd = 'right';
	}

	if (style.flexWrap === 'wrap-reverse') {
		let temp = crossStart;
		crossStart = crossEnd;
		crossEnd = temp;
		crossSign = -1;
	} else {
		crossBase = 0;
		crossSign = 1;
	}

	let isAutoMainSize = false;
	if (!style[mainSize]) {
		elementStyle[mainSize] = 0;
		for (let i = 0; i < items.length; i++) {
			let item = items[i];
			let itemStyle = getStyle(item);
			if (
				itemStyle[mainSize] !== null ||
				itemStyle[mainSize] !== void 0
			) {
				elementStyle[mainSize] =
					elementStyle[mainSize] + itemStyle[mainSize];
			}
		}
		isAutoMainSize = true;
	}

	let flexLine = [];
	let flexLines = [flexLine];

	let mainSpace = elementStyle[mainSize];
	let crossSpace = 0;

	for (let i = 0; i < items.length; i++) {
		let item = items[i];
		let itemStyle = getStyle(item);

		if (itemStyle[mainSize] === null) {
			itemStyle[mainSize] = 0;
		}

		if (itemStyle.flex) {
			flexLine.push(item);
		} else if (style.flexWrap === 'nowrap' && isAutoMainSize) {
			mainSpace -= itemStyle[mainSize];
			if (
				itemStyle[crossSize] !== null ||
				itemStyle[crossSize] !== void 0
			) {
				crossSpace = Math.max(crossSpace, itemStyle[crossSize]);
			}
			flexLine.push(item);
		} else {
			if (itemStyle[mainSize] > style[mainSize]) {
				itemStyle[mainSize] = style[mainSize];
			}

			if (mainSpace < itemStyle[mainSize]) {
				flexLine.mainSpace = mainSpace;
				flexLine.crossSpace = crossSpace;

				flexLine = [];
				flexLines.push(flexLine);

				flexLine.push(item);

				mainSpace = style[mainSize];
				crossSpace = 0;
			} else {
				flexLine.push(item);
			}

			if (
				itemStyle[crossSize] !== null ||
				itemStyle[crossSize] !== void 0
			) {
				crossSpace = Math.max(crossSpace, itemStyle[crossSize]);
			}

			mainSpace -= itemStyle[mainSize];
		}
	}

	flexLine.mainSpace = mainSpace;

	if (style.flexWrap === 'nowrap' || isAutoMainSize) {
		flexLine.crossSpace =
			style[crossSize] !== undefined ? style[crossSize] : crossSpace;
	} else {
		flexLine.crossSpace = crossSpace;
	}

	if (mainSpace < 0) {
		// overflow(happens only if container is single line),scale every item
		let scale = style[mainSize] / (style[mainSize] - mainSpace);
		var currentMain = mainBase;
		for (let i = 0; i < items.length; i++) {
			let item = items[i];
			let itemStyle = getStyle(item);

			if (itemStyle.flex) {
				itemStyle[mainSize] = 0;
			}

			itemStyle[mainSize] = itemStyle[mainSize] * scale;

			itemStyle[mainStart] = currentMain;
			itemStyle[mainEnd] =
				itemStyle[mainStart] + mainSign * itemStyle[mainSize];
			currentMain = itemStyle[mainEnd];
		}
	} else {
		// process each flex line
		flexLines.forEach((items) => {
			let mainSpace = item.mainSpace;
			let flexTotal = 0;
			for (let i = 0; i < items.length; i++) {
				let item = items[i];
				let itemStyle = getStyle(item);

				if (itemStyle.flex !== null && itemStyle.flex !== void 0) {
					flexTotal += itemStyle.flex;
					continue;
				}
			}

			if (flexTotal > 0) {
				// there is flexible flex items
				let currentMain = mainBase;

				for (let i = 0; i < items.length; i++) {
					let item = items[i];
					let itemStyle = getStyle(item);

					if (itemStyle.flex) {
						itemStyle[mainSize] =
							(mainSpace / flexTotal) * itemStyle.flex;
					}
					itemStyle[mainStart] = currentMain;
					itemStyle[mainEnd] =
						itemStyle[mainStart] + mainSign * itemStyle[mainSize];

					currentMain = itemStyle[mainEnd];
				}
			} else {
				// there is no flexible flex items, which means justifyContent should work
				if (style.justifyContent === 'flex-start') {
					let currentMain = mainBase;
					let step = 0;
				}
				if (style.justifyContent === 'flex-end') {
					let currentMain = mainSpace * mainSign + mainBase;
					let step = 0;
				}
				if (style.justifyContent === 'center') {
					let currentMain = (mainSpace / 2) * mainSign + mainBase;
					let step = 0;
				}
				if (style.justifyContent === 'space-between') {
					let step =
						(mainBase / (items.length - 1)) * mainSign + mainBase;
					let currentMain = mainBase;
				}
				if (style.justifyContent === 'space-around') {
					let step = (mainBase / items.length) * mainSign + mainBase;
					let currentMain = step / 2 + mainBase;
				}
				for (let i = 0; i < items.length; i++) {
					let item = items[i];
					let itemStyle = getStyle(item);
					itemStyle[mainStart] = mainBase;
					itemStyle[mainEnd] =
						itemStyle[mainStart] + mainSign * itemStyle[mainSize];
					currentMain = itemStyle[mainEnd] + step;
				}
			}
		});
	}
}

module.exports = layout;