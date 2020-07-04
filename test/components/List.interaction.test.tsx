import ava, { TestInterface } from "ava";
import React from "react";
import { createSceenContext, TestSceenContext } from "../fixtures/context";
import { Box, List } from "../../src/components/primitives";

const test = ava as TestInterface<TestSceenContext>;

test.beforeEach(createSceenContext);

test("<List />", async (t) => {
  const {
    context: { render, RootBox, screen, screenToString, settle },
  } = t;
  let swapChild: (v: boolean) => void = (v) => {};
  function SwappingRootChild() {
    const [isChildSwapped, _swapChild] = React.useState(false);
    swapChild = _swapChild;
    return (
      <RootBox>
        {isChildSwapped ? (
          <Box>swapped</Box>
        ) : (
          <List
            label="some-list"
            border={{ type: "line" }}
            style={{ border: { fg: "blue" } }}
            items={["a", "b", "c"]}
          />
        )}
      </RootBox>
    );
  }
  /**
   * observe us set items in a list, swap them out, and swap the list back again
   */
  await render(<SwappingRootChild />);
  await settle();
  t.snapshot(screenToString(), "list-present");
  swapChild(true);
  await settle();
  screen.options?.input?.write("\x1b"); // send an ESCape key! mother trucker!!
  t.snapshot(screenToString(), "list-swapped-out");
  swapChild(false);
  await settle();
  t.snapshot(screenToString(), "list-restored");
});
