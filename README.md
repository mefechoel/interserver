[npm]: https://img.shields.io/npm/v/interserver.svg?style=flat-square
[npm-url]: https://npmjs.com/package/interserver

# Interserver

[![npm package][npm]][npm-url]
![npm bundle size](https://img.shields.io/bundlephobia/min/interserver?style=flat-square)
![NPM](https://img.shields.io/npm/l/interserver?style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/mefechoel/interserver?style=flat-square)

> IntersectionObserver simplified

`Interserver` is an easy way to check if a dom element is intersecting the viewport.

## Features

- Tiny (~1kb minified)
- TypeScript ready
- Framework agnostic (easily integrate `Interserver` with your favourite framework)
- React companion package ([`interserver-react`](https://www.npmjs.com/package/interserver-react))
- Svelte companion package ([`interserver-svelte`](https://www.npmjs.com/package/interserver-svelte))

## Installation

With `yarn`:
```bash
yarn add interserver
```

With `npm`:
```bash
npm install --save interserver
```

## Usage

```js
import interserver from "interserver";

const container = document.querySelector("#container");

// The handler is fired whenever `isIntersecting` changes
function handleChange(isIntersecting) {
  if (isIntersecting) {
    console.log("Container is visible!")
  }
}

const unobserve = interserver(container, handleChange);

// Cancel observation after five seconds
setTimeout(unobserve, 5000);
```

If you want to run cancel the observation after the first time, the container is visible, you can pass the `once` option to `interserver`:

```js
import interserver from "interserver";

const container = document.querySelector("#container");

function handleChange(isIntersecting) {
  if (isIntersecting) {
    console.log("I will run only once.")
  }
}

interserver(container, handleChange, { once: true });
```

You can also specify margins around the element (`top`, `right`, `bottom`, `left`), so that the handler will fire when the container is the specified margin away from the viewport:

```js
import interserver from "interserver";

const container = document.querySelector("#container");

function handleChange(isIntersecting) {
  if (isIntersecting) {
    console.log("I will run when I am 20px away from the viewport.")
  }
}

interserver(
  container,
  handleChange,
  { top: 20, right: 20, bottom: 20, left: 20 },
);
```

## API

```ts
/**
 * Observe an element and invoke a callback, when it is intersecting the viewport.
 *
 * @param container The DOM element that is being observed.
 * @param onChange The callback handler,
 * that will be called when the `isIntersecting` state changes.
 * @param options The observer options,
 * consisting of offset margins for the container (`top`, `right`, `bottom`, `left`)
 * and `once`. With `once` set to `true`,
 * observing stops after the element is first intersecting.
 *
 * @returns The `unobserve` function. Observation is canceled, when it is called.
 */
export type Interserver = (
  container: Element,
  onChange: InterserverOnChange,
  options?: InterserverOptions,
) => InterserverUnsubscribe;

/**
 * The callback handler, that will be called when the `isIntersecting` state changes.
 */
export type InterserverOnChange = (isIntersecting: boolean) => void;

/**
 * The observer options,
 * consisting of offset margins for the container (`top`, `right`, `bottom`, `left`)
 * and `once`.
 * With `once` set to `true`, observing stops after the element is first intersecting.
 */
export interface InterserverOptions {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
  once?: boolean;
}

/**
 * The `unsubscribe` function returned from a call to `interserver`.
 * It should be called, when the observation is not needed any more,
 * to prevent memory leaks.
 * If `InterserverOptions.once` is set to true, the `unsubscribe`
 * function will be called internally.
 */
export type InterserverUnsubscribe = () => void;
```

## License

MIT
