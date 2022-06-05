import './styles/animations/index.scss';


interface InterfaceConstructorData {
	items: (string | NodeListOf<HTMLElement>),
	defaultType?: 'fade-in' | 'slide-from-bottom',
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

	constructor(data:InterfaceConstructorData) {
		this.itemsToAnimate = typeof (data.items) === 'string'
			? document.querySelectorAll<HTMLElement>(data.items)
			: data.items;
		this.defaultType = data.defaultType || 'slide-from-bottom';
		this.defaultDelay = data.defaultDelay || 0;
		this.defaultDuration = data.defaultDuration || 800;
		this.defaultOffset = data.defaultOffset || '0px';
	}

	public init():void {
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
			const onAnimationend = (event:AnimationEvent) => {
				const { target } = event;
				if (target instanceof HTMLElement) {
					target.setAttribute('data-a-state', this.states[3]);
					target.style.animationDuration = target.getAttribute('data-old-a-duration') || '';
					target.removeAttribute('data-old-a-duration');
				}
			};

			const duration:number = Number(item.dataset.aDuration) || this.defaultDuration;
			const delay:number = Number(item.dataset.aDelay) || this.defaultDelay;

			item.setAttribute('data-old-a-duration', item.style.animationDuration);
			item.style.animationDuration = `${duration}ms`; // eslint-disable-line no-param-reassign
			item.setAttribute('data-a-state', this.states[1]);

			setTimeout(() => {
				item.setAttribute('data-a-state', this.states[2]);
				item.addEventListener('animationend', onAnimationend, { once: true });
			}, delay);
		}
	}
}

export default KisAnimate;
