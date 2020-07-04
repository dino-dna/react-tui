import { Widgets } from "neo-blessed";

export type NodeEventHandler = <T extends Widgets.Node>(arg: T) => void;
export type MouseEventHandler = (arg: Widgets.Events.IMouseEventArg) => void;
export type KeyHandler = (ch: string, key: Widgets.Events.IKeyEventArg) => void;

export type BlessedNodeHandlers = {
  // @todo confirm that Widget.Node is _actually_ received
  onblur: NodeEventHandler; // blur
  onfocus: NodeEventHandler; // focus
  onmouse: MouseEventHandler; // mouse
  onmousedown: MouseEventHandler; // mousedown
  onmouseup: MouseEventHandler; // mouseup
  onwheeldown: MouseEventHandler; // wheeldown
  onwheelup: MouseEventHandler; // wheelup
  onmouseover: MouseEventHandler; // mouseover
  onmouseout: MouseEventHandler; // mouseout
  onmousemove: MouseEventHandler; // mousemove
  onclick: NodeEventHandler; // click
  onkeypress: KeyHandler; // keypress
  onmove: NodeEventHandler; // move
  onresize: NodeEventHandler; // resize
  onkey: KeyHandler; // key
  // @warning - these events are intentionally omitted, as they should not be
  // necessary in a react usage context
  // prerender
  // render
  // hide
  // show
  // destroy
};
