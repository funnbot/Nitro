exports.run = (message, bot, suffix, args) => {
  if (!message.mentions.users.first()) return message.channel.sendMessage("Mention a user or multiple users to kick them.")
    let ment = message.mentions.users;
    let text = []
    ment.forEach(m => {
        if (!message.guild.member(m).kickable) {
            message.channel.sendMessage("Something went wrong when kicking: "+m.username);          
        } else {
            message.guild.member(m).kick().then(() => {
                text.push(m.username)
            }).catch(err => message.channel.sendMessage("Something went wrong when kicking: "+m.username))
        }
    });
    setTimeout(function() {
        if (text.length === 0) return;
        message.channel.sendMessage(text.join(", ")+" has been kicked.", {split:true});
    }, 1000);
}

exports.conf = {
  userPerm:["KICK_MEMBERS"],
  botPerm:["SEND_MESSAGES", "KICK_MEMBERS"],
  coolDown:0,
  dm:true,
  category:"Utility",
  help:"Kick a user.",
  args:"",
}