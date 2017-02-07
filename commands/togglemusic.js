const config = require('../functions/config');

exports.run = (message, bot, suffix, args) => {
    let mods = config.getMod(message.guild.id);
    if (mods.music) {
        delete mods.music;
        message.channel.sendMessage("**The `music` module has been enabled.**")
    } else {
        mods.music = true;
        message.channel.sendMessage("**The `music` module has been disabled.**")
    }
    config.setMod(message.guild.id, mods);
}

exports.conf = {
  userPerm:["MANAGE_GUILD"],
  botPerm:["SEND_MESSAGES"],
  coolDown:0,
  dm: false,
  category:"Module",
  help:"Toggle the Music Module.",
  args:"",
}