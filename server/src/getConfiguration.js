const mysql = require('./mysql/Db')
const ERRORS = require('./constants').ERRORS
const debug = require('debug')('abc')

/**
 * 查询配置
 * @param {*} ctx  
 */
async function QueryApp(ctx) {
    await mysql('setting').where('name', 'appid').orWhere('name', 'appsecret').select('*').then(res => {
        console.log(res)
        ctx.body = res;
    }).catch(e => {
        debug('%s: %O', ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB, e)
        console.log(e)
        throw new Error(`${ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB}\n${e}`)
    })
}

module.exports = {
    QueryApp
}