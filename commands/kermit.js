const Canvas = require('canvas');
const fs = require('fs');

exports.run = (message, bot) => {
    message.channel.sendFile("./images/kermit.png")
}

exports.conf = {
  userPerm:[],
  botPerm:["SEND_MESSAGES"],
  coolDown:0,
  dm:true,
  category:"Random",
  help:"But thats none of my business",
  args:"",
}