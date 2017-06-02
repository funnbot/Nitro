const rn = require('random-number');
const pretty = require('pretty-ms');
const prof = require('../bot').profile
let done = {};

exports.run = (message, bot, send) => {
    let id = message.author.id;
    if (!!done[id] && (new Date).getTime() - done[id] < 21600000) {
        let r = (new Date).getTime() - done[id];
        r = 21600000 - r;
        send('**:atm: | Daily :dollar: refreshes in '+pretty(r, {verbose:true})+'**');
    } else {
        let r = rn({min:45, max:208, integer:true});
        let money = prof.getMoney(id);
        prof.setMoney(id, money+r);
        send('**:moneybag: | Heres your daily $'+r+'**')
        done[id] = (new Date).getTime()
    }
}

exports.conf = {
  userPerm:[],
  botPerm:["SEND_MESSAGES"],
  coolDown:0,
  dm:true,
  category:"Social",
  help:"Get your daily 💵",
  args:"",
}