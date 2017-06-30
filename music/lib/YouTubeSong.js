const ytdl = require('ytdl-core')

class YouTubeSong {

    constructor( { title, owner, stream, url, duration, regionsAllowed, requester} ) {

        this.title = title

        this.owner = owner

        this.stream = stream

        this.url = url

        this.duration = duration

        this.regionsAllowed = regionsAllowed

        this.requester = requester

    }

    getStream() {

        return new Promise((resolve, reject) => {

            try {

                let stream = ytdl(this.stream, {audioonly: true})

                stream.on('error', (err) => {
                    console.log(error)
                })

                return resolve(stream)

            } catch(err) {

                return reject(err)

            }
        })

    }
 
}

module.exports = YouTubeSong