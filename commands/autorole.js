const config = require('../functions/config.js');

exports.run = (message, bot, suffix, args) => {
  let oldRole = config.getAuto(message.guild.id);
  if (!args[0]) {
    if (oldRole !== false) {
      config.setAuto(message.guild.id, false);
      return tro.succ(message, "Autorole has been disabled.", 10000)
    } else {
      return tro.warn(message, 'Please provide a role for autorole.', 5000)
    }
  }
  if (!message.guild.roles.exists('name', suffix)) return tro.warn(message, "The role **"+suffix+"** does not exist on this server.", 5000);
  if (message.guild.roles.find('name', suffix).position > message.guild.member(bot.user).highestRole.position) return tro.warn(message, "I cannot assign a role that is higher than my highest role.", 5000);
  config.setAuto(message.guild.id, suffix);
  tro.succ(message, "The role **" +suffix+ "** will now be assigned to users when they join your server.", 10000)
}

exports.conf = {
  userPerm:["MANAGE_GUILD"],
  botPerm:["SEND_MESSAGES", "MANAGE_ROLES_OR_PERMISSIONS"],
  coolDown:0,
  dm:false,
  category:"Utility",
  help:"Setup autorole on user join.",
  args:"<add/remove>",
}