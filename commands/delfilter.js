exports.run = (message, bot, send) => {

  let prefix = message.guild.prefix
  if (!message.args[0]) return send("**To delete a keyword filter: `" + prefix + "delfilter \"<keyword>\"`**")
  let filters = message.guild.filter

  let split = message.content.split("\"");
  let bool = message.content.replace(/"/g, "");
  if (bool.length === message.content.length - 1) {
    bool = false;
  } else {
    bool = true
  }
  if (!split[1] || !bool) {
    return message.channel.send("**The keyword filter to delete must be wrapped in quotes (`\"`)**");
  }

  if (split[1].length < 2) return send("**Keyword does not exist**")
  if (/^\s+$/g.test(split[1])) return send("**Keyword does not exist**")

  if (!filters.keywords) return send("**Keyword does not exist**")
  if (!filters.keywords[split[1]]) return send("****Keyword does not exist****")
  delete filters.keywords[split[1]]
  send("**Deleting the keyword `"+split[1]+"`**")
  bot.config.setFilter(message.guild.id, filters)

}

exports.conf = {
  userPerm: ["MANAGE_GUILD"],
  botPerm: ["SEND_MESSAGES"],
  coolDown: 0,
  dm: false,
  category: "Filter",
  help: "Delete a filter",
  args: "",
}