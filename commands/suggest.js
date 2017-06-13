const config = require('../config')
const Discord = require('discord.js')
const Trello = require('node-trello')
const t = new Trello(config.trelloKey, config.trelloToken)
const listid = "593619639c37afba108f097e"
const web = new Discord.WebhookClient("323966823890419712", "Wx2Rmm0A6CCTP8_lSCBpvMbl6XIs0irrSzxJHqre5A_XTO5SLDPFOGqvpOOxuPp3FXud")

exports.run = (message, bot) => {
    if (!message.args[0]) return send("**Suggest a new command or feature**")
    if (!message.args[1]) return send("**I'll need more information than that**")

    let msg = message.suffix
    let user = message.author.tag
    web.send("**" + user + " -** " + msg)

    let card = {
        name: msg,
        pos: "top",
        due: null,
        idList: listid,
        desc: "Suggester: "+user
    }

    t.post("/1/cards/", card, (err) => {
        if (err) return console.log(err)
    })
    message.reply("Thank you for your suggestion!")
}

exports.conf = {
    userPerm: [],
    botPerm: ["SEND_MESSAGES"],
    coolDown: 0,
    dm: true,
    category: "Other",
    help: "Suggest a command or feature",
    args: "",
}