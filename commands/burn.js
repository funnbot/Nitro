exports.run = (message, bot) => {
    if (!message.mentions.users.first()) return message.channel.sendMessage('Mention someone.')
    message.channel.sendMessage(`**${message.author.username}** *burned* **${message.mentions.users.first().username}**\nYou need some ice for that bud? :snowflake:\nhttps://cdn.discordapp.com/attachments/186920285285384192/262348996784291840/image.gif`)
}

exports.conf = {
    userPerm: [],
    botPerm: ["SEND_MESSAGES"],
    coolDown: 0,
    dm: false,
    category: "Random",
    help: "Burn a user.",
    args: "",
}