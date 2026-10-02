module.exports = async function handleReaction(api, event, reactionMap) {
  if (!api || !event || !reactionMap) return;
  const messageID = String(event.messageID || "");
  if (!messageID) return;

  const reaction = reactionMap.get ? reactionMap.get(messageID) : reactionMap[messageID];
  if (!reaction) return;

  try {
    if (typeof reaction.callback === "function") {
      return await reaction.callback({ api, event });
    }
  } catch (error) {
    if (global.logger) global.logger(error, "error");
  }
};
