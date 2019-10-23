const mysql = require('./mysql/Db')
const ERRORS = require('./constants').ERRORS
const debug = require('debug')('abc')
// var state = 0;

async function insUserinfo(user, phone, ctx) {
    var userl = JSON.parse(user)
    // console.log(phone)
    // delete userl.watermark;
    var openId = userl.openId
    // console.log(openId)
    var userinfo = JSON.stringify(userl)
    // console.log(userinfo)
    // console.log(userinfo.length)
    await mysql('userinfos').where('openId', openId).select('*').then(res => {
        if (res.length == 1) {
            ctx.body = "success"
        } else {
            mysql('userinfos').insert({ openId, userinfo, phone }).then(res => {
                ctx.body = "success"
                console.log("新用户返回了")
            })
                .catch(e => {
                    debug('%s: %O', ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB, e)
                    console.log(e)
                    throw new Error(`${ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB}\n${e}`)
                })
            // ctx.body = "error"
        }
    }).catch(e => {
        debug('%s: %O', ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB, e)
        console.log(e)
        throw new Error(`${ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB}\n${e}`)
    })
}

async function isGetUser(openId, ctx) {
    await mysql('userinfos').where('openId', openId).select('phone').then(res => {
        var users = JSON.stringify(res[0]);
        var us = JSON.parse(users)
        console.log(us.phone)
        ctx.body = us.phone
    }).catch(e => {
        debug('%s: %O', ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB, e)
        console.log(e)
        throw new Error(`${ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB}\n${e}`)
    })
}

async function findBycar(ctx) {
    await mysql('collect').select('*').then(res => {
        console.log(res)
        var str = JSON.stringify(res)
        console.log(str)
        // var carlist=[]
        // for(let i=0;i<res.length;i++){
        //     console.log(res[i])
        //     carlist[i]=res[i]
        // }
        // console.log(carlist)
        ctx.body = str
    }).catch(e => {
        debug('%s: %O', ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB, e)
        console.log(e)
        throw new Error(`${ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB}\n${e}`)
    })
}
module.exports = {
    insUserinfo,
    isGetUser,
    findBycar
}