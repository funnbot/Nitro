const music = require('../functions/music.js')

exports.run = (message, bot, suffix, args) => {
  let can = music.checkHostPerm(message);
  if (can === "nm") return message.channel.send("There are no music sessions active.");
  if (can) {
    message.channel.send("`Pausing music...`")
    music.pause(message.guild.id)
  } else {
     message.channel.send("You must be the host of this session or have the `MANAGE_GUILD` permission to use this commmand")
  }
  
}

exports.conf = { 
  userPerm:[],
  botPerm:["SEND_MESSAGES"],
  coolDown:0,
  dm:false,
  category:"Music",
  help:"Pause currently playing music",
  args:"",
}