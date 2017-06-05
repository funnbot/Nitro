exports.run = (message, bot) => {
    message.channel.send("¯\\_(ツ)_/¯").then(m => {
        setTimeout(() => {
            m.edit("¯\\\\\\-(ツ)-/¯").then(ms => {
                setTimeout(() => {
                    ms.edit("¯\\_(ツ)_/¯")
                }, 500)
            })
        }, 500)

    })
}

exports.conf = {
    userPerm: [],
    botPerm: ["SEND_MESSAGES"],
    coolDown: 0,
    dm: true,
    category: "Fun",
    help: "Animated Shrug",
    args: "",
}