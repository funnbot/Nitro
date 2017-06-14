const uuid = require('uuid')

exports.run = (message, bot, send) => {
    if (message.author.id !== message.guild.owner.user.id) return send("**This command can only be executed by the server owner**")
    let token = uuid()
    bot.config.setAPIToken(message.guild.id, token)
    message.author.send("**Your dashboard api token has been set to:** `" + token + "`\n***Keep This Token Safe! You can regenerate it at any time.*** Use it here: http://nitro.ws/dashboard?token=" + token)
}

exports.conf = {
    userPerm: ["ADMINISTRATOR"],
    botPerm: ["SEND_MESSAGES"],
    coolDown: 0,
    dm: false,
    category: "Utility",
    help: "Generate an api token to be used with the dashboard",
    args: "",
}