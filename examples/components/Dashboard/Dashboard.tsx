import React from "react";
import { Box, colors, Grid, text } from "../../../src";
import { LunarLander } from "./LunarLander";
import { SystemsReport } from "./SystemsReport";
import { Journal } from "./Journal";
import { CommandCenter } from "./CommandCenter";

export const Dashboard: React.FC = () => {
  return (
    <Box
      label={text.bold("NASA Dashboard")}
      border={{ type: "line", fg: colors.Colors256.Magenta1 as any }}
      tags
    >
      <Grid
        rows={4}
        cols={8}
        items={[
          { row: 0, col: 0, rowSpan: 4, colSpan: 1, render: LunarLander },
          { row: 0, col: 5, rowSpan: 2, colSpan: 3, render: SystemsReport },
          { row: 0, col: 1, rowSpan: 4, colSpan: 4, render: Journal },
          { row: 2, col: 5, rowSpan: 2, colSpan: 3, render: CommandCenter },
        ]}
      ></Grid>
    </Box>
  );
};
