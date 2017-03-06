const bot = require('../bot')

function Message(message) {

    let id;

    if (message.channel.type === "text") id = message.guild.id
    else {
        let fakeGuild = {}
        id = message.author.id
        Object.defineProperty(message, 'guild', {
            get: () => fakeGuild
        })
    }

    message.guild.prefix = bot.config.getPrefix(id)

    message.guild.announce = bot.config.getAnc(id)

    message.guild.adblock = bot.config.getAd(id)

    message.guild.autorole = bot.config.getAuto(id)

    message.guild.tags = bot.config.getTags(id)

    message.guild.level = bot.config.getLevel(id)

    message.guild.custom = bot.config.getCustom(id)

    message.guild.modules = bot.config.getMod(id)

    message.guild.roleme = bot.config.getRoleMe(id)

    let nopre = message.content.slice(message.guild.prefix.length)

    let split = nopre.split(" ")

    message.command = split[0]

    split = split.slice(1)

    message.args = split

    message.suffix = split.join(" ")

    message.send = message.channel.sendMessage.bind(message.channel)

    return message;

}

module.exports = Message;