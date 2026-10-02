module.exports = async function handleReply(api, event, replyMap) {
  if (!replyMap || !event) return;
  const threadID = String(event.threadID || "");
  const senderID = String(event.senderID || "");
  if (!threadID || !senderID) return;

  const key = threadID + ":" + senderID;
  const reply = replyMap.get ? replyMap.get(key) : replyMap[key];
  if (!reply) return;

  try {
    if (typeof reply.callback === "function") {
      return await reply.callback({
        api,
        event,
        args: event.body ? String(event.body).trim().split(/\s+/) : []
      });
    }
  } catch (error) {
    if (global.logger) global.logger(error, "error");
  }
};
