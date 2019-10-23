var config = require('../src/mtest')


async function requestTest(ctx) {
    
    // var awx = ctx.query.name
    // console.log(awx)
    // var names = ctx.query.pass
    // console.log(names)
    await config.butest(ctx)
}

module.exports = {
    requestTest
}