export function connect() {
  const defineProperty = Object.defineProperty;
  defineProperty(global, "WebSocket", {
    value: require("ws"),
  });
  defineProperty(global, "window", {
    value: global,
  });
  const { connectToDevTools } = require("react-devtools-core");
  return connectToDevTools({
    isAppActive() {
      return true;
    },
    host: "localhost",
    port: 8097,
    resolveRNStyle: null,
  });
}
