# Interserver

> IntersectionObserver simplified

`Interserver` is an easy way to check if a dom element is intersecting the viewport.

## Features

- Tiny (~1kb minified)
- TypeScript ready
- Framework agnostic (easily integrate `Interserver` with your favourite framework)
- React companion package ([`interserver-react`](https://www.npmjs.com/package/interserver-react))

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

setTimeout(unobserve, 5000);
```
