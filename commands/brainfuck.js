let Discord = require('discord.js')

exports.run = (message, bot, send) => {

    let BFI = new Interpreter(message.content, message)

    BFI.interpret()

}

exports.conf = {
    userPerm: [],
    botPerm: ["SEND_MESSAGES"],
    coolDown: 0,
    dm: true,
    category: "Fun",
    help: "Fully Functioning Brainfuck Interpreter",
    args: ""
}

class Interpreter {

    constructor(rawInput, message) {

        this.rawInput = rawInput

        this.code = this.rawInput.replace(/[^\+\<\>\.\-\,\[\]]/g, "")

        this.codeSplit = this.code.split('')

        this.codeCursor = 0

        this.memCursor = 0

        this.message = message

        this.input = ""

        this.memory = Array.from({
            length: 255
        }, () => 0)

        this.output = ""

        this.infiniteCheck

        this.collector

    }

    interpret() {
        this._moveCursor(0)
        this.infiniteCheck = setTimeout(() => {
            this.message.channel.send('**Infinite Loop Detected**')
            this._moveCursor(this.codeSplit.length + 1)
        }, 120000)
    }

    async _moveCursor(newC) {

        this.codeCursor = newC

        if (this.codeCursor >= this.codeSplit.length) {
            clearTimeout(this.infiniteCheck)
            this.collector.stop('end of the line')
            return this.message.channel.sendMessage('**Output:** ' + this.output)
        }

        let input = this.codeSplit[this.codeCursor]

        if (input == "[") {
            if (this.memory[this.memCursor] != 0) {
                return this._moveCursor(this.codeCursor + 1)
            } else {
                return this._moveCursor(this.codeCursor + this.distanceToBracketRight() + 1)
            }
        }
        if (input == "]") {

            return this._moveCursor(this.distanceToBracketLeft())
        }
        if (input === ">") {
            this.memCursor = this.memCursor + 1
            if (this.memCursor > 255) return this.message.channel.send("`MemoryError: Out Of Memory`")
            return this._moveCursor(this.codeCursor + 1)
        }
        if (input === "<") {
            this.memCursor = this.memCursor - 1
            if (this.memCursor < 0) return this.message.channel.send("`MemoryError: Negative Memory Does Not Exist`")
            return this._moveCursor(this.codeCursor + 1)
        }
        if (input === "+") {
            this.memory[this.memCursor] = this.memory[this.memCursor] + 1
            if (this.memory[this.memCursor] > 255) this.memory[this.memCursor] = 0
            return this._moveCursor(this.codeCursor + 1)
        }
        if (input === "-") {
            this.memory[this.memCursor] = this.memory[this.memCursor] - 1
            if (this.memory[this.memCursor] < 0) this.memory[this.memCursor] = 255
            return this._moveCursor(this.codeCursor + 1)
        }
        if (input === ".") {
            this.output = this.output + String.fromCharCode(this.memory[this.memCursor])
            return this._moveCursor(this.codeCursor + 1)
        }
        if (input === ",") {
            let char = await this._getInput()
            this.memory[this.memCursor] = char
            return this._moveCursor(this.codeCursor + 1)
        }

    }

    _getInput() {

        return new Promise((resolve, reject) => {
            this.message.channel.sendMessage("**Awaiting Input...**")
            this.collector = new Discord.MessageCollector(this.message.channel, (m) => m.author.id === this.message.author.id, {
                time: 60000, max:1, maxMatches:1
            })

            this.collector.on('message', (m) => {
                let char = m.content.split('')[0]
                let toUni = char.charCodeAt(0)
                return resolve(toUni)
            })

            this.collector.on('end', (c, r) => {
                if (r === "time") {
                    return resolve(0)
                }
            })

        })

    }

    distanceToBracketRight() {
        let counter = 0

        for (let i = 1; i < (this.codeSplit.length - this.codeCursor); i++) {
            if (this.codeSplit[i + this.codeCursor] == "[") {
                counter = counter + 1
            } else if (this.codeSplit[i + this.codeCursor] == "]" && counter > 0) {
                counter = counter - 1
            } else if (this.codeSplit[i + this.codeCursor] == "]") {
                return i
            }
        }
    }

    distanceToBracketLeft() {
        let counter = 0
        for (let i = this.codeCursor; i >= 1; i--) {
            let char = this.codeSplit[i]
            if (char === "]") counter++
                else if (char === "[" && counter > 1) counter--
                    else if (char === "[") {
                        return i
                    }
        }
    }


}