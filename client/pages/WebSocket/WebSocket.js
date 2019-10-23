// pages/WebSocket/WebSocket.js
var APPSECRET = 'cb8040536dcc0afb7e3eca7bde0d5ecd'
var APPID = 'wx1ca22e3163a07ec6'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.connectSocket({
      url: 'ws://127.0.0.1:80',
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


    wx.onSocketMessage(function(res) {
      console.log("服务器返回:" + res.data)
    })

    wx.onSocketClose(function(res) {
      console.log("webSocket已关闭")
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  OpenSocket: function() {

    // wx.request({
    //   url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + APPID + '&secret='+APPSECRET,
    //   method:'get',
    //   header: {
    //     "Content-Type": "application/x-www-form-urlencoded"
    //   },
    //   success:function(res){
    //     console.log(res)
    //   }
    // })
    var msgData = "我的手机号是：15908619974，我要去天安门！"
    wx.sendSocketMessage({
      data: msgData,
    })



  },
  ColseSocket: function() {
    wx.closeSocket({
      success: function(res) {
        console.log(res);
        console.log("关闭")
      }
    })
  }
})