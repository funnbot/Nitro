exports.run = (message, bot, send) => {
  
    if (!bot.music.registry.has(message.channel.guild.id)) return message.channel.createMessage("**There is no music playing**")

    let player = bot.music.registry.get(message.channel.guild.id)

    if (player.checkPerm(message)) return

    if (!message.args[0]) return send("**Provide the index of the song to remove from the queue**")

    let num = parseInt(message.args[0]) || 0

    if (num < 1) return send("**Invalid song index**")

    if (num === 1) return send("**Cannot remove the currently playing song, use skip instead**")

    let playlist = player.getArray()

    if (playlist.length === 1) return send("**Not enough songs to remove from**")

    if (num > playlist.length) return send("**There are only "+playlist.length+" songs in the queue**")

    send("**Removed song:** "+playlist[num-1].title)

    player.remove(num - 1)

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