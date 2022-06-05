import './styles/animations/index.scss';

import { Constructor, State } from './types';

class KisAnimate {
	itemsToAnimate:NodeListOf<HTMLElement>;
	defaultType: string;
	defaultDelay: number;
	defaultDuration: number;
	defaultOffset: string;
	state:State = {
		start: 'initialized',
		wait: 'waiting',
		run: 'running',
		end: 'finished',
	};

	private DEFAULT_TYPE = 'slide-from-bottom';
	private DEFAULT_DELAY = 0;
	private DEFAULT_OFFSET = 0;
	private DEFAULT_DURATION = 800;
	private TRASH_HOLD = 0.1;
	private STATE_ATTR = 'data-a-state';

	constructor(data:Constructor) {
		this.itemsToAnimate = typeof (data.items) === 'string'
			? document.querySelectorAll<HTMLElement>(data.items)
			: data.items;
		this.defaultType = data.defaultType || this.DEFAULT_TYPE;
		this.defaultDelay = data.defaultDelay || this.DEFAULT_DELAY;
		this.defaultDuration = data.defaultDuration || this.DEFAULT_DURATION;
		this.defaultOffset = data.defaultOffset || `${this.DEFAULT_OFFSET}px`;
	}

	public init() {
		for (let index = 0; index < this.itemsToAnimate.length; index += 1) {
			this.initItem(this.itemsToAnimate[index]);
		}
	}

	private initItem(item:HTMLElement):void {
		const type = item.dataset.aType || this.defaultType;

		item.setAttribute(this.STATE_ATTR, type);
		item.setAttribute(this.STATE_ATTR, this.state.start);

		const observerOptions:IntersectionObserverInit = {
			root: null,
			rootMargin: item.dataset.aOffset || this.defaultOffset,
			threshold: this.TRASH_HOLD,
		};
		const observerCallback:IntersectionObserverCallback = (entries:IntersectionObserverEntry[], observer:IntersectionObserver) => {
			for (let index = 0; index < entries.length; index += 1) {
				const entry = entries[index];

				if (entry.isIntersecting) {
					const { target } = entry;
					this.animateItem(target);
					observer.unobserve(target);
				}
			}
		};

		const animationsObserver = new IntersectionObserver(observerCallback, observerOptions);

		animationsObserver.observe(item);
	}

	private animateItem(item:Element) {
		if (item instanceof HTMLElement) {
			const oldAnimationDuration = item.style.animationDuration;
			const duration = +(item.dataset.aDuration || this.defaultDuration);
			const delay = +(item.dataset.aDelay || this.defaultDelay);

			item.style.animationDuration = `${duration}ms`; // eslint-disable-line no-param-reassign
			item.setAttribute('data-a-state', this.state.wait);

			// TODO: rewrite using Promises or something like tha
			// -> OR better RequestAnimationFrame https://developer.mozilla.org/ru/docs/Web/API/window/requestAnimationFrame

			setTimeout(() => {
				item.setAttribute(this.STATE_ATTR, this.state.run);
				setTimeout(() => {
					item.setAttribute(this.STATE_ATTR, this.state.end);
					item.style.animationDuration = oldAnimationDuration; // eslint-disable-line no-param-reassign
				}, duration);
			}, delay);
		}
	}
}

export default KisAnimate;
