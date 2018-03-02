exports.run = (message, bot) => {
    let num = parseInt(message.args[0]) || false;
    if (num > 3600) return message.channel.send("Channel hiding must last less than an hour.");
    if (num <= 1) return message.channel.send("Channel hide time too short.");
    let prefix = bot.config.getPrefix(message.guild.id);
    if (!message.args[0] || num === false) return message.channel.send("You can hide a channel with:\n" + prefix + "hidechannel <seconds>");
    message.channel.send("**This channel has been hidden for " + num + " seconds.**\nYou can end hiding by typing `unlock` in chat or by waiting the alloted time.").then((m) => {
        let before = m.channel.permissionOverwrites.get(message.guild.id);
        if (before) {
            if (before.allow & 1 << 10) before = true
            else if (before.deny & 1 << 10) before = false
            else before = null
        } else before = null
        message.channel.overwritePermissions(message.guild.id, {
            READ_MESSAGES: false
        }).then(() => {
            let collect = message.channel.createCollector(ms => ms.author.id === message.author.id, {
                time: num * 1000
            });
            collect.on('collect', (msg) => {
                if (msg.content === "unlock") {
                    m.channel.overwritePermissions(message.guild.id, {
                        READ_MESSAGES: before
                    }).then(() => {
                        clearTimeout(timer);
                        m.channel.send("**The hiding has ended**");
                        collect.stop();
                    });
                }
            })
            let timer = setTimeout(function () {
                m.channel.overwritePermissions(message.guild.id, {
                    READ_MESSAGES: before
                }).then(() => {
                    m.channel.send("**The hiding has ended**");
                    collect.stop();
                });
            }, num * 1000);
        })
    });
}

exports.conf = {
    userPerm: ["MANAGE_CHANNELS", "MANAGE_GUILD"],
    botPerm: ["SEND_MESSAGES", "MANAGE_CHANNELS"],
    coolDown: 0,
    dm: true,
    category: "Moderation",
    help: "Hide a channel for a number of seconds",
    args: "<seconds>",
}