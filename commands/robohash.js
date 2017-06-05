exports.run = (message, bot) => {
  let suffix = message.args[0] ? message.suffix : message.author.id
  message.channel.sendFile(`https://robohash.org/${suffix}.png`)
}

exports.conf = {
  userPerm:[],
  botPerm:["SEND_MESSAGES"],
  coolDown:0,
  dm:true,
  category:"Fun",
  help:"Generate a robohash with provided text.",
  args:"",
}