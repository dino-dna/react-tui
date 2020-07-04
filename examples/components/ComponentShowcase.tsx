import * as React from "react";
import { Box, Button } from "../../src/components/primitives";
import { Grid } from "../../src/components/Grid";
import { button as buttonStyle, demoBorderStyles } from "../utils/styles";

type ComponentDemoProps = {};
const ComponentDemo: React.FC<
  React.ComponentProps<typeof Box> & ComponentDemoProps
> = (props) => <Box {...props} {...demoBorderStyles} />;

const NavButton = ({ children, style, ...rest }: any) => (
  <Button
    content={children}
    {...demoBorderStyles()}
    style={{
      ...buttonStyle,
      ...style,
    }}
    align="center"
    scrollable
    keys
    input
    mouse
    clickable
    {...rest}
  />
);

export type Example = { label: string; component: JSX.Element };

export function ComponentShowcase({
  examples,
  page,
}: {
  examples: Example[];
  page?: number;
}) {
  const [index, setIndex] = React.useState(page || 0);
  const nav = (inc: number) => () => {
    const next = inc + index;
    if (next < 0 && inc < 0) return setIndex(examples.length - 1);
    if (next === examples.length) return setIndex(0);
    return setIndex(next);
  };
  return (
    <Box
      width="100%"
      height="100%"
      label="component-showcase"
      {...demoBorderStyles()}
    >
      <Grid
        rows={1}
        cols={2}
        width="100%-2"
        height={3}
        items={[
          {
            row: 0,
            col: 0,
            colSpan: 1,
            rowSpan: 1,
            render: (props) => (
              <NavButton {...props} onpress={nav(-1)}>
                {"< Prev"}
              </NavButton>
            ),
          },
          {
            row: 0,
            col: 1,
            colSpan: 1,
            rowSpan: 1,
            render: (props) => (
              <NavButton {...props} onpress={nav(1)}>
                {"Next >"}
              </NavButton>
            ),
          },
        ]}
      />
      <ComponentDemo
        width="100%-2"
        height="100%-5"
        top={3}
        label={`demo-zone - ${examples[index].label}`}
        children={examples[index].component}
        {...demoBorderStyles()}
      />
    </Box>
  );
}
