import KisAnimate from '../../../src/index.ts';

import '../styles/main.scss';

const fadeAnimations = new KisAnimate({
	items: '.example.fade',
	defaultType: 'fade-in',
});

fadeAnimations.init();

const slideAnimations = new KisAnimate({
	items: '.example.slide',
});

slideAnimations.init();
