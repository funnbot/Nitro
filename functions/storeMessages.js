const r = require('rethinkdb')
let connection

let queue = []

exports.connect = (con) => {
    connection = con
}

exports.add = (message, idb) => {
    if (idb !== "264087705124601856") return 
    let c = message.content
    let i = message.author.id
    let id = message.id
    queue.push({id, c, i})
}

let store = () => {
    if (queue.length === 0) return
    r.table('messages').insert(queue).run(connection, (err, res) => {
        if (err) return console.log(err)
        queue = []
    })
}

setInterval(() => store(), 20000)