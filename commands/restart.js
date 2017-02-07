exports.run = (message, bot, suffix, args) => {
  message.channel.sendMessage("Restarting...").then(m => {
    m.delete();
    bot.destroy();
    process.exit(1);
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
