/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
// var host = 'https://f2rhcxzk.qcloud.la';
// var host = 'http://127.0.0.1:5757/'
var host = 'http://192.168.137.1:5757'
var config = {

  // 下面的地址配合云端 Demo 工作
  service: {
    host,

    // 登录地址，用于建立会话
    loginUrl: `${host}/weapp/login`,

    // 测试的请求地址，用于测试会话
    requestUrl: `${host}/weapp/user`,

    // 测试的信道服务地址
    tunnelUrl: `${host}/weapp/tunnel`,

    // 上传图片接口
    uploadUrl: `${host}/weapp/upload`,

    //配置信息查询
    getByconfig: `${host}/weapp/findByApp`,

    // 用户信息
    getUserinfos: `https://api.weixin.qq.com/sns/jscode2session`,



    // 后台登陆
    getUser3rdSession: `${host}/weapp/findByUserInfo`,
    // 手机号
    getPhone3rdSession: `${host}/weapp/gainPhone`,
    // 登陆，校验新/老用户
    getCheckTheUser: `${host}/weapp/CheckTheUser`,
    // 新增新用户
    UserLoginSave: `${host}/weapp/LogininsertUserinfo`,
    // 查询订单
    getUserOrder: `${host}/weapp/MygetByOrder`,
    // getUserOrder: `${host}/weapp/API/V1/CON/MygetByOrder`,
    // 查询订单分页
    getUserOrderoffset: `${host}/weapp/loadMygetByOrder`,
    // 订单详情
    getOrderContent: `${host}/weapp/MygetByOrderContent`,
    // 个人信息
    getUserPersonal: `${host}/weapp/getPersonal`,
  }
};

module.exports = config;