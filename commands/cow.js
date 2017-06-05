const cows = require('cows');
const rn = require('random-number');

exports.run = (message, bot) => {
    var options = {
        min: 0,
        max: cows().length - 1,
        integer: true
    }
    let random = rn(options);
    message.channel.sendCode("", cows()[random])
}

exports.conf = {
    userPerm: [],
    botPerm: ["SEND_MESSAGES"],
    coolDown: 0,
    dm: true,
    category: "Fun",
    help: "Random Ascii Cow",
    args: "",
}