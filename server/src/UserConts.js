const mysql = require('./mysql/Db')
const ERRORS = require('./constants').ERRORS
const debug = require('debug')('abc')

/**
 * 
 * @param {*} openId 根据id查询所有订单
 * @param {*} ctx 上下文对象
 */
async function GetMyOrdersum(openId, ctx) { // .count("*")
    try {
        await mysql("order").where("UseropenId", openId).then(res => {
            // 查询个人所有订单的长度为总订单
            var sumcount = res.length
            var date = new Date();
            // 年订单
            var yearcount = 0
            // 月订单
            var Month = 0
            // 循环查询订单数，取出订单的年，获取当前年对比，赋值
            for (let i = 0; i < res.length; i++) {
                var state1 = res[i].DepartTime.getFullYear() == date.getFullYear()
                if (state1 == true) {
                    yearcount += 1
                }
            }
            // 取出订单的月，获取当前月对比，赋值
            for (let i = 0; i < res.length; i++) {
                var state2 = res[i].DepartTime.getMonth() + 1 == date.getMonth() + 1
                if (state2 == true) {
                    Month += 1
                }
            }
            // 装进json里 返回
            var TimeCount = { Month: Month, yearcount: yearcount, sumcount: sumcount }
            var counts = JSON.stringify(TimeCount)
            ctx.body = counts
        }).catch(e => {
            debug('%s: %O', ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB, e)
            console.log(e)
            throw new Error(`${ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB}\n${e}`)
        })
    } catch (err) {
        ctx.body = "服务器异常"
    }
}

module.exports = {
    GetMyOrdersum
}