import { BOTTOM, TOP, RIGHT, LEFT, REVERSE, DIRECTION, SIDE_CLASS, POSITION_ABSOLUTE, TRI_CLASS } from "./consts";

function splitUnit(text: string) {
  const matches = /^([^\d|e|\-|\+]*)((?:\d|\.|-|e-|e\+)+)(\S*)$/g.exec(text);

  if (!matches) {
    return { unit: "", value: NaN };
  }
  const value = matches[2];
  const unit = matches[3];

  return { unit, value: parseFloat(value) };
}

function getSideCSS(strokeWidth: string, isVertical: boolean) {
  const x = isVertical ? strokeWidth : "50%";
  const y = isVertical ? "50%" : strokeWidth;

  return `${POSITION_ABSOLUTE}width:100%;height:100%;border-radius:inherit;background-color:inherit;` +
          `transform-origin:${x} ${y};`;
}

function makeDOM(tag: string, className: string) {
  const el = document.createElement(tag);

  el.className = className;
  return el;
}
export function tri({
  className = `${TRI_CLASS}triangle`,
  strokeWidth = 0,
  stroke = "black",
  fill = "transparent",
  direction = BOTTOM,
  container = makeDOM("div", className),
}: {
  strokeWidth: number | string,
  className?: string,
  container?: HTMLElement,
  fill?: string,
  direction?: DIRECTION,
  stroke?: string
}) {
  const {unit: strokeUnit, value: strokeValue} = splitUnit(`${strokeWidth}`);
  const half = `${strokeValue / 2}${strokeUnit}`;
  const isVertical = direction === TOP || direction === BOTTOM;
  const sideCSS = getSideCSS(half, isVertical);
  const directionProperty = isVertical ? LEFT : TOP;
  const sign = direction === TOP || direction === RIGHT ? -1 : 1;
  const width = isVertical ? "100%" : strokeWidth;
  const height = isVertical ? strokeWidth : "100%";
  // (50% - strokeWidth / 2) * r3 + strokeWidth
  const padding = isVertical ? `calc(50% * 1.7321 + ${strokeWidth} * 0.132)` :
  // (100% - strokeWidth) / r3 * 2 + strokeWidth
    `calc(200% / 1.7321 - ${strokeWidth} * 1.154 + ${strokeWidth})`;
  const reverseDirection = REVERSE[direction];
  const sideHTML = `<div class="${SIDE_CLASS}1" style="${POSITION_ABSOLUTE}${reverseDirection}: 0;
  display:inline-block;width:${width};height:${height};border-radius:${half};
  background:${stroke};"><div class="${SIDE_CLASS}2"
  style="${sideCSS}transform:rotate(${sign * 60}deg);"></div><div class="${SIDE_CLASS}3"
  style="${sideCSS}${directionProperty}:100%;
  margin-${directionProperty}:-${strokeWidth};
  transform:rotate(${sign * 120}deg)"></div></div><div class="${TRI_CLASS}percent" style="position:relative;
  width:100%;padding-top:${padding};"
  ></div>`;

  container.insertAdjacentHTML("beforeend", sideHTML);

  return container;
}

export const VERSION = "#__VERSION__#";
