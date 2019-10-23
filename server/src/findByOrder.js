const mysql = require('./mysql/Db')
const ERRORS = require('./constants').ERRORS
const debug = require('debug')('abc')



async function findOrder(openid, ctx) {
    await mysql('order').where('UseropenId', openid).orderBy('Order_Id', 'desc').limit(6).select('*').then(res => {
        console.log(res)
        for (let i = 0; i < res.length; i++) {
            var d = new Date(res[i].DepartTime);
            var orderTime = d.getFullYear() + "年" + (d.getMonth() + 1) + "月" + d.getDate() + "日  " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
            // console.log(orderTime)
            res[i].DepartTime = orderTime
        }

        ctx.body = res
    }).catch(e => {
        debug('%s: %O', ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB, e)
        console.log(e)
        throw new Error(`${ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB}\n${e}`)
    })
}

async function findOrderoffset(open_id, offset, ctx) {
    var indes = parseInt(offset)
    await mysql('order').where('UseropenId', open_id).orderBy('Order_Id', 'desc').limit(6).offset(indes).select('*').then(res => {
        // console.log(res)
        for (let i = 0; i < res.length; i++) {
            var d = new Date(res[i].DepartTime);
            var orderTime = d.getFullYear() + "年" + (d.getMonth() + 1) + "月" + d.getDate() + "日  " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
            // console.log(orderTime)
            res[i].DepartTime = orderTime
        }

        ctx.body = res
    }).catch(e => {
        debug('%s: %O', ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB, e)
        console.log(e)
        throw new Error(`${ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB}\n${e}`)
    })
}


async function findOrderContent(Order_Id, ctx) {
    await mysql('order').where('Order_Id', Order_Id).select('*').then(res => {
        // console.log(res)
        for (let i = 0; i < res.length; i++) {
            var d = new Date(res[i].DepartTime);
            var orderTime = d.getFullYear() + "年" + (d.getMonth() + 1) + "月" + d.getDate() + "日  " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
            // console.log(orderTime)
            res[i].DepartTime = orderTime
        }
        ctx.body = res
    }).catch(e => {
        debug('%s: %O', ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB, e)
        console.log(e)
        throw new Error(`${ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB}\n${e}`)
    })
}

module.exports = {
    findOrder,
    findOrderoffset,
    findOrderContent
}