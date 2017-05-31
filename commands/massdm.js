const util = require('util');

exports.run = (message, bot) => {
  if (!message.suffix) return message.channel.send("I can not send an empty message")
  let users = message.guild.members
  message.channel.send("Mass DM'ing your members. (This may take a bit)")
  users.forEach(u => {
      u.send("**From " + message.guild.name + ":**" + message.suffix).catch()
  })
}

exports.conf = {
  userPerm: ["MANAGE_GUILD"],
  botPerm: ["SEND_MESSAGES"],
  coolDown: 0,
  dm: false,
  category: "Utility",
  help: "DM everyone in your server",
  args: "<message>"
}