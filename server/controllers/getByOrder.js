var config = require('../src/findByOrder')
const jwt = require('jsonwebtoken')
const secret = "SLDLKKDS323ssdd@#@@gf";
// const config = require('../config')
// const appSecret = config.appSecret

/**
 * 小程序进入订单页分页，初始化第一页6条
 * @param {*} ctx 
 * open_id : 根据ID 查询自己的订单信息
 */
async function getOrder(ctx) {
    var open_id = ctx.query.openid
    console.log(open_id)
    var opens = jwt.verify(open_id, secret)
    await config.findOrder(opens.openid, ctx)
}


/**
 * 小程序分页向下拉取订单，根据statu角标查询offset条数， （注：下拉一次角标+6，以此类推）
 * @param {*} ctx 
 * open_id：根据ID 查询自己的订单信息
 * offset ： statu 角标
 */
async function getOrderoffset(ctx) {
    var open_id = ctx.query.openid
    var offset = ctx.query.index
    console.log(open_id)
    var opens = jwt.verify(open_id, secret)
    // console.log(open_id)
    // console.log(offset)
    await config.findOrderoffset(opens.openid, offset, ctx)
}

/**
 * 查询订单详情
 * @param {*} ctx 
 * Order_Id : 订单ID
 */
async function getOrderContent(ctx) {
    var Order_Id = ctx.query.orderid
    await config.findOrderContent(Order_Id, ctx)
}


module.exports = {
    getOrder,
    getOrderoffset,
    getOrderContent
}