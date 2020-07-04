import * as React from "react";
import { Box } from "../../../src";

export const RootBox: typeof Box = React.forwardRef((props, ref) => {
  return (
    <Box
      label="root-box"
      width="100%"
      height="100%"
      border={{ type: "line" }}
      style={{ border: { fg: "blue" } }}
      {...props}
      ref={ref}
    />
  );
});
