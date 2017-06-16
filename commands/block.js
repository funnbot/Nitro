exports.run = (message, bot, send) => {
    if (!message.args[0]) return send("Provide ID")
    let id = message.args[0]
    let blocked = bot.system.getBlocked()
    if (blocked[id]) delete blocked[id], send("Unblocking: "+id)
    else blocked[id] = true, send("Blocking: "+id)
    bot.system.setBlocked(blocked)
}

exports.conf = {
  userPerm:["DEV"],
  botPerm:["SEND_MESSAGES"],
  coolDown:0,
  dm:true,
  category:"DevOnly",
  help:"Block a user or guild from the bot",
  args:"",
}