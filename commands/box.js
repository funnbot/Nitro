const ci = ["\🔳", "\🔲" ,"\🔳" ,"\🔲"];
const rn = require('random-number');

exports.run = (message, bot, suffix, args, send) => {
    let text = [];
    for (i=0;i<484;i++) {
        let r = rn({min:0, max:3, integer:true});
        if (i % 22 == 0) text.push("\n")
        else text.push(ci[r]);
    }
    console.log(text);
    send(text.join(""))
}

exports.conf = {
  userPerm:["DEV"],
  botPerm:["SEND_MESSAGES"],
  coolDown:0,
  dm:true,
  category:"DevOnly",
  help:"Create a box of color",
  args:"",
}