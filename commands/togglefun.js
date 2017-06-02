exports.run = (message, bot) => {
    let mods = message.guild.modules
    if (mods.fun) {
        delete mods.fun;
        message.channel.send("**The `fun` module has been enabled.**")
    } else {
        mods.fun = true;
        message.channel.send("**The `fun` module has been disabled.**")
    }
    bot.config.setMod(message.guild.id, mods);
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