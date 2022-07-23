# kis-animate

> Lightweight library that helps you to animate elements on your pages.
> 
> All the animations are written using CSS `@keyframes` what makes as smooth as possible.
> You can also add your own animations by supplementing css. All source files are placed in `src/lib` directory.

## Usage

### Install library

```powershell
npm install kis-animate
```

### Import library and initialize animation instance
```javascript
// index.js

import 'kis-animate/style'
import KisAnimate from 'kis-animate'

const animations = new KisAnimate();
animations.init();
```


## API

| Name                  | Attribute                | Type                                  | Default                  | Description                                                                                                                                                                                 |
|-----------------------|--------------------------|---------------------------------------|--------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| items                 | `-`                      | `string` or `NodeListOf<HTMLElement>` | `'[data-a-type]'`        | CSS selector or collection of items you want to animate.                                                                                                                                    |
| defaultType           | `data-a-type`            | `string`                              | `'slide-in-from-bottom'` | Name of the animation you want to use. Check [the list of animations available out of the box](/#animations).                                                                               |
| defaultTimingFunction | `data-a-timing-function` | `string`                              | `'ease'`                 | [Animation timing function](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timing-function "MDN").                                                                              |
| defaultDelay          | `data-a-delay`           | `number`                              | `0`                      | Delay in milliseconds after which the animation starts playing.                                                                                                                             |
| defaultDuration       | `data-a-duration`        | `number`                              | `800`                    | Animation duration in milliseconds.                                                                                                                                                         |
| defaultOffset         | `data-a-offset`          | `string`                              | `'0px'`                  | Allows you to trigger animation a bit later. Technically this is [IntersectionObserver rootMargin](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/rootMargin "MDN"). |
| defaultThreshold      | `data-a-threshold`       | `number`                              | `0.1`                    | Technically this is [IntersectionObserver threshold](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/rootMargin "MDN").                                               |
