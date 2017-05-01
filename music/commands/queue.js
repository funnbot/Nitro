exports.run = (message, bot, send) => {
    
    if (!bot.music.registry.has(message.channel.guild.id)) return message.channel.createMessage("**There is no music playing**")

    let player = bot.music.registry.get(message.channel.guild.id)

    let num = message.args[0] || 1

    num = nu.range(num, 1, 11)

    player.getQueue(message, num)

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