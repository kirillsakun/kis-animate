import './styles/main.scss';


// @ts-ignore
import KisAnimate from './animate.ts';


const fadeAnimations = new KisAnimate({
	items: '.example.fade',
	defaultType: 'fade-in',
});

fadeAnimations.init();
