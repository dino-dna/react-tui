import React from "react";
import { List, colors, text } from "../../../src";
import { useInterval } from "../../utils/hooks/useInterval";

const systems = [
  "Blaster shield",
  "Bottom thrusters",
  "Flightdeck compute subsystem",
  "G-diffuser",
  "Hyperdrive cores",
  "Lateral thrusters",
  "Orbital aligners",
  "Oxengization",
  "Pressurization module A",
  "Pressurization module B",
  "Propulsion fuel regulators",
  "Propulsion thermal regulation",
  "Real-time particulate analysis",
  "Satcomms",
  "Wronskian differential ALUs",
];

enum States {
  OK = "✓",
  DOWN = "✘",
  WARN = "~",
}
const getRandomReport = () =>
  systems.map((system) => {
    const zed = Math.random();
    if (zed > 0.95)
      return [
        States.DOWN,
        text.color.bg(text.color.fg(` ${States.DOWN} `, "White"), "Red3"),
        text.color.fg(system, "IndianRed"),
      ];
    if (zed > 0.9)
      return [
        States.WARN,
        text.color.bg(
          text.color.fg(` ${States.WARN} `, "White"),
          "DarkOrange3"
        ),
        text.color.fg(system, "Orange3"),
      ];
    return [
      States.OK,
      text.color.bg(text.color.fg(` ${States.OK} `, "White"), "Green"),
      text.color.fg(system, "Green4"),
    ];
  });

export const SystemsReport: React.FC<React.ComponentProps<typeof List>> = (
  props
) => {
  const [reports, setReports] = React.useState<string[][]>(getRandomReport());
  useInterval(() => setReports(getRandomReport()), 2000);
  return (
    <List
      border={{ type: "line" }}
      height="100%"
      invertSelected={false}
      items={reports.map(([_state, ...rest]) => rest.join(" "))}
      keys
      label="Systems Report"
      mouse
      scrollable
      style={{
        border: {
          fg: reports.every(([status]) => status === States.OK)
            ? colors.Colors16.Green
            : colors.Colors16.Red,
        },
      }}
      tags
      width="100%"
      {...props}
    />
  );
};
