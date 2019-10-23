var config = require('../src/getConfiguration')

/**
 * 查询配置
 * @param {*} ctx 
 */
async function findByApp(ctx) {
    await config.QueryApp(ctx)
}

module.exports = {
    findByApp
}