exports.run = (message, bot) => {
    let acc = message.guild.announce
    if (!message.args[0]) {
        message.channel.send(nu.getSpecialHelp("announce"))
    } else if (message.args[0] === "channel") {
        if (!!acc.channel) {
            message.send("**Join/Leave logs will no longer be sent in <#" + acc.channel + ">**");
                delete acc.channel;
                bot.config.setAnc(message.guild.id, acc);
        } else {
            let channel;
            if (!message.args[1]) {
                channel = message.channel.id;
            } else if (message.guild.channels.has(message.args[1])) {
                channel = message.guild.channels.get(message.args[1]).id;
            } else if (message.args[1].startsWith("<#") && message.args[1].endsWith(">")) {
                let id = message.args[1].replace(/[<#>]/g, "");
                if (message.guild.channels.has(id)) {
                channel = message.guild.channels.get(id).id;
                }
            } else {
                return message.send("**Failed to resolve a channel from "+message.args[1]+"**")
            }
            acc.channel = channel;
            bot.config.setAnc(message.guild.id, acc);
            message.send("**The Join / Leave logs will be sent to <#"+channel+"> , Make sure you configure the welcome and farewell messages next, or nothing will happen.**")        
        }
        return;
    } else if (message.args[0] === "welcome") {
        if (!message.args[1]) {
            if (acc.hasOwnProperty("welcome")) {
                message.send("**The welcome message has been deleted, and it will no longer be sent.**");
                delete acc.welcome;
                bot.config.setAnc(message.guild.id, acc);
            } else {
                message.send("**The welcome message is not currently active.**")
            }
            return;
        } else {
            let msg = message.suffix.split(" ");
            msg.shift();
            msg = msg.join(" ");
            acc.welcome = msg;
            bot.config.setAnc(message.guild.id, acc);
            message.send("**The welcome message: `"+msg+"` will now be sent in the Join/leave log channel. Make sure you configure that aswell.**");
        }
    } else if (message.args[0] === "farewell") {
        if (!message.args[1]) {
            if (acc.hasOwnProperty("farewell")) {
                message.send("**The farewell message has been deleted, and it will no longer be sent.**");
                delete acc.farewell;
                bot.config.setAnc(message.guild.id, acc);
            } else {
                message.send("**The farewell message is not currently active.**")
            }
            return;
        } else {
            let msg = message.suffix.split(" ");
            msg.shift();
            msg = msg.join(" ");
            acc.farewell = msg;
            bot.config.setAnc(message.guild.id, acc);
            message.send("**The farewell message: `"+msg+"` will now be sent in the Join/leave log channel. Make sure you configure that aswell.**");
        }
    } else {
        message.channel.send(nu.getSpecialHelp("announce"))
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