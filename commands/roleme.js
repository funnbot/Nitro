const config = require('../functions/config.js');

exports.run = (message, bot, suffix, args) => {
  let roles = config.getRoleMe(message.guild.id);
  let prefix = config.getPrefix(message.guild.id);
  roles.forEach(r => {
    if (!message.guild.roles.exists('name', r)) {
      roles = tro.removeA(roles, r);
    }
  })

  if (!args[0]) {
    return tro.info(message, "**The Available roles are:**\n` "+roles.join(", ")+"`\n\n*Admins:*\n**You can add or remove an option from roleme with:**\n`"+prefix+"roleme add <role>` *or* `"+prefix+"roleme remove <role>`");
  }

  if (args[0] === "add") {
    if (!message.channel.permissionsFor(message.member).hasPermission("MANAGE_GUILD")) {
      return tro.warn(message, "You need the `MANAGE_GUILD` permission to manage roleme.");
    }
    if (!args[1]) {
      return tro.warn(message, "Please define an existing role to add to roleme.");
    }
    let name = suffix.split(" ");
    name.shift();
    name = name.join(" ");
    if (message.guild.roles.exists('name', name)) {
      if (message.guild.member(bot.user).highestRole.position > message.guild.roles.find('name', name).position) {
        if (message.guild.roles.filter(r => r.name === name).size === 1) {
          if (roles.indexOf(name) === -1) {
            roles.push(name);
            config.setRoleMe(message.guild.id, roles);
            tro.succ(message, "The role "+name+" has been added to roleme.")
          } else {
            tro.error(message, "That role is already added to roleme.");
          }
        } else {
          tro.error(message, "There are duplicates of this role and I dont know which to assign.");
        }
      } else {
        tro.error(message, "I cannot assign users a role that is higher than mine.");
      }
    } else {
      tro.error(message, "The role "+name+" does not exist on this server.");
    }
    return;
  }

  if (args[0] === "remove") {
    if (!message.channel.permissionsFor(message.member).hasPermission("MANAGE_GUILD")) {
      return tro.warn(message, "You need the `MANAGE_GUILD` permission to manage roleme.");
    }
    if (!args[1]) {
      return tro.warn(message, "Please define the role to remove from roleme");
    }
    let name = suffix.split(" ");
    name.shift();
    name = name.join(" ");
    if (roles.indexOf(name) > -1) {
      roles = tro.removeA(roles, name);
      config.setRoleMe(message.guild.id, roles);
      tro.succ(message, "The role "+name+" has been removed from roleme");
    } else {
      tro.error(message, "The role "+name+" is not currently added to roleme.")
    }
    return;
  }
  let role = suffix;
  if (message.member.roles.exists('name', role)) {
    if (roles.indexOf(role) > -1) {
      if (message.guild.member(bot.user).highestRole.position > message.guild.roles.find('name', role).position) {
        tro.succ(message, "Removing role "+role);
        message.member.removeRole(message.guild.roles.find('name', role));
      } else {
        tro.error(message, "I cannot remove this role because it has been moved above my highest role");
      }
    } else {
      tro.error(message, "The role you wish to remove is not about of the roleme config.")
    }
    return;
  }
  if (roles.indexOf(role) === -1) {
    return tro.info(message, "**The Available roles are:**\n`"+roles.join(", ")+"`\n\n*Admins:*\n**You can add or remove an option from roleme with:**\n`"+prefix+"roleme add <role>` *or* `"+prefix+"roleme remove <role>`");
  }
  if (message.guild.member(bot.user).highestRole.position > message.guild.roles.find('name', role).position) {
    message.member.addRole(message.guild.roles.find('name', role));
    tro.succ(message, "You have been given the role: "+role+"\nYou can use `"+prefix+"roleme "+role+"` at anytime to remove this role.");
  } else {
    tro.warn(message, "I cannot assign you this role because it has been moved above my highest role.")
  }
}

exports.conf = {
  userPerm:[],
  botPerm:["SEND_MESSAGES", "MANAGE_ROLES_OR_PERMISSIONS"],
  coolDown:0,
  dm:false,
  category:"Utility",
  help:"Give yourself one of the available Role Me roles.",
  args:"<role>"
}
