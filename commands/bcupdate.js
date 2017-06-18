const fs = require('fs')

exports.run = (message, bot, send) => {
    let update = bot.system.getUpdate()
    fs.readFile('./changelog.txt', (err, txt) => {

        let embed = new bot.embed()

        embed.setDescription(txt)

        embed.setColor("#8fbc8f")

        Object.keys(update).forEach(key => {
            bot.fetchUser(key).then(user => {
                user.send({embed})
            }).catch()
        })

    })

}

exports.conf = {
    userPerm: ["DEV"],
    botPerm: ["SEND_MESSAGES"],
    coolDown: 0,
    dm: true,
    category: "DevOnly",
    help: "Broadcast an update",
    args: "",
}