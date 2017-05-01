const r = require('rethinkdb')
const auth = require('../../config.js')

let config = {}

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

        config[p.id] = {}

        if (p.data.prefix) config[p.id].prefix = p.data.prefix

        if (p.data.hasOwnProperty("module") && p.data.modules.hasOwnProperty("music")) config[p.id].music = p.data.modules.music

      })

    })

  })

  r.table('config').changes().run(connection, (err, change) => {

    if (err) return console.log(err)

    change.each((err, row) => {

      if (err) return console.log(err)
      
      if (!config[w])

      if (!!row.new_val.data && !!row.new_val.data.prefix && !!row.new_val.id) {

        config[row.new_val.id] = row.new_val.data.prefix

      }

    })

  })

}).catch(console.log)

exports.getPrefix = (id) => {
  if (!!config[id] && !!config[id].prefix) {
    return config[id].prefix
  } else {
    return "n!";
  }
}

exports.getMusic = (id) => {
  if (!!config[id] && !!config[id].music) {
    return config[id].music
  } else {
    return false;
  }
}