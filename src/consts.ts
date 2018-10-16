export const TOP = "top";
export const BOTTOM = "bottom";
export const LEFT = "left";
export const RIGHT = "right";
export type DIRECTION = "top" | "bottom" | "left" | "right";
export const REVERSE = {
  [TOP]: BOTTOM,
  [BOTTOM]: TOP,
  [LEFT]: RIGHT,
  [RIGHT]: LEFT,
};
export const TRI_CLASS = "__shape-tri-";
export const SIDE_CLASS = `${TRI_CLASS}side`;
export const POSITION_ABSOLUTE = "position:absolute;";
