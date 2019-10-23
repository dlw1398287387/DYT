const isuser = require('../src/saveUserinfo')

async function isSaveuser(ctx) {
 
    var user = ctx.query.userInfo
    var phone=ctx.query.Phone
    // console.log(user)
    await isuser.insUserinfo(user,phone, ctx)
}


async function isNotUserinfo(ctx){
   var openId= ctx.query.openid
   console.log(openId)
   await isuser.isGetUser(openId,ctx)
}
  
async function findBycollect(ctx){
    await isuser.findBycar(ctx);
}



module.exports = {
    isSaveuser,
    isNotUserinfo,
    findBycollect
}