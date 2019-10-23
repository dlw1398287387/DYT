const http = require('http')
const WebSocketServer = require('websocket').server
var UUid = require('../node_modules/uuid')
var socketInsertOrder = require('../src/WebSocket')
var hashmap = require('hashmap')



/**
 * 区分司机连接， 乘客连接
 * driverMap 司机连接。
 * passengerMap 乘客连接
 */
var driverMap = new hashmap();
var passengerMap = new hashmap();
// var driverMap = new Map();
// var passengerMap = new Map();
var takingJson = null

const httpServer = http.createServer((request, response) => {
    console.log('[' + new Date + '] Received request for ' + request.url)
    response.writable(404)
    response.end()
})
const wsServer = new WebSocketServer({
    httpServer,
    autoAcceptConnections: true
})

wsServer.on('connect', function (connection) {
    // UUid 生产策略
    var struuid = UUid.v4();
    connection.on('message', message => {
        /**
         * 存放 司机连接  和  乘客连接。
         * 司机在连接 socket 时想服务器发送一个叫某某师傅。由这里判断，把司机乘客放进不同的集合里，方便消息推送。
         */
        // console.log(message.utf8Data)
        if (message.type === 'utf8') {
            // var lc = JSON.stringify(message.utf8Data)
            // console.log(lc)
            // console.log(message.utf8Data)
            var jsons = JSON.parse(message.utf8Data)
            console.log(jsons.userType)

            if (jsons.userType === "driver") {
                console.log("我是司机")
                driverMap.set(jsons.userUUid, connection)
                console.log(jsons.useropenid)
                var driverjson = JSON.stringify(jsons)
                passengerMap.forEach(function (value, key) {
                    if (jsons.useropenid === key) {
                        value.sendUTF(driverjson)
                    }
                }, passengerMap)
            } else if (jsons.userType === "passenger") {
                console.log("我是乘客")
                passengerMap.set(jsons.userOpenid, connection)
                // socketInsertOrder.insertOrder(struuid, jsons)
                driverMap.forEach(function (value, key) {
                    // console.log(key)
                    value.sendUTF(message.utf8Data)
                }, driverMap)
            }
            // console.log(message.utf8Data.driverInfo.name)
            // if (message.utf8Data.search("师傅") === 1 && message.utf8Data.length >= 3) {  // 
            //     driverMap.set(struuid + message.utf8Data, connection)// if (message.utf8Data.search("师傅") !== 1 && message.utf8Data.length < 3) 
            //     console.log(message.utf8Data)
            //     console.log(message.utf8Data.length)
            //     var ac=message.utf8Data.substr(3)
            //     console.log(ac)
            //     // console.log("aa"+message.utf8Data[1])
            //     // var useropneids=message.utf8Data.userOpenid
            //     passengerMap.forEach(function (value,key){
            //         if(ac===key){
            //             value.sendUTF("马勒戈壁，给老子11路车！")
            //         }
            //     },passengerMap)
            // } else {
            //     var takingJson = JSON.parse(message.utf8Data)
            //     // console.log(takingJson.userOpenid)
            //     passengerMap.set(takingJson.userOpenid, connection)
            //     // passengerMap.forEach(function (valuec,keyw){
            //     //     console.log(keyw)
            //     // },passengerMap)
            //     // console.log(struuid)
            //     socketInsertOrder.insertOrder(struuid, takingJson)
            //     // 遍历司机序列，向所有司机推送消息。
            //     driverMap.forEach(function (value, key) {
            //         // console.log(key)
            //         value.sendUTF(message.utf8Data)
            //     }, driverMap)
            // }
        } else if (message.type === 'binary') {
            console.log('Received Binary Message of ' + message.binaryData.length + ' binary');
            connection.sendBytes(message.binaryData);
        }
    }).on('close', (reasonCode, description) => {//断开
        // 由于司机  连接socket 就加入的序列，所有用户退出socket需要移除用户序列
        driverMap.forEach(function (value, key) {
            // 判断关闭socket的连接 是否与序列中的连接一样。如果一样移除
            if (connection === value) {
                driverMap.remove(key)
            }
        }, driverMap)
        //乘客
        passengerMap.forEach(function (value, key) {
            if (connection === value) {
                passengerMap.remove(key)
            }
        }, passengerMap)
        console.log('[' + new Date() + '] Peer ' + connection.remoteAddress + ' disconnected.')//关闭
    })
})

httpServer.listen(680, () => {
    console.log('[' + new Date() + '] Serveris  on port 5757')// 监听端口被占用
})

// async function driverSend(ctx) {
//     console.log(ctx)
//     var ccc = ctx.query.userContent
//     console.log(ccc)
//     var ll = JSON.stringify(ccc)
//     console.log(ll)
// }

// module.exports = { driverSend }












// const http = require('http')
// const WebSocketServer = require('websocket').server
// const httpServer = http.createServer((request, response) => {
//     console.log('[' + new Date + '] Received request for ' + request.url)
//     response.writable(404)
//     response.end()
// })
// const wsServer = new WebSocketServer({
//     httpServer,
//     autoAcceptConnections: true
// })
// wsServer.on('connect', function (connection) {
//     connection.on('message', message => {
//         if (message.type === 'utf8') {
//             console.log(">>> message content  from client  " + message.utf8Data)  //服务端打印
//             map.get(message.utf8Data).sendUTF('[服务器返回!]' + message.utf8Data)
//             for (var i = 0; i < connectedTunnelIds.length; i++) {
//                 // connectedTunnelIds[i].sendUTF('[服务器返回!]' + message.utf8Data)
//                 if (connectedTunnelIds[i] != connection) {
//                     // connectedTunnelIds[i].sendUTF('[服务器返回!]' + message.utf8Data)  //返回给用户数据
//                 }
//             }
//         } else if (message.type === 'binary') {
//             console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
//             connection.sendBytes(message.binaryData);
//         }
//     }).on('close', (reasonCode, description) => {//断开
//         //用户退出 ，移除用户序列
//         connectedTunnelIds.splice(this.connection)
//         // userlist.remove(userlist[0])
//         // console.log(connectedTunnelIds.length)
//         console.log('[' + new Date() + '] Peer ' + connection.remoteAddress + ' disconnected.')//关闭
//     })
// })
// httpServer.listen(80, () => {
//     console.log('[' + new Date() + '] Serveris listening on port 5757')// 监听端口被占用
// })












