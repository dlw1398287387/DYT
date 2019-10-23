const isuser = require('../src/isnotUser')

async function get(ctx) {
    var username = ctx.query.username;
    // console.log(oid)
    var userinfo = ctx.query.userinfo;
    // console.log(userinfo)
    await isuser.getByuser(username, userinfo,ctx)
}



module.exports = {
    get
}
