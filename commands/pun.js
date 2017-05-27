const request = require('request')
const Entities = require('html-entities').AllHtmlEntities;

exports.run = (message, bot) => {
  entities = new Entities();
    request('http://www.punoftheday.com/cgi-bin/arandompun.pl', function(err, res, body) {
     if (err) message.channel.send("Service Offline")
     else {
      body = entities.decode(body);
      body = body.slice(16);
      body = body.slice(0, body.indexOf("'"))
      body = body.slice(0, body.length - 6)
      message.channel.send(body)
     }
    });
}

exports.conf = {
  userPerm:[],
  botPerm:["SEND_MESSAGES"],
  coolDown:0,
  dm:true,
  category:"Random",
  help:"Knock em dead with Puns.",
  args:"",
}