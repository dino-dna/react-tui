import * as React from "react";
import { Box, Element } from "./primitives";
import { Widgets } from "neo-blessed";
import { RBProps } from "./util/blessed-react-compat";

export type GridItem = {
  row: number;
  col: number;
  rowSpan?: number;
  colSpan?: number;
  render: React.ElementType<Pick<React.ComponentProps<typeof Element>, "top" | "left" | "width" | "height">>;
};

export type GridProps = { cols: number; rows: number; items: GridItem[] };

export const Grid: React.FC<RBProps<GridProps & Widgets.BoxOptions, Widgets.BoxElement>> = (props) => {
  const { rows, cols, items, ...rest } = props;
  const [width, height] = [100 / cols, 100 / rows];
  return (
    <Box {...rest}>
      {items.map((item, i) => {
        const { row, col, rowSpan = 1, colSpan = 1, render: Component } = item;
        return (
          <Component
            {...{
              key: i,
              top: `${Math.floor(row * height)}%`,
              left: `${Math.floor(col * width)}%`,
              width: `${Math.floor(width * colSpan)}%`,
              height: `${Math.floor(height * rowSpan)}%`,
            }}
          />
        );
      })}
    </Box>
  );
};
