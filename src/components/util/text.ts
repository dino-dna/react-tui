import { Colors16, Colors256, getColorCode } from "./colors";

export const bold = (text: string) => `{bold}${text}{/bold}`;

export const color = {
  fg: (text: string, color: keyof typeof Colors16 | keyof typeof Colors256) => {
    const code = getColorCode(color);
    return `{${code}-fg}${text}{/${code}-fg}`;
  },
  bg: (text: string, color: keyof typeof Colors16 | keyof typeof Colors256) => {
    const code: string = getColorCode(color);
    return `{${code}-bg}${text}{/${code}-bg}`;
  },
};
