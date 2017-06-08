exports.run = (message, bot, send) => {

  if (!message.args[0]) return send("**The available subcommands are:**\n**info** - Get info about the current keyword config\n**exception** - Add/Remove exceptions from filtering\n**notify** - Toggles notification when a message is filtered\n**msg** - Change the message DM'd to the user when the message is filtered")
  let filters = message.guild.filter
  let sub = message.args[0]
  if (sub === "info") {

    let num = (!filters.keywords ? "None" : (Object.keys(filters.keywords).length > 0 ? Object.keys(filters.keywords).length : "None"))
    let ex
    if (filters.ex) {
      let channel = (!filters.ex.channel ? "0 Channels" : (Object.keys(filters.ex.channel).length > 1 ? Object.keys(filters.ex.channel).length + " Channels" : "1 Channel"))
      let role = (!filters.ex.role ? "0 Roles" : (Object.keys(filters.ex.role).length > 1 ? Object.keys(filters.ex.role).length + " Roles" : "1 Role"))
      let user = (!filters.ex.user ? "0 Users" : (Object.keys(filters.ex.user).length > 1 ? Object.keys(filters.ex.user).length + " Users" : "1 Users"))
      ex = `${channel}, ${role}, ${user}`
    } else ex = "0 Channels, 0 Roles, 0 Users"
    let embed = new bot.embed()
    embed.setColor(0x9E1D42)
    embed.setTitle("Filter Info")
    embed.addField("# Of Filters", num, true)
    embed.addField("Notify", filters.notify ? "true" : "false", true)
    embed.addField("Exceptions", ex)
    embed.addField("Message", filters.msg ? filters.msg : "**Your message was deleted because it contained a restricted word**")
    send("", {
      embed
    })

  } else if (sub === "exception") {

    return send("Coming Soon!")

  } else if (sub === "notify") {

    return send("Coming Soon!")

  } else if (sub === "msg") {

    return send("Coming Soon!")

  } else {
    send("**The available subcommands are:**\n**info** - Get info about the current keyword config\n**exception** - Add/Remove exceptions from filtering\n**notify** - Toggles notification when a message is filtered\n**msg** - Change the message sent when a message is filtered")
  }

}

exports.conf = {
  userPerm: ["MANAGE_GUILD"],
  botPerm: ["SEND_MESSAGES"],
  coolDown: 0,
  dm: false,
  category: "Filter",
  help: "Change keyword filter configuration",
  args: "",
}