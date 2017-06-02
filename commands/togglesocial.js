exports.run = (message, bot) => {
    let mods = message.guild.modules
    if (mods.social) {
        delete mods.social;
        message.channel.send("**The `social` module has been enabled.**")
    } else {
        mods.social = true;
        message.channel.send("**The `social` module has been disabled.**")
    }
    bot.config.setMod(message.guild.id, mods);
}

exports.conf = {
  userPerm:["MANAGE_GUILD"],
  botPerm:["SEND_MESSAGES"],
  coolDown:0,
  dm: false,
  category:"Module",
  help:"Toggle the Social Module.",
  args:"",
}