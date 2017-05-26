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

        config[p.id] = p.data

      })

    })

  })

  r.table('config').changes().run(connection, (err, change) => {

    if (err) return console.log(err)

    change.each((err, row) => {

      if (err) return console.log(err)

      config[row.new_val.id] = row.new_val.data

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
  if (!!config[id] && !!config[id].modules && !!config[id].modules.music) {
    return true
  } else {
    return false;
  }
}

exports.getPerms = (id) => {
  if (!!config[id] && !!config[id].perms) {
    return config[id].perms
  } else {
    return {};
  }
}