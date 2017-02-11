const music = require('../functions/music.js')

exports.run = (message, bot, suffix, args) => {
  
  let can = music.checkHostPerm(message);
  if (can === "nm") return message.channel.sendMessage("There are no music sessions active.");
  if (can) {
    message.channel.sendMessage("`Unpausing music...`")
    music.unpause(message.guild.id)
  } else {
    message.channel.sendMessage("You must be the host of this session or have the `MANAGE_GUILD` permission to use this commmand")
  }
}

exports.conf = { 
  userPerm: [],
  botPerm: ["SEND_MESSAGES"],
  coolDown: 0,
  dm: false,
  category: "Music",
  help: "Resume paused music.",
  args: "",
}