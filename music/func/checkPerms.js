const bot = require('../bot.js')
const config = require('./config')
const convert = require("./convertPerms")

exports.Mcheck = (message) => {
    let custom = config.getPerms(message.channel.guild.id)
    let perms = []
    if (custom[message.command]) {
        Object.keys(custom[message.command]).forEach(p => {
            let perm = custom[message.command][p]
            if (perm === "ADD") perms.push[p]
        })
    }
    if (perms.length === 0) return false
    let can = {
        has: true,
        miss: []
    };
    perms.forEach(p => {

        let cp = convert(p)
        let perm = message.channel.permissionOverwrites.has(cp)
        if (!perm && message.author.id !== message.guild.owner.user.id && message.author.id !== "163735744995655680") {
            can.has = false;
            can.miss.push(p);
        }

    })
    if (can.has === false) return true;
    else return false

}