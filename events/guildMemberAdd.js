const bot = require('../bot.js')

bot.on('guildMemberAdd', (member) => {
  joindm(member);
  autorole(member);
  welcome(member);
})

let welcome = member => {
  let acc = bot.config.getAnc(member.guild.id);
  if (!acc.channel) return;
  if (!acc.welcome) return;
  if (!member.guild.channels.has(acc.channel)) return;
  let msg = acc.welcome;
  msg = msg.replace(/{member}/g, member);
  msg = msg.replace(/{name}/g, member.user.username);
  msg = msg.replace(/{total}/g, member.guild.members.size);
  bot.channels.get(acc.channel).send(msg, {
    split: true
  }).catch(err => console.log(err));
}

let autorole = member => {
  let autorole = bot.config.getAuto(member.guild.id)
  if (autorole !== false) {
    if (!member.guild.member(bot.user).hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) return;
    if (!member.guild.roles.exists('name', autorole)) return;
    if (member.guild.roles.find('name', autorole).position > member.guild.member(bot.user).highestRole.position) return;
    member.addRole(member.guild.roles.find('name', autorole));
  }
}

let joindm = member => {
  let joindm = bot.config.getJDM(member.guild.id)
  if (joindm) member.send(joindm)
}