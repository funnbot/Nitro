exports.run = (message, bot, send) => {
  
    if (!bot.music.registry.has(message.channel.guild.id)) return message.channel.createMessage("**There is no music playing**")

    let player = bot.music.registry.get(message.channel.guild.id)

    if (!player.checkPerm(message)) return;

    if (player.connection.paused) return message.channel.createMessage("**The music is already paused**")

    player.pause()

    send("**Pausing Music**")

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