exports.run = (message, bot) => {
    message.channel.sendMessage(message.suffix, {disableEveryone:true})
}

exports.conf = {
  userPerm:['MANAGE_MESSAGES'],
  botPerm:["SEND_MESSAGES"],
  coolDown:0,
  dm:true,
  category:"Fun",
  help:"Make Nitro say a message",
  args:"",
}