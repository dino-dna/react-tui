import * as blessed from "neo-blessed";
import { createReconciler } from "../../src/reconciler/reconciler";
import { OpaqueRoot } from "react-reconciler";
import debounce from "lodash/debounce";
import { createBlessedRenderer } from "../../src";

export const settle = () => new Promise((res) => setTimeout(res, 50));
export const createTestRenderer = function (screen: blessed.Widgets.Screen) {
  const render = createBlessedRenderer(blessed, screen);
  const container = blessed.box({
    width: "100%",
    height: "100%",
    mouse: true,
    keyable: true,
  });
  screen.append(container);
  return {
    render: (el: React.ReactElement) => render(el, container),
    reconciler: render.reconciler,
  };
};
