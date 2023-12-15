import splitBySymbols from '../helpers/split-by-symbols';

import { InterfaceKisAnimateTextConstructorData } from './types';
import { TEXT_DEFAULTS, STATES } from './constants';

class KisAnimateText {
	itemsToAnimate: NodeListOf<HTMLElement>;

	type: string;

	timingFunction: string;

	delay: number;

	symbolDelay: number;

	duration: number;

	offset: string;

	threshold: number;

	constructor(data?: InterfaceKisAnimateTextConstructorData) {
		const items = data?.items || `[${TEXT_DEFAULTS.ATTRIBUTES.TYPE}]`;

		this.itemsToAnimate = typeof items === 'string' ? document.querySelectorAll<HTMLElement>(items) : items;
		this.type = data?.type || TEXT_DEFAULTS.VALUES.TYPE;
		this.timingFunction = data?.timingFunction || TEXT_DEFAULTS.VALUES.TIMING_FUNCTION;
		this.delay = data?.delay || TEXT_DEFAULTS.VALUES.DELAY;
		this.symbolDelay = data?.symbolDelay || TEXT_DEFAULTS.VALUES.SYMBOL_DELAY;
		this.duration = data?.duration || TEXT_DEFAULTS.VALUES.DURATION;
		this.offset = data?.offset || TEXT_DEFAULTS.VALUES.OFFSET;
		this.threshold = data?.threshold || TEXT_DEFAULTS.VALUES.THRESHOLD;
	}

	public async init(): Promise<void> {
		for (let index = 0; index < this.itemsToAnimate.length; index += 1) {
			// eslint-disable-next-line no-await-in-loop
			await this.initItem(this.itemsToAnimate[index]);
		}
	}

	private initItem(item: HTMLElement): void {
		const type: string = item.getAttribute(TEXT_DEFAULTS.ATTRIBUTES.TYPE) || this.type;

		const { symbolsElements, originalText } = splitBySymbols({
			element: item,
			wordSpanAttribute: TEXT_DEFAULTS.ATTRIBUTES.WORD,
			symbolSpanAttribute: TEXT_DEFAULTS.ATTRIBUTES.SYMBOL,
		});

		if (!symbolsElements || !symbolsElements.length) {
			return;
		}

		const timingFunction: string = item.getAttribute(TEXT_DEFAULTS.ATTRIBUTES.TIMING_FUNCTION) || this.timingFunction;
		const duration: number = Number(item.getAttribute(TEXT_DEFAULTS.ATTRIBUTES.DURATION)) || this.duration;
		const symbolDelay: number = Number(item.getAttribute(TEXT_DEFAULTS.ATTRIBUTES.SYMBOL_DELAY)) || this.symbolDelay;

		for (let index = 0; index < symbolsElements?.length; index += 1) {
			const symbolElement = symbolsElements[index];

			symbolElement.style.transitionDelay = `${index * symbolDelay}ms`;
			symbolElement.style.transitionTimingFunction = timingFunction;
			symbolElement.style.transitionDuration = `${duration}ms`;
		}

		item.setAttribute(TEXT_DEFAULTS.ATTRIBUTES.TYPE, type);
		item.setAttribute(TEXT_DEFAULTS.ATTRIBUTES.STATE, STATES[0]);

		const observerOptions: IntersectionObserverInit = {
			root: null,
			rootMargin: item.getAttribute(TEXT_DEFAULTS.ATTRIBUTES.OFFSET) || this.offset,
			threshold: Number(item.getAttribute(TEXT_DEFAULTS.ATTRIBUTES.THRESHOLD)) || this.threshold,
		};
		const observerCallback: IntersectionObserverCallback = (
			entries: IntersectionObserverEntry[],
			observer: IntersectionObserver
		) => {
			for (let entryIndex = 0; entryIndex < entries.length; entryIndex += 1) {
				const entry = entries[entryIndex];

				if (entry.isIntersecting) {
					const { target } = entry;
					this.animateItem(target as HTMLElement, symbolsElements.length, symbolDelay);
					observer.unobserve(target);
				}
			}
		};

		const animationsObserver = new IntersectionObserver(observerCallback, observerOptions);
		if (originalText) {
			item.setAttribute('aria-label', originalText);
		}
		animationsObserver.observe(item);
	}

	private animateItem(item: HTMLElement, symbolsNumber: number, symbolDelay: number): void {
		const delay: number = Number(item.getAttribute(TEXT_DEFAULTS.ATTRIBUTES.DELAY)) || this.delay;

		item.setAttribute(TEXT_DEFAULTS.ATTRIBUTES.STATE, STATES[1]);
		setTimeout(() => {
			item.setAttribute(TEXT_DEFAULTS.ATTRIBUTES.STATE, STATES[2]);
		}, delay);
		setTimeout(() => {
			item.setAttribute(TEXT_DEFAULTS.ATTRIBUTES.STATE, STATES[3]);
		}, delay + this.duration + symbolsNumber * symbolDelay);
	}
}

export default KisAnimateText;
