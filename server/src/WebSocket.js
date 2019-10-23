var mysql = require('./mysql/Db')
const ERRORS = require('./constants').ERRORS
const debug = require('debug')('abc')


async function insertOrder(struuid, takingJson) {
    // console.log(takingJson)
    var SiteId = 0;
    var OrderStatus = 0;
    var Address = takingJson.Addressnumber;
    var OrderId = struuid;
    var UseropenId = takingJson.userOpenid;
    var UserPhone = takingJson.userPhone;
    var DepartTime = takingJson.Datatime;
    var OrderTime = takingJson.Datatime;
    var PassengerNote = null;
    var Departure = takingJson.risename + takingJson.risedesc;
    var DepLongitude = takingJson.riselongitude;
    var DepLatitude = takingJson.riselatitude;
    var Destination = takingJson.endname;
    var DestLongitude = takingJson.endlongitude;
    var DestLatitude = takingJson.endlatitude;
    var ENCRYPT = 2;
    var FareType = 'abc'
    // SiteId, OrderStatus, Address, OrderId, UseropenId, UserPhone, DepartTime, OrderTime, PassengerNote, Departure, DepLongitude, DepLatitude, Destination, DestLongitude, DestLatitude, ENCRYPT, FareType
    //null, 0, takingJson.Addressnumber, struuid, takingJson.userOpenid, takingJson.userPhone, takingJson.Datatime, takingJson.Datatime, null, takingJson.risename + takingJson.risedesc, takingJson.riselongitude, takingJson.riselatitude, takingJson.endname, takingJson.endlongitude, takingJson.endlatitude, 2, '5010-1'
    await mysql('order').insert({ SiteId, OrderStatus, Address, OrderId, UseropenId, UserPhone, DepartTime, OrderTime, PassengerNote, Departure, DepLongitude, DepLatitude, Destination, DestLongitude, DestLatitude, ENCRYPT, FareType }).then(res => {
        console.log("订单发起成功~！")
        
    }).catch(e => {
        debug('%s: %O', ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB, e)
        console.log(e)
        throw new Error(`${ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB}\n${e}`)
    })
}


async function sendContextUser(){}
module.exports = {
    insertOrder,
    sendContextUser
}
