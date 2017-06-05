const rn = require('random-number');

const thing = {
    cherry: '🍒',
    grape: '🍇',
    money: '💰'
}

exports.run = (message, bot, send) => {
    if (!message.args[0]) return send('**:confused: | Provide a bet**');
    let id = message.author.id;
    let money = bot.profile.getMoney(id);
    let bet = parseInt(message.args[0]) || "no";
    if (bet < 100 || bet > 2000 || bet === "no") return send("**:cherries: | Your bet must be an amount between $100 and $2000**");
    if (money < bet) return send("**You cannot afford that bet**")
    let win = run3()
    let did = (win[4] === win[5] && win[5] === win[6]) ? true : false;
    let multiply;
    if (did && win[4] === "money" && win[5] === "money" && win[6] === "money") multiply = 8
    else if (did && win[4] === "cherry" && win[5] === "cherry" && win[6] === "cherry") multiply = 6
    else if (did && win[4] === "grape" && win[5] === "grape" && win[6] === "grape") multiply = 4
    else multiply = false;
    let earned = (multiply) ? bet*multiply : false;
    let m = (earned) ? "**You have won $"+earned+"**" : "**You have lost your bet of $"+bet+"**"
    let slot = "**----------Slots----------**\n:white_large_square: "+thing[win[1]]+" "+thing[win[2]]+" "+thing[win[3]]+" :white_large_square: \n:arrow_forward: "+thing[win[4]]+" "+thing[win[5]]+" "+thing[win[6]]+" :arrow_backward: \n:white_large_square: "+thing[win[7]]+" "+thing[win[8]]+" "+thing[win[9]]+" :white_large_square:\n**--------------------------**\n"+m
    send(slot)
    if (earned) bot.profile.setMoney(id, money+earned)
    else bot.profile.setMoney(id, money-bet);
}

exports.conf = {
    userPerm: [],
    botPerm: ["SEND_MESSAGES"],
    coolDown: 0,
    dm: false,
    category: "Social",
    help: "Play slots",
    args: "",
}

function run3() {
    let chosen = {};
    let item = Object.keys(thing);
    for (i=0;i<9;i++) {
       let r = rn({min:0, max:2, integer:true});
       chosen[i+1] = item[r];
    }
    return chosen;
}
