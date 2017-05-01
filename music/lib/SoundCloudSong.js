const request = require('request')
const { soundCloudID } = require('../../config')
const linkType = require('./linkType')

class SoundCloudSong {

    constructor( { title, owner, stream, url, duration, regionsAllowed, requester} ) {

        this.title = title

        this.owner = owner

        this.stream = stream.endsWith("?client_id="+soundCloudID) ? stream : stream+"?client_id="+soundCloudID

        this.url = url

        this.duration = duration

        this.regionsAllowed = regionsAllowed

        this.requester = requester

    }

    get type() {

        return linkType(this.url)

    }

    getStream() {

        return new Promise((resolve, reject) => {

            try {

                let stream = request({

                    uri: this.stream,
                    followAllRedirects: true

                })

                return resolve(stream)

            } catch(err) {

                return reject(stream)

            }

        })

    }

}

module.exports = SoundCloudSong