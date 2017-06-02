const bot = require('../bot.js')
const request = require('request');
const auth = require('../config')

bot.on('guildCreate', (g) => {
    g.defaultChannel.send("**Hello I Am Nitro, Your helpful Server Management Bot**\n\n**Use `n!help` to get started.**\nSupport Server: <https://discordapp.com/invite/aZ2PYhn>")
    dBots()
    carbon()
    let embed = {
        title: "Added To: " + g.name + " (ID: " + g.id + ")",
        color: 0x02FF99,
        fields: [{
            name: "Users",
            value: g.members.filter(u => u.user.bot === false).size,
            inline: true
        }, {
            name: "Bots",
            value: g.members.filter(u => u.user.bot === true).size,
            inline: true
        }, {
            name: "Owner",
            value: g.owner.user.username,
            inline: true
        }],
        timestamp: new Date(),
        footer: {
            text: "Guild Total: " + bot.guilds.size,
            icon_url: bot.user.avatarURL
        }
    }
    bot.channels.get('269248681126002698').send("", {
        embed
    });
})

bot.on('guildDelete', (g) => {
    bot.config.guildLeave(g.id);
    dBots()
    carbon()
    let embed = {
        title: "Left: " + g.name + " (ID: " + g.id + ")",
        color: 0xE54242,
        fields: [{
            name: "Users",
            value: g.members.filter(u => u.user.bot === false).size,
            inline: true
        }, {
            name: "Bots",
            value: g.members.filter(u => u.user.bot === true).size,
            inline: true
        }, {
            name: "Owner",
            value: g.owner.user.username,
            inline: true
        }],
        timestamp: new Date(),
        footer: {
            text: "Guild Total: " + bot.guilds.size,
            icon_url: bot.user.avatarURL
        }
    }
    bot.channels.get('269248681126002698').send("", {
        embed
    }).catch(console.log);
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