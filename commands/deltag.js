exports.run = (message, bot) => {

  let prefix = message.guild.prefix
  if (!message.args[0]) return message.channel.send("To remove a tag use: `" + prefix + "tag delete <tagName>`");
  let tags = message.guild.tags

  message.suffix = nu.clean(message.suffix)
  message.args.forEach((arg, i) => message.args[i] = nu.clean(arg))

  if (!tags[message.args[0]]) return message.channel.send("**The tag `" + message.args[0] + "` does not exist.**");
  let tag = tags[message.args[0]];
  if (message.author.id === tag.owner || message.channel.permissionsFor(message.member).has("MANAGE_GUILD")) {
    delete tags[message.args[0]];
    bot.config.setTags(message.guild.id, tags)
    return message.channel.send("**The tag `" + message.args[0] + "` has been deleted**");
  } else {
    return message.channel.send("**Only the owner of this tag or a user with the permission `MANAGE_GUILD` can delete it.** ")
  }
}

exports.conf = {
  userPerm: [],
  botPerm: ["SEND_MESSAGES"],
  coolDown: 0,
  dm: false,
  category: "Tag",
  help: "Delete a tag",
  args: "",
}