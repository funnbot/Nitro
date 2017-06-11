exports.run = (message, bot, send) => {

    if (!message.args[0]) return send("**Available subcommands:**\n**kick** - Set the number of strikes it takes to kick a user, max is 50, 0 to disable\n**ban** - Set the number of strikes it takes to ban a user, max is 50, 0 to disable")
    let strikes = message.guild.strikes
    let sub = message.args[0]
    if (sub === "kick") {
        if (!message.args[1]) return send("**Set the number of strikes it takes to kick a user, max is 50, 0 to disable**")
        let num = isNaN(parseInt(message.args[1])) ? -1 : parseInt(message.args[1])
        if (num < 0 || num > 50) return send("**Invalid Number: Must be between 0 and 50**")
        if (num === 0) {
            if (strikes.kick) delete strikes.kick
            send("**Disabling auto kick**")
        } else {
            strikes.kick = num
            send("**Number of strikes to kick set to: "+num+"**")
        }
    } else if (sub === "ban") {
        if (!message.args[1]) return send("**Set the number of strikes it takes to ban a user, max is 50, 0 to disable**")
        let num = isNaN(parseInt(message.args[1])) ? -1 : parseInt(message.args[1])
        if (num < 0 || num > 50) return send("**Invalid Number: Must be between 0 and 50**")
        if (num === 0) {
            if (strikes.ban) delete strikes.ban
            send("**Disabling auto ban**")
        } else {
            strikes.ban = num
            send("**Number of strikes to ban set to: "+num+"**")
        } 
    } else {
        return send("**Available subcommands:**\n**kick** - Set the number of strikes it takes to kick a user, max is 50, 0 to disable\n**ban** - Set the number of strikes it takes to ban a user, max is 50, 0 to disable")
    }
    bot.config.setStrike(message.guild.id, strikes)
}

exports.conf = {
    userPerm: ["MANAGE_GUILD"],
    botPerm: ["SEND_MESSAGES", "KICK_MEMBERS", "BAN_MEMBERS"],
    coolDown: 0,
    dm: false,
    category: "Utility",
    help: "Configure a punishment based on a user's strikes",
    args: "",
}