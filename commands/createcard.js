const jimp = require('jimp');

exports.run = (message, bot) => {
    let prefix = message.guild.prefix
    if (!message.args[0]) return message.channel.send("To create a card: " + prefix + "createcard This text is on the question card | this text is on the anwser card");
    let text = message.suffix.split("|");
    if (!text[1]) return message.channel.send("Please include text for the second card, and the delimeter `|`");
    jimp.read('./images/cah.png', (err, image) => {
        if (err) return console.log(err);
        jimp.loadFont(jimp.FONT_SANS_64_WHITE).then(font => {
            image.print(font, 70, 70, text[0], 500)
            jimp.loadFont(jimp.FONT_SANS_64_BLACK).then(font2 => {
                image.print(font2, 680, 70, text[1], 500)
                image.getBuffer(jimp.AUTO, (err, buf) => {
                    if (err) return console.log(err);
                    message.channel.sendFile(buf).catch(console.log)
                })
            })
        })
    })
}

exports.conf = {
    userPerm: [],
    botPerm: ["SEND_MESSAGES"],
    coolDown: 0,
    dm: true,
    category: "Fun",
    help: "Create a Custom Cards Against Humanity Question and Anwser Card.",
    args: "",
}