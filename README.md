# shape-tri  [![npm version](https://badge.fury.io/js/shape-tri.svg)](https://badge.fury.io/js/shape-tri)

Make CSS Triangle Shape

```sh
$ npm install shape-tri
```

## Options
```ts
import {tri} from "shape-tri";

tri({
  radius: string,
  strokeWidth: number | string,
  className?: string,
  container?: HTMLElement,
  fill?: string,
  direction?: string,
  stroke?: string
});
```
## How to Use
```js
import {tri} from "shape-tri";

const el = tri({radius: "100px", strokeWidth: "5px"});

document.body.appendChild(el);
```