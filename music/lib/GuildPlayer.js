const linkType = require('./linkType')
const _url = require('url')
const resolve = require('soundcloud-resolve')
const youtube_info = require('youtube-info')
const playlist_info = require('youtube-playlist-info')
const search = require('youtube-search')
const config = require('../../config')
const YoutubeSong = require('./YouTubeSong')
const SoundcloudSong = require('./SoundCloudSong')
const node_music = require('../node-music')
const queueGen = require('./GenerateQueue')
const pretty = require('pretty-ms')
const request = require('request')

class GuildPlayer {

    constructor(connection, message, bot) {

        this.connection = connection
        this.id = message.channel.guild.id
        this.guild = message.channel.guild
        this.host = message.author.id
        this.playlist = []
        this.isPlaying = false
        this.killing = false
        this.textChannel = message.channel.id
        this.voiceChannel = connection.channelID
        this.bot = bot

    }

    queue(song, requester = false) {

        return new Promise((resolve, reject) => {

            let type = linkType(song)

            if (type === "yt" || type === "sc" || type === "yt-be") {

                this._addSong(song, requester)
                    .then(data => resolve(data))
                    .catch(err => reject(err))

            } else if (type === "yt-playlist" || type === "sc-playlist") {

                this._addPlaylist(song, requester)
                    .then(data => resolve(data))
                    .catch(err => reject(err))

            } else if (!/http/.test(song)) {

                this._search(song, requester)
                    .then(data => resolve(data))
                    .catch(err => reject(err))

            } else {

                return reject('Invalid Query')

            }


        })

    }

    _addPlaylist(song, requester) {

        return new Promise((resolve, reject) => {

            if (this.playlist.length + 1 > config.playlistLength) return reject("The queue length is limited to 200 songs")

            let type = linkType(song)

            if (type === "sc-playlist") {

                this._soundcloudInfo(song).then(dt => {

                    let playlist = []

                    dt.tracks.forEach(data => {

                        let song = new SoundcloudSong({
                            title: data.title,
                            owner: data.user.username,
                            stream: data.stream_url,
                            url: data.url,
                            duration: data.duration,
                            regionsAllowed: true,
                            requester
                        })

                        playlist.push(song)

                        this.playlist.push(song)

                        if (this.playlist.length > config.playlistLength) return reject("The queue length is limited to 200 songs")

                    })

                    return resolve(playlist)

                }).catch(err => reject(err))

            } else if (type === "yt-playlist") {

                this._youtubePlaylistInfo(song).then(res => {

                    let playlist = []

                    res = res.video

                    res.forEach(tr => {

                        let song = new YoutubeSong({
                            title: tr.title,
                            owner: tr.author,
                            stream: `https://www.youtube.com/watch?v=${tr.encrypted_id}`,
                            url: `https://www.youtube.com/watch?v=${tr.encrypted_id}`,
                            duration: tr.length_seconds * 1000,
                            regionsAllowed: true,
                            requester
                        })

                        playlist.push(song)

                        this.playlist.push(song)

                        if (this.playlist.length > config.playlistLength) return reject("The queue length is limited to 200 songs")

                    })

                    return resolve(playlist)

                }).catch(err => reject(err))

            }
        })
    }

    _addSong(url, requester) {

        return new Promise((resolve, reject) => {

            let type = linkType(url)

            if (type === "yt" || type == "yt-be") {

                this._youtubeInfo(url).then(data => {

                    let song = new YoutubeSong({
                        title: data.title,
                        owner: data.owner,
                        stream: data.url,
                        url: data.url,
                        duration: data.duration * 1000,
                        regionsAllowed: data.regionsAllowed,
                        requester
                    })

                    if (this.playlist.length + 1 > config.playlistLength) return reject("The queue length is limited to 200 songs")

                    this.playlist.push(song);

                    return resolve(song)

                }).catch(err => {

                    return reject(err)

                })

            } else if (type === "sc") {

                this._soundcloudInfo(url).then(data => {

                    let song = new SoundcloudSong({
                        title: data.title,
                        owner: data.user.username,
                        stream: data.stream_url,
                        url: url,
                        duration: data.duration,
                        regionsAllowed: true,
                        requester
                    })



                    this.playlist.push(song)

                    return resolve(song)

                }).catch(err => {

                    return reject(err)

                })

            }

        })

    }

