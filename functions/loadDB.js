const r = require('rethinkdb')



module.exports = () => {

    return new Promise((resolve, reject) => {

        r.connect({

            host: "localhost",
            port: '28015',
            db: "Nitro"

        }).then(conn => {

            let connection = conn

            r.table("config").run(connection, (err, res) => {

                if (err) return reject(err);

                res.toArray((err, data) => {

                    return resolve({

                        data,
                        connection

                    });
                })

            })

        }).catch(err => reject(err));

    })

}