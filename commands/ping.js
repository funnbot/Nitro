exports.run = (message, bot, send) => {
  send("Pong!");
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