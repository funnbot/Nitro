exports.run = (message, bot, send) => {
    let strikes = message.guild.strikes
    let user = message.mentions.users.first() || message.author
    if (!strikes.users || !strikes.users[user.id] || strikes.users[user.id] === 0) return send(`**${user.tag} has \`0\` strikes**`)
    return send(`**${user.tag} has \`${strikes.users[user.id]}\` strikes**`)
}

exports.conf = {
  userPerm:[],
  botPerm:["SEND_MESSAGES"],
  coolDown:0,
  dm:true,
  category:"Moderation",
  help:"See how many strikes a user has",
  args:"",
}