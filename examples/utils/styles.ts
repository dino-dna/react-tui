import { Widgets } from "neo-blessed";

export const demoBorderStyles: () => Partial<Widgets.ElementOptions> = () => ({
  border: { type: "line" },
  style: {
    border: { fg: "blue" },
    focus: {
      border: { fg: "red" },
    },
  },
});

export const button = {
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
