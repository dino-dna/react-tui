/**
 * webpack-hmr logs to console, which in our demo messes up our blessed app.
 * console.log() induces effects in the terminal, which blessed thinks it owns,
 * and occurs unannounced to us. this log double instead pipes logs to `hmr.log`
 * instead of to your screen!
 */
import fs from 'fs'
const ws = fs.createWriteStream(`${process.cwd()}/hmr.log`)
const log = (a: any) => ws.write(`${a}\n`)
function dummy() {}

var logLevel = "info"

function shouldLog(level: string) {
	var shouldLog =
		(logLevel === "info" && level === "info") ||
		(["info", "warning"].indexOf(logLevel) >= 0 && level === "warning") ||
		(["info", "warning", "error"].indexOf(logLevel) >= 0 && level === "error");
	return shouldLog;
}

function logGroup(logFn: any) {
	return function(level: string, msg: string) {
		if (shouldLog(level)) {
			logFn(msg);
		}
	};
}

module.exports = function(level: string, msg: string) {
	if (shouldLog(level)) {
		if (level === "info") {
			log(msg);
		} else if (level === "warning") {
			log(msg);
		} else if (level === "error") {
			log(msg);
		}
	}
};

/* eslint-disable node/no-unsupported-features/node-builtins */
var group = log || dummy;
var groupCollapsed = log || dummy;
var groupEnd = log || dummy;
/* eslint-enable node/no-unsupported-features/node-builtins */

module.exports.group = logGroup(group);

module.exports.groupCollapsed = logGroup(groupCollapsed);

module.exports.groupEnd = logGroup(groupEnd);

module.exports.setLogLevel = function(level: string) {
	logLevel = level;
};

module.exports.formatError = function(err: Error) {
	var message = err.message;
	var stack = err.stack;
	if (!stack) {
		return message;
	} else if (stack.indexOf(message) < 0) {
		return message + "\n" + stack;
	} else {
		return stack;
	}
};
