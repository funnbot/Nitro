const bot = require('../bot')
const strike = require('./strikes')

module.exports = (message) => {

    if (message.channel.type !== "text") return
    if (message.author.id === bot.user.id) return

    let filters = message.guild.filter
    let keys = filters.keywords ? Object.keys(filters.keywords) : false
    if (!keys || keys.length < 1) return
    if (message.member && message.member.hasPermission("ADMINISTRATOR")) return 
    let low = message.content.toLowerCase()
    if (keys.some(word => ~low.indexOf(word.toLowerCase()))) {
        message.delete()
        let w
        keys.forEach(k => low.includes(k.toLowerCase()) ? w = k : 0)
        strike(message.guild.id, message.author.id)
        message.author.send(filters.msg ? filters.msg : "**Your message was deleted because it contained a restricted keyword: **"+w)
    }

}