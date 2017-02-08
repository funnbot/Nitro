exports.run = (message, bot, suffix, args) => {
    if (message.author.id === "163735744995655680") {
        message.channel.sendMessage("Restaring Music Module...").then(() => {
            bot.destroy().then(() => {
                process.exit(1);
            })
        })
    }
}

exports.conf = {
    userPerm: [],
    botPerm: ["SEND_MESSAGES"],
    coolDown: 0,
    dm: true,
    category: "",
    help: "",
    args: "",
}