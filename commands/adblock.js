exports.run = (message, bot) => {
    if (!message.args[0]) {
        return message.channel.sendMessage(nu.getSpecialHelp("adblock"));
    }
    let ad = message.guild.adblock
    let prefix = message.guild.prefix
    if (message.args[0] === "on") {
        if (!!ad.on) {
            message.send("**Adblock is already enabled**")
        } else {
            ad.on = "yes";
            let notify = (!!ad.notify) ? "enabed" : "disabled"
            let euser = (!!ad.ex && !!ad.ex.users) ? Object.keys(ad.ex.users).length : "No";
            let eroles = (!!ad.ex && !!ad.ex.roles) ? Object.keys(ad.ex.roles).length : "No";
            message.send("**AdBlock has been enabled with these settings:**\nNotify: " + notify + "\nExceptions: " + euser + " Users, " + eroles + " Roles")
        }
    } else if (message.args[0] === "off") {
        message.send("**Adblock has been disabled, your settings have not changed.**");
        delete ad.on
    } else if (message.args[0] === "exception") {
        if (!message.args[1]) {
            message.send("[ AdBlock Exceptions]\nAn exception to adblock can either be a mentioned user or a mention role.\nTo add an exception use:\n`" + prefix + "adblock exception add @mention` *(or @role)*\n to remove an exception replace `add` with `remove` in the command.\nYou can list current exceptions with:\n `" + prefix + "adblock exception list`");
            return;
        }
        if (message.args[1] === "add") {
            if (!message.args[2]) {
                return message.send("**Please mention a user or role to be added to exceptions.**");
            }
            if (message.mentions.users.first()) {
                let user = message.mentions.users.first();
                if (!ad.ex) ad.ex = {};
                if (!ad.ex.users) ad.ex.users = {};
                ad.ex.users[user.id] = "yes";
                message.send("**The user `" + user.username + "` is exempt from AdBlock.**");
            } else if (message.mentions.roles.first()) {
                if (!ad.ex) ad.ex = {};
                if (!ad.ex.roles) ad.ex.roles = {};
                let role = message.mentions.roles.first();
                ad.ex.roles[role.id] = "yes";
                message.send("**All members with the role `" + role.name + "` are exempt from AdBlock.**")
            } else {
                message.send("**Could not parse a user or role from `" + args[1]) + "`**";
            }
        } else if (message.args[1] === "remove") {
            if (!message.args[2]) {
                return message.send("**Please mention a user or role to be removed from exceptions.**");
            }
            if (message.mentions.users.first()) {
                let user = message.mentions.users.first();
                if (!!ad.ex && !!ad.ex.users && !!ad.ex.users[user.id]) {
                    delete ad.ex.users[user.id];
                    message.send("**The user `" + user.username + "` is no longer exempt from AdBlock.**");
                } else {
                    message.send("**That user is not currently exempt from AdBlock.**");
                }
            } else if (message.mentions.roles.first()) {
                let role = message.mentions.roles.first();
                if (!!ad.ex && !!ad.ex.roles && !!ad.ex.roles[role.id]) {
                    delete ad.ex.roles[role.id];
                    message.send("**The role " + role.name + " is no longer exempt from AdBlock.**");
                } else {
                    tro.error(message, "That role is not currently excempt from AdBlock.");
                }
            } else {
                message.send("**Could not parse a user or role from `" + args[2] + "`**");
            }
        } else if (message.args[1] === "list") {
            if (!ad.ex && !ad.ex.users && !ad.ex.roles) {
                return message.send("**No exceptions have been added.**")
            }
            let users = ad.ex.users
            let roles = ad.ex.roles
            let utext = [];
            let rtext = [];
            Object.keys(users).forEach(u => {
                if (bot.users.has(u)) {
                    utext.push(bot.users.get(u).username);
                }
            });
            Object.keys(roles).forEach(r => {
                if (message.guild.roles.has(r)) {
                    rtext.push(message.guild.roles.get(r).name);
                }
            })
            if (utext !== false && rtext !== false) tro.info(message, "The current exceptions are\nUsers: " + utext.join(", ") + "\nRoles: " + rtext.join(", "))
        } else {
            return message.send("**Invalid Arguments: try `add`, `remove`, or `list`.**");
        }
    } else if (message.args[0] === "notify") {
        if (message.author.id === message.guild.owner.user.id) {
            if (!ad.notify) {
                message.send("**AdBlock notifications have been enabled.**");
                ad.notify = "yes";
            } else {
                message.send("**AdBlock notifications have been disabled.**");
                delete ad.notify;
            }
        } else {
            message.send("**Only the server owner can activate AdBlock notify.**")
        }
    }
    bot.config.setAd(message.guild.id, ad);
}

exports.conf = {
    userPerm: ["MANAGE_GUILD"],
    botPerm: ["SEND_MESSAGES", "MANAGE_MESSAGES"],
    coolDown: 0,
    dm: false,
    category: "Utility",
    help: "Stop ads on your server.",
    args: "<on/exception/notify>",
}