const mysql = require('./mysql/Db')
const ERRORS = require('./constants').ERRORS
const debug = require('debug')('cbd')


async function getByuser(username, userinfo,ctx) {
    console.log(username)
    console.log(userinfo)
    var result = null
    // mysql('testuser').select
    
    // await mysql('testuser').select('username').where(username)
    // .then(res=>{
    //     result= JSON.stringify(res);
    //     console.log(result)
    //     ctx.body=result
    // })
    await mysql('testuser').select('*').then(res=>{
        result= JSON.stringify(res);
        console.log(result)
       
        console.log(result.userid)
        console.log(result.username)
        console.log(result.userphone)
        console.log(result.userinfo)
        ctx.body=result
    })
    .catch(e => {
            debug('%s: %O', ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB, e)
            throw new Error(`${ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB}\n${e}`)
    })
}


module.exports = {
    getByuser
}