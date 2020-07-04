// import createDebug from "debug";
import * as fs from "fs";
import path from "path";

let ws: fs.WriteStream;
export const debug = (arg: any) => {
  const filename = process.env.REACT_TUI_DEBUG_LOG || "debug.log";
  const logFilename = path.isAbsolute(filename) ? filename : path.resolve(process.cwd(), filename);
  if (!ws) ws = fs.createWriteStream(logFilename);
  ws.write(`${arg}\n`);
};
