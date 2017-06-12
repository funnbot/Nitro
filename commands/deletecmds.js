exports.run = (message, bot, send) => {
    let del = message.guild.deletem
    if (del) {
        send("**Disabling command deletion**")
        del = false
    } else {
        send("**Enabling command deletion**")
        del = true
    }
    bot.config.setDeletem(message.guild.id, del)
}

exports.conf = {
    userPerm: [],
    botPerm: ["SEND_MESSAGES"],
    coolDown: 0,
    dm: false,
    category: "Utility",
    help: "Toggle deleting command messages",
    args: "",
}