/**
 * ajax 服务路由集合
 */
const router = require('koa-router')({
    prefix: '/weapp'
})
const controllers = require('../controllers')

// 从 sdk 中取出中间件
// 这里展示如何使用 Koa 中间件完成登录态的颁发与验证
const { auth: { authorizationMiddleware, validationMiddleware } } = require('../qcloud')

// --- 登录与授权 Demo --- // 
// 登录接口
router.get('/login', authorizationMiddleware, controllers.login)
// 用户信息接口（可以用来验证登录态）
router.get('/user', validationMiddleware, controllers.user)

// --- 图片上传 Demo --- //
// 图片上传接口，小程序端可以直接将 url 填入 wx.uploadFile 中
router.post('/upload', controllers.upload)

// --- 信道服务接口 Demo --- //
// GET  用来响应请求信道地址的
router.get('/tunnel', controllers.tunnel.get)
// POST 用来处理信道传递过来的消息
router.post('/tunnel', controllers.tunnel.post)

// --- 客服消息接口 Demo --- //
// GET  用来响应小程序后台配置时发送的验证请求
router.get('/message', controllers.message.get)
// POST 用来处理微信转发过来的客服消息
router.post('/message', controllers.message.post)

// var con =require('../controllers')
router.get('/getuser', controllers.isnotUsers.get)

router.get('/insertUser', controllers.insertUsers.get)

router.get('/insertUserinfo', controllers.isSaveUserinfo.isSaveuser)

router.get('/insNotUserinfo', controllers.isSaveUserinfo.isNotUserinfo)

router.get('/findcar', controllers.isSaveUserinfo.findBycollect)

// router.get('/UpdataOrderSend', controllers.WebSocket.driverSend)

// router.get('/sockets', controllers.WebSocket.socket)

// 获取appid, appsecret 等配置
router.get('/findByApp', controllers.configuration.findByApp)
// 用户登陆，校验用户是新用户还是老用户，
router.get('/CheckTheUser', controllers.ChekUserinfo.chekUserinfo)
// 新增用户
router.get('/LogininsertUserinfo', controllers.SaveUserinfo.insertUserinfo)
// 查询订单信息
router.get('/MygetByOrder', controllers.getByOrder.getOrder)
// 订单分页
router.get('/loadMygetByOrder', controllers.getByOrder.getOrderoffset)
// 订单详情
router.get('/MygetByOrderContent', controllers.getByOrder.getOrderContent)

router.get('/getbyTest', controllers.test.requestTest)

router.post('/findByUserInfo', controllers.getUserContent.getlogin)

router.get('/findByUserToken', controllers.getUserContent.get3rdsession)

router.post('/gainPhone', controllers.getUserContent.getByPhone)

router.get('/getPersonal', controllers.UserCont.GetPersonalText)


module.exports = router
