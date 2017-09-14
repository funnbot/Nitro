const prof = require('../bot').profile
const Canvas = require('canvas');
const fs = require('fs');
const request = require('request');
const jimp = require('jimp');
const pretty = require('pretty-ms');
const bg = require('../functions/bg');
const snumber = require('short-number')

exports.run = (message, bot) => {
    message.channel.send("**Generating...**").then(gen => {

        let time = (new Date).getTime();
        let id = (!message.mentions.users.first()) ? message.author.id : message.mentions.users.first().id;
        let user = (!message.mentions.users.first()) ? message.author : message.mentions.users.first();
        if (user.bot) return gen.edit("**Bots do not have profiles**")
        let lvl = prof.getLvl(id);
        let rank = prof.getRank(id) || 0;
        let sent = prof.getSent(id) || 0;
        let taco = prof.getMoney(id);
        let shout = prof.getShout(id, message.guild.prefix);
        let get = prof.getBg(id)
        let back = get === "default" ? bg.default.file : bg[get[0]].fold + "/" + get[1] + ".png"
        let Image = Canvas.Image,
            canvas = new Canvas(2000, 2000),
            ctx = canvas.getContext('2d');
        ctx.patternQuality = 'bilinear';
        ctx.filter = 'bilinear';
        ctx.antialias = 'subpixel';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
        ctx.shadowOffsetY = 2;
        ctx.shadowBlur = 2;
        fs.readFile(back, function (err, Background) {
            if (err) return console.log(err);
            let BG = Canvas.Image;
            let ground = new Image;
            ground.src = Background;
            ctx.drawImage(ground, 0, 0, 2000, 2000);
            fs.readFile('./images/profile.png', (err, profile) => {
                if (err) return console.log(err);
                let that = new Image;
                that.src = profile;
                ctx.drawImage(that, 0, 0, 2000, 2000)
                let url = user.displayAvatarURL.endsWith(".webp") ? user.displayAvatarURL.slice(0, -5) + ".png" : user.displayAvatarURL;
                jimp.read(url, (err, ava) => {
                    if (err) return console.log(err);
                    ava.getBuffer(jimp.MIME_PNG, (err, buf) => {
                        if (err) return console.log(err);

                        //Avatar
                        let Avatar = Canvas.Image;
                        let ava = new Avatar;
                        ava.src = buf;
                        ctx.drawImage(ava, 117, 122, 550, 550);

                        //Level
                        ctx.font = "bold 286px Helvetica";
                        ctx.fillStyle = "#FFFFFF";
                        ctx.textAlign = "center";
                        ctx.fillText(lvl, 1625, 520);

                        //Name
                        ctx.font = "bold 175px Helvetica";
                        ctx.fillStyle = "#FFFFFF";
                        ctx.textAlign = "left";
                        ctx.fillText(user.username, 55, 985);

                        //Sent
                        try {
                            sent = snumber(sent);
                        } catch(e)  {
                            sent = 0;
                        }
                        ctx.font = "bold 120px Helvetica";
                        ctx.textAlign = "center";
                        ctx.fillText(sent, 311, 1415);

                        //Global Rank
                        ctx.font = "bold 100px Helvetica";
                        console.log("Rank: " + rank)
                        rank = snumber(rank)
                        ctx.fillText(rank, 1756, 1390);

                        //Money
                        ctx.font = "bold 130px Helvetica";
                        ctx.textAlign = "right";
                        ctx.fillText(taco, 1928, 1176);

                        //Infobox
                        ctx.font = "bold 105px Helvetica";
                        ctx.textAlign = "left";
                        let lines = wrapText(ctx, shout, 1831)
                        lines.forEach((line, i) => {
                            if (i < 4) ctx.fillText(line, 85, 1626 + (i * 100));

                        });

                        let canvas2 = new Canvas(400, 400)
                        let ctx2 = canvas2.getContext('2d')

                        ctx2.drawImage(canvas, 0, 0, 400, 400)

                        canvas2.toBuffer((err, buf) => {
                            if (err) return console.log(err);
                            message.channel.sendFile(buf);
                            gen.edit("**Here is " + user.username + "'s Profile**");
                        })
                    })
                })
            })
        })
    })
}

exports.conf = {
    userPerm: [],
    botPerm: ["SEND_MESSAGES"],
    coolDown: 0,
    dm: false,
    category: "Social",
    help: "Get your profile or a users profile.",
    args: "<@mention>",
}

function wrapText(ctx, text, maxWidth) {
    const words = text.split(' ');
    let lines = [];
    let line = '';

    if (ctx.measureText(text).width < maxWidth) {
        return [text];
    }

    while (words.length > 0) {
        let split = false;

        while (ctx.measureText(words[0]).width >= maxWidth) {
            const tmp = words[0];
            words[0] = tmp.slice(0, -1);

            if (!split) {
                split = true;
                words.splice(1, 0, tmp.slice(-1));
            } else {
                words[1] = tmp.slice(-1) + words[1];
            }
        }

        if (ctx.measureText(line + words[0]).width < maxWidth) {
            line += `${words.shift()} `;
        } else {
            lines.push(line);
            line = '';
        }

        if (words.length === 0) {
            lines.push(line);
        }
    }

    return lines;
}

exports.levelUP = (message) => {

}