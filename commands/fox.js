const request = require('request');

exports.run = (message, bot) => {
  var r = request.get('http://foxapi.dev/foxes/', function(err, res, body) {
     if (err) {
      message.channel.send("Service Offline");
      return;
     }
     message.channel.sendFile(r.uri.href);
    });
}

exports.conf = {
  userPerm:[],
  botPerm:["SEND_MESSAGES"],
  coolDown:0,
  dm:true,
  category:"Fun",
  help:"Foxes!!",
  args:"",
}
