var amapFile = require('../../../libs/amap/amap-wx.js');
var config = require('../../../libs/amap/config.js');
var utils = require('../../../utils/util.js')
var judgeopenId = null 
var judgePhone = null
// var ll = getApp().globalData.weidu;
// console.log(ll);
var addressName = null
var addressLocation = null
var Addressnumber = null
var driverPhone = null
// var userid = null
// var userPhone = null

Page({
  data: {
    markers: [],
    latitude: '',
    longitude: '',
    textData: {},
    addressName: '',
    addressLocation: '',
    date: '',
    orderContent: {},
  },
  onLoad: function() {
    // judgeopenId = wx.getStorageSync("UseropenId")
    // judgePhone = wx.getStorageSync("UserPhonenumber")
    // console.log(judgePhone.toString.length)
    // console.log(judgePhone)
    // console.log(judgeopenId.length)
    //现在预约订单发起时间
    var time = utils.formatTime(new Date());
    console.log(time)
    this.setData({
      date: time
    })
    var that = this;
    var key = config.Config.key;
    var MyAmapFun = new amapFile.AMapWX({
      key: 'a6fc989fc89cb1ace93a9b4da518b3a5'
    });
    MyAmapFun.getRegeo({
      iconPath: "../../../images/mapicon_navi_s.png",
      iconWidth: 22,
      iconHeight: 32,
      success: function(data) {
        //获取有目的地传过来的缓存值
        // console.log(data)
        Addressnumber = data[0].regeocodeData.addressComponent.adcode
        //设置POI精确搜索参数
        wx.setStorageSync("Addressl", Addressnumber)
        addressName = wx.getStorageSync("AddressName");
        addressLocation = wx.getStorageSync("AddressLocation");
        that.setData({
          addressName: addressName,
          addressLocation: addressLocation,
        })
        // console.log(addressName);
        // console.log(addressLocation);
        //由于传过来的值是整个location字符串无法分辨经纬度，需要进行一次切割
        var list = addressLocation.split(",");
        // console.log(list[0]);
        // console.log(list[1]);
        //坐标
        var marker = [{
          id: data[0].id,
          latitude: data[0].latitude,
          longitude: data[0].longitude,
          iconPath: data[0].iconPath,
          width: data[0].width,
          height: data[0].height,
        }, {
          iconPath: "../../../images/mapicon_navi_e.png",
          id: 0,
          latitude: list[1],
          longitude: list[0],
          width: 23,
          height: 33
        }]
        //当前位置经纬度
        var atploCation = data[0].longitude + "," + data[0].latitude;
        //目标位置经纬度
        var targetaddressLocation = addressLocation;
        //避免开打地图就有路线规划 所以第一次加载页面就清除缓存
        wx.removeStorageSync("AddressName");
        wx.removeStorageSync("AddressLocation");
        //现在存详情页需要的经纬度缓存
        wx.setStorageSync("atploCation", atploCation);
        wx.setStorageSync("targetaddressLocation", targetaddressLocation);
        // -----------------------
        MyAmapFun.getDrivingRoute({
          origin: "" + atploCation + "",
          destination: "" + targetaddressLocation + "",
          success: function(data) {
            var points = [];
            if (data.paths && data.paths[0] && data.paths[0].steps) {
              var steps = data.paths[0].steps;
              for (var i = 0; i < steps.length; i++) {
                var poLen = steps[i].polyline.split(';');
                for (var j = 0; j < poLen.length; j++) {
                  points.push({
                    longitude: parseFloat(poLen[j].split(',')[0]),
                    latitude: parseFloat(poLen[j].split(',')[1])
                  })
                }
              }
            }
            that.setData({
              polyline: [{
                points: points,
                color: "#0091ff",
                width: 6
              }]
            });
            if (data.paths[0] && data.paths[0].distance) {
              //拿到米计算里程
              var mileage = data.paths[0].distance / 1000;
              var mileage1 = mileage.toFixed(1);
              // console.log()
              that.setData({
                distance: mileage1 + "公里"
              });
            }
            if (data.taxi_cost) {
              that.setData({
                cost: '打车约' + parseInt(data.taxi_cost) + '元'
              });
            }
          },
          fail: function(info) {}
        })

        // -----------------------

        that.setData({
          markers: marker
        });
        that.setData({
          latitude: data[0].latitude
        });
        that.setData({
          longitude: data[0].longitude
        });
        that.setData({
          textData: {
            name: data[0].name,
            desc: data[0].desc
          }
        })
      },
      fail: function(info) {
        // wx.showModal({title:info.errMsg})
      }
    })


    //socket加载
    wx.connectSocket({
      // url: 'ws://localhost:806',
      // url: 'ws://192.168.137.1:680',
      url: 'ws://192.168.1.21:680',
      header: {
        'content-type': 'application/json'
      },
      protocols: ['protocol1'],
      method: 'get',
    })
    wx.onSocketOpen(function(res) {
      // console.log(res)
      console.log("连接已经打开")
    })
    wx.onSocketError(function(err) {
      console.log(err)
      console.log("握手错误！")
    })
    var thatl = this;
    wx.onSocketMessage(function(res) {
      setTimeout(function() {
        wx.hideLoading()
        wx.showToast({
          title: '司机已接单',
          icon: "success",
        })
      })
      console.log("服务器返回:" + res.data)
      var sendCon = JSON.parse(res.data)
      console.log(sendCon.driverInfo.name.length)
      thatl.setData({
        orderContent: sendCon
      })
      driverPhone = sendCon.phone
      console.log(sendCon)
      console.log(sendCon.phone)
      // wx.showModal({
      //   title: '提示',
      //   content: res.data,
      // })
    })
    wx.onSocketClose(function(res) {
      console.log("webSocket已关闭")
    })
  },
  onUnload: function() {

  },

  // 搜索Poi跳转 已经登陆校验
  bindtrue: function() {
    utils.verifyUserContent().then((res) => {
      console.log(res)
      if (res == "true") {
        wx.navigateTo({
          url: '/pages/HomePage/Di_Poi/Di_Poi',
        })
      }
    })
  },

  closeSession: function() {
    wx.removeStorageSync("AddressName");
    wx.removeStorageSync("AddressLocation");
    console.log("地址，经纬度缓存已清除!");
  },

  //用户预约跳转  登陆校验
  MakeCar: function() {
    utils.verifyUserContent().then((res) => {
      console.log(res)
      if (res == "true") {
        wx.navigateTo({
          url: '../Di_Make/Di_Make',
        })
      }
    })
  }, 

  //订单确认
  CallCar: function() {
    var userType = "passenger"
    var userOpenid = wx.getStorageSync('UserInfos3rdSession_Token') //用户唯一标识
    var userPhone = wx.getStorageSync('Phone3rdSession_Token') //用户手机号
    var time = utils.formatTime(new Date()); //用车时间
    var risename = this.data.textData.name //起点名称
    var risedesc = this.data.textData.desc //起点详细位置
    var riselatitude = this.data.latitude //起点经纬度
    var riselongitude = this.data.longitude //起点经纬度
    var endname = this.data.addressName //终点名称
    var addressLocations = addressLocation.split(',') //切割
    var endlongitude = addressLocations[0] //终点经纬度
    var endlatitude = addressLocations[1] //终点经纬度
    
    // 收集
    var OrderCenlit = {
      userType: userType,
      Addressnumber: Addressnumber,
      userOpenid: userOpenid,
      userPhone: userPhone,
      Datatime: time,
      risename: this.data.textData.name,
      risedesc: this.data.textData.desc,
      riselatitude: this.data.latitude,
      riselongitude: this.data.longitude,
      endname: this.data.addressName,
      endlongitude: addressLocations[0],
      endlatitude: addressLocations[1]
    }
    var takingJson = JSON.stringify(OrderCenlit)
    // console.log("获取" + takingJson)
    wx.showModal({
      title: '订单确认',
      content: "从" + risename + risedesc + "前往" + endname + riselatitude,
      success: function(e) {
        if (e.confirm) {
          console.log("用户点击了确定!")
          // console.log(endname + endaddressLocation)
          // 用户点击确定 发生请求申请预约订单
          wx.sendSocketMessage({
            data: takingJson
          })
          wx.showLoading({
            title: '等待司机接单~',
          })
        } else if (e.cancel) {
          console.log("用户点击了取消!")
        }
      }
    })
  },


  //跳转个人信息
  OpenMy: function() {
    utils.verifyUserContent().then((res) => {
      console.log(res)
      if (res == "true") {
        wx.navigateTo({
          url: '../../My/My',
        })
      }
    })

  },

  onShareAppMessage: function() {
    var ap = getApp().globalData.UserSession
    console.log("全局变量openid:" + ap.openid)
    console.log("全局变量手机号：" + ap.phoneNumber)
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  OpenOrder: function() {
    utils.verifyUserContent().then((res) => {
      console.log(res)
      if (res == "true") {
        wx.redirectTo({
          url: '/pages/HomePage/MyOrder/MyOrder',
        })
      }
    })
  },

  // 呼叫司机
  cllDriver: function(res) {
    console.log(driverPhone)
    wx.makePhoneCall({
      phoneNumber: "" + driverPhone + "",
    })
  },
  // 收藏司机
  Collectdriver: function() {
    wx.showToast({
      title: '收藏成功，感谢您的支持',
      icon: 'none',
      duration: 2000
    })
  },
  // 取消订单
  cancel_Order: function() {
    wx.showModal({
      title: '提示',
      content: '你确定需要取消订单吗？取消订单会降级您的信誉分！',
      success: function(opens) {
        if (opens.confirm) {
          console.log("确定取消订单")
        } else {
          console.log("不了我在考虑考虑!")
        }
      }
    })
  }
})