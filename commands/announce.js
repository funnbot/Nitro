const config = require('../functions/config.js');

exports.run = (message, bot, suffix, args) => {
    let acc = config.getAnc(message.guild.id);
    if (!args[0]) {
        message.channel.sendMessage(tro.getSpecialHelp("announce"))
    } else if (args[0] === "channel") {
        if (!!acc.channel) {
            tro.succ(message, "Join/Leave logs will no longer be sent in <#" + acc.channel + ">");
                delete acc.channel;
                config.setAnc(message.guild.id, acc);
        } else {
            let channel;
            if (!args[1]) {
                channel = message.channel.id;
            } else if (message.guild.channels.has(args[1])) {
                channel = message.guild.channels.get(args[1]).id;
            } else if (args[1].startsWith("<#") && args[1].endsWith(">")) {
                let id = args[1].replace(/[<#>]/g, "");
                if (message.guild.channels.has(id)) {
                channel = message.guild.channels.get(id).id;
                }
            } else {
                return tro.error(message, "Failed to resolve a channel from "+args[1])
            }
            acc.channel = channel;
            config.setAnc(message.guild.id, acc);
            tro.succ(message, "The Join / Leave logs will be sent to <#"+channel+"> , Make sure you configure the welcome and farewell messages next, or nothing will happen.")        
        }
        return;
    } else if (args[0] === "welcome") {
        if (!args[1]) {
            if (acc.hasOwnProperty("welcome")) {
                tro.succ(message, "The welcome message has been deleted, and it will no longer be sent.");
                delete acc.welcome;
                config.setAnc(message.guild.id, acc);
            } else {
                tro.error(message, "The welcome message is not currently active.")
            }
            return;
        } else {
            let msg = suffix.split(" ");
            msg.shift();
            msg = msg.join(" ");
            acc.welcome = msg;
            config.setAnc(message.guild.id, acc);
            tro.succ(message, "*The welcome message:* "+msg+" *will now be sent in the Join/leave log channel. Make sure you configure that aswell.*");
        }
    } else if (args[0] === "farewell") {
        if (!args[1]) {
            if (acc.hasOwnProperty("farewell")) {
                tro.succ(message, "The farewell message has been deleted, and it will no longer be sent.");
                delete acc.farewell;
                config.setAnc(message.guild.id, acc);
            } else {
                tro.error(message, "The farewell message is not currently active.")
            }
            return;
        } else {
            let msg = suffix.split(" ");
            msg.shift();
            msg = msg.join(" ");
            acc.farewell = msg;
            config.setAnc(message.guild.id, acc);
            tro.succ(message, "*The farewell message:* "+msg+" *will now be sent in the Join/leave log channel. Make sure you configure that aswell.*");
        }
    } else {
        message.channel.sendMessage(tro.getSpecialHelp("announce"))
    }
}

exports.conf = {
    userPerm: ["MANAGE_GUILD"],
    botPerm: ["SEND_MESSAGES"],
    coolDown: 0,
    dm: false,
    category: "Utility",
    help: "Setup join/leave log.",
    args: "<welcome/farewell> <message>",
}