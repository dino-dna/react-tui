import React from "react";
import { Log, colors, text } from "../../../";
import { Widgets } from "neo-blessed";
import { useInterval } from "../../utils/hooks/useInterval";

const cosmonautNames = [
  "Alexander",
  "Bogdan",
  "Dmitry",
  "Ivan",
  "Maksim",
  "Miroslav",
  "Vladimir",
  "Vladislav",
  "Yaroslav",
];

const phrases: ((opts: { name: string }) => string)[] = [
  () => `I like to ride my velosiped`,
  () => `We're biking on the moon, right?`,
  () => `What sort of gearing ratios does this lander have anyway?`,
  () => `Who wants to wheelie?`,
  ({ name }) =>
    `I will be the first to shred lunar gnar, or my name is not ${name}!`,
  () => `We brought a pump, right?`,
  () => `26" or 29", comrade?`,
  () => `I installed triple crown fork onto lundar lander suspension system.`,
  () => `#fatbike as a space bike? Am I right?`,
  () => `If the moon has no trees, does that make one, giant trail?`,
];

const getRandomInRange = (len: number) => Math.floor(len * Math.random());
const getRandomCosmonautName = () =>
  cosmonautNames[getRandomInRange(cosmonautNames.length)];
const getRandomCosmonautPhrase = (opts: { name: string }) =>
  phrases[getRandomInRange(phrases.length)](opts);

export const Journal: React.FC<React.ComponentProps<typeof Log>> = (props) => {
  const ref = React.useRef<Widgets.Log>({} as any);
  useInterval(() => {
    const color = colors.getRandom256();
    if (Math.random() < 0.08) {
      return ref.current?.add(
        text.bold(
          `
      ${text.color.fg(
        `Mission Control`,
        color
      )}: Focus on the mission guys. Enough bike talk.`.trim()
        )
      );
    }
    const name = getRandomCosmonautName();
    ref.current?.add(
      text.bold(
        `${text.bold(text.color.fg(name, color))} (Cosmonaut): ${text.color.fg(
          getRandomCosmonautPhrase({ name }),
          color
        )}`
      )
    );
  }, 1000);
  return (
    <Log
      label={text.color.bg(text.bold(" 🛰  Space Chat  "), "DarkViolet")}
      ref={ref}
      border={{ type: "bg" }}
      scrollback={100}
      tags
      keys
      alwaysScroll
      scrollbar={{
        style: { bg: colors.Colors256.DarkViolet, fg: colors.Colors256.White },
        ch: "||",
      }}
      mouse
      style={{ border: { bg: colors.Colors256.DarkCyan, ch: "#" } }}
      {...props}
    />
  );
};
