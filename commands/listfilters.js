exports.run = (message, bot, send) => {

    let filters = message.guild.filter
    if (!filters.keywords) return send("**There are no keywords set**")
    if (Object.keys(filters.keywords).length === 0) return send("**There are no keywords set**")

    let txt = Object.keys(filters.keywords).join(" **||** ")
    return send("**The filtered keywords are:**\n"+txt)

}

exports.conf = {
  userPerm: ["MANAGE_GUILD"],
  botPerm: ["SEND_MESSAGES"],
  coolDown: 0,
  dm: false,
  category: "Filter",
  help: "List the currently filtered keywords",
  args: "",
}