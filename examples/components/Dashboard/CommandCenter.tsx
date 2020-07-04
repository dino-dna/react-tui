import React from "react";
import { Box, colors, text, Textbox, Button } from "../../../src";

export const buttonStyle = {
  fg: "blue",
  bg: "black",
  border: {
    fg: "blue",
  },
  scrollbar: {
    bg: "blue",
  },
  focus: {
    bg: "red",
  },
  hover: {
    bg: "red",
  },
};

export const CommandCenter: React.FC<React.ComponentProps<typeof Box>> = (
  props
) => {
  return (
    <Box
      border={{ type: "line" }}
      keys
      label="Command Center"
      mouse
      tags
      {...props}
    >
      {"Insert command:"}
      <Textbox
        onsubmit={(node) => {
          // setSubmission({ ...submission });
        }}
        border={{ type: "line" }}
        style={{ border: { fg: colors.Colors256.LightSlateGrey } }}
        width="100%-2"
        top={1}
        height={3}
        keys
        mouse
        inputOnFocus
      />
      <Button height={2} left={1} style={buttonStyle} top={5} width={10}>
        Cancel
      </Button>
      <Button
        height={2}
        left={13}
        style={buttonStyle}
        top={5}
        width={10}
        tags
        align="center"
      >
        {text.bold("Execute Cmd")}
      </Button>
      <Button
        height={3}
        left={1}
        style={{
          ...buttonStyle,
          bg: colors.Colors256.DarkRed,
          fg: colors.Colors16.White,
        }}
        align="center"
        bottom={0}
        width="100%-4"
        tags
      >
        {text.bold("ABORT MISSION")}
      </Button>
    </Box>
  );
};
