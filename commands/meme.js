const auth = require('../config.js')
const Imgflipper = require('imgflipper')
const imgflipper = new Imgflipper(auth.flipuser, auth.flippass)

const meme = {
    "brace": 61546,
    "mostinteresting": 61532,
    "takemymoney": 176908,
    "onedoesnot": 61579,
    "yuno": 61527,
    "success": 61544,
    "allthethings": 61533,
    "doge": 8072285,
    "drevil": 40945639,
    "skeptical": 101711,
    "notime": 442575,
    "yodawg": 101716,
    "awkwardpenguin": 61584,
    "gears": 356615,
    "captiannow": 29617627,
    "arthurfist": 74191766,
    "kevinhart": 265789,
    "attachedgf": 100952,
    "puffin": 7761261
};

exports.run = (message, bot, send) => {
    if (!meme.hasOwnProperty(message.args[0])) {
        return send("Invalid Meme Type, Heres the list:\n `brace, mostinteresting, takemymoney, onedoesnot, yuno, success, allthethings, doge, drevil, skeptical, notime, yodawg, awkwardpenguin, gears, captiannow, arthurfist, kevinhart, attachedgf, puffin`")
    }
    let tags = message.content.split('"');
    let memetype = message.args[0]
    imgflipper.generateMeme(meme[memetype], tags[1] ? tags[1] : "", tags[3] ? tags[3] : "", function (err, image) {
        if (err) {
            let pre = message.guild.prefix
            send("Please format your memes as follows. " + pre + "meme "+memetype+" \"toptext\" \"bottomtext\"")
        }
        message.channel.send(image);
    });
}

exports.conf = {
    userPerm: [],
    botPerm: ["SEND_MESSAGES"],
    coolDown: 0,
    dm: true,
    category: "Random",
    help: "Generate a classic Top text, Bottom text meme.",
    args: "",
}