const rn = require('random-number');

let battle = {};

exports.run = (message, bot, send) => {
    if (!message.mentions.users.first()) return send("**:face_palm: | You need to mention someone to attack them**");
    let target = message.mentions.users.first();

 }

exports.conf = {
  userPerm:[],
  botPerm:["SEND_MESSAGES"],
  coolDown:0,
  dm:false,
  category:"Fun",
  help:"Attack another member. [VERY WIP]",
  args:"<@mention>",
}

function roll(min, max) {
    return rn({min, max, integer:true});
}