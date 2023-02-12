import { InterfaceKisAnimateConstructorData } from './types';
import { DEFAULTS, STATES } from './constants';

class KisAnimate {
	itemsToAnimate: NodeListOf<HTMLElement>;

	type: string;

	timingFunction: string;

	delay: number;

	delayStep: number;

	duration: number;

	offset: string;

	threshold: number;

	constructor(data?: InterfaceKisAnimateConstructorData) {
		const items = data?.items || `[${DEFAULTS.ATTRIBUTES.TYPE}]`;

		this.itemsToAnimate = typeof items === 'string' ? document.querySelectorAll<HTMLElement>(items) : items;
		this.type = data?.type || DEFAULTS.VALUES.TYPE;
		this.timingFunction = data?.timingFunction || DEFAULTS.VALUES.TIMING_FUNCTION;
		this.delay = data?.delay || DEFAULTS.VALUES.DELAY;
		this.delayStep = data?.delayStep || DEFAULTS.VALUES.DELAY_STEP;
		this.duration = data?.duration || DEFAULTS.VALUES.DURATION;
		this.offset = data?.offset || DEFAULTS.VALUES.OFFSET;
		this.threshold = data?.threshold || DEFAULTS.VALUES.THRESHOLD;
	}

	public async init(): Promise<void> {
		for (let index = 0; index < this.itemsToAnimate.length; index += 1) {
			// eslint-disable-next-line no-await-in-loop
			await this.initItem(this.itemsToAnimate[index], index);
		}
	}

	private initItem(item: HTMLElement, index: number): void {
		const type: string = item.getAttribute(DEFAULTS.ATTRIBUTES.TYPE) || this.type;

		item.setAttribute(DEFAULTS.ATTRIBUTES.TYPE, type);
		item.setAttribute(DEFAULTS.ATTRIBUTES.STATE, STATES[0]);

		const observerOptions: IntersectionObserverInit = {
			root: null,
			rootMargin: item.getAttribute(DEFAULTS.ATTRIBUTES.OFFSET) || this.offset,
			threshold: Number(item.getAttribute(DEFAULTS.ATTRIBUTES.THRESHOLD)) || this.threshold,
		};
		const observerCallback: IntersectionObserverCallback = (
			entries: IntersectionObserverEntry[],
			observer: IntersectionObserver
		) => {
			for (let entryIndex = 0; entryIndex < entries.length; entryIndex += 1) {
				const entry = entries[entryIndex];

				if (entry.isIntersecting) {
					const { target } = entry;
					this.animateItem(target as HTMLElement, index);
					observer.unobserve(target);
				}
			}
		};

		const animationsObserver = new IntersectionObserver(observerCallback, observerOptions);

		animationsObserver.observe(item);
	}

	private animateItem(item: HTMLElement, index: number): void {
		const onAnimationend = (event: AnimationEvent) => {
			const { target } = event;
			if (target instanceof HTMLElement) {
				target.setAttribute(DEFAULTS.ATTRIBUTES.STATE, STATES[3]);
				target.style.animation = target.getAttribute(DEFAULTS.ATTRIBUTES.OLD_ANIMATION) || '';
				target.removeAttribute(DEFAULTS.ATTRIBUTES.OLD_ANIMATION);
			}
		};

		const timingFunction: string = item.getAttribute(DEFAULTS.ATTRIBUTES.TIMING_FUNCTION) || this.timingFunction;
		const duration: number = Number(item.getAttribute(DEFAULTS.ATTRIBUTES.DURATION)) || this.duration;
		const delay: number = Number(item.getAttribute(DEFAULTS.ATTRIBUTES.DELAY)) || this.delay + this.delayStep * index;

		item.setAttribute(DEFAULTS.ATTRIBUTES.OLD_ANIMATION, item.style.animation);
		item.style.animationTimingFunction = timingFunction; // eslint-disable-line no-param-reassign
		item.style.animationDuration = `${duration}ms`; // eslint-disable-line no-param-reassign
		item.setAttribute(DEFAULTS.ATTRIBUTES.STATE, STATES[1]);

		setTimeout(() => {
			item.setAttribute(DEFAULTS.ATTRIBUTES.STATE, STATES[2]);
			item.addEventListener('animationend', onAnimationend, { once: true });
		}, delay);
	}
}

export default KisAnimate;
