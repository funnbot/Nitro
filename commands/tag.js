exports.run = (message, bot) => {
  
  let prefix = message.guild.prefix
  if (!message.args[0]) return message.channel.sendMessage("**[ Tag Help]**\nTo retrieve a tag use:\n`" + prefix + "tag <tagName>`\nTo add a tag use:\n`" + prefix + "tag add <tagName> <the text for this tag>`\nTo remove a tag use:\n`" + prefix + "tag delete <tagName>`\nTo list all tags use:\n`" + prefix + "tags`");
  let tags = message.guild.tags

  message.suffix = nu.clean(message.suffix)
  message.args.forEach((arg, i) => message.args[i] = nu.clean(arg))

  if (message.args[0] === "add") {
    if (!message.args[1]) return message.channel.sendMessage(`To add a tag use:\n\`${prefix}tag add <name> <the tags text>\``);
    if (tags[message.args[1]]) return message.channel.sendMessage("**The tag `" + message.args[1] + "` already exists**");
    if (!message.args[2]) return message.channel.sendMessage(`Provide the text for the tag after the name.`);
    let r = message.suffix.split(" ");
    r.shift();
    r.shift();
    let text = r.join(" ");
    tags[message.args[1]] = {
      owner: message.author.id,
      text: text
    };
    message.channel.sendMessage("**Adding the tag `" + message.args[1] + "`**.")
    return bot.config.setTags(message.guild.id, tags)

  } else if (message.args[0] === "delete") {
    if (!message.args[1]) return message.channel.sendMessage(`To delete a tag use:\n\`${prefix}tag delete <tagname>\``);
    if (!tags[message.args[1]]) return message.channel.sendMessage("**The tag `" + message.args[1] + "` does not exist.**");
    let tag = tags[message.args[1]];
    if (message.author.id === tag.owner || message.channel.permissionsFor(message.member).hasPermission("MANAGE_GUILD")) {
      delete tags[message.args[1]];
      bot.config.setTags(message.guild.id, tags)
      return message.channel.sendMessage("**The tag `" + message.args[1] + "` has been deleted**");
    } else {
      return message.channel.sendMessage("**Only the owner of this tag or a user with the permission `MANAGE_GUILD` can delete it.** ")
    }

  } else {
    if (tags[message.args[0]]) {

      message.channel.sendMessage(tags[message.args[0]].text);

    } else {

      message.channel.sendMessage("**The tag `" + message.args[0] + "` does not exist.**")

    }
  }
}

exports.conf = {
  userPerm: [],
  botPerm: ["SEND_MESSAGES"],
  coolDown: 0,
  dm: false,
  category: "Utility",
  help: "Get a tag or edit current tags.",
  args: "",
}