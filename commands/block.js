exports.run = (message, bot) => {
    /*let b = config.getBlocked();
    if (bot.guilds.has(args[0])) {
        if (b.servers[args[0]]) {
            delete b.servers[args[0]];
            message.channel.send("unblocked server "+args[0]);
        } else {
            b.servers[args[0]] = true;
            message.channel.send("blocked server "+args[0]);
        }
    } else if (bot.users.has(args[0])) {
         if (b.users[args[0]]) {
            delete b.users[args[0]];
            message.channel.send("unblocked user "+args[0]);
        } else {
            b.users[args[0]] = true;
            message.channel.send("blocked user "+args[0]);
        }
    } else {
        return message.channel.send("Not real.")
    }
    config.setBlocked(b);*/
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