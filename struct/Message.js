const bot = require('../bot')

function Message(message) {

    let id = message.channel.type === "text" ? message.guild.id : message.author.id

    message.prefix = bot.config.getPrefix(id)

    message.announce = bot.config.getAnnounce(id)

    message.disabledCommands = bot.config.getDisabledCommands(id)

    message.autoRole = bot.config.getAutoRole(id)

    let nopre = message.content.slice(message.prefix.length)

    let split = nopre.split(" ")

    message.command = split[0]

    message.param = split

    split = split.slice(1)

    message.suffix = split.join(" ")

    message.send = message.channel.sendMessage.bind(message.channel)

    return message;

}

module.exports = Message;