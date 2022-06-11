import './styles/animations/index.scss';


interface InterfaceConstructorData {
	items?: (string | NodeListOf<HTMLElement>),
	defaultType?: 'fade-in' | 'fade-out' | 'slide-in-from-bottom' | 'slide-in-from-top',
	defaultDelay?: number,
	defaultDuration?: number,
	defaultOffset?: string,
	defaultThreshold?: number,
}

class KisAnimate {
	private STATES: ReadonlyArray<string> = ['initialized', 'waiting', 'running', 'finished'];

	private DEFAULT_TYPE = 'slide-in-from-bottom';
	private DEFAULT_DELAY = 0;
	private DEFAULT_DURATION = 800;
	private DEFAULT_OFFSET = '0px';
	private DEFAULT_THRESHOLD = 0.1;

	private STATE_ATTRIBUTE = 'data-a-state';
	private TYPE_ATTRIBUTE = 'data-a-type';
	private DELAY_ATTRIBUTE = 'data-a-delay';
	private DURATION_ATTRIBUTE = 'data-a-duration';
	private OLD_DURATION_ATTRIBUTE = 'data-a-old-duration';
	private OFFSET_ATTRIBUTE = 'data-a-offset';
	private THRESHOLD_ATTRIBUTE = 'data-a-threshold';


	itemsToAnimate: NodeListOf<HTMLElement>;
	defaultType: string;
	defaultDelay: number;
	defaultDuration: number;
	defaultOffset: string;
	defaultThreshold: number;

	constructor(data: InterfaceConstructorData) {
		const items = (data.items || `[${this.TYPE_ATTRIBUTE}]`);

		this.itemsToAnimate = typeof (items) === 'string'
			? document.querySelectorAll<HTMLElement>(items)
			: items;
		this.defaultType = data.defaultType || this.DEFAULT_TYPE;
		this.defaultDelay = data.defaultDelay || this.DEFAULT_DELAY;
		this.defaultDuration = data.defaultDuration || this.DEFAULT_DURATION;
		this.defaultOffset = data.defaultOffset || this.DEFAULT_OFFSET;
		this.defaultThreshold = data.defaultThreshold || this.DEFAULT_THRESHOLD;
	}

	public async init(): Promise<void> {
		for (let index = 0; index < this.itemsToAnimate.length; index += 1) {
			// eslint-disable-next-line no-await-in-loop
			await this.initItem(this.itemsToAnimate[index]);
		}
	}

	private initItem(item: HTMLElement): void {
		const type: string = item.getAttribute(this.TYPE_ATTRIBUTE) || this.defaultType;

		item.setAttribute(this.TYPE_ATTRIBUTE, type);
		item.setAttribute(this.STATE_ATTRIBUTE, this.STATES[0]);

		const observerOptions: IntersectionObserverInit = {
			root: null,
			rootMargin: item.getAttribute(this.OFFSET_ATTRIBUTE) || this.defaultOffset,
			threshold: Number(item.getAttribute(this.THRESHOLD_ATTRIBUTE)) || this.defaultThreshold,
		};
		const observerCallback: IntersectionObserverCallback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
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

	private animateItem(item: Element): void {
		if (item instanceof HTMLElement) {
			const onAnimationend = (event: AnimationEvent) => {
				const { target } = event;
				if (target instanceof HTMLElement) {
					target.setAttribute(this.STATE_ATTRIBUTE, this.STATES[3]);
					target.style.animationDuration = target.getAttribute(this.OLD_DURATION_ATTRIBUTE) || '';
					target.removeAttribute(this.OLD_DURATION_ATTRIBUTE);
				}
			};

			const duration: number = Number(item.getAttribute(this.DURATION_ATTRIBUTE)) || this.defaultDuration;
			const delay: number = Number(item.getAttribute(this.DELAY_ATTRIBUTE)) || this.defaultDelay;

			item.setAttribute(this.OLD_DURATION_ATTRIBUTE, item.style.animationDuration);
			item.style.animationDuration = `${duration}ms`; // eslint-disable-line no-param-reassign
			item.setAttribute(this.STATE_ATTRIBUTE, this.STATES[1]);

			setTimeout(() => {
				item.setAttribute(this.STATE_ATTRIBUTE, this.STATES[2]);
				item.addEventListener('animationend', onAnimationend, { once: true });
			}, delay);
		}
	}
}

export default KisAnimate;
