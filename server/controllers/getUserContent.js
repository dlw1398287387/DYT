var req = require('../src/getLoginContent')


/**
 * @param {*} ctx 
 * 获取登陆请求携带code参数。
 */
async function getlogin(ctx) {
    var login_code = ctx.request.body.json_code
    var encryptedData = ctx.request.body.EncryptedData
    var iv = ctx.request.body.IV
    await req.getBySession_(login_code, encryptedData, iv, ctx)
}


async function get3rdsession(ctx) {
    var sessionToken = ctx.query.User3rdSession
    console.log(sessionToken)
    await req.getUser3rdSession(sessionToken, ctx);
}

async function getByPhone(ctx) {
    var rdsession = ctx.request.body.Utoken;
    var detail = ctx.request.body.Detail;
    await req.GetByPhone_(rdsession, detail, ctx);
}

module.exports = {
    getlogin,
    get3rdsession,
    getByPhone
}