const strikes = require('../functions/strikes')

exports.run = (message, bot, send) => {
    if (!message.args[0]) {
        let pre = message.guild.prefix
        return send("**To warn a user:** `" + pre + "warn <@user> <reason>`")
    }
    if (!message.mentions.users.first()) {
        return send("**To warn a user please mention them**")
    }
    if (!message.args[1]) {
        return send("**Please provide a reason for the warn.**")
    }
    let user = message.mentions.users.first();
    let msg = message.suffix.substr(message.suffix.indexOf(" ") + 1);
    let embed = {
        title: ":cop: You have been warned by: " + message.author.username,
        color: 0xFF0000,
        description: ":question: Reason: " + msg + "\n\u200B",
        timestamp: new Date()
    }
    bot.users.get(user.id).send("", {
        embed
    }).then(send(message.mentions.users.first().username + " **Has been warned and given a strike.**")).catch(err => {
        console.log(err)
        send("**This user has Direct Messages disabled.**")
    })
    strikes(message.guild.id, user.id, 1)
}

exports.conf = {
    userPerm: ["MANAGE_MESSAGES"],
    botPerm: ["SEND_MESSAGES"],
    coolDown: 0,
    dm: false,
    category: "Moderation",
    help: "Warn a user.",
    args: "",
}