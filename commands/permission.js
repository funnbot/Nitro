const Commands = require('../functions/loadCommands')

let Permissions = [
  "CREATE_INSTANT_INVITE",
  "KICK_MEMBERS",
  "BAN_MEMBERS",
  "ADMINISTRATOR",
  "MANAGE_CHANNELS",
  "MANAGE_GUILD",
  "ADD_REACTIONS",
  "READ_MESSAGES",
  "SEND_MESSAGES",
  "SEND_TTS_MESSAGES",
  "MANAGE_MESSAGES",
  "EMBED_LINKS",
  "ATTACH_FILES",
  "READ_MESSAGE_HISTORY",
  "MENTION_EVERYONE",
  "EXTERNAL_EMOJIS",
  "CONNECT",
  "SPEAK",
  "MUTE_MEMBERS",
  "DEAFEN_MEMBERS",
  "MOVE_MEMBERS",
  "USE_VAD",
  "CHANGE_NICKNAME",
  "MANAGE_NICKNAMES",
  "MANAGE_ROLES_OR_PERMISSIONS",
  "MANAGE_WEBHOOKS",
  "MANAGE_EMOJIS"
]

exports.run = (message, bot, send) => {

  if (!message.args[0]) return send("**Set custom permissions for specific commands**\nUse `" + message.guild.prefix + "permission <command name>` to get the permissions for a command.\nThis works on custom commands aswell.\n*Be careful to not mess up permissions*")

  let cmds = Commands.getCmds()
  let custom = message.guild.custom
  if (!cmds[message.args[0]] && !custom[message.args[0]]) return send("**Invalid Command Name**")

  let entered = message.args[0]

  let cmd = cmds[message.args[0]]

  if (cmd && (cmd.conf.userPerm.indexOf('DEV') > -1 || cmd.conf.userPerm.indexOf('dev') > -1)) return send("**Invalid Command Name**")

  let cmdPerms = cmd ? cmd.conf.userPerm.slice(0) : []

  let perms = message.guild.perms

  if (perms[entered]) {

    Object.keys(perms[entered]).forEach(p => {

      if (perms[entered][p] === "delete") nu.removeA(cmdPerms, p)

      if (perms[entered][p] === "add") cmdPerms.push(p)

    })

  }

  let a, b
  cmdPerms.length > 1 ? a = "s" : a = ""
  cmdPerms.length > 1 ? b = "are" : b = "is"

  if (!message.args[1] && cmdPerms.length < 1) return send("**There are no permissions set for this command**")

  if (!message.args[1]) return send(`**The current permission${a} for the command \`${message.args[0]}\` ${b}:** \`${cmdPerms.join(", ")}\``)

  if (Permissions.indexOf(message.args[1]) === -1) return send("**`" + message.args[1] + "` is not a Resolvable Permission**\n**Valid Permissions:**\n`" + Permissions.join("` | `") + "`")

  let arg = message.args[1]

  if (cmdPerms.indexOf(arg) > -1) {

    if (perms[entered] && perms[entered][arg]) {

      delete perms[entered][arg]

      if (Object.keys(perms[entered]).length < 1) delete perms[entered]

    } else {

      if (!perms[entered]) perms[entered] = {}

      perms[entered][arg] = "delete"

    }

  } else {

    if (perms[entered] && perms[entered][arg]) {

      delete perms[entered][arg]

      if (Object.keys(perms[entered]).length < 1) delete perms[entered]

    } else {

      if (!perms[entered]) perms[entered] = {}

      perms[entered][arg] = "add"

    }

  }

  let newPerms = cmd ? cmd.conf.userPerm.slice(0) : []

  if (perms[entered]) {

    Object.keys(perms[entered]).forEach(p => {

      if (perms[entered][p] === "delete") nu.removeA(newPerms, p)

      if (perms[entered][p] === "add") newPerms.push(p)

    })

  }

  send("**Changed the permission(s) for the command `" + message.args[0] + "` to:** `" + newPerms.join("` | `") + "`")

  bot.config.setPerms(message.guild.id, perms)

}

exports.conf = {
  userPerm: ["MANAGE_GUILD"],
  botPerm: ["SEND_MESSAGES"],
  coolDown: 0,
  dm: true,
  category: "Utility",
  help: "Customize specific permissions for each command.",
  args: "",
}