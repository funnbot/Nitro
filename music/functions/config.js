const fs = require('fs');

let config = {};

exports.load = () => {
  fs.readdir('./data/config/', (err, files) => {
    if (err) return console.log(err);
    files.forEach(f => {
      try {
        let c = require('../../data/config/' + f);
        let name = f.slice(0, -5);
        config[name] = c;
      } catch (err) {
        console.log(err);
      }
    })
  })
}

setInterval(() => {
    exports.load()
}, 3000)

exports.getPrefix = (id) => {
  if (!!config[id] && !!config[id].prefix) {
    return config[id].prefix;
  } else {
    return "n!";
  }
}