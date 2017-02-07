exports.run = (message, bot, suffix, args) => {
  message.channel.sendMessage("Need Help? Or just want to hang out with some cool people? Come on down to Nitro's Closet where you can suggest and push the progress of Nitro wherever *you* want:\nhttps://discord.gg/aZ2PYhn\nHosting Nitro costs a bit of money, and if you can spare a coin to support me, I would be extremely grateful https://patreon.com/user?u=4661783.")
}

exports.conf = {
  userPerm:[],
  botPerm:["SEND_MESSAGES"],
  coolDown:0,
  dm:true,
  category:"Other",
  help:"Support for Nitro",
  args:"",
}