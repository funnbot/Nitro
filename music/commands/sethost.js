const music = require('../func/music');

exports.run = (message, bot, suffix, args) => {
    if (!message.mentions.users.first()) return message.channel.sendMessage("You must mention a user to make them the host.");
    let can = music.checkHostPerm(message);
    if (can === "nm") return message.channel.sendMessage("There are no music sessions active.");
    if (can) {
        let user = message.mentions.users.first();
        if (!message.guild.member(user).voiceChannel) return message.channel.sendMessage("The new host must be in a voice channel.");
        music.setHost(message.guild.id, user.id, (err, did) => {
            if (err) return message.channel.sendMessage("There is no music session.");
            message.channel.sendMessage(user.username+" has been made the host.")
        })
    } else {
        message.channel.sendMessage("You must be the host of this session or have the `MANAGE_GUILD` permission to use this commmand")
    }
}

exports.conf = { 
    userPerm: [],
    botPerm: ["SEND_MESSAGES"],
    coolDown: 0,
    dm: false,
    category: "Music",
    help: "Set the host for the current music session.",
    args: "<@mention>",
}