const bot = require('../bot.js')
const request = require('request');
const auth = require('../config')
const Mixpanel = require('mixpanel');
let mixpanel = Mixpanel.init("a4cd26822d32fdde282a60cb28c31253")

bot.on('guildCreate', (g) => {
    g.defaultChannel.send("**Hello I Am Nitro, Your helpful Server Management Bot**\n\n**Use `n!help` to get started.**\nSupport Server: <https://discordapp.com/invite/aZ2PYhn>")
    dBots()
    carbon()
    discordBots()
    mixpanel.track("Guild Join", {a: 1})
})

bot.on('guildDelete', (g) => {
    bot.config.guildLeave(g.id);
    dBots()
    carbon()
    discordBots()
    mixpanel.track("Guild Leave", {a: -1})
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
            "shard_id": bot.shard.id,
            "shard_count": bot.shard.count,
            "server_count": bot.guilds.size
        }
    }, function (error, response, body) {});
}

function discordBots() {
    request({
        url: "https://discordbots.org/api/bots/264087705124601856/stats",
        method: "POST",
        json: true,
        headers: {
            Authorization: auth.discordbots
        },
        body: {
            "shard_id": bot.shard.id,
            "shard_count": bot.shard.count,
            "server_count": bot.guilds.size
        }
    })
}

function carbon() {
    request({
        url: "https://www.carbonitex.net/discord/data/botdata.php",
        method: "POST",
        json: true,
        body: {
            key: auth.carbon,
            servercount: bot.guilds.size,
            shardcount: bot.shard.count
        }
    }, (error, res, body) => {})
}