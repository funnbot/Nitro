exports.run = (message, bot, send) => {
    
    if (!bot.music.registry.has(message.channel.guild.id)) return send("**There is no music playing**")

    if (!message.mentions[0]) return send("**Mention a user to make them host**")

    let player = bot.music.registry.get(message.channel.guild.id)

    if (player.checkPerm(message)) return

    player.setHost(message.mentions[0].id)

    send("**Host set to "+message.mentions[0].username+"**")

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