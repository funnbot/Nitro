const request = require('request');

exports.run = (message, bot, send) => {
    let cn = request("http://api.adviceslip.com/advice", function (err, res, body) {
        let cnj = JSON.parse(body)
        message.channel.send(cnj.slip.advice)
    });
}

exports.conf = {
  userPerm:[],
  botPerm:["SEND_MESSAGES"],
  coolDown:0,
  dm:true,
  category:"Fun",
  help:"Need a little advice?",
  args:"",
}