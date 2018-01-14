const bot = require('../bot')
const strikes = require('./strikes')
const inviteRegex = /discord\.gg\/\w+/gim;

module.exports = message => {
    if (message.channel.type !== "text") return;
    if (message.author.id === bot.user.id) return;
    if (message.author.id === message.guild.owner.user.id) return;
    let ad = message.guild.adblock;
    if (!ad.on) return;
    if (ad.ex && ad.ex.users && ad.ex.users[message.author.id]) return;
    if (ad.ex && ad.ex.channels && ad.ex.channels[message.channel.id]) return;
    if (message.content.length < 10) return;
    if (inviteRegex.test(message.content));
    const roles = (ad.ex && ad.ex.roles) ? Object.keys(ad.ex.roles) : null;
    let notEx = true;
    if (roles) {
        for (let r of roles) {
            if (message.member && message.member.roles.has(r))
                notEx = false;
        }
    }
    if (notEx) {
        message.delete();
        message.author.send("**AdBlock**: " + message.author + ", Please Do Not Advertise.").catch(e => e);
        strikes(message.guild.id, message.author.id)
        if (!!ad.notify) {
            let owner = bot.users.get(message.guild.owner.id);
            owner.send(`*The user* **${message.author.tag}** *Advertised in* **${message.guild.name} #${message.channel.name}** *with the message*\n${message.content}`);
        }
    }
}