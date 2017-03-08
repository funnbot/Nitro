const fs = require('fs')

exports.run = (message, bot) => {
    fs.readFile('./changelog.txt', (err, txt) => {

      let embed = new bot.embed()

      embed.setDescription(txt)

      embed.setColor("#8fbc8f")

      message.channel.sendEmbed(embed)

    })
}

exports.conf = {
  userPerm:[],
  botPerm:["SEND_MESSAGES"],
  coolDown:0,
  dm:true,
  category:"Other",
  help:"See the most recent changes to Nitro",
  args:""
}
