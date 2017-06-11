exports.run = (message, bot, send) => {
    
    if (!message.mentions.users.first()) return send("**Mention a user to pardon a strike**")
    let user = message.mentions.users.first()
    let strikes = message.guild.strikes
    if (!strikes.users || !strikes.users[user.id] ||strikes.users[user.id] === 0) return send("**This user does not have any strikes**")
    strikes.users[user.id]--
    console.log(strikes.users[user.id])
    bot.config.setStrike(message.guild.id, strikes)
    let num = strikes.users[user.id] === 1 ? strikes.users[user.id] + "` strike**" : strikes.users[user.id] + "` strikes**"
    send("**This user now has `"+num)

}

exports.conf = {
  userPerm:["MANAGE_GUILD"],
  botPerm:["SEND_MESSAGES"],
  coolDown:0,
  dm:false,
  category:"Moderation",
  help:"Remove a strike from a user",
  args:"",
}