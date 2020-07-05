import * as React from "react";
import { Grid } from "../../src/components/Grid";
import { Box, Element, List, Textbox } from "../../src/components/primitives";
import { demoBorderStyles } from "../utils/styles";
import { ComponentShowcase, Example } from "./ComponentShowcase";

const examples: Example[] = [
  {
    label: "boxes-on-boxes",
    component: (
      <>
        {[...Array(10)].map((__, i) => (
          <Box {...demoBorderStyles()}>{`greetings from box: ${i}`}</Box>
        ))}
      </>
    ),
  },
  {
    label: "boxes-with-top",
    component: (
      <>
        {[...Array(10)].map((__, i) => (
          <Box top={i}>{`greetings from box: ${i}`}</Box>
        ))}
      </>
    ),
  },
  {
    label: "verbose-4x4",
    component: (
      <Element>
        <Box left={0} top={0} width="50%" children={1} />
        <Box left="50%" top={0} width="50%" children={2} />
        <Box left={0} top="50%" width="50%" children={3} />
        <Box left="50%" top="50%" width="50%" children={4} />
      </Element>
    ),
  },
  {
    label: "verbose-4x4-border-height",
    component: (
      <Element>
        <Box
          label="box #1"
          left={0}
          top={0}
          width="50%"
          height="50%"
          {...demoBorderStyles()}
          children={1}
        />
        <Box
          label="box #2"
          left="50%"
          top={0}
          width="50%"
          height="50%"
          {...demoBorderStyles()}
          children={2}
        />
        <Box
          label="box #3"
          left={0}
          top="50%"
          width="50%"
          height="50%"
          {...demoBorderStyles()}
          children={3}
        />
        <Box
          label="box #4"
          left="50%"
          top="50%"
          width="50%"
          height="50%"
          {...demoBorderStyles()}
          children={4}
        />
      </Element>
    ),
  },
  {
    label: "grid-3x3-with-spans",
    component: (
      <Grid
        cols={3} // allow us to have 1/3 increment widths
        rows={2} // allow us to have 1/2 increment heights
        items={[
          {
            row: 0,
            col: 0,
            render: (props) => (
              // props have all of our positioning data precomputed. pass em thru!
              <Element
                {...props}
                {...demoBorderStyles()}
                children="Section 1"
              />
            ),
          },
          {
            row: 1,
            col: 0,
            render: (props) => (
              <Element
                {...props}
                {...demoBorderStyles()}
                children="Section 2"
              />
            ),
          },
          {
            row: 0,
            col: 1,
            rowSpan: 2,
            colSpan: 2,
            render: (props) => (
              <Element
                {...props}
                {...demoBorderStyles()}
                children="Section 3"
              />
            ),
          },
        ]}
      />
    ),
  },
  {
    label: "verbose-interactivity",
    component: (
      <Element>
        <Textbox
          height={3}
          label="textbox"
          width="75%"
          keys
          {...demoBorderStyles()}
        />
        <List
          top={3}
          height={5}
          items={[...Array(10)].map(
            (_, i) => `${i}. square: ${Math.pow(i, 2)}`
          )}
          style={{
            selected: {
              fg: "white",
              bold: true,
              bg: "red",
              underline: true,
            },
          }}
          scrollable
          keys
          mouse
        />
      </Element>
    ),
  },
].map(({ label, component }, i) => ({
  label,
  component: <Element key={i}>{component}</Element>,
}));

export const ManualShowcase = () => <ComponentShowcase examples={examples} />;
