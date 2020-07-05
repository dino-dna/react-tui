import React from "react";
import blessed from "neo-blessed";
import { createBlessedRenderer, debug } from "../";
import DemoApp from "./DemoApp";

const screen = blessed.screen({
  autoPadding: true,
  cursor: {
    artificial: false,
    blink: true,
    shape: "block",
    color: "red",
  },
  fullUnicode: true,
  smartCSR: true,
  // dockBorders: true,
  title: "react-tui // examples",
});

const renderBlessed = createBlessedRenderer(blessed, screen);
const container = blessed.box({
  width: "100%",
  height: "100%",
  mouse: true,
  keyable: true,
});
screen.append(container);
(global as any).blessedScreen = screen;

function render(DemoApp: React.ElementType) {
  const demo = process.argv[2] ? process.argv[2].trim() : "";
  const page = process.argv[3] ? parseInt(process.argv[3], 10) : 0;
  debug(`\n\nrendering <DemoApp />`);
  renderBlessed(<DemoApp {...{ screen, demo, page }} />, container);
}

if (!module.parent) render(DemoApp);

const mod: any = module;
if (mod.hot) {
  mod.hot.accept("./examples/DemoApp.js", () =>
    render(require("./DemoApp").default)
  );
}
