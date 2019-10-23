var config = require('../src/SaveUserinfos')

async function insertUserinfo(ctx) {
    var phone = ctx.query.Phone
    var create_time = ctx.query.datetime
    var user = ctx.query.Userinfo
    console.log(phone)
    console.log(create_time)
    console.log(user)
    await config.insertUserinfos(phone, create_time, user, ctx)
}

module.exports = {
    insertUserinfo
}