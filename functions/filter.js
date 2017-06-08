const bot = require('../bot')

module.exports = (message) => {

    if (message.channel.type !== "text") return
    if (message.author.id === bot.user.id) return

    let filters = message.guild.filter
    let keys = filters.keywords ? Object.keys(filters.keywords) : false
    if (!keys || keys.length < 1) return
    if (message.member && message.member.hasPermission("ADMINISTRATOR")) return 
    let low = message.content.toLowerCase()
    if (keys.some(word => ~low.indexOf(word.toLowerCase()))) {
        let w
        keys.forEach(k => low.includes(k.toLowerCase()) ? w = k : 0)
        message.delete()
        message.author.send(filters.msg ? filters.msg : "**Your message was deleted because it contained a restricted keyword: **"+w)
    }

}