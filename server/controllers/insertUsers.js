const isuser = require('../src/insertUser')

async function get(ctx) {
    var username=ctx.query.username
    var userphone=ctx.query.userphone
    var userinfo=ctx.query.userinfo
    await isuser.saveUsers(username,userphone,userinfo,ctx);
}

module.exports={
    get
}