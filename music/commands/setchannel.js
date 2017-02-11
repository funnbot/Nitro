const music = require('../func/music.js')

exports.run = (message, bot, suffix, args) => {
  let can = music.checkHostPerm(message);
  if (can === "nm") return message.channel.sendMessage("There are no music sessions active.");
  if (can) {
    if (!message.mentions.channels.first()) return message.channel.sendMessage('You must mention a channel to set it.');
    music.setChannel(message.guild.id, message.mentions.channels.first().id);
    message.channel.sendMessage("Session channel set to "+message.mentions.channels.first().name)

  } else {
    message.channel.sendMessage("You must be the host of this session or have the `MANAGE_GUILD` permission to use this commmand")
  }
}

exports.conf = {
  userPerm:[],
  botPerm:["SEND_MESSAGES"],
  coolDown:0,
  dm:false,
  category:"",
  help:"Set the channel that next song messages are sent to.",
  args:"",
}