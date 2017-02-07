const config = require('../functions/config');

exports.run = (message, bot, suffix, args, send) => {
    let level = config.getLevel(message.guild.id);
    if (level) {
        level = false;
        send("**Disabling level up messages in your server**");
    } else {
        level = true;
        send("**Enabling level up messages in your server**");
    }
    config.setLevel(message.guild.id, level);
}

exports.conf = {
  userPerm:["MANAGE_GUILD"],
  botPerm:["SEND_MESSAGES"],
  coolDown:0,
  dm:true,
  category:"Utility",
  help:"Toggle level up messages in your server",
  args:"",
}