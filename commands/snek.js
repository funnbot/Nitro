exports.run = (message, bot, send) => {
  message.channel.sendFile("https://cdn.discordapp.com/attachments/222197033908436994/324717206548119573/Snek-is-love-snek-is-life.jpg")
}

exports.conf = {
  userPerm:[],
  botPerm:["SEND_MESSAGES"],
  coolDown:0,
  dm:true,
  category:"Fun",
  help:"snek",
  args:"",
}