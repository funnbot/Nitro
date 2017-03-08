const Commands = require('../functions/loadCommands.js');
let bot = require('../bot.js')
const verify = require('is-var-name');
const rn = require('random-number');
let dure = {}
let images = {};

exports.run = (message, bot, send) => {
    if (dure[message.author.id]) return message.channel.sendMessage("You are already using the custom command wizard.");
    dure[message.author.id] = true;
    let collect1 = message.channel.createCollector(m => m.author.id === message.author.id, {
        time: 3600000
    });
    collect1.on('message', m => {
        if (m.content === "add") {addCmd(m); collect1.stop();}
        else if (m.content === "remove") {removeCmd(m); collect1.stop();}
        else if (m.content === "list") {listCmd(m); collect1.stop();}
        else if (m.content === "cancel") {m.channel.sendMessage("Cancelled"); collect1.stop(); delete dure[m.author.id];}
        else m.channel.sendMessage("**InvalidArgument: try `add`, `remove`, `list`, or `cancel`**")
    })
    send("**Welcome to the Custom Command Wizard**,\nCustom commands give you almost direct access to the JS environment and the discord.js library.\nType the following options below: `add`, `remove`, or `list` to start an action.\nYou can exit the wizard at anytime with `cancel`.");

}

exports.conf = {
    userPerm: ["MANAGE_GUILD"],
    botPerm: ["SEND_MESSAGES"],
    coolDown: 0,
    dm: false,
    category: "Utility",
    help: "Start the custom command wizard. [Very WIP]",
    args: "",
}

function exist(name, id) {
    let cmd = Commands.getCmds();
    let cus = bot.config.getCustom(id);
    if (!!cmd[name] || !!cus[name]) return false;
    if (!verify(name)) return false;
    return true;
}

function addCmd(message) {
    let collect2 = message.channel.createCollector(m => m.author.id === message.author.id, {time:3600000});
    collect2.on('message', (m) => {
        if (m.content === "simple") {trigger(m, "simple"); collect2.stop();}
        else if (m.content === "image") {trigger(m, "image"); collect2.stop();}
        else if (m.content === "advanced") {trigger(m, "advanced"); collect2.stop();}
        else if (m.content === "shortcut") {trigger(m, "shortcut"); collect2.stop();}
        else if (m.content === "cancel") {m.channel.sendMessage("Cancelled"); collect2.stop(); delete dure[m.author.id];}
        else m.channel.sendMessage("**InvalidArgument: try `simple`, `image`, `advanced`, `shortcut`,or `cancel`**")
    });
    message.channel.send("**What type of command do you want to create**\n`simple` - Simple commands are just plain text, nothing else,\n`image` - Image commands will upload a provided image,\n`advanced` - Advanced commands allow you to utilitize the full extent of Nitro's custom commands.\n`shortcut` - Shortcut's allow you to assign alias's for existing commands, and include arguments.");
}

function removeCmd(message) {
    let collect = message.channel.createCollector(m => m.author.id === message.author.id, {time:3600000});
    collect.on('message', (m) => {
        if (m.content === "cancel") {m.channel.sendMessage("Cancelled"); collect.stop(); delete dure[m.author.id];}
        else {
            let custom = bot.config.getCustom(message.guild.id);
            let cu = Object.keys(custom);
            if (cu.length < 1) m.channel.sendMessage("There are no custom commands on this server.")
            else if (!custom[m.content]) m.channel.sendMessage("That is not a currently available command. Lets try again.")
            else {
                delete custom[m.content];
                bot.config.setCustom(m.guild.id, custom);
                m.channel.sendMessage("The command "+m.content+" has been deleted.");
                delete dure[m.author.id]
                collect.stop();
            }
        }
    });
    let custom = bot.config.getCustom(message.guild.id);
    let cu = Object.keys(custom);
    message.channel.sendMessage("**The commands you can remove are:**\n```md\n"+cu.join(", ")+"```\nWrite one below or `cancel`", {split:{prepend:"```md\n", append:"```"}})
}

function listCmd(message) {
    delete dure[message.author.id];
    let custom = bot.config.getCustom(message.guild.id);
    let cu = Object.keys(custom);
    if (cu.length < 1) return message.channel.sendMessage("**There are no custom commands on this server**")
    message.channel.sendMessage("**The commands on this server are:**\n```md\n"+cu.join(", ")+"```", {split:{prepend:"```md\n", append:"```"}});
}

