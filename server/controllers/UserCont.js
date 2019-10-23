var src = require('../src/UserConts')
const jwt = require('jsonwebtoken')
const secret = "SLDLKKDS323ssdd@#@@gf";
/**
 *  查询个人订单数量  总订单，月订单，年订单
 * @param {*} ctx 上下文对象
 */
async function GetPersonalText(ctx) {
    var userP = ctx.query.userId
    var data = jwt.verify(userP, secret)
    await src.GetMyOrdersum(data.openid, ctx)
}

module.exports = {
    GetPersonalText
}