import React from "react";
import { Box } from "../src/components/primitives";
import { Widgets } from "neo-blessed";
import { demoBorderStyles } from "./utils/styles";

// demo components
import { AnimatedBox } from "./components/AnimatedBox";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { GridDemo } from "./components/GridDemo";
import { ManualShowcase } from "./components/ManualShowcase";
import { PrimitiveShowcase } from "./components/PrimitiveShowcase";

type DemoSelect = { demo?: string | null; page?: number };

const examples = [
  {
    name: "<AnimatedBox />",
    component: (props: any) => <AnimatedBox />,
  },
  {
    name: "<Dashboard />",
    component: () => <Dashboard />,
  },
  {
    name: "<Grid />",
    component: (props: any) => <GridDemo />,
  },
  {
    name: "Component Library Showcase",
    component: (props: any) => <PrimitiveShowcase {...props} />,
  },
  {
    name: "Manual Examples",
    component: (props: any) => <ManualShowcase {...props} />,
  },
];

const listStyle = {
  selected: {
    fg: "white",
    bold: true,
    bg: "red",
    underline: true,
  },
  item: {
    fg: "blue",
    blink: true,
  },
  scrollbar: {
    bg: "blue",
  },
};

class DemoApp extends React.PureComponent<
  { screen: Widgets.Screen } & DemoSelect,
  DemoSelect
> {
  constructor(props: any) {
    super(props);
    this.state = {
      demo: props.demo ?? null,
      page: props.page ?? null,
    };
  }

  componentDidMount() {
    const onQuit = () => process.exit(0);
    const onBack = () => {
      if (!this.state.demo) {
        return onQuit();
      }
      this.setState({ demo: null });
    };
    const { screen } = this.props;
    screen.key(["q"], onQuit);
    screen.key(["escape", "C-c"], onBack);
    screen.key(["tab"], () => {
      screen.focusNext();
    });
  }

  render() {
    const { demo } = this.state;
    if (demo) {
      const foundDemo = examples.find((ex) => ex.name === demo)?.component!(
        this.state
      )!;
      if (foundDemo) return foundDemo;
    }
    return (
      <Box
        tid="root"
        label=" react-tui // Examples"
        width="100%"
        height="100%"
        {...demoBorderStyles()}
      >
        <Box width="40%" focusable={false} tid="instructions">
          {[
            "Select a demo 😎",
            "Use the arrow keys and hit enter to select a demo.",
            "Press Esc or q to go back a screen, or quit!",
          ].join("\n\n")}
        </Box>
        <list
          tid="select-demo"
          left="40%+1"
          width="55%"
          keys
          mouse
          items={examples.map((ex) => ex.name)}
          style={listStyle}
          onattach={(node: any) => node.focus()}
          onselect={(node: any) => this.setState({ demo: node.value })}
        />
      </Box>
    );
  }
}

export default DemoApp;
