export * from "./components";
export * as colors from "./components/util/colors";
export * as text from "./components/util/text";
export * from "./components/util/blessed-react-compat";
import * as Blessed from "neo-blessed";
import { createReconciler } from "./reconciler/reconciler";
import { OpaqueRoot } from "react-reconciler";
import debounce from "lodash/debounce";
const pkg = require("../package.json");
import { debug as fsDebug } from "./components/util/debug";

const noopDebug = (...arg: any[]) => {};
export const debug = process.env.REACT_TUI_DEBUG_LOG ? fsDebug : noopDebug;

export const createBlessedRenderer = function (
  blessed: typeof Blessed,
  screen: Blessed.Widgets.Screen
) {
  const renderScreen = debounce(
    () => {
      // debug(":render:debounced");
      return screen.render();
    },
    16,
    { maxWait: 50, trailing: true }
  );
  const reconciler = createReconciler({ blessed, screen, renderScreen, debug });
  reconciler.injectIntoDevTools({
    bundleType: process.env.NODE_ENV === "development" ? 1 : 0,
    version: pkg.version,
    rendererPackageName: pkg.name,
    // findHostInstanceByFiber: renderer.findHostInstance,
  });
  const roots = new Map<Blessed.Widgets.BlessedElement, OpaqueRoot>();
  function render(
    element: React.ReactElement,
    container: Blessed.Widgets.BlessedElement,
    callback?: (() => void) | null
  ) {
    let root: OpaqueRoot | undefined = roots.get(container);
    if (!root) {
      root = reconciler.createContainer(container, true, false);
      roots.set(container, root);
    }
    reconciler.updateContainer(element, root, null, callback as any);
    setImmediate(() => screen.render());
    return reconciler.getPublicRootInstance(root);
  }
  render.reconciler = reconciler;
  return render;
};
