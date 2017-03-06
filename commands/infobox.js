exports.run = (message, bot, send) => {
  if (!message.args[0]) return send("**Provide the message to be set as your info box**");
  if (message.suffix.length > 120) return send("**Your info box message must be less than 120 characters.**");
  bot.profile.setShout(message.author.id, message.suffix);
  send("**Your info box message was set to: **\n" + message.suffix)
}

exports.conf = {
  userPerm: [],
  botPerm: ["SEND_MESSAGES"],
  coolDown: 0,
  dm: false,
  category: "Social",
  help: "Set the info box message on your profile.",
  args: "",
}