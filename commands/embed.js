exports.run = (message, bot, send) => {
    let embed
    try {
        embed = JSON.parse(message.suffix)
    } catch(e) {
        return send("**"+e+"**")
    }
    message.channel.send("", {embed}).catch(e => send("**"+e+"**"))
}

exports.conf = {
    userPerm: [],
    botPerm: ["SEND_MESSAGES"],
    coolDown: 0,
    dm: true,
    category: "Other",
    help: "Create a discord embed",
    args: "",
}