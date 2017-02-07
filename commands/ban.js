exports.run = (message, bot, suffix, args) => {
    if (!message.mentions.users.first()) return message.channel.sendMessage("Mention a user or multiple users to ban them.")
    let ment = message.mentions.users;
    let text = []
    ment.forEach(m => {
        console.log(m)
        if (!message.guild.member(m).bannable) {
            message.channel.sendMessage("Something went wrong when banning: "+m.username);          
        } else {
            message.guild.ban(message.guild.member(m)).then(() => {
                text.push(m.username)
            }).catch(err => message.channel.sendMessage("Something went wrong when banning: "+m.username))
        }
    });
    setTimeout(function() {
        if (text.length === 0) return;
        message.channel.sendMessage(text.join(", ")+" has been banned.", {split:true});
    }, 1000);
}

exports.conf = {
    userPerm: ["BAN_MEMBERS"],
    botPerm: ["SEND_MESSAGES", "BAN_MEMBERS"],
    coolDown: 0,
    dm: false,
    category: "Utility",
    help: "Ban a user",
    args: "<@mention>",
}