exports.run = (message, bot, send) => {
    let joindm = message.guild.joindm
    if (!message.args[0]) return send("**`" + message.guild.prefix + "joindm <message>` - message is the message sent when the user joins your server, set to `off` to disable**\n" + (joindm ? "**The current message is: `" + joindm + "`**" : ""))

    if (message.suffix === "off") {
        bot.config.setJDM(message.guild.id, false)
        return send("**Join DM has been disabled**")
    } else {
        bot.config.setJDM(message.guild.id, message.suffix)
        return send("**Join DM has been set to: `" + message.suffix + "`**")
    }

}

exports.conf = {
    userPerm: ["MANAGE_GUILD"],
    botPerm: ["SEND_MESSAGES"],
    coolDown: 0,
    dm: false,
    category: "Utility",
    help: "Set a message to be DM'd to a user when they join.",
    args: "",
}