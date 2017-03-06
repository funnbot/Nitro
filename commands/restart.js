exports.run = (message, bot) => {
  message.channel.sendMessage("Restarting...").then(m => {
    m.delete().then(() => {
      bot.destroy().then(() => {
        process.exit(1)
      })
    })
  })
}

exports.conf = {
  userPerm:["DEV"],
  botPerm:["SEND_MESSAGES"],
  coolDown:0,
  dm:true,
  category:"DevOnly",
  help:"Restart the bot",
  args:""
}