    _search(query, requester) {

        return new Promise((resolve, reject) => {

            search(query, {
                maxResults: 1,
                key: config.googleApiToken
            }, (err, res) => {

                if (err) return reject(err)

                if (!res[0]) return reject("No results found")

                let first = res[0]

                if (first.kind === "youtube#video") {

                    this._addSong(first.link, requester)
                        .then(data => resolve(data))
                        .catch(err => reject(err))

                } else if (first.kind === "youtube#playlist") {

                    this._addPlaylist(first.link, requester)
                        .then(data => resolve(data))
                        .catch(err => reject(err))

                } else {

                    return reject("Invalid Type Returned: " + link.type)

                }

            })

        })

    }

    _youtubeInfo(url) {

        return new Promise((res, rej) => {

            let type = linkType(url);

            let id = _url.parse(url, true);

            if (type === "yt") id = id.query.v;

            if (type === "yt-be") id = id.path.slice(1);

            youtube_info(id, (err, data) => {

                if (err) return rej('Invalid Youtube ID');

                return res(data);

            });

        })

    }

    _youtubePlaylistInfo(url) {

        return new Promise((resolve, reject) => {

            let type = linkType(url)

            let id = _url.parse(url, true);

            id = id.path.slice(15)

            request.get(`https://www.youtube.com/list_ajax?style=json&action_get_list=1&list=${id}`, (err, res, body) => {

                if (err) return reject(err)

                if (!body) return reject("Bad id: " + id)

                body = JSON.parse(body)

                return resolve(body)

            })

        })

    }

    _soundcloudInfo(url) {

        return new Promise((res, reject) => {

            try {

                resolve(config.soundCloudID, url, (err, json, stream) => {

                    if (err) return reject('Failed to resolve soundcloud link.');

                    return res(json);

                });

            } catch (e) {
                reject('Failed to resolve soundcloud link.')
            }

        })

    }

    play() {

        if (!this.isPlaying) {

            this.isPlaying = true

            this.connection.on('end', () => {

                if (this.killing) return

                this.playlist = this.playlist.slice(1)

                this._recurse()

            })

            this._recurse()

        }

    }

    _recurse() {

        if (this.playlist.length === 0) {

            this.bot.getChannel(this.textChannel).createMessage("**You've run out of tunes, queue up some more!**")

            return this._kill()

        }

        let current = this.playlist[0]

        //this.nextSong(current)

        let channel = this.bot.getChannel(this.textChannel)
        if (channel) channel.createMessage("Now playing: " + current.title + " - " + current.owner)

        current.getStream().then(stream => {

            this.connection.play(stream)

        })

    }

    _kill() {

        this.isPlaying = false

        this.killing = true

        this.connection.stopPlaying()

        this.bot.leaveVoiceChannel(this.voiceChannel)

    }

    pause() {

        if (this.connection.playing) {

            this.connection.pause()

            return true

        }

        return false

    }

    resume() {

        if (this.connection.paused) {

            this.connection.resume()

            return true

        }

        return false

    }

    remove(index) {

        this.playlist.splice(index, 1)

    }

    getArray() {

        return this.playlist

    }

    skip() {

        this.connection.stopPlaying()

    }

    setHost(host) {

        this.host = host

        return host

    }

    setChannel(channel) {

        this.textChannel = channel

        return channel

    }

    checkPerm(message) {

        if (message.channel.permissionsOf(message.member.id).has('manageGuild') || message.author.id === this.host) return false
        else {

            message.channel.createMessage("**You must either be host or have the permission `MANAGE_GUILD` to use this command**")

            return true

        }

    }

    getQueue(message, num) {

        let gen = queueGen(this.playlist, num)

        let nowPlaying
        if (num === 1) {
            nowPlaying = gen[0]
            gen = gen.slice(1)
        }

        let TotalTime = 0
        this.playlist.forEach(p => TotalTime = TotalTime + p.duration)
        TotalTime = pretty(TotalTime)

        let embed = {
            title: num === 1 ? "Now Playing: " + nowPlaying : "",
            description: gen.join("\n"),
            color: 0x173fc4,
            fields: [{
                    name: "Queue Size",
                    value: this.playlist.length,
                    inline: true
                },
                {
                    name: "Total Time",
                    value: TotalTime,
                    inline: true
                }
            ]
        }

        message.channel.createMessage({
            embed
        })

    }

    nextSong(data) {

        node_music.emit('nextSong', data, this.id, this.channelID)

    }

}

module.exports = GuildPlayer