const mysql = require('./mysql/Db')
const ERRORS = require('./constants').ERRORS
const debug = require('debug')('abc')

async function butest(ctx) {
    ctx.body = "返回拉!";
}
module.exports = {
    butest
}