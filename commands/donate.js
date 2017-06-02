exports.run = (message, bot) => {
  let msg = "Maintaining Nitro costs a good amount of money and every bit helps :)\nhttps://www.patreon.com/user?u=4661783"
  message.channel.send(msg)
}

exports.conf = {
  userPerm:[],
  botPerm:["SEND_MESSAGES"],
  coolDown:0,
  dm:true,
  category:"Other",
  help:"Donate to my patreon",
  args:"",
}