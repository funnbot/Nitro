const bot = require('../bot')
const Commands = require('../func/loadCommands')
const config = require('../func/config')

bot.on('messageCreate', message => {

    if (message.author.bot) return
    if (!message.channel.guild) return

    message.prefix = config.getPrefix(message.channel.guild.id)

    let cutPrefix = message.content.slice(message.prefix.length)
    message.args = cutPrefix.split(" ")
    message.command = message.args[0]
    message.args = message.args.slice(1)
    message.suffix = message.args.join(" ")

    let cmds = Commands.getCmds()
    if (!cmds.hasOwnProperty(message.command)) return

    try {

        cmds[message.command].run(message, bot, message.channel.createMessage.bind(message.channel))

    } catch (err) {

        message.channel.createMessage("```js\n"+err+"```")

    }

})