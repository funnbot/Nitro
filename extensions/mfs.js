const fs = require("fs");

const readdir = dir =>
    new Promise((resolve, reject) => {
        fs.readdir(dir, (err, files) => {
            if (err) return reject(err);
            resolve(files);
        })
    })

const readFile = file =>
    new Promise((resolve, reject) => {
        fs.readdir(file, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        })
    })

/**
 * Read every file in a folder with fs.readFile.
 * @param {String} folder - The folder to read.
 * @param {String|Array} limit - Limit extensions that are read.
 * @returns {Array}
 */
exports.readFiles = async function (folder, limit) {
    const files = await readdir(folder);
    let result = [];
    for (file of files) {
        let split = file.split(".");
        const ext = split.pop();
        if (Array.isArray(limit))
            if (!limit.includes(ext)) continue;
            else if (limit !== undefined)
            if (limit !== ex) continue;
        try {
            var read = await readFile(folder + "/" + file);
            result.push(read);
        } catch (e) {
            console.log(`Error Reading: ${folder}/${file}`, e);
        }
    }
    return result;
}