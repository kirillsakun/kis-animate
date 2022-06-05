import './styles/main.scss';


// @ts-ignore
import KisAnimate from './animate.ts';


const examples = new KisAnimate({
	items: '.heading.heading--lg',
	defaultType: 'fade-in',
	defaultDelay: 100,
	defaultDuration: 500,
});

examples.init();
