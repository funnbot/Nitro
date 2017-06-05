exports.run = (message, bot) => {
  let prefix = message.guild.prefix
  if (!message.args[0]) return message.channel.send("To add a tag use: `" + prefix + "addtag <tagName> <the text for this tag>`");
  let tags = message.guild.tags
  if (Object.keys(tags).length > 100) return send("**You've hit the max amount of tags per server: 100, delete a few first**")

  message.suffix = nu.clean(message.suffix)
  message.args.forEach((arg, i) => message.args[i] = nu.clean(arg))

  if (tags[message.args[0]]) return message.channel.send("**The tag `" + message.args[1] + "` already exists**");
  if (!message.args[1]) return message.channel.send(`Provide the text for the tag after the name.`);
  let r = message.suffix.split(" ");
  r = r.slice(1)
  let text = r.join(" ");
  tags[message.args[0]] = {
    owner: message.author.id,
    text: text,
    created: (new Date()).getTime(),
    used: 0
  };
  message.channel.send("**Adding the tag `" + message.args[0] + "`**.")
  return bot.config.setTags(message.guild.id, tags)
}

exports.conf = {
  userPerm: [],
  botPerm: ["SEND_MESSAGES"],
  coolDown: 0,
  dm: false,
  category: "Tag",
  help: "Add a tag to the server",
  args: "",
}