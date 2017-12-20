const bot = require('../bot')
const moment = require('moment')

exports.fire = (text, guild) => {
    if (!guild.channels) return
    let channel = guild.channels.find(c => c.topic && c.topic.includes("nitro-modlog"));
    if (!channel) return
    let time = `**\`[${moment().format("M/D/YY - hh:mm")}]\`** `
    channel.send(time + text, {
        split: true
    }).catch(console.log);
}

bot.on('messageDelete', msg => {
    if (msg.channel.type !== "text") return
    if (msg.channel.topic && msg.channel.topic.includes("nitro-modlog")) return;
    exports.fire(`**#${msg.channel.name} | ${msg.author.tag}'s message was deleted:** \`${msg.content}\``, msg.guild)
})

bot.on('messageUpdate', (msg, newMsg) => {
    if (msg.content === newMsg.content) return
    exports.fire(`**#${msg.channel.name} | ${msg.author.tag} edited their message:**\n**before:** \`${msg.content}\`\n**+after:** \`${newMsg.content}\``, msg.guild)
})

bot.on('guildMemberUpdate', (old, nw) => {
    let txt
    if (old.roles.size !== nw.roles.size) {
        if (old.roles.size > nw.roles.size) {
            //Taken
            let dif = old.roles.filter(r => !nw.roles.has(r.id)).first()
            txt = `**${nw.user.tag} | Role taken -> \`${dif.name}\`**`
        } else if (old.roles.size < nw.roles.size) {
            //Given
            let dif = nw.roles.filter(r => !old.roles.has(r.id)).first()
            txt = `**${nw.user.tag} | Role given -> \`${dif.name}\`**`
        }
    } else if (old.nickname !== nw.nickname) {
        txt = `**${nw.user.tag} | Changed their nickname to -> \`${nw.nickname}\`**`
    } else return
    exports.fire(txt, nw.guild)
})

bot.on('roleCreate', (role) => {
    exports.fire("**New role created**", role.guild)
})

bot.on('roleDelete', (role) => {
    exports.fire("**Role deleted -> `" + role.name + "`**", role.guild)
})

bot.on('roleUpdate', (old, nw) => {
    let txt
    if (old.name !== nw.name) {
        txt = `**${old.name} | Role name updated to -> \`${nw.name}\`**`
    } else return
    exports.fire(txt, nw.guild)
})

bot.on('guildBanAdd', (guild, user) => {
    exports.fire(`**User banned -> \`${user.tag}\`**`, guild)
})

bot.on('guildBanRemove', (guild, user) => {
    exports.fire(`**User unbanned -> \`${user.tag}\`**`, guild)
})
