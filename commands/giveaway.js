const msg = `
**Hello wonderful people, I'm doing a giveaway!!**
The winner of this giveaway will be given access to **patron only commands** (current ones and future ones) up until the next giveaway.

**How to enter:**
Go to <https://discordbots.org>
Click the big login button in the top right, where you can safely login using your discord account.
Finally go to <https://discordbots.org/bot/nitro> and click the upvote button.
On Sunday morning (PST) I will be picking one or more random upvoters, depending on the total entries. 
*You must be in the official discord server to be picked: <https://discord.gg/aZ2PYhn>*.

**Good Luck!!**`
 
exports.run = (message, bot, send) => {
    bot.shard.broadcastEval(`
    for (let guild of this.guilds.values()) {
        let conf = this.config.getAnc(guild.id);
        if (!conf) continue;
        if (!conf.channel) continue;
        let chan = guild.channels.get(conf.channel);
        if (!chan) continue;
        chan.send("${msg}")
            .then(r => console.log("Sent to " + guild.id))
            .catch(e => console.log("Failed " + guild.id))
    }
    `).then(console.log).catch(console.log);
}

exports.conf = {
    userPerm: ["DEV"],
    botPerm: ["SEND_MESSAGES"],
    coolDown: 0,
    dm: false,
    category: "DevOnly",
    help: "thing",
    args: "",
}