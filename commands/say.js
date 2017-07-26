exports.run = (message, bot) => {
    message.delete().catch()
    message.channel.send(message.suffix, {disableEveryone:true})
}

exports.conf = {
  userPerm:['MANAGE_MESSAGES'],
  botPerm:["SEND_MESSAGES"],
  coolDown:0,
  dm: false,
  category:"Utility",
  help:"Make Nitro say a message",
  args:"",
}
