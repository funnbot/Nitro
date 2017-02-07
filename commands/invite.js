exports.run = (message, bot, suffix, args) => {
    let text = "Invite Nitro to *Your* server for the next level of Server Management now!\nhttps://discordapp.com/oauth2/authorize?client_id=264087705124601856&scope=bot&permissions=268435510";
    message.channel.sendMessage(text)
}

exports.conf = {
  userPerm:[],
  botPerm:["SEND_MESSAGES"],
  coolDown:0,
  dm:true,
  category:"Other",
  help:"Invite Nitro to your server.",
  args:"",
}  