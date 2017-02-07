const fs = require('fs');

let users = {};
let update = [];



function updated(id) {
  update.push(id)
}

exports.load = () => {
  fs.readdir('./data/users/', (err, files) => {
    if (err) return console.log(err);
    files.forEach(f => {
      try {
        let c = require('../data/users/' + f);
        let name = f.slice(0, -5);
        users[name] = c;
      } catch (err) {
        console.log(err);
      }
    })
  })
}

function write() {
  update.forEach(id => {
    if (!users[id] || Object.keys(users[id]).length === 0) {
      fs.unlink(`./data/users/${id}.json`, function (err) {});
    } else {
      fs.writeFile('./data/users/' + id + ".json", JSON.stringify(users[id]), (err) => {
        if (err) {
          fs.open('./data/users/' + id + '.json', 'wx', (err, fd) => {
            if (err) return console.log(err);
            fs.close(fd, (err) => {
              console.log(err)
            });
          })
          fs.writeFile('./data/users/' + id + ".json", JSON.stringify(users[id]), (err) => {
            console.log(err)
          })
        }
      })
    }
  })
  update = [];
}

setInterval(function () {
  write()
}, 10000);

exports.addMsg = (id) => {
  let sent = exports.getSent(id);
  sent++
  exports.setSent(id, sent);
}

exports.getLvl = (id) => {
  let sent = exports.getSent(id);
  return Math.floor(sent / 259)+1;
}

exports.getRank = (id) => {
  if (!users[id] || !users[id].sent) return "Last";
  let keys = Object.keys(users);
  let sort = keys.sort((a,b) => {
    return users[b].sent - users[a].sent;
  })
  let place = sort.indexOf(id)+1;
  return place;
}

exports.getProfile = (id) => {
  if (!users[id]) return false;
  else return users[id];
}

exports.setProfile = (id, prof) => {
  if (Object.keys(prof).length === 0) delete users[id];
  else {
    if (!users[id]) users[id] = {};
    users[id] = prof;
  }
  updated(id)
}

exports.getSent = (id) => {
  if (!users[id] || !users[id].sent) return 0;
  else return users[id].sent;
}

exports.setSent = (id, sent) => {
  if (sent === 0) delete users[id].sent;
  else {
    if (!users[id]) users[id] = {};
    users[id].sent = sent;
  }
  updated(id);
}

exports.getMoney = (id) => {
  if (!users[id] || !users[id].money) return 0;
  else return users[id].money;
}

exports.setMoney = (id, money) => {
  if (money === 0) delete users[id].money;
  else {
    if (!users[id]) users[id] = {};
    users[id].money = money;
  }
  updated(id);
}

exports.getShout = (id, prefix) => {
  if (!users[id] || !users[id].shout) return "Use "+prefix+"infobox <text> to set this message."
  else return users[id].shout;
}

exports.setShout = (id, sh) => {
  if (!users[id]) users[id] = {};
  users[id].shout = sh;
  updated(id);
}

exports.getBg = (id) => {
  if (!users[id] || !users[id].bg) return "default"
  else return users[id].bg
}

exports.setBg = (id, bg) => {
  if (!!users[id] && !!users[id].bg && bg === "default") delete users[id].bg
  else {
    if (!users[id]) users[id] = {};
    users[id].bg = bg;
  }
  updated(id);
}

exports.getOwned = (id) => {
  if (!users[id] || !users[id].owned) return {};
  else return users[id].owned;
}

exports.setOwned = (id, own) => {
  if (!!users[id] && !!users[id].owned && Object.keys(own).length === 0) delete users[id].own
  else {
    if (!users[id]) users[id] = {};
    users[id].own = own;
  }
  updated(id);
}