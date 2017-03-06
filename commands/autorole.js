exports.run = (message, bot) => {
  let oldRole = message.guild.autorole
  if (!message.args[0]) {
    if (oldRole !== false) {
      bot.config.setAuto(message.guild.id, false);
      return message.send("**Autorole has been disabled.**")
    } else {
      return message.send('**Please provide a role for autorole.**')
    }
  }
  if (message.mentions.roles.first()) return message.send("**Type the role name instead of mentioning it**")
  if (!message.guild.roles.exists('name', message.suffix)) return message.send("The role **"+message.suffix+"** does not exist on this server.");
  if (message.guild.roles.find('name', message.suffix).position > message.guild.member(bot.user).highestRole.position) return message.send("**I cannot assign a role that is higher than my highest role.**");
  bot.config.setAuto(message.guild.id, message.suffix);
  message.send("The role **" +message.suffix+ "** will now be assigned to users when they join your server.")
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