exports.run = (message, bot, send) => {
  if (!message.args[0]) {
     send("**Please provide a new nickname.**")
     return;
    }
    if (message.author.id === message.guild.owner.id) {
     send("**Unfortunately I cannot change the owners nickname.**")
     return;
    }
    if (message.member.highestRole.position < message.guild.member(bot.user).highestRole.position) {
     message.member.setNickname(message.suffix);
     send("**Your nickname is now:** " + message.suffix)
    } else {
     send("**Infortunately I cannot change your nickname because your role is higher than mine.**")
    }
}

exports.conf = {
  userPerm:[],
  botPerm:["SEND_MESSAGES", "MANAGE_NICKNAMES"],
  coolDown:0,
  dm:false,
  category:"Other",
  help:"Change *your* nickname using emojis and other special characters",
  args:"",
}