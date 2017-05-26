const bot = require('../bot')
const Commands = require('../func/loadCommands')
const config = require('../func/config')
const checkPerm = require('../func/checkPerms')

bot.on('messageCreate', message => {

    if (message.author.bot) return
    if (!message.channel.guild) return
    let Music = config.getMusic(message.channel.guild.id)
    if (Music) return 

    message.prefix = config.getPrefix(message.channel.guild.id)
    if (!message.content.startsWith(message.prefix)) return 

    let cutPrefix = message.content.slice(message.prefix.length)
    message.args = cutPrefix.split(" ")
    message.command = message.args[0]
    message.args = message.args.slice(1)
    message.suffix = message.args.join(" ")

    let cmds = Commands.getCmds()
    if (!cmds.hasOwnProperty(message.command)) return
    let check = checkPerm.Mcheck(message)
    console.log("okey")
    if (check) return 
    

    try {

        cmds[message.command].run(message, bot, message.channel.createMessage.bind(message.channel))

    } catch (err) {

        console.log(err)

        message.channel.createMessage("```js\n"+err+"```")

    }

})