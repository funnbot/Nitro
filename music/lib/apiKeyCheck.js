const resolve = require('soundcloud-resolve')

exports.scKey = (key, callback) => {

    resolve(key, "https://soundcloud.com/lubxtpf/whateverhappened", (err, data) => {

        if (err) return callback(true)

        return callback(false)

    })

}

exports.ytKey = (key, callback) => {

    return callback(false)

}