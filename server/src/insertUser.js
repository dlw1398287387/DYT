const mysql=require('./mysql/Db')
const ERRORS=require('./constants').ERRORS
const debug=require('debug')('abc')

async function saveUsers(username,userphone,userinfo,ctx) {
    console.log(username)
    console.log(userphone)
    console.log(userinfo)
    // await mysql('testuser').insert({username,userphone,userinfo})
    await mysql('testuser').insert({username,userphone,userinfo}).then(function(){
        ctx.body="收藏成功"
    })
    .catch(e => {
        debug('%s: %O', ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB, e)
        console.log(e)
        throw new Error(`${ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB}\n${e}`)
    })
}

module.exports={
    saveUsers
}