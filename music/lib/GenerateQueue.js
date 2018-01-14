const paginate = require('Paginate')
const pretty = require('pretty-ms')

function makeQueue(playlist, num) {
    let pager = new paginate(playlist, 20)
    let page = pager.page(num)
    let list = []
    let TotalPages = Math.ceil(playlist.length / 20)
    if (num > TotalPages) num = TotalPages
    page.forEach((p, i) => {
        let duration = pretty(p.duration)
        let itemNumber = num != 1 ? ((((num - 1) * 20) + i) + 1) : i + 1
        list.push(`${itemNumber}. **${p.title}** - ${p.owner} (${duration})`)
    })
    list.push(`Page ${num}/${TotalPages}`)
    return list
}

module.exports = makeQueue