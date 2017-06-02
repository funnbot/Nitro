const Canvas = require('canvas');
const fs = require('fs');

exports.run = (message, bot) => {
  let user;
  if (message.mentions.users.first()) {
    user = message.mentions.users.first().username;
  } else {
    return message.channel.send("You need to mention a user.");
  }
  let Image = Canvas.Image,
    canvas = new Canvas(520, 283),
    ctx = canvas.getContext('2d');
  fs.readFile('./images/death.png', (err, image) => {
    if (err) return console.log(err);
      let img = new Image
      img.src = image;
      ctx.drawImage(img, 0, 0, 520, 283);
      ctx.font = "18px Papyrus";
      ctx.fillText(user, 275, 80)
      canvas.toBuffer((err, buff) => {
        if (err) return console.log(err);
        message.channel.send("**" + message.author.username + "** *has added*  **" + user + "** *to their death note*")
        message.channel.sendFile(buff)
      })
  })
}

exports.conf = {
  userPerm: [],
  botPerm: ["SEND_MESSAGES"],
  coolDown: 0,
  dm: true,
  category: "Fun",
  help: "Add a user to your deathnote",
  args: ""
}