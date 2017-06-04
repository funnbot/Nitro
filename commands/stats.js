const os = require('os');

function convertMS(ms) {
    var d, h, m, s;
    s = Math.floor(ms / 1000);
    m = Math.floor(s / 60);
    s = s % 60;
    h = Math.floor(m / 60);
    m = m % 60;
    d = Math.floor(h / 24);
    h = h % 24;
    return {
        d: d,
        h: h,
        m: m,
        s: s
    };
};

exports.run = (message, bot) => {
    var cpu = os.loadavg();
    let u = convertMS(bot.uptime);
    let uptime = u.d + " D - " + u.h + " H - " + u.m + " M - " + u.s + " S"

    let embed = new bot.embed()
    embed.setDescription("\nNitro is the next best thing in Server Managment\nIt can handle any type of server, with loads of customization to spare")
    embed.setTitle("`[ Stats ]`")
    embed.setColor(0x4DD0D9)
    embed.addField("Creator", "Funnbot#4695", true)
    embed.addField("Uptime", uptime, true)
    getSharded(bot).then((res) => {

        embed.addField("On Shard " + (bot.shard.id + 1) + "/" + bot.shard.count, "**Guilds: **" + bot.guilds.size + " | **Channels: **" + bot.channels.size + " | **Users: **" + bot.users.size, true)
        embed.addField("On All Shards", "**Guilds: **" + res[0] + " | **Channels: **" + res[1] + " | **Users: **" + res[2], true)
        embed.addField("Memory", Math.round(process.memoryUsage().rss / 1024 / 1024) + "MB", true)
        embed.addField("CPU", Math.ceil(cpu[1] * 100) / 10 + "%", true)
        embed.addField("Framework", "Discord.js V1.11", true)
        message.channel.send("", {
            embed
        });

    })
    
}

exports.conf = {
    userPerm: [],
    botPerm: ["SEND_MESSAGES"],
    coolDown: 0,
    dm: true,
    category: "Other",
    help: "Statistics for Nitro",
    args: "",
}

let getSharded = (bot) => {

    return new Promise((resolve, reject) => {

        bot.shard.fetchClientValues('guilds.size').then(results => {
            results = results.reduce((prev, val) => prev + val, 0)
            bot.shard.fetchClientValues('channels.size').then(result => {
                result = result.reduce((prev, val) => prev + val, 0)
                bot.shard.fetchClientValues('users.size').then(res => {
                    res = res.reduce((prev, val) => prev + val, 0)
                    return resolve([results, result, res])
                })
            })
        })

    })

}