# kis-animate


> Lightweight library that helps you to animate elements on your pages.
>
> All the animations are written using CSS `@keyframes` and `transition` properties what makes them as smooth as possible.
> You can also **add your own** animations by supplementing css. All source files are placed in `src/lib` directory.

## Usage

### Install library

```powershell
npm install kis-animate
```

### Import library and initialize animation instance
```javascript
// your-file.js

import 'kis-animate/style'
import { KisAnimate, KisAnimateText } from 'kis-animate'

const animation = new KisAnimate();
animation.init();

const customisedAnimation = new KisAnimate({
	items: '.items-selector', // or NodeListOf<HTMLElement>
	delayStep: 200,
	duration: 500,
	// ...
	// You can find more parameters in API section bellow
});
customisedAnimation.init();

const textAnimation = new KisAnimateText();
textAnimation.init();

const customisedTextAnimation = new KisAnimate({
	items: '.text-selector', // or NodeListOf<HTMLElement>
	symbolDelay: 20,
	// ...
	// You can find more parameters in API section bellow
});
customisedTextAnimation.init();
```


## API

### KisAnimate

| Name           | Attribute                | Type                                  | Default                  | Description                                                                                                                                                                                 |
|----------------|--------------------------|---------------------------------------|--------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| items          | `-`                      | `string` or `NodeListOf<HTMLElement>` | `'[data-a-type]'`        | CSS selector or collection of items you want to animate or NodeList of HTML elements.                                                                                                       |
| type           | `data-a-type`            | `string`                              | `'slide-in-from-bottom'` | Name of the animation you want to use. Check [the list of animations available out of the box](https://github.com/kirillsakun/kis-animate#list-of-available-animation-types).               |
| timingFunction | `data-a-timing-function` | `string`                              | `'ease'`                 | [Animation timing function](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timing-function "MDN").                                                                              |
| delay          | `data-a-delay`           | `number`                              | `0`                      | Delay in milliseconds after which the animation starts playing.                                                                                                                             |
| delayStep      | `-`                      | `number`                              | `0`                      | Delay in milliseconds after which the next item animation will be fired.                                                                                                                    |
| duration       | `data-a-duration`        | `number`                              | `800`                    | Animation duration in milliseconds.                                                                                                                                                         |
| offset         | `data-a-offset`          | `string`                              | `'0px'`                  | Allows you to trigger animation a bit later. Technically this is [IntersectionObserver rootMargin](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/rootMargin "MDN"). |
| threshold      | `data-a-threshold`       | `number`                              | `0.1`                    | Technically this is [IntersectionObserver threshold](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/rootMargin "MDN").                                               |

#### List of available animation types
	- fade-in
	- fade-out
	- slide-in-from-bottom
	- slide-in-from-top

### KisAnimateText

| Name           | Attribute                     | Type                                  | Default                  | Description                                                                                                                                                                                 |
|----------------|-------------------------------|---------------------------------------|--------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| items          | `-`                           | `string` or `NodeListOf<HTMLElement>` | `'[data-a-text-type]'`   | CSS selector or collection of items you want to animate or NodeList of HTML elements.                                                                                                       |
| type           | `data-a-text-type`            | `string`                              | `'slide-in-from-bottom'` | Name of the animation you want to use. Check [the list of animations available out of the box](https://github.com/kirillsakun/kis-animate#list-of-available-animation-types).               |
| timingFunction | `data-a-text-timing-function` | `string`                              | `'ease'`                 | [Transition timing function](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function "MDN").                                                                            |
| delay          | `data-a-text-delay`           | `number`                              | `0`                      | Delay in milliseconds after which the animation starts playing.                                                                                                                             |
| symbolDelay    | `data-a-text-symbol-delay`    | `number`                              | `10`                     | Delay between each symbol animation. *Personal recommendation:* use something like half of the element font size in pixels. 20 for 40px text, 8 for 16px text etc..                         |
| duration       | `data-a-text-duration`        | `number`                              | `800`                    | Animation duration in milliseconds for each symbol.                                                                                                                                         |
| offset         | `data-a-text-offset`          | `string`                              | `'0px'`                  | Allows you to trigger animation a bit later. Technically this is [IntersectionObserver rootMargin](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/rootMargin "MDN"). |
| threshold      | `data-a-text-threshold`       | `number`                              | `0.1`                    | Technically this is [IntersectionObserver threshold](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/rootMargin "MDN").                                               |

#### List of available text animation types
	- slide-in-from-bottom
	- slide-in-from-bottom-mask
