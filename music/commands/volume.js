const music = require('../functions/music');

exports.run = (message, bot, suffix, args) => {
    let can = music.checkHostPerm(message);
    if (can === "nm") return message.channel.sendMessage("There are no music sessions active.");
    if (can) {
    music.setVolume(message.guild.id, args[0], (err, int) => {
        if (err) return message.channel.sendMessage(err);
        message.channel.sendMessage("`Volume has been set to: "+int+"`")
    })
    } else {
        message.channel.sendMessage("You must be the host of this session or have the `MANAGE_GUILD` permission to use this commmand")
    }
}

exports.conf = { 
  userPerm:[],
  botPerm:["SEND_MESSAGES"],
  coolDown:0,
  dm: false,
  category:"Music",
  help:"Set the volume of the music.",
  args:"<1-200>",
}