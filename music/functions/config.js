const r = require('rethinkdb')
const auth = require('../../config.js')

let config = {};

r.connect({
  host: "localhost",
  port: '28015',
  db: "Nitro",
  password: auth.rethink
}).then(connection => {

  r.table('config').run(connection, (err, table) => {

    table.toArray((err, array) => {

      if (err) return console.log(err)

      array.forEach(p => {

        config[p.id] = p.data.prefix

      })

    })

  })

  r.table('config').changes().run(connection, (err, change) => {

    if (err) return console.log(err)

    change.each((err, row) => {

      console.log(row)

      if (err) return console.log(err)

      if (row.old_val.data.prefix !== row.new_val.data.prefix) {

        config[row.new_val.id] = row.new_val.data.prefix

      }

    })

  })

}).catch(console.log)

exports.getPrefix = (id) => {
  if (!!config[id]) {
    return config[id]
  } else {
    return "n!";
  }
}