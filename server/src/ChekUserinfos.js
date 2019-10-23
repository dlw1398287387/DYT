const mysql = require('./mysql/Db')
const ERRORS = require('./constants').ERRORS
const debug = require('debug')('abc')

/**
 * 查询数据库，判断与前端界面传过来的unionId值是否一样，如果一样则确认是当前用户。
 * @param {*} uid unionId ： ID
 * @param {*} ctx 上下文
 */
async function whetherExistUser(uid, ctx) {

    await mysql('cSessionInfo').where('open_id', uid).select('*').then(res => {
        console.log(res[0])
        var userphone = res[0].phone
        if (res[0].open_Id == uid) {
            ctx.body = userphone;
        } else {
            ctx.body = userphone;
        }

    }).catch(e => {
        debug('%s: %O', ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB, e)
        console.log(e)
        throw new Error(`${ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB}\n${e}`)
    })
}


module.exports = {
    whetherExistUser
}