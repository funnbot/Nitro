exports.run = (message, bot, send) => {

  let prefix = message.guild.prefix
  if (!message.args[0]) return send("**To add a keyword filter: `" + prefix + "addfilter \"<keyword>\"`**")
  let filters = message.guild.filter
  if (Object.keys(filters).length > 99) return send("**Maximum Keyword Limit Reached: 100**")

  let split = message.content.split("\"");
  let bool = message.content.replace(/"/g, "");
  if (bool.length === message.content.length - 1) {
    bool = false;
  } else {
    bool = true
  }
  if (!split[1] || !bool) {
    return message.channel.send("**The new keyword filter must be wrapped in quotes (`\"`)**");
  }

  if (split[1].length < 2) return send("**Invalid Keyword:** Too Short")
  if (/^\s+$/g.test(split[1])) return send("**Invalid Keyword**: Illegal Characters")

  if (!filters.keywords) filters.keywords = {}
  if (filters.keywords[split[1]]) return send("**Keyword already exists**")
  filters.keywords[split[1]] = true
  send("**Messages containing the keyword `"+split[1]+"` will now be deleted**")
  bot.config.setFilter(message.guild.id, filters)

}

exports.conf = {
  userPerm: ["MANAGE_GUILD"],
  botPerm: ["SEND_MESSAGES", "MANAGE_MESSAGES"],
  coolDown: 0,
  dm: false,
  category: "Filter",
  help: "Add a keyword filter",
  args: "",
}