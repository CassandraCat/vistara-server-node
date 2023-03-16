const path = require('path')
const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database(path.resolve(__dirname, './vistara.sqlite3'))

module.exports = db
