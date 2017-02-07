const config = require('../functions/config');

exports.run = (message, bot, suffix, args) => {
    let mods = config.getMod(message.guild.id);
    if (mods.fun) {
        delete mods.fun;
        message.channel.sendMessage("**The `fun` module has been enabled.**")
    } else {
        mods.fun = true;
        message.channel.sendMessage("**The `fun` module has been disabled.**")
    }
    config.setMod(message.guild.id, mods);
}

exports.conf = {
  userPerm:["MANAGE_GUILD"],
  botPerm:["SEND_MESSAGES"],
  coolDown:0,
  dm: false,
  category:"Module",
  help:"Toggle the Fun Module.",
  args:"",
}