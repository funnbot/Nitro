exports.run = (message, bot, send) => {

    let sort = bot.profile.leaderboard(bot)
    let txt = []
    for (i = 0; i < 10; i++) {
        let cur = bot.profile.profiles[sort[i]].money ? bot.profile.profiles[sort[i]].money : 0
        txt.push("**" + (i + 1) + ". " + bot.users.get(sort[i]).username + " - $" + cur + "**")
    }
    message.channel.send(txt)


}

exports.conf = {
    userPerm: [],
    botPerm: ["SEND_MESSAGES"],
    coolDown: 0,
    dm: true,
    category: "Social",
    help: "Leaderboard of the top ten richest users",
    args: "",
}