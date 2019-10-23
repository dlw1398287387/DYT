// pages/logintest/logintest.js
var config = require('../../../config.js')
// var WXBizDataCrypt = require('../../../libs/RdWXBizDataCrypt.js');
var util = require('../../../utils/util.js')

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
    // wx.request({
    //   url: config.service.getByconfig,
    //   method: "get",
    //   header: {
    //     "Content-Type": "application/x-www-form-urlencoded"
    //   },
    //   success: function(res) {
    //     APPID = res.data[0].value
    //     SECRET = res.data[1].value
    //   }
    // })
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

  onGetUserInfo: function() {
    wx.showLoading({
      title: '加载中~',
    })
    wx.login({
      success: function(code_s) {
        wx.getUserInfo({
          success: function(userInfos) {
            var data = {
              json_code: code_s.code,
              EncryptedData: userInfos.encryptedData,
              IV: userInfos.iv
            }
            util.Requests_json(config.service.getUser3rdSession, data).then((res) => {
              console.log(res)
              wx.setStorageSync("UserInfos3rdSession_Token", res)
              wx.hideLoading()
              util.Redirect_Phone();
            })
          }
        })
      }
    })
  }
})