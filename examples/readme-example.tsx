import React from "react";
import blessed from "neo-blessed";
import { createBlessedRenderer } from "../";
const screen = blessed.screen({
  /* ... */
});
screen.key(["q", "C-c"], () => process.exit(0));
const render = createBlessedRenderer(blessed, screen);
const container = blessed.box();
screen.append(container);
const DemoApp: React.FC = () => <>Greetings from react-tui</>;
render(<DemoApp />, container);
