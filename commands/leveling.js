exports.run = (message, bot, send) => {
    let level = bot.config.getLevel(message.guild.id);
    if (level) {
        level = false;
        send("**Disabling level up messages in your server**");
    } else {
        level = true;
        send("**Enabling level up messages in your server**");
    }
    bot.config.setLevel(message.guild.id, level);
}

exports.conf = {
  userPerm:["MANAGE_GUILD"],
  botPerm:["SEND_MESSAGES"],
  coolDown:0,
  dm:false,
  category:"Utility",
  help:"Toggle level up messages in your server",
  args:"",
}