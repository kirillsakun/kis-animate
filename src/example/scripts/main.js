import { KisAnimate, KisAnimateText } from '../../lib/index';

import '../styles/main.scss';

const fadeInAnimations = new KisAnimate({
	items: '.example.fade-in',
	type: 'fade-in',
});
fadeInAnimations.init();

const fadeOutAnimations = new KisAnimate({
	items: '.example.fade-out',
	type: 'fade-out',
	delay: 5000,
	delayStep: 200,
});
fadeOutAnimations.init();

const slideAnimations = new KisAnimate({
	items: '.example.slide',
});
slideAnimations.init();

const textAnimation = new KisAnimateText();
textAnimation.init();
