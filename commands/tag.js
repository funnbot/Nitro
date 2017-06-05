exports.run = (message, bot) => {

  let tags = message.guild.tags

  if (tags[message.args[0]]) {

    message.channel.send(tags[message.args[0]].text);
    if (!tags[message.args[0]].used) tags[message.args[0]].used = 0
    tags[message.args[0]].used++
    bot.config.setTags(message.guild.id, tags)

  } else {

    message.channel.send("**The tag `" + message.args[0] + "` does not exist.**")

  }

}

exports.conf = {
  userPerm: [],
  botPerm: ["SEND_MESSAGES"],
  coolDown: 0,
  dm: true,
  category: "Tag",
  help: "Get a tag",
  args: "",
}