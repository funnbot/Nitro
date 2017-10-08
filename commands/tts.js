const speak = require("../functions/espeak.js")

exports.run = async(message, bot, send) => {
    let txt = message.suffix.length > 0 ? message.suffix : "Provide text to change this message."
    let id = message.author.id;
    let patrons = bot.system.getPatrons();
    if (!patrons[id])
        return send("**You must be a patron to use this command, donate at <https://patreon.com/nitrobot>**")

    try {
        await message.guild.fetchMember(message.author);
        await message.guild.fetchMember(bot.user);
    } catch (e) {
        return send("**Something went wrong.**");
    }
    txt = txt.replace(/[^a-z0-9\s]/g, "")
    if (txt.replace(/\s/g, "").length < 16) return send("The text was too short.")
    if (txt.length > 500) return send("The text must be less than 500 characters.")
    let member = message.member;
    if (!member.voiceChannel) return send("**You must be in a voice channel for this command.**")
    if (message.guild.member(bot.user).voiceChannel) return send("**Im already playing something.**")

    member.voiceChannel.join().then(voiceConnection => {
        speak(txt, {
            format: "mp3",
            buffer: true,
            cb: function(err, buffer) {
                if (err) {
                    console.log(err)
                    send("**An error occured**");
                    return voiceConnection.disconnect(); 
                }
                let stream = bufferToStream(buffer.getContents());
                let dis = voiceConnection.playStream(stream)
                dis.on("end", () => {
                    voiceConnection.disconnect()
                })
                setTimeout(() => {
                    if (voiceConnection.status !== 4) voiceConnection.disconnect();
                }, 15000)
            }
        })
    }).catch(() => {
        if (bot.voiceChannel && bot.voiceChannel.connection) {
            bot.voiceChannel.connection.leave();
        }
    })
}

exports.conf = {
    userPerm: [],
    botPerm: ["SEND_MESSAGES", "CONNECT", "SPEAK"],
    coolDown: 0,
    dm: false,
    category: "Special",
    help: "Plays <text> in a voice channel. Donators only.",
    args: "<text>",
}

let Duplex = require('stream').Duplex;  
function bufferToStream(buffer) {  
  let stream = new Duplex();
  stream.push(buffer);
  stream.push(null);
  return stream;
}