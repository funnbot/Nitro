const rn = require('random-number');
const pretty = require('pretty-ms');
const bot = require('../bot')
const prof = bot.profile
let lot = false;

function go() {
    let store = lot;
    if (lot) {
        let members = Object.keys(lot.members);
        if (members.length === 0) return;
        let all = [];
        members.forEach(m => {
            let mem = store.members[m];
            if (!!mem.tickets && mem.tickets !== 0) {
                for (i = 0; i < mem.tickets; i++) {
                    all.push(m);
                }
            }
        });
        let r = rn({
            min: 0,
            max: all.length - 1,
            integer: true
        });
        let win = all[r];
        members.forEach(m => {
            let mem = store.members[m];
            if (m === win) {
                bot.fetchUser(m).then(user => {
                    user.send(`:tada:                                                                          :tada:\n                         **Congratulations**                     \n         **You have won the Lottery Jackpot of:**\n                                **$${store.jackpot} :dollar: **\n:tada:                                                                          :tada:`)
                })
                let mo = prof.getMoney(m);
                prof.setMoney(m, mo + store.jackpot);
            } else {
                bot.fetchUser(m).then(user => {
                    user.send(`:slight_frown: | **You have lost $${mem.tickets*100} in the lottery, better luck next time **| :slight_frown:`)
                })
            }
        })
    }
    lot = {};
    lot.members = {};
    lot.started = (new Date).getTime();
    lot.jackpot = 0;
}

go()

setInterval(() => {
    go()
}, 14400000)

exports.run = (message, bot, send) => {
    if (!lot) return send("**The Lottery Is Not Currently Active**");
    let id = message.author.id;
    let left = (new Date).getTime() - lot.started;
    left = 14400000 - left;
    let k = pretty(left);
    let num = parseInt(message.args[0]) || "k";
    let there = (!lot.members[id] || !lot.members[id].tickets) ? 0 : lot.members[id].tickets;
    if (!message.args[0]) return send(`:moneybag: **Lottery** :moneybag:\n**Jackpot:  $${lot.jackpot}**\n**Next Drawing: ${k}**\n**You Have ${there} ticket(s)**\n\n**You can buy tickets with \`n!lottery <amount>\`**\n**Each ticket costs $100**`);
    if (num > 20) return send("**:arrow_down_small: | You can not buy more than 20 tickets**");
    if (num < 1) return send("**:arrow_up_small: | You must choose a number 1 or higher**");
    if (num === "k") return send("**:1234: | Choose a number between 1 and 20**");
    let money = prof.getMoney(id);
    let current = (!lot.members[id]) ? 0 : lot.members[id].tickets;
    if (current >= 20) return send("**:no_entry_sign: | You already have the max of 20 tickets**");
    let buying = (current + num >= 20) ? 20 - current : num;
    let cash = buying * 100;
    if (money < cash) return send("**:money_with_wings: | You can not afford " + buying + " ticket(s)**")
    prof.setMoney(id, money - cash);
    lot.jackpot = lot.jackpot + cash;
    if (!lot.members[id]) lot.members[id] = {};
    lot.members[id].tickets = current + buying;
    return send(`** :thumbsup: | You have bought ${buying} lottery ticket(s) for $${cash} :**`);
}

exports.conf = {
    userPerm: [],
    botPerm: ["SEND_MESSAGES"],
    coolDown: 0,
    dm: false,
    category: "Social",
    help: "Play in the lottery.",
    args: "",
}