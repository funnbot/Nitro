exports.run = (message, bot, send) => {

    if (!message.member.voiceState.channelID) return message.channel.createMessage("**You must be in a voice channel to queue music.**")

    if (!message.args[0]) return message.channel.createMessage("**Provide a link or search query to queue a song**")

    let member = message.channel.guild.members.find(m => m.id === bot.user.id)

    let voiceChannel, player


    voiceChannel = message.member.voiceState.channelID

    bot.joinVoiceChannel(voiceChannel).then(connection => {

        player = bot.music.registry.createGuildPlayer(connection, message, bot)

        queue(message, player)
    })


}

exports.conf = {
    userPerm: [],
    botPerm: ["SEND_MESSAGES"],
    coolDown: 0,
    dm: false,
    category: "",
    help: "",
    args: "",
}

function queue(message, player) {

    let requester = {
        id: message.author.id,
        name: message.author.username,
        discrim: message.author.discriminator
    }

    player.queue(message.suffix, requester).then(data => {

        if (Array.isArray(data)) message.channel.createMessage("**Adding `" + data.length + "` songs from playlist**")
        else message.channel.createMessage("**Adding song `" + data.title + "`**")

        player.play()

    }).catch(err => message.channel.createMessage("**" + err + "**"))

}