const bot = require('../bot.js')
const request = require('request');
const auth = require('../config')

bot.on('guildCreate', (g) => {
    g.defaultChannel.send("**Hello I Am Nitro, Your helpful Server Management Bot**\n\n**Use `n!help` to get started.**\nSupport Server: <https://discordapp.com/invite/aZ2PYhn>")
    dBots()
    carbon()
})

bot.on('guildDelete', (g) => {
    bot.config.guildLeave(g.id);
    dBots()
    carbon()
})

function dBots() {
    request({
        url: "https://bots.discord.pw/api/bots/264087705124601856/stats",
        method: "POST",
        json: true,
        headers: {
            "Authorization": auth.dbots
        },
        body: {
            "server_count": bot.guilds.size
        }
    }, function (error, response, body) {});
}

function carbon() {
    request({
        url: "https://www.carbonitex.net/discord/data/botdata.php",
        method: "POST",
        json: true,
        body: {
            key: auth.carbon,
            servercount: bot.guilds.size
        }
    }, (error, res, body) => {})
}