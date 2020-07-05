import ava, { TestInterface } from "ava";
import React from "react";
import { createSceenContext, TestSceenContext } from "./fixtures/context";
import { Widgets } from "neo-blessed";

const test = ava as TestInterface<TestSceenContext>;

test.beforeEach(createSceenContext);

test("hooks - useRef", async (t) => {
  const { render, RootBox, settle } = t.context;
  let testRef: React.RefObject<any>;
  const RefTester: React.FC = () => {
    const ref = React.useRef<Widgets.ButtonElement>(null);
    testRef = ref;
    return <RootBox ref={ref} children="use-ref-test" />;
  };
  await render(<RefTester />);
  await settle();
  t.truthy(testRef!.current);
});

test("not-hooks :) - createRef", async (t) => {
  const { render, RootBox, settle, screenToString } = t.context;
  let testRef: React.RefObject<any>;
  class RefTester extends React.PureComponent {
    private ref: React.RefObject<any>;
    constructor(props: any) {
      super(props);
      this.ref = React.createRef();
      testRef = this.ref;
    }
    render() {
      return <RootBox ref={this.ref} children="use-ref-test" />;
    }
  }
  await render(<RefTester />);
  await settle();
  t.snapshot(screenToString());
  t.truthy(testRef!.current); // @todo fail! :(
});