function trigger(message, type) {
    let collect = message.channel.createCollector(m => m.author.id === message.author.id, {time:3600000});
    collect.on('message', (m) => {
        if (m.content === "cancel") {m.channel.sendMessage("Cancelled"); collect.stop(); delete dure[m.author.id];}
        else {
            if (!exist(m.content, m.guild.id)) message.channel.sendMessage("That trigger already exists, or is not a valid command name. Lets try again.")
            else {
                if (type === "simple") simpleCmd(m, m.content);
                if (type === "advanced") advancedCmd(m, m.content);
                if (type === "image") imageCmd(m, m.content);
                if (type === "shortcut") shortcutCmd(m, m.content);
                collect.stop();
            }
        }
    })
    message.channel.sendMessage("**Choose the trigger (AKA command name) for the custom command**\nWrite the trigger for this custom command below, without the bot's prefix.\nI'll make sure it does not conflict with an existing command.")
}

function simpleCmd(message, trig) {
    let collect = message.channel.createCollector(m => m.author.id === message.author.id, {time:3600000});
    collect.on('message', (m) => {
        if (m.content === "cancel") {m.channel.sendMessage("Cancelled"); collect.stop(); delete dure[m.author.id];}
        else {
            let cmds = bot.config.getCustom(m.guild.id);
            cmds[trig] = {msg:m.content, type:"simple"};
            let prefix = bot.config.getPrefix(m.guild.id);
            bot.config.setCustom(m.guild.id, cmds)
            m.channel.sendMessage("Your command has been created and can be triggered with `"+prefix+""+trig+"`");
            collect.stop()
            delete dure[m.author.id]
        }
    })
    message.channel.sendMessage("**The command name was set to `"+trig+"`**\nNext, write the message the bot will respond with when this command is triggered.\nOr `cancel` to exit.")
}

function imageCmd(message, trig) {
    let collect = message.channel.createCollector(m => m.author.id === message.author.id, {time:3600000});
    images[message.author.id] = [];
    collect.on('message', (m) => {
        if (m.content === "cancel") {m.channel.sendMessage("Cancelled"); collect.stop(); delete dure[m.author.id]; delete images[m.author.id]}
        else if (m.content === "done") {
            if (images[m.author.id].size < 1) m.channel.sendMessage("You have not added an image yet. Lets try again.")
            else {
                 let cmds = bot.config.getCustom(m.guild.id);
                 cmds[trig] = {msg:images[m.author.id], type:"image"};
                 let prefix = bot.config.getPrefix(m.guild.id);
                 bot.config.setCustom(m.guild.id, cmds)
                 m.channel.sendMessage("Your command has been created and can be triggered with `"+prefix+""+trig+"`");
                 collect.stop()
                 delete dure[m.author.id]
                 delete images[m.author.id]
            }
        }
        else {
            let attach = (!!m.attachments.first()) ? m.attachments.first() : false;
            let embed = (!!m.embeds[0]) ? m.embeds[0] : false;
            if (attach) {
                if (!attach.height) m.channel.sendMessage("That attachment is not a valid image. Lets try again.")
                else {
                    if (images[m.author.id].size > 24) m.channel.sendMessage("You can not upload more than 25 images. Write `done` to finish the command.")
                    else {
                        images[m.author.id].push(attach.url);
                        m.channel.sendMessage("**Successfully added image**\nYou can continue to add images so that when the command is run, it will choose a random image to upload, or write `done` to finish the command.")
                    }
                }
            }
            else if (embed) {
                if (embed.type !== "image") m.channel.sendMessage("That url is not a valid image. Lets try again")
                else {
                    if (images[m.author.id].size > 24) m.channel.sendMessage("You can not upload more than 25 images. Write `done` to finish the command.")
                    else {
                        images[m.author.id].push(embed.url);
                        m.channel.sendMessage("**Successfully added image**\nYou can continue to add images so that when the command is run, it will choose a random image to upload, or write `done` to finish the command.")
                    }
                }
            }
            else {
                m.channel.sendMessage("Invalid Image Type: Upload an image or send an image url.")
            }
        }
    })
    message.channel.sendMessage("**The command name was set to `"+trig+"`**\nNext, upload an image or send an image url.\nOr `cancel` to exit.")
}

