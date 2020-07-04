import * as React from "react";
import { Element, Grid, GridItem } from "../../";

export function GridDemo() {
  return (
    <Grid
      tid="root"
      label="demo"
      width="100%"
      height="100%"
      border={{ type: "line" }}
      style={{ border: { fg: "blue" } }}
      rows={3}
      cols={3}
      items={[...Array<any>(3)].flatMap((_: undefined, row: number) =>
        [...Array(3)].map((_: undefined, col: number) => {
          return {
            row,
            col,
            rowSpan: 1,
            colSpan: 1,
            render: (props) => (
              <Element
                border={{ type: "line" }}
                style={{ border: { fg: "blue" } }}
                {...props}
              >
                {`${row},${col}`}
              </Element>
            ),
          } as GridItem;
        })
      )}
    />
  );
}
