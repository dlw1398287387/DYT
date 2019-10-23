const mysql = require('./mysql/Db')
const ERRORS = require('./constants').ERRORS
const debug = require('debug')('abc')
var UUid = require('../node_modules/uuid')
const dates = require('china-time')
const config = require('../config')
const request = require('request-promise')
const jwt = require('jsonwebtoken')
const secret = "SLDLKKDS323ssdd@#@@gf";
const WXBizDataCrypt = require('../src/WXBizDataCrypt')

const appId = config.appId
const appSecret = config.appSecret
/**
 * 获取用户信息，解密
 * @param {*} login_code  登陆code
 * @param {*} encryptedData  解密参数
 * @param {*} iv 解密参数
 * @param {*} ctx 上下文对象
 */
async function getBySession_(login_code, encryptedData, iv, ctx) {
    try {
        // 内部请求获取 session_key  openid
        let session_K = await WeApi(appId, appSecret, login_code)
        var session = JSON.parse(session_K)
        // 解密
        var pc = new WXBizDataCrypt(appId, session.session_key)
        var data = await pc.decryptData(encryptedData, iv)
        // 打印解密对象
        console.log(data)
        var users = await isNotNewUser(session.openid);
        if (users[0] == null) {
            await AdditionUser(data)
        }
        // 维护3rdSession 返回给前端，保证数据安全。 
        var threeSession = jwt.sign(session, secret);
        // console.log(threeSession)
        //返回给前端 保存本地储存
        ctx.body = threeSession;
    } catch (err) {
        ctx.body = "服务器异常"
    }
}



/**
 * 获取手机号
 * @param {*} rdsession 3rdsession
 * @param {*} DetailS encryptedData, iv
 * @param {*} ctx 上下文
 */
async function GetByPhone_(rdsession, detail, ctx) {
    try {
        //解析登陆的3rdsession 并取出session_key 解密手机号
        var phone_session = jwt.verify(rdsession, secret)
        var users = await isNotNewUser(phone_session.openid);
        // 解密
        var pc = new WXBizDataCrypt(appId, phone_session.session_key)
        var data = await pc.decryptData(detail.encryptedData, detail.iv)
        console.log(data)
        if (users[0].phone.length == 0) {
            Update_Phone(phone_session.openid, data.phoneNumber)
        }
        // 加密解析出的手机号，在发送3rdsession态 给前端
        var phoneSession = jwt.sign(data, secret)
        ctx.body = phoneSession
    } catch (e) {
        ctx.body = "您的登陆状态超过5分钟失效，请重新登陆"
    }
}


/**
 * 解析3rdsession
 * @param {*} sessionToken 
 * @param {*} ctx 
 */
async function getUser3rdSession(sessionToken, ctx) {
    var wa = jwt.verify(sessionToken, secret)
    console.log(wa)
    ctx.body = wa
}

// 使用官方接口获取 openid 跟session_key
async function WeApi(appId, appSecret, login_code) {
    options = {
        method: 'GET',
        url: 'https://api.weixin.qq.com/sns/jscode2session',
        qs: {
            appid: appId,
            secret: appSecret,
            js_code: login_code
        }
    };
    let sessionData = await request(options);
    // console.log(sessionData)
    return sessionData
}

// 新用户新增
/**
 * @param {*} data  解密用户信息json串，
 * @param {*} userinfos 
 */
async function AdditionUser(data) {
    var open_id = data.openId;
    var UnionId = data.unionId;
    var uuid = UUid.v4();
    var create_time = dates('YYYY-MM-DD HH:mm:ss')
    var last_visit_time = create_time;
    var userinfos = JSON.stringify(data)
    // open_Id: open_id, unionId: UnionId, phone: phone, uuid: uuid, skey: skey, create_time: create_time, last_visit_time: last_visit_time, session_key: session_key, user_info: userinfos
    await mysql('cSessionInfo').insert({ open_Id: open_id, unionId: UnionId, uuid: uuid, create_time: create_time, last_visit_time: last_visit_time, user_info: userinfos }).then(res => {
        console.log("执行成功!!!")
    }).catch(e => {
        debug('%s: %O', ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB, e)
        console.log(e)
        throw new Error(`${ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB}\n${e}`)
    })
}

/**
 * 校验是否为新老用户
 * @param {*} openId 根据当前操作openid 查找是否需要新增用户
 */
async function isNotNewUser(openId) {
    return new Promise((resolv, rejevct) => {
        mysql("cSessionInfo").where("open_Id", openId).select("*").then(res => {
            resolv(res)
        }).catch(e => {
            debug('%s: %O', ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB, e)
            rejevct(e)
            // console.log(e)
            throw new Error(`${ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB}\n${e}`)
        })
    })
}

/**
 * 添加手机号字段
 * @param {*} openId 根据ID 添加手机号
 * @param {*} phoneNumber 解密出来的手机号参数
 */
async function Update_Phone(openId, phoneNumber) {
    await mysql("cSessionInfo").where("open_Id", openId).update("phone", phoneNumber).then(res => {
    }).catch(e => {
        debug('%s: %O', ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB, e)
        rejevct(e)
        console.log(e)
        throw new Error(`${ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB}\n${e}`)
    })
}

function trim(str) {
    return str.replace(/\s+/g, "");
}


module.exports = {
    getBySession_,
    WeApi,
    getUser3rdSession,
    trim,
    GetByPhone_
}

