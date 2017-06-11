const r = require('rethinkdb')

class GuildConfig {
  constructor(n) {

    this.guild = {};

    n.config.forEach(d => {
      this.guild[d.id] = d.data;
    })

    this.conn = n.connection;

  }

  update(id) {
    r.table('config').insert({
      id,
      data: this.guild[id]
    }, {
      conflict: "replace"
    }).run(this.conn, (err, res) => {
      if (err) console.log(err)
    })
  }

  guildLeave(id) {
    r.table('config').filter({
      id
    }).run(this.conn, (err, res) => {
      if (err) return console.log(err)
      res.toArray((err, data) => {
        if (err) return console.log(err)
        if (data.length > 0) {
          r.table('config').filter({
            id
          }).delete().run(this.conn, (err, done) => {
            if (err) return console.log(err)
          })
        }
      })
    })
  }

  getString(id, name, def) {
    if (this.guild[id] && this.guild[id][name]) return this.guild[id][name]
    else return def
  }

  setString(id, name, n, def) {
    if (!this.guild[id]) this.guild[id] = {};
    this.guild[id][name] = n;
    this.update(id);
  }

  setObject(id, name, n) {
    if (!this.guild[id]) this.guild[id] = {};
    this.guild[id][name] = n;
    this.update(id)
  }

  setArray(id, name, n) {
    if (!this.guild[id]) this.guild[id] = {};
    this.guild[id][name] = n;
    this.update(id)
  }

  getPrefix(id) {
    return this.getString(id, 'prefix', 'n!');
  }

  setPrefix(id, prefix) {
    this.setString(id, 'prefix', prefix, 'n!');
  }

  getRoleMe(id) {
    return this.getString(id, 'roleme', [])
  }

  setRoleMe(id, array) {
    this.setArray(id, 'roleme', array)
  }

  getAd(id) {
    return this.getString(id, 'adblock', {});
  }

  setAd(id, ad) {
    this.setString(id, 'adblock', ad);
  }

  getAnc(id) {
    return this.getString(id, 'announce', {})
  }

  setAnc(id, announce) {
    this.setObject(id, 'announce', announce);
  }

  getAuto(id) {
    return this.getString(id, 'autorole', false);
  }

  setAuto(id, auto) {
    this.setArray(id, 'autorole', auto)
  }

  getMod(id) {
    return this.getString(id, 'modules', {})
  }

  setMod(id, mod) {
    this.setObject(id, 'modules', mod)
  }

  getTags(id) {
    return this.getString(id, 'tags', {})
  }

  setTags(id, tags) {
    this.setObject(id, 'tags', tags)
  }

  getLevel(id) {
    return this.getString(id, 'level', false)
  }

  setLevel(id, level) {
    this.setString(id, 'level', level, false)
  }

  getCustom(id) {
    return this.getString(id, 'custom', {})
  }

  setCustom(id, custom) {
    this.setObject(id, 'custom', custom)
  }

  getPerms(id) {
    return this.getString(id, 'perms', {})
  }

  setPerms(id, perms) {
    this.setObject(id, 'perms', perms)
  }

  getFilter(id) {
    return this.getString(id, 'filter', {})
  }

  setFilter(id, filter) {
    this.setObject(id, 'filter', filter)
  }

  getJDM(id) {
    return this.getString(id, 'joindm', false)
  }

  setJDM(id, JDM) {
    this.setObject(id, "joindm", JDM)
  }

  getStrike(id) {
    return this.getString(id, "strike", {})
  }

  setStrike(id, strike) {
    this.setObject(id, "strike", strike)
  }

}

module.exports = GuildConfig;