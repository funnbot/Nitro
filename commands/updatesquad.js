exports.run = (message, bot, send) => {
    let update = bot.system.getUpdate()
    let id = message.author.id
    if (update[id]) delete update[id], send("**You have been removed from Nitro's Update Squad.**")
    else update[id] = true, send("**You have been added to Nitro's Update Squad, you will get DM's for each update.**")
    bot.system.setUpdate(update)
}

exports.conf = {
  userPerm:[],
  botPerm:["SEND_MESSAGES"],
  coolDown:0,
  dm:true,
  category:"Other",
  help:"Enable Update Notifications",
  args:"",
}