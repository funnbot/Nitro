const Discord = require('discord.js')

exports.run = (message, bot, send) => {
  let user = message.mentions.users.first()
  if (!user) return send("**Mention a user to rep+ them**")
  if (user.id === message.author.id) return send("**You can't rep yourself**")
  let msg = message.args[1] ? message.args.slice(1).join(" ") : false
  let auth = message.author
  let type = 1
  let tag = auth.tag

  let rep = bot.profile.getRep(user.id)
  if (rep[auth.id]) {
    if (rep[auth.id].type === 2) {
      rep[auth.id] = {type, msg, tag}
      send("**Successfuly added positive reputation to " + user.tag + "**")
    } else {
      return send("**You have already +rep'd this user**")
    }
  } else {
    rep[auth.id] = {type, msg, tag}
    send("**Successfuly added positive reputation to " + user.tag + "**")
  }
  bot.profile.setRep(user.id, rep)
}

exports.conf = {
  userPerm: [],
  botPerm: ["SEND_MESSAGES"],
  coolDown: 0,
  dm: false,
  category: "Reputation",
  help: "Give positive reputation to a user",
  args: ""
}