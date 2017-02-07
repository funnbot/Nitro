const config = require('../functions/config.js');

exports.run = (message, bot, suffix, args) => {
    if (!args[0]) {
        return message.channel.sendMessage(tro.getSpecialHelp("adblock"));
    }
    let ad = config.getAd(message.guild.id);
    let prefix = config.getPrefix(message.guild.id)
    if (args[0] === "on") {
        if (!!ad.on) {
            tro.info(message, "AdBlock is already Enabled.")
        } else {
            ad.on = "yes";
            let notify = (!!ad.notify) ? "enabed" : "disabled"
            let euser = (!!ad.ex && !!ad.ex.users) ? Object.keys(ad.ex.users).length : "No";
            let eroles = (!!ad.ex && !!ad.ex.roles) ? Object.keys(ad.ex.roles).length : "No";
            tro.succ(message, "AdBlock has been enabled with these settings:\nNotify: " + notify + "\nExceptions: " + euser + " Users, " + eroles + " Roles")
        }
    } else if (args[0] === "off") {
        tro.succ(message, "Adblock has been disabled, your settings have not changed.");
        delete ad.on
    } else if (args[0] === "exception") {
        if (!args[1]) {
            tro.info(message, "[ AdBlock Exceptions]\nAn exception to adblock can either be a mentioned user or a mention role.\nTo add an exception use:\n`" + prefix + "adblock exception add @mention` *(or @role)*\n to remove an exception replace `add` with `remove` in the command.\nYou can list current exceptions with:\n `" + prefix + "adblock exception list`");
            return;
        }
        if (args[1] === "add") {
            if (!args[2]) {
                return tro.info(message, "Please mention a user or role to be added to exceptions.");
            }
            if (message.mentions.users.first()) {
                let user = message.mentions.users.first();
                if (!ad.ex) ad.ex = {};
                if (!ad.ex.users) ad.ex.users = {};
                ad.ex.users[user.id] = "yes";
                tro.succ(message, "The user: " + user.username + " is excempt from AdBlock.");
            } else if (message.mentions.roles.first()) {
                if (!ad.ex) ad.ex = {};
                if (!ad.ex.roles) ad.ex.roles = {};
                let role = message.mentions.roles.first();
                ad.ex.roles[role.id] = "yes";
                tro.succ(message, "All members with the role " + role.name + " are excempt from AdBlock.")
            } else {
                tro.error(message, "Could not parse a user or role from " + args[1]);
            }
        } else if (args[1] === "remove") {
            if (!args[2]) {
                return tro.info(message, "Please mention a user or role to be removed from exceptions.");
            }
            if (message.mentions.users.first()) {
                let user = message.mentions.users.first();
                if (!!ad.ex && !!ad.ex.users && !!ad.ex.users[user.id]) {
                    delete ad.ex.users[user.id];
                    tro.succ(message, "The user " + user.username + " is no longer excempt from AdBlock.");
                } else {
                    tro.error(message, "That user is not currently excempt from AdBlock.");
                }
            } else if (message.mentions.roles.first()) {
                let role = message.mentions.roles.first();
                if (!!ad.ex && !!ad.ex.roles && !!ad.ex.roles[role.id]) {
                    delete ad.ex.roles[role.id];
                    tro.succ(message, "The role " + role.name + " is no longer excempt from AdBlock.");
                } else {
                    tro.error(message, "That role is not currently excempt from AdBlock.");
                }
            } else {
                tro.error(message, "Could not parse a user or role from " + args[2]);
            }
        } else if (args[1] === "list") {
            if (!ad.ex && !ad.ex.users && !ad.ex.roles) {
                return tro.info(message, "No exceptions have been added.")
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
            return tro.warn(message, "Invalid Arguments: try `add`, `remove`, or `list`.");
        }
    } else if (args[0] === "notify") {
        if (message.author.id === message.guild.owner.user.id) {
            if (!ad.notify) {
                tro.succ(message, "AdBlock notifications have been enabled.");
                ad.notify = "yes";
            } else {
                tro.error(message, "AdBlock notifications have been disabled.");
                delete ad.notify;
            }
        } else {
            tro.error(message, "Only the server owner can activate AdBlock notify.")
        }
    }
    config.setAd(message.guild.id, ad);
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