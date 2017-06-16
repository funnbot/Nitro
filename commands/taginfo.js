const moment = require('moment')

exports.run = (message, bot, send) => {

  let prefix = message.guild.prefix
  if (!message.args[0]) return send("To get info for a tag use: `" + prefix + "taginfo <tagName>`")
  let tags = message.guild.tags
  if (!tags[message.args[0]]) return send("**The tag `"+message.args[0]+"` does not exist**")
  let tag = tags[message.args[0]]
  let embed = new bot.embed()
  embed.setTitle("Tag Info: `"+message.args[0]+"`")
  embed.addField("Owner", bot.users.get(tag.owner) ? bot.users.get(tag.owner).username : "Unknown", true)
  embed.addField("Created On", moment(tag.created).format("MMM Do, YYYY"), true)
  let used = tag.used === 0 ? "Never" : tag.used === 1 ? "1 Time" : tag.used > 1 ? tag.used + " Times" : 0
  embed.addField("Used", used, true)
  embed.setColor(0xfe8507)
  message.channel.send("", {embed})

}

exports.conf = {
  userPerm: [],
  botPerm: ["SEND_MESSAGES"],
  coolDown: 0,
  dm: false,
  category: "Tag",
  help: "Get info about a tag",
  args: "",
}