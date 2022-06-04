import './styles/animations/index.scss';


interface constructorData {
	items: (string | NodeListOf<HTMLElement>),
	defaultType?: string,
	defaultDelay?: number,
	defaultDuration?: number,
	defaultOffset?: string,
}

class KisAnimate {
	itemsToAnimate:NodeListOf<HTMLElement>;
	defaultType:string;
	defaultDelay:number;
	defaultDuration: number;
	defaultOffset: string;
	states:ReadonlyArray<string> = ['initialized', 'waiting', 'running', 'finished'];

	constructor(data:constructorData) {
		this.itemsToAnimate = typeof (data.items) === 'string'
			? document.querySelectorAll<HTMLElement>(data.items)
			: data.items;
		this.defaultType = data.defaultType || 'slide';
		this.defaultDelay = data.defaultDelay || 0;
		this.defaultDuration = data.defaultDuration || 800;
		this.defaultOffset = data.defaultOffset || '0px';
	}

	init():void {
		for (let index = 0; index < this.itemsToAnimate.length; index += 1) {
			this.initItem(this.itemsToAnimate[index]);
		}
	}

	private initItem(item:HTMLElement):void {
		const type:string = item.dataset.aType || this.defaultType;

		item.setAttribute('data-a-type', type);
		item.setAttribute('data-a-state', this.states[0]);

		const observerOptions:IntersectionObserverInit = {
			root: null,
			rootMargin: item.dataset.aOffset || this.defaultOffset,
			threshold: 0.1,
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

	private animateItem(item:Element):void {
		if (item instanceof HTMLElement) {
			const oldAnimationDuration:string = item.style.animationDuration;
			const duration:number = Number(item.dataset.aDuration) || this.defaultDuration;
			const delay:number = Number(item.dataset.aDelay) || this.defaultDelay;

			item.style.animationDuration = `${duration}ms`; // eslint-disable-line no-param-reassign
			item.setAttribute('data-a-state', this.states[1]);

			// TODO: rewrite using Promises or something like that
			setTimeout(() => {
				item.setAttribute('data-a-state', this.states[2]);
				setTimeout(() => {
					item.setAttribute('data-a-state', this.states[3]);
					item.style.animationDuration = oldAnimationDuration; // eslint-disable-line no-param-reassign
				}, duration);
			}, delay);
		}
	}
}

export default KisAnimate;
