var config = require('../src/ChekUserinfos')

/**
 * open_id : 请求用户唯一编号 参数
 * @param {*} ctx 
 * 
 * whetherExistUser 查询此时登陆的用户是否是新/老用户， 顺便取出用户手机号返回给前台， 
 */
async function chekUserinfo(ctx) {
    var open_id = ctx.query.useropenid
    console.log(open_id)
    await config.whetherExistUser(open_id, ctx)
}


module.exports = {
    chekUserinfo
}