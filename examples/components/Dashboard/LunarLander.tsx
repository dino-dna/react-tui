import React from "react";
import { Box, ProgressBar, colors, text } from "../../../src";
import { useInterval } from "../../utils/hooks/useInterval";

const { Colors256 } = colors;

export const LunarLander: React.FC<React.ComponentProps<typeof Box>> = (
  props
) => {
  const [filled, setFilled] = React.useState(100);
  useInterval(() => {
    setFilled((last) => (last === 0 ? 100 : last - 1));
  }, 100);
  return (
    <Box {...props}>
      <ProgressBar
        tags
        orientation="vertical"
        filled={filled}
        height="100%"
        width="100%"
        label={text.bold("Altitude (m)")}
        border={{ type: "line" }}
        style={{
          label: {},
          border: { fg: Colors256.CadetBlue },
          bar: { bg: Colors256.LightSkyBlue1 },
        }}
      />
    </Box>
  );
};
