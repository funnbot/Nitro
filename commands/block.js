const config = require('../functions/config.js');

exports.run = (message, bot, suffix, args) => {
    let b = config.getBlocked();
    if (bot.guilds.has(args[0])) {
        if (b.servers[args[0]]) {
            delete b.servers[args[0]];
            message.channel.sendMessage("unblocked server "+args[0]);
        } else {
            b.servers[args[0]] = true;
            message.channel.sendMessage("blocked server "+args[0]);
        }
    } else if (bot.users.has(args[0])) {
         if (b.users[args[0]]) {
            delete b.users[args[0]];
            message.channel.sendMessage("unblocked user "+args[0]);
        } else {
            b.users[args[0]] = true;
            message.channel.sendMessage("blocked user "+args[0]);
        }
    } else {
        return message.channel.sendMessage("Not real.")
    }
    config.setBlocked(b);
}

exports.conf = {
  userPerm:["DEV"],
  botPerm:["SEND_MESSAGES"],
  coolDown:0,
  dm:true,
  category:"DevOnly",
  help:"Block a guild from using this bot.",
  args:"<id>",
}