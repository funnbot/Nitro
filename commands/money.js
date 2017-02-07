const prof = require('../functions/profile');

exports.run = (message, bot, suffix, args, send) => {
    let user = (!message.mentions.users.first()) ? message.author : message.mentions.users.first();
    let mon = prof.getMoney(user.id);
    send("**:atm: | "+user.username+" has "+mon+" :dollar:**")
}

exports.conf = {
  userPerm:[],
  botPerm:["SEND_MESSAGES"],
  coolDown:0,
  dm:true,
  category:"Fun",
  help:"Get your current balance",
  args:"",
}