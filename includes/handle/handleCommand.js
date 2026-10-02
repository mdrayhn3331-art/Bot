const { readFileSync, existsSync } = require("fs");
const path = require("path");

module.exports = function handleCommand(api, event, args, commands) {
  if (!commands || !commands.size) return;
  const body = event && event.body ? String(event.body) : "";
  if (!body) return;
  const prefix = global.GoatBot && global.GoatBot.config && global.GoatBot.config.prefix
    ? global.GoatBot.config.prefix
    : (global.config && global.config.PREFIX) || "!";
  if (!body.startsWith(prefix)) return;

  const input = body.slice(prefix.length).trim();
  if (!input) return;
  const parts = input.split(/\s+/);
  const commandName = parts.shift().toLowerCase();
  const command = commands.get(commandName);
  if (!command) return;

  return command.run({
    api,
    event,
    args: parts,
    threadsData: global.db && global.db.threadsData,
    usersData: global.db && global.db.usersData,
    message: require("../../utils/log")
  });
};
