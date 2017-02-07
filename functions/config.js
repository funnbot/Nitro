const fs = require('fs');
let config = {};
let blocked = {}
let update = []

function updated(id) {
  update.push(id)
}

exports.guildLeave = (id) => {
  delete config[id];
  updated(id);
}

exports.load = () => {
  blocked = require('../data/blocked.json');
  fs.readdir('./data/config/', (err, files) => {
    if (err) return console.log(err);
    files.forEach(f => {
      try {
        let c = require('../data/config/' + f);
        let name = f.slice(0, -5);
        config[name] = c;
      } catch (err) {
        console.log(err);
      }
    })
  })
}

function write() {
  update.forEach(id => {
    if (!config[id] || Object.keys(config[id]).length === 0) {
      fs.unlink(`./data/config/${id}.json`, function(err) {});
    } else {
      fs.writeFile('./data/config/' + id + ".json", JSON.stringify(config[id]), (err) => {
        if (err) {
          fs.open('./data/config/' + id + '.json', 'wx', (err, fd) => {
            if (err) return console.log(err);
            fs.close(fd, (err) => {
              console.log(err)
            });
          })
          fs.writeFile('./data/config/' + id + ".json", JSON.stringify(config[id]), (err) => {
            console.log(err)
          })
        }
      })
    }
  })
  update = [];
}

setInterval(function() {
  write()
}, 3000);

setInterval(function() {
    fs.writeFile('./data/blocked.json', JSON.stringify(blocked), (err) => {})
}, 10000);

exports.getPrefix = (id) => {
  if (!!config[id] && !!config[id].prefix) {
    return config[id].prefix;
  } else {
    return "n!";
  }
}

exports.setPrefix = (id, newPre) => {
  if (newPre === "n!") {
    delete config[id].prefix;
  } else {
    if (!config[id]) config[id] = {};
    if (!config[id].prefix) config[id].prefix = "";
    config[id].prefix = newPre;
  }
  updated(id);
}

exports.getRoleMe = (id) => {
  if (!!config[id] && !!config[id].roleme) {
    return config[id].roleme;
  } else {
    return [];
  }
}

exports.setRoleMe = (id, array) => {
  if (array.length === 0) {
    delete config[id].roleme;
  } else {
    if (!config[id]) config[id] = {};
    if (!config[id].roleme) config[id].roleme = [];
    config[id].roleme = array;
  }
  updated(id);
}

exports.getAnc = (id) => {
  if (!!config[id] && !!config[id].anc) {
    return config[id].anc;
  } else {
    return {};
  }
}

exports.setAnc = (id, obj) => {
  if (Object.keys(obj).length === 0) {
    delete config[id].anc;
  } else {
    if (!config[id]) config[id] = {};
    if (!config[id].anc) config[id].anc = {};
    config[id].anc = obj;
  }
  updated(id);
}

exports.getAd = (id) => {
  if (!!config[id] && !!config[id].ad) {
    return config[id].ad; 
  } else {
  return {};
  }
}

exports.setAd = (id, obj) => {
  if (Object.keys(obj).length === 0) {
    delete config[id].ad;
  } else {
    if (!config[id]) config[id] = {};
    if (!config[id].ad) config[id].ad = {};
    config[id].ad = obj;
  }
  updated(id)
}

exports.getAuto = (id) => {
  if (!!config[id] && !!config[id].autorole) {
    return config[id].autorole
  } else {
    return false;
  }
}

exports.setAuto = (id, role) => {
  if (role === false) {
    delete config[id].autorole;
  } else {
    if (!config[id]) config[id] = {};
    if (!config[id].autorole) config[id].autorole = "";
    config[id].autorole = role;
  }
  updated(id);
}

exports.getMod = (id) => {
  if (!!config[id] && !!config[id].mods) {
    return config[id].mods;
  } else {
    return {};
  }
}

exports.setMod = (id, mods) => {
  if (Object.keys(mods).length === 0) {
    delete config[id].mods
  } else {
    if (!config[id]) config[id] = {};
    if (!config[id].mods) config[id].mods = {};
    config[id].mods = mods;
  }
  updated(id);
}

exports.getTags = (id) => {
  if (!!config[id] && !!config[id].tags) {
    return config[id].tags;
  } else {
    return {};
  }
}

exports.setTags = (id, tags) => {
  if (Object.keys(tags).length === 0) {
    delete config[id].tags;
  } else {
    if (!config[id]) config[id] = {};
    if (!config[id].tags) config[id].tags = {};
    config[id].tags = tags;
  }
  updated(id);
}

exports.getLevel = (id) => {
  if (!!config[id] && !!config[id].level) return config[id].level
  else return false;
}

exports.setLevel = (id, level) => {
  if (!!config[id] && !!config[id].level && level === false) delete config[id].level
  else {
    if (!config[id]) config[id] = {};
    config[id].level = level;
  }
  updated(id)
}

exports.getCustom = (id) => {
  if (!!config[id] && !!config[id].custom) return config[id].custom
  else return {};
}

exports.setCustom = (id, custom) => {
  if (!!config[id] && !!config[id].custom && Object.keys(custom).length === 0) delete config[id].custom
  else {
    if (!config[id]) config[id] = {};
    config[id].custom = custom;
  }
  updated(id)
}

exports.getBlocked = () => {
  return blocked;
}

exports.setBlocked = (b) => {
  blocked = b;
}