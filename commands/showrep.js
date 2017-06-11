exports.run = (message, bot, send) => {
    let user = message.mentions.users.first() || message.author
    let rep = bot.profile.getRep(user.id)
    let keys = Object.keys(rep)
    let total = 0
    let txt = []
    keys.forEach(k => {
        if (rep[k].type === 1) total++
        if (rep[k].type === 2) total--
        txt.push(`**${rep[k].type === 1 ? "[ + ]" : "[ - ]"} ${rep[k].tag} ${rep[k].msg ? "- " + rep[k].msg : ""}**`)
    })
    let embed = new bot.embed()
    embed.setTitle(`${user.tag}'s reputation: ${total}`)
    embed.setDescription(txt.join("\n"))
    embed.setColor("#87ceeb")
    send("", {embed})

}

exports.conf = {
    userPerm: [],
    botPerm: ["SEND_MESSAGES"],
    coolDown: 0,
    dm: false,
    category: "Reputation",
    help: "Show the reputation for a user",
    args: "",
}