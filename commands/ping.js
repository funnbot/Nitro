exports.run = (message, bot) => {
  const m = await send("Testing Ping...");
  const ping = m.createdTimestamp - Date.now();
  const ws = bot.ping.toFixed();

  await m.edit(`**Pong!** Latency: ${ping}MS Websocket: ${ws}MS`);
  return;
}

exports.conf = {
  userPerm: [],
  botPerm: ["SEND_MESSAGES"],
  coolDown: 0,
  dm: true,
  category: "Other",
  help: "Ping! Pong!",
  args: ""
}