let GuildPlayer = require('./GuildPlayer.js')

class Registry {

    constructor() {

        this.GuildPlayers = {}

    }

    createGuildPlayer(connection, message, bot) {

        if (!connection && !message) throw new Error("(!connection || !message)")

        if (this.GuildPlayers[message.channel.guild.id] && !this.GuildPlayers[message.channel.guild.id].killing) return this.GuildPlayers[message.channel.guild.id]

        return this.GuildPlayers[message.channel.guild.id] = new GuildPlayer(connection, message, bot), this.GuildPlayers[message.channel.guild.id]

    }

    get(id) {

        return this.GuildPlayers[id] ? this.GuildPlayers[id] : null

    }

    has(id) {

        return this.GuildPlayers[id] ? true : false

    }

    destroy(id) {

        this.GuildPlayers[id] ? this.GuildPlayers[id]._kill() : 0
        return delete this.GuildPlayers[id]

    }

}

module.exports = Registry
