exports.run = (message, bot) => {
    let mods = message.guild.modules
    if (mods.music) {
        delete mods.music;
        message.channel.sendMessage("**The `music` module has been enabled.**")
    } else {
        mods.music = true;
        message.channel.sendMessage("**The `music` module has been disabled.**")
    }
    bot.config.setMod(message.guild.id, mods);
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