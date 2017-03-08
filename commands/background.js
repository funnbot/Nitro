const bg = require('../functions/bg')
const Canvas = require('canvas')

exports.run = (message, bot, send) => {

  if (!message.args[0]) return send("**The available backround categories are: `solid`, `nightsky`, and `cities` or set to `default`**")
  if (!bg[message.args[0]]) return send("*Invalid category*\n\n**The available backround categories are: `solid`, `nightsky`, and `cities` or set to `default`**")

  if (message.args[0] === "default") {
    message.channel.sendMessage("**Your background has been reset to default**")
    return bot.profile.setBg(message.author.id, "default")
  }

  if (!message.args[1]) return message.channel.sendFile(bg[message.args[0]].file, "bg.png", "__**" + message.args[0] + "**__\nSet your background with: `" + message.guild.prefix + "background " + message.args[0] + " <number>`")

  let num = parseInt(message.args[1]) || 0
  if (num > 9 || num < 1) return send("Choose a number between 1 and 9")

  //Build Preview
  let canvas = new Canvas(400, 400)
  let ctx = canvas.getContext('2d')
  let img = new Canvas.Image()

  img.src = bg[message.args[0]].fold + "/" + num + ".png"
  ctx.drawImage(img, 0, 0, 400, 400)

  canvas.toBuffer((err, buf) => {

    if (err) return console.log(err)

    bot.profile.setBg(message.author.id, [message.args[0], num])
    message.channel.sendFile(buf, "file.png", "**Your background has been set to: **")

  })

}

exports.conf = {
  userPerm: [],
  botPerm: ["SEND_MESSAGES"],
  coolDown: 0,
  dm: false,
  category: "Social",
  help: "Set the background for your profile [WIP]",
  args: "",
}