// pages/Di_Home/loginText/loginText.js
const util = require('../../../utils/util.js')
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
  GetUser3rdsession: function() {
    var usertoken = wx.getStorageSync("userToken")
    wx.request({
      url: 'http://192.168.0.101:5757/weapp/findByUserToken?User3rdSession=' + usertoken,
      method: "GET",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        console.log(res.data)
      }
    })
  },

  onGetUserInfo: function() {
    wx.showLoading({
      title: '加载中~',
    })
    wx.login({
      success: function(reult) {
        console.log(reult.code)
        wx.getUserInfo({
          success: function(res) {
            var data = {
              json_code: reult.code,
              EncryptedData: res.encryptedData,
              IV: res.iv
            }
            util.Requests_json('http://192.168.0.101:5757/weapp/findByUserInfo', data).then((res) => {
              console.log(res)
              wx.setStorageSync("userToken", res)
              wx.hideLoading()
            })
          }
        })
      }
    })
  },

  getPhoneNumber: function(e) {
    wx.showLoading({
      title: '加载中~',
    })
    var Token = wx.getStorageSync("userToken");
    var data = {
      Utoken: Token,
      Detail: e.detail
    }
    util.Requests_json('http://192.168.0.101:5757/weapp/gainPhone', data).then((res) => {
      wx.hideLoading()
      console.log(res)
    })
  }
})