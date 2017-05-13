const util = require('util');

exports.run = (message, bot) => {
  let users = message.guild.members
  message.channel.send("Mass DM'ing your members. (This may take a bit)")
  users.forEach(u => {
      u.send(message.suffix).catch()
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