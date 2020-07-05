import { Implementation } from "ava";
import { getScreen } from "./screen";
import { screenToString } from "../util/screen";
import { createTestRenderer, settle } from "./render";
import { RootBox } from "./components/RootBox";

type Renderer = ReturnType<typeof createTestRenderer>;
export type TestSceenContext = {
  screenToString: () => string;
  screen: ReturnType<typeof getScreen>;
  renderer: Renderer;
  render: Renderer["render"];
  RootBox: typeof RootBox;
  settle: typeof settle;
};
export const createSceenContext: Implementation<TestSceenContext> = (t) => {
  const screen = getScreen();
  const renderer = createTestRenderer(screen);
  t.context = {
    ...t.context,
    screenToString: () => screenToString(screen),
    screen,
    renderer,
    render: renderer.render.bind(renderer),
    RootBox,
    settle,
  };
};
