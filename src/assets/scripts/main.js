import { KisAnimate, KisAnimateText } from '../../lib/index';

import '../styles/main.scss';

const fadeAnimations = new KisAnimate({
	items: '.example.fade',
	type: 'fade-in',
});
fadeAnimations.init();

const slideAnimations = new KisAnimate({
	items: '.example.slide',
});
slideAnimations.init();

const textAnimation = new KisAnimateText({
	type: 'mask-slide-in-from-bottom',
	symbolDelayStep: 25,
});
textAnimation.init();
