const r = require('rethinkdb')
const auth = require('../config')
const store = require('./storeMessages')


module.exports = () => {

    return new Promise((resolve, reject) => {

        r.connect({

            host: "localhost",
            port: '28015',
            db: "Nitro",
            password: auth.rethink

        }).then(conn => {

            let connection = conn

            r.tableCreate('messages').run(connection, (err, res) => {
                if (err) return console.log(err)
                store.connect(conn)
            })

            

            loadConfig(connection, (err, config) => {

                if (err) return reject(err)

                loadProfile(connection, (err, profile) => {

                    if (err) return reject(err)
                    
                    return resolve({connection, config, profile})

                })
            })

        }).catch(err => reject(err));

    })

}

function loadConfig(connection, callback) {

    r.table("config").run(connection, (err, res) => {

        if (err) return callback(err, false)

        res.toArray((err, data) => {

            return callback(false, data)

        })

    })

}

function loadProfile(connection, callback) {

    r.table("profile").run(connection, (err, res) => {

        if (err) return callback(err, false)

        res.toArray((err, data) => {

            return callback(false, data)

        })
    })
}