const music = require('../func/music')


exports.run = (message, bot, suffix, args) => {
  const voiceChannel = message.member.voiceChannel;
  if (!voiceChannel) {
    return message.reply(`Please be in a voice channel first!`);
  }
  if (music.linkType(suffix) === "nal" || music.linkType(suffix) === "yt-playlist") return message.reply("Please provide a: youtube link, soundcloud link, or soundcloud playlist.");
  music.addQueue(suffix, message.guild.id, message.channel.id, voiceChannel.id,(err, data) => {
  console.log(err)
    if (err) {
      return message.reply("Please provide a: youtube link, soundcloud link, or soundcloud playlist. Make sure your link is valid.");
    }
    message.channel.sendMessage("There are now `"+data+"` song(s) in the playlist.")
    music.play(message.guild.id, message.author.id);
  })
}

exports.conf = { 
  userPerm: [],  
  botPerm: ["SEND_MESSAGES"],
  coolDown: 0,
  dm: false,
  category: "Music",
  help: "Queue a soundcloud/youtube link.",
  args: "<url/query>",
}