const mysql = require('./mysql/Db')
const ERRORS = require('./constants').ERRORS
const debug = require('debug')('abc')
var UUid = require('../node_modules/uuid')

async function insertUserinfos(phone, create_time, user, ctx) {
    var users = JSON.parse(user)
    var open_id = users.openId;
    var UnionId = users.unionId;
    var uuid = UUid.v4();
    var last_visit_time = create_time;
    var user_info = user;
    console.log(UnionId)
    await mysql('cSessionInfo').insert({ open_id, UnionId, phone, uuid, create_time, last_visit_time, user_info }).then(res => {
        console.log("执行成功!")
        ctx.body = "success"
    }).catch(e => {
        debug('%s: %O', ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB, e)
        console.log(e)
        throw new Error(`${ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB}\n${e}`)
    })

}

module.exports = {
    insertUserinfos
}