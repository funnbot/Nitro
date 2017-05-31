const moment = require('moment')

exports.g = (message) => {
    let msg = `[${moment().format("HH:mm:ss")}]{${message.guild.name}|${message.channel.name}|${message.author.username}} ${message.content}`
    console.log(msg)
}

exports.dm = (message) => {
    let msg = `[${moment().format("HH:mm:ss")}]{${message.author.username}} ${message.content}`
    console.log(msg)
}