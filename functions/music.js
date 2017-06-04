const yt = require('ytdl-core');
const soundcloudr = require('soundcloudr');
const auth = require('../auth').auth;
const request = require('request');
const search = require('youtube-search');
const resolve = require('soundcloud-resolve');
const youtube_info = require('youtube-info');
const bot = require('../bot.js').bot;
const paginate = require('Paginate');




let sessions = {};

function get(id) {
    if (sessions[id]) {
        return sessions[id];
    } else {
        return false;
    }
}

function linkType(link) {
    if (!link) return "nal";
    let split = link.split("/");
    if (link.startsWith("http://") || link.startsWith("https://")) {
        if (!!split[2] && split[2].includes("soundcloud.com")) {
            if (!!split[4] && split[4] === "sets") {
                if (!!split[5]) return "sc-playlist";
                else return "nal";
            } else {
                if (!!split[3] && !!split[4]) return "sc";
                else return "nal";
            }
        } else if (split[2].includes("youtube.com")) {
            if (!!split[3] && split[3].startsWith("playlist?list=")) {
                return "yt-playlist";
            } else if (!!split[3] && split[3].startsWith("watch?v=")) {
                return "yt";
            } else return "nal";
        } else {
            return "nal";
        }
    } else {
        return "nal";
    }
}

function resolveSC(link, cb) {
    if (linkType(link) === "sc" || linkType(link) === "sc-playlist") {
        resolve(auth.soundCloudID, link, (err, url) => {
            if (err) return cb(err, false);
            cb(false, url);
        })
    }
}

function convertToStream(link, type, cb) {
    if (type === "nal" || type === "sc-playlist" || type === "yt-playlist") return cb("nal", false);
    if (type === "yt") {
        try {
            let stream = yt(link, {
                audioonly: true
            });
            cb(false, stream);
        } catch (err) {
            cb(err, false);
        }
    } else if (type === "sc") {
        if (!link.endsWith("?client_id=" + auth.soundCloudID)) link = link + "?client_id=" + auth.soundCloudID;
        try {
            let stream = request({
                uri: link,
                followAllRedirects: true
            })
            cb(false, stream)
        } catch (err) {
            cb(err, false);
        }
    }
}

function addQueue(link, id, channel, voiceChannel, cb) {
    if (!sessions[id]) sessions[id] = {
        textChannel: channel,
        voiceChannel: voiceChannel
    };
    let sn = sessions[id];
    if (!sn.playlist) sn.playlist = [];
    let type = linkType(link);
    if (type === "sc" || type === "sc-playlist") {
        let data = resolveSC(link, (err, data) => {
            if (err) return cb(err, false);
            if (type === "sc" || data.kind === "track") {
                sn.playlist.push({
                    name: data.title,
                    user: data.user.username,
                    stream: data.stream_url,
                    length: data.duration,
                    type: "sc"
                });
                cb(false, sn.playlist.length)
            } else if (type === "sc-playlist" || data.kind === "playlist") {
                data.tracks.forEach(t => {
                    let track = t;
                    sn.playlist.push({
                        name: track.title,
                        user: track.user.username,
                        stream: track.stream_url,
                        length: track.duration,
                        type: "sc"
                    });
                })
                cb(false, sn.playlist.length);
            }

        })
    } else if (type === "yt") {
        let id = link.split("/")[3];
        id = id.substring(8);
        youtube_info(id, (err, data) => {
            if (err) return cb(err, false);
            sn.playlist.push({
                name: data.title,
                user: data.owner,
                stream: data.url,
                length: data.duration*1000,
                type: "yt"
            });
            cb(false, sn.playlist.length)
        })
    } else {
        cb("nal", false);
    }

    sessions[id] = sn
}

function play(ID, host) {
    if (!sessions[ID].isPlaying) {
        console.log("run")
        sessions[ID].isPlaying = true;
        if (!sessions[ID].host) sessions[ID].host = host;
        bot.channels.get(sessions[ID].voiceChannel).join().then(connection => {
            sessions[ID].connection = connection;
            recurse(ID);
        });
    }
}

function recurse(id) {
    if (sessions[id].playlist.length === 0) {
        let v = sessions[id].voiceChannel;
        bot.channels.get(v).leave();
        if (!!sessions[id]) return delete sessions[id];
        return;
    }
    let track = sessions[id].playlist[0];
    bot.channels.get(sessions[id].textChannel).send("Now Playing: " + track.name + " - " + track.user);
    convertToStream(track.stream, track.type, (err, stream) => {
        sessions[id].dispatcher = sessions[id].connection.playStream(stream);
        //sessions[id].loop = setTimeout(function () {
        //    sessions[id].playlist.shift();
        //    recurse(id);
        //}, track.length);
        sessions[id].dispatcher.on('end', (r) => {
            if (r === "Stream is not generating quickly enough.") {
            sessions[id].playlist.shift();
            recurse(id);
            }
        })
        //console.log(sessions[id].dispatcher._events.end.toString())
    })
}

function skip(id) {
    if (!sessions[id]) return;
    if (!sessions[id].dispatcher) return;
    sessions[id].dispatcher.end();
    //if (!sessions[id].loop) return;
    //clearTimeout(sessions[id].loop);
    if (!sessions[id].playlist) return;
    sessions[id].playlist.shift();
    recurse(id)
}

function stop(id) {
    if (!sessions[id]) return;
    if (!!sessions[id].dispatcher) {
    sessions[id].dispatcher.end();
    }
    //if (!!sessions[id].loop) {
    //   clearTimeout(sessions[id].loop);
    //}
    delete sessions[id];
}

function pause(id) {
    if (!sessions[id]) return;
    if (!!sessions[id].paused) return;
    sessions[id].paused = true;
    sessions[id].dispatcher.pause();
}

function unpause(id) {
    if (!sessions[id]) return;
    if (!sessions[id].paused) return;
    delete sessions[id].paused;
    sessions[id].dispatcher.resume();
}

function setVolume(id, int, cb) {
    int = parseInt(int) || 100;
    if (int < 1 || int > 200) return cb("Volume must be an integer between 1 and 200.", false)
    let vol = int/100;
    sessions[id].dispatcher.setVolume(vol);
    cb(false, int);
}

function getPlaylist(id, num, cb) {
    if (!sessions[id]) return cb("There is no playlist", false);
    if (!sessions[id].playlist) return cb("There is no playlist", false);
    if (!sessions[id].playlist.length === 0) return cb("The playlist is empty", false);
    let playlist = sessions[id].playlist;
    let pager = new paginate(playlist);
    let page = pager.page(num);
    let list = "";
    let total = Math.ceil(playlist.length / 10);
    if (num > total) num = total
    for (i=0;i<page.length;i++) {
        let tNum = (num !== 1) ? (((num-1)*10)+i+1) : i+1;
        let dur = msToMM(page[i].length);
        let p = page[i];
        list += tNum+". **"+p.name+"** - "+p.user+" ("+dur+")\n"
    }
    list += "\nPage "+num+"/"+total
    cb(false, list);
}

function getHost(id, cb) {
    if (!sessions[id] && !sessions[id].host) return cb("No Host", false);
    cb(false, sessions[id].host);
}

function setHost(id, user, cb) {
    if (!sessions[id]) return cb("No Music", false);
    if (user === "delete") {
        if (!!sessions[id].host) {
        delete sessions[id].host;
        return cb(false, "Deleted");
        } else {
            return cb("No Host", false);
        }
    }
    sessions[id].host = user;
    cb(false, user);
}

function checkHostPerm(message) {
    let id = message.guild.id
    if (!sessions[id]) return "nm";
    if (!!sessions[id].host && sessions[id].host === message.author.id) return true;
    if (message.channel.permissionsFor(message.member).has("MANAGE_GUILD")) return true;
    return false;
}


exports.get = get;
exports.linkType = linkType;
exports.convertToStream = convertToStream;
exports.resolveSC = resolveSC;
exports.addQueue = addQueue;
exports.play = play;
exports.skip = skip;
exports.stop = stop;
exports.pause = pause;
exports.unpause = unpause;
exports.setVolume = setVolume;
exports.getPlaylist = getPlaylist;
exports.getHost = getHost;
exports.setHost = setHost;
exports.checkHostPerm = checkHostPerm;




function msToMM(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return (seconds == 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
}