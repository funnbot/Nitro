const music = require('../func/music');

exports.run = (message, bot, suffix, args) => {
    let page = parseInt(args[0]) || 1;
    if (page === 0) page = 1;
    music.getPlaylist(message.guild.id, page, (err, playlist) => {
        let embed = {
            description:playlist
        }
        message.channel.sendMessage("", {embed})
    });
}

exports.conf = { 
  userPerm:[],
  botPerm:["SEND_MESSAGES"],
  coolDown:0,
  dm:false,
  category:"Music",
  help:"Get the current playlist",
  args:"<pagenum>",
}