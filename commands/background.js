const bg = require('../functions/bg')

exports.run = (message, bot, send) => {
    
  if (!message.args[0]) return send("**The available backround categories are: `solid`, `nightsky`, and `cities` or set to `default`**")
  if (!bg[message.args[0]]) return send("*Invalid category*\n\n**The available backround categories are: `solid`, `nightsky`, and `cities`**")

  if (message.args[0] === "default") {
    message.channel.sendMessage("**Your background reset to default**")
    bot.profile.setBg(message.author.id, "default")
  }

  if (!message.args[1]) return message.channel.sendFile(bg[message.args[0]].file, "bg.png", "__**"+message.args[0]+"**__\n")

}

exports.conf = {
  userPerm:[],
  botPerm:["SEND_MESSAGES"],
  coolDown:0,
  dm:false,
  category:"Social",
  help:"Set the background fosr your profile [WIP]",
  args:"",
}