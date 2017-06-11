const bot = require('../bot')
const strikes = require('./strikes')

module.exports = (message) => {

    if (message.channel.type === "text") {
        if (message.author.id === bot.user.id) return
        let ad = message.guild.adblock
        if (!!ad.on) {
            if (!ad.ex || !ad.ex.users || !ad.ex.users[message.author.id]) {
                if (message.content.includes("discord.gg/")) {
                    let roles = (!!ad.ex && !!ad.ex.roles) ? Object.keys(ad.ex.roles) : [];
                    let notEx = true;
                    if (roles.length > 0) {
                        roles.forEach(r => {
                            if (message.member.roles.has(r)) {
                                notEx = false;
                            }
                        })
                    }
                    if (notEx) {
                        if (message.author.id !== message.guild.owner.user.id) {
                            message.delete();
                            message.author.send("**AdBlock**: " + message.author + ", Please Do Not Advertise.").catch()
                            strikes(message.guild.id, message.author.id)
                            if (!!ad.notify) {
                                bot.users.get(message.guild.owner.id).send("*The user:* **" + message.author.username + "** *Has Advertised in the channel:* **" + message.channel.name + "** *of the server* **" + message.guild.name + "** *With the message:* \n`" + message.content + "`")
                            }
                        }
                    }
                }
            }
        }
    }

}