function advancedCmd(message, trig) {
    let collect = message.channel.createCollector(m => m.author.id === message.author.id, {time:3600000});
    collect.on('message', (m) => {
        if (m.content === "cancel") {m.channel.sendMessage("Cancelled"); collect.stop(); delete dure[m.author.id];}
        else {
            let cmds = bot.config.getCustom(m.guild.id);
            cmds[trig] = {msg:m.content, type:"advanced"};
            let prefix = bot.config.getPrefix(m.guild.id);
            bot.config.setCustom(m.guild.id, cmds)
            m.channel.sendMessage("Your command has been created and can be triggered with `"+prefix+""+trig+"`");
            collect.stop()
            delete dure[m.author.id]
        }
    })
    message.channel.sendMessage("**The command name was set to `"+trig+"`**\nNext, write the message the bot will respond with when this command is triggered including any functions and variables you wish.\nRefer to the Advanced Command docs here: <https://github.com/funnbot/Nitro-Public/wiki/Advanced-Custom-Commands>.\nOr `cancel` to exit.")
}



function shortcutCmd(message, trig) {
    delete dure[message.author.id];
    message.channel.sendMessage('This option is still `wip`');
}

exports.convert = (cmd, message, bot) => {
    let custom = bot.config.getCustom(message.guild.id);
    let command = custom[cmd];
    if (command.type === "simple") {
        return message.channel.sendMessage(command.msg);
    }
    if (command.type === "image") {
        let num = rn({min:0, max:command.msg.length-1, integer:true});
        return message.channel.sendFile(command.msg[num]);
    }
    if (command.type === "advanced") {
        let text = command.msg;
        text = variables(text, message, bot);
        message.channel.sendMessage(text, {split:true});
    }
}

function variables(text, message, bot) {
    const repl = {
        "{guild}":message.guild.name,
        "{guild.id}":message.guild.id,
        "{guild.region}":message.guild.region,
        "{guild.channels}":Array.from(message.guild.channels).map(ar => ar[1].name).join(", "),
        "{guild.channels.size}":message.guild.channels.size,
        "{guild.channels.text}":Array.from(message.guild.channels).filter(ch => ch[1].type === "text").map(ar => ar[1].name).join(", "),
        "{guild.channels.text.size}":message.guild.channels.filter(ch => ch.type === "text").size,
        "{guild.channels.voice}":Array.from(message.guild.channels).filter(ch => ch[1].type === "voice").map(ar => ar[1].name).join(", "),
        "{guild.channls.voice.size}":message.guild.channels.filter(ch => ch.type === "voice").size,
        "{guild.roles}":Array.from(message.guild.roles).map(ar => ar[1].name).join(", "),
        "{guild.roles.size}":message.guild.roles.size,
        "{guild.members}":Array.from(message.guild.members).map(ar => ar[1].username).join(", "),
        "{guild.members.size}":message.guild.members.size,
        "{guild.bots}":Array.from(message.guild.members).filter(bot => bot[1].bot === true).map(ar => ar[1].username).join(", "),
        "{guild.bots.size}":message.guild.members.filter(bot => bot.bot === true).size,
        "{guild.users}":Array.from(message.guild.members).filter(bot => bot[1].bot === false).map(ar => ar[1].username).join(", "),
        "{guild.users.size}":message.guild.members.filter(bot => bot.bot === false).size,

        "{author}":message.author,
        "{author.name}":message.author.username,
        "{author.nickname}":message.member.nickname,
        "{author.id}":message.author.id,
        "{author.roles}":Array.from(message.member.roles).map(r => r[1].name).join(", "),
        "{author.roles.size}":message.member.roles.size,

        "{bot}":"<@"+bot.user.id+">",
        "{bot.id}":bot.user.id, 
        "{bot.roles}":Array.from(message.guild.member(bot.user).roles).map(r => r[1].name).join(", "),
        "{bot.roles.size}":message.guild.member(bot.user).roles.size,
        "{bot.guilds}":bot.guilds.size,
        "{bot.channels}":bot.channels.size,
        "{bot.users}":bot.users.size
    }
  let re = new RegExp(Object.keys(repl).join("|"), "gi");
  text = text.replace(re, function(matched) {
     return repl[matched]
  });
  return text
}