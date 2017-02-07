const os = require('os');

function convertMS(ms) {
  var d, h, m, s;
  s = Math.floor(ms / 1000);
  m = Math.floor(s / 60);
  s = s % 60;
  h = Math.floor(m / 60);
  m = m % 60;
  d = Math.floor(h / 24);
  h = h % 24;
  return { d: d, h: h, m: m, s: s };
};

exports.run = (message, bot, suffix, args) => {
    var cpu = os.loadavg();
    let u = convertMS(bot.uptime);
    let uptime = u.d+" D - "+u.h+" H - "+u.m+" M - "+u.s+" S"
    let embed = {
        title:"`[ Stats ]`",
        color:0x4DD0D9,
        description:"\nNitro is the next best thing in Server Managment\nIt can handle any type of server, with loads of customization to spare",
        fields:[
            {
                name:"Creator",
                value:"Funnbot#7518",
                inline:true

            }, {
                name:"Uptime",
                value:uptime,
                inline:false
            }, {
                name:"Guilds",
                value:bot.guilds.size,
                inline:true
            }, {
                name:"Channels",
                value: bot.channels.size,
                inline:true
            }, {
                name:"Users",
                value: bot.users.size,
                inline:true
            }, {
                name: "Memory",
                value: Math.round(process.memoryUsage().rss / 1024 / 1024) + "MB",
                inline:true
            }, {
                name: "CPU",
                value: Math.ceil(cpu[1] * 100)/10+"%",
                inline:true
            }, {
                name: "Lib",
                value: "Discord.js",
                inline:true
            }
        ]
    }
    message.channel.sendMessage("", {embed});
}

exports.conf = {
  userPerm:[],
  botPerm:["SEND_MESSAGES"],
  coolDown:0,
  dm:true,
  category:"Other",
  help:"Statistics for Nitro",
  args:"",
}