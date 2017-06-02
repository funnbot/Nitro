exports.run = (message, bot) => {
    let mods = message.guild.modules
    if (mods.random) {
        delete mods.random;
        message.channel.send("**The `random` module has been enabled.**")
    } else {
        mods.random = true;
        message.channel.send("**The `random` module has been disabled.**")
    }
    bot.config.setMod(message.guild.id, mods);
}

exports.conf = {
  userPerm:["MANAGE_GUILD"],
  botPerm:["SEND_MESSAGES"],
  coolDown:0,
  dm: false,
  category:"Module",
  help:"Toggle the Random Module.",
  args:"",
}