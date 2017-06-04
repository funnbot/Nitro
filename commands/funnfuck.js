let Discord = require('discord.js')

exports.run = (message, bot) => {

    let NLI = new Interpreter(message.suffix, message)

    NLI.interpret()

}

exports.conf = {
    userPerm: [],
    botPerm: ["SEND_MESSAGES"],
    coolDown: 0,
    dm: true,
    category: "Fun",
    help: "A Wierd brainfuck derivative",
    args: "",
}

class Interpreter {

    constructor(rawInput, message) {

        this.rawInput = rawInput

        this.code = this.rawInput.replace(/[^\+\<\>\.\-\,\[\]\#\;\:\$\&]/g, "")

        this.codeSplit

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

        this.quitC

        this.loop = true

        this.commands = {
            "4": (cell) => {
                if (cell != 0) this.codeCursor++
                    else this.codeCursor = this.checkRight("4", "5")
            },
            "5": (cell) => {
                this.codeCursor = this.checkLeft("4", "5")
            },
            "6": (cell) => {
                if (cell != 0) this.codeCursor++
                    else this.checkRight("6", "7")
            },
            "2": (cell) => {
                this.memCursor++
                    if (this.memCursor > 255) return this.end(), this.message.channel.send("`MemoryError: Out Of Memory`")
                this.codeCursor++
            },
            "3": (cell) => {
                this.memCursor--
                    if (this.memCursor < 0) return this.end(), this.message.channel.send("`MemoryError: Negative Memory Does Not Exist`")
                this.codeCursor++
            },
            "0": (cell) => {
                this.memory[this.memCursor] = cell + 1
                if (this.memory[this.memCursor] > 65535) this.memory[this.memCursor] = 0
                this.codeCursor++
            },
            "1": (cell) => {
                this.memory[this.memCursor] = cell - 1
                if (this.memory[this.memCursor] < 0) this.memory[this.memCursor] = 65535
                this.codeCursor++
            },
            "8": (cell) => {
                this.output += String.fromCharCode(cell)
                this.codeCursor++
            },
            "9": (cell) => {
                this.output += cell
                this.codeCursor++
            },
            "A": async (cell) => {
                let char = await this._getInput("A")
                this.memory[this.memCursor] = char
                this.codeCursor++
            },
            "B": async (cell) => {
                let char = await this._getInput("B")
                if (char > 65535) char = 65535
                this.memory[this.memCursor] = char
                this.codeCursor++
            },
            "C": (cell) => {
                this.end()
            },
            "D": (cell) => {
                this.memory[this.memCursor] = cell * cell
                this.codeCursor++
            },
            "E": (cell) => {
                cell = Math.sqrt(cell)
                this.memory[this.memCursor] = Math.round(cell)
                this.codeCursor++
            }
        }

    }

    async interpret() {

        let Comp = new Compiler(this.code)

        this.codeSplit = Comp.compile()

        try {
            await this.linter()
        } catch (e) {
            return this.message.channel.send(e)
        }

        this.forceQuit()

        this.infinity()

        await this.delay()

        while (this.loop) {

            await this.delay()

            if (this.codeCursor >= this.codeSplit.length) {
                return this.end()
            }

            let input = this.codeSplit[this.codeCursor]
            let cell = this.memory[this.memCursor]

            await this.commands[input](cell)

        }
    }

    end() {
        this.loop = false
        clearTimeout(this.infiniteCheck)
        if (this.collector && !this.collector.ended) this.collector.stop('end of the line')
        if (this.quitC && !this.quitC.ended) this.quitC.stop('end of the line')
        this.message.channel.send('**Output:** ' + this.output)
    }

    forceQuit() {
        this.message.channel.send("**Evaluating Code**\nType `quit` to quit.")
        this.quitC = new Discord.MessageCollector(this.message.channel, (m) => m.author.id === this.message.author.id)

        this.quitC.on('message', (m) => {
            if (m.content.includes('quit')) {
                this.message.channel.send('**Force Quitting**').then(() => {
                    console.log("?")
                    this.end()
                })
            }
        })
    }

    linter() {

        return new Promise((resolve, reject) => {

            let code = this.code

            let leftB = (code.match(/4/g) || []).length
            let rightB = (code.match(/5/g) || []).length
            let leftP = (code.match(/6/g) || []).length
            let rightP = (code.match(/7/g) || []).length

            if (leftB !== rightB) return reject('**Mismatched Brackets**')
            else if (leftP !== rightP) return reject('**Mismatched Parentheses')
            else return resolve()

        })

    }

    infinity() {
        this.infiniteCheck = setTimeout(() => {
            this.message.channel.send('**Infinite Loop Detected**').then(() => {
                this.codeCursor = this.codeSplit.length + 1
            })
        }, 180000)
    }

    delay() {
        return new Promise((resolve) => {
            setTimeout(() => resolve(), 1)
        })
    }

    _getInput(type) {

        return new Promise((resolve, reject) => {
            this.message.channel.send("**Awaiting Input...**")
            this.collector = new Discord.MessageCollector(this.message.channel, (m) => m.author.id === this.message.author.id, {
                time: 60000,
                max: 1,
                maxMatches: 1
            })

            this.collector.on('message', (m) => {
                if (type === "A") {
                    let char = m.content.split('')[0]
                    let toUni = char.charCodeAt(0)
                    return resolve(toUni)
                } else if (type === "B") {
                    let char = parseInt(m.content) || 0
                    return resolve(char)
                }
            })

            this.collector.on('end', (c, r) => {
                if (r === "time") {
                    return resolve(0)
                }
            })

        })

    }

    checkRight(char1, char2) {
        let counter = 0
        for (let i = this.codeCursor + 1; i < this.codeSplit.length; i++) {
            let char = this.codeSplit[i]
            if (char === char1) counter++
                else if (char === char2 && counter > 0) counter--
                    else if (char === char2) return i + 1
        }
    }

    checkLeft(char1, char2) {
        let counter = 0
        for (let i = this.codeCursor - 1; i >= 1; i--) {
            let char = this.codeSplit[i]
            if (char === char2) counter++
                else if (char === char1 && counter > 0) counter--
                    else if (char === char1) return i
        }
    }


}

class Compiler {

    constructor(rawInput) {

        this.rawInput = rawInput

        this.output = []

        this.table = {
            "+":0,
            "-":1,
            ">":2,
            "<":3,
            "[":4,
            "]":5,
            "(":6,
            ")":7,
            ".":8,
            ":":9,
            ",":"A",
            ";":"B",
            "#":"C",
            "$":"D",
            "&":"E",
        }

    }

    compile() {

        this.rawInput.split('').forEach(i => {
            this.output.push(this.table[i])
        })

        return this.output.join('')

    }
}