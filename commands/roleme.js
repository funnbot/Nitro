exports.run = (message, bot) => {
  let roles = message.guild.roleme
  let prefix = message.guild.prefix
  roles.forEach(r => {
    if (!message.guild.roles.exists('name', r)) {
      roles = nu.removeA(roles, r);
    }
  })

  if (!message.args[0]) {
    return message.send("**The Available roles are:**\n` " + (roles.length !== 0 ? roles.join(", ") : "\u200B ")+"`\n\n*Admins:*\n**You can add or remove an option from roleme with:**\n`" + prefix + "roleme add <role>` *or* `" + prefix + "roleme remove <role>`");
  }

  if (message.args[0] === "add") {
    if (!message.channel.permissionsFor(message.member).has("MANAGE_GUILD")) {
      return message.send("You need the `MANAGE_GUILD` permission to manage roleme.");
    }
    if (!message.args[1]) {
      return message.send("Please define an existing role to add to roleme.");
    }
    let name = message.suffix.split(" ");
    name.shift();
    name = name.join(" ");
    if (message.guild.roles.exists('name', name)) {
      if (message.guild.member(bot.user).highestRole.position > message.guild.roles.find('name', name).position) {
        if (message.guild.roles.filter(r => r.name === name).size === 1) {
          if (roles.indexOf(name) === -1) {
            roles.push(name);
            bot.config.setRoleMe(message.guild.id, roles);
            message.send("The role " + name + " has been added to roleme.")
          } else {
            message.send("That role is already added to roleme.");
          }
        } else {
          message.send("There are duplicates of this role and I dont know which to assign.");
        }
      } else {
        message.send("I cannot assign users a role that is higher than mine.");
      }
    } else {
      message.send("The role " + name + " does not exist on this server.");
    }
    return;
  }

  if (message.args[0] === "remove") {
    if (!message.channel.permissionsFor(message.member).has("MANAGE_GUILD")) {
      return message.send("You need the `MANAGE_GUILD` permission to manage roleme.");
    }
    if (!message.args[1]) {
      return message.send("Please define the role to remove from roleme");
    }
    let name = message.suffix.split(" ");
    name.shift();
    name = name.join(" ");
    if (roles.indexOf(name) > -1) {
      roles = nu.removeA(roles, name);
      bot.config.setRoleMe(message.guild.id, roles);
      message.send("The role " + name + " has been removed from roleme");
    } else {
      message.send("The role " + name + " is not currently added to roleme.")
    }
    return;
  }
  let role = message.suffix;
  if (message.member.roles.exists('name', role)) {
    if (roles.indexOf(role) > -1) {
      if (message.guild.member(bot.user).highestRole.position > message.guild.roles.find('name', role).position) {
        message.send("Removing role " + role);
        message.member.removeRole(message.guild.roles.find('name', role));
      } else {
        message.send("I cannot remove this role because it has been moved above my highest role");
      }
    } else {
      message.send("The role you wish to remove is not apart of the roleme config.")
    }
    return;
  }
  if (roles.indexOf(role) === -1) {
    return message.send("**The Available roles are:**\n` " + (roles.length !== 0 ? roles.join(", ") : "\u200B ")+"`\n\n*Admins:*\n**You can add or remove an option from roleme with:**\n`" + prefix + "roleme add <role>` *or* `" + prefix + "roleme remove <role>`");
  }
  if (message.guild.member(bot.user).highestRole.position > message.guild.roles.find('name', role).position) {
    message.member.addRole(message.guild.roles.find('name', role));
    message.send("You have been given the role: " + role + "\nYou can use `" + prefix + "roleme " + role + "` at anytime to remove this role.");
  } else {
    message.send("I cannot assign you this role because it has been moved above my highest role.")
  }
}

exports.conf = {
  userPerm: [],
  botPerm: ["SEND_MESSAGES", "MANAGE_ROLES_OR_PERMISSIONS"],
  coolDown: 0,
  dm: false,
  category: "Utility",
  help: "Give yourself one of the available Role Me roles.",
  args: "<role>"
}