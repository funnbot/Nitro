exports.run = (message, bot, send) => {
    
    if (!bot.music.registry.has(message.channel.guild.id)) return send("**There is no paused music**")

    let player = bot.music.registry.get(message.channel.guild.id)

    if (!player.checkPerm(message)) return

    if (!player.connection.paused) return send("**The music is already playing**")

    player.resume()

    send("**Resuming Music**")

}

exports.conf = {
  userPerm:[],
  botPerm:["SEND_MESSAGES"],
  coolDown:0,
  dm:true,
  category:"",
  help:"",
  args:"",
}