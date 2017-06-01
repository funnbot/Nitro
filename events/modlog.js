const bot = require('../bot')
const moment = require('moment')

exports.fire = (msg, message) => {
    if (message.author.bot) return 
    if (message.channel.type === "dm") return
    if (message.author.bot) return
    let channel = message.guild.channels.find(c => c.topic === 'nitro-modlog')
    if (!channel) return
    let time = `**\`[${moment().format("M/D/YY - hh:mm")}]\`** `
    channel.send(time + msg, {split:true})
}

bot.on('messageDelete', msg => exports.fire(`**#${msg.channel.name} | ${msg.author.tag} deleted their message:** \`${msg.content}\``, msg))

bot.on('messageUpdate', (msg, newMsg) => exports.fire(`**#${msg.channel.name} | ${msg.author.tag} edited their message:**\n**before:** \`${msg.content}\`\n**+after:** \`${newMsg.content}\``, msg))

