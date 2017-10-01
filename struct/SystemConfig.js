const r = require('rethinkdb')

class SystemConfig {

    constructor(data) {

        this.system = {}

        data.system.forEach(d => {
            this.system[d.id] = d.data;
        })

        this.conn = data.connection

        r.table('system').changes().run(this.conn, (err, change) => {

            if (err) return console.log(err)

            change.each((err, row) => {

                if (err) return console.log(err)

                if (!row.new_val) return

                this.system[row.new_val.id] = row.new_val.data

            })

        })
    }

    update(i) {

        r.table('system').insert({
            id: i,
            data: this.system[i]
        }, {
            conflict: "replace"
        }).run(this.conn, (err, res) => {

            if (err) console.log(err)

        })

    }

    G(b) {
        return this.system[b] ? this.system[b] : {}
    }

    S(b, a) {
        this.system[b] = a
        this.update(b)
    }

    getBlocked() {
        return this.G('blocked')
    }

    setBlocked(blocked) {
        this.S('blocked', blocked)
    }

    getUpdate() {
        return this.G('update')
    }

    setUpdate(update) {
        this.S('update', update)
    }

    getPatrons() {
        return this.G("patrons")
    }

    setPatrons(patrons) {
        this.S("patrons", patrons)
    }

}

module.exports = SystemConfig