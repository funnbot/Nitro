const bot = require('../bot.js').bot;
const config = require('../functions/config.js');

bot.on('guildMemberRemove', (member) => {
    let acc = config.getAnc(member.guild.id);
    if (!acc.channel) return;
    if (!acc.farewell) return;
    if (!member.guild.channels.has(acc.channel)) return;
    let msg = acc.farewell;
    msg = msg.replace(/{name}/g, member.user.username);
    msg = msg.replace(/{total}/g, member.guild.members.size);
    bot.channels.get(acc.channel).sendMessage(msg, {split:true}).catch(err => console.log(err));
})