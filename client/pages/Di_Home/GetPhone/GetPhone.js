// var WXBizDataCrypt = require('../../../libs/RdWXBizDataCrypt.js');
var util = require('../../../utils/util.js')
var config = require('../../../config.js')

var Datetime = null;


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

  getPhoneNumber: function(e) {
    wx.showLoading({
      title: '加载中~',
    })
    var Token = wx.getStorageSync("UserInfos3rdSession_Token");
    var data = {
      Utoken: Token,
      Detail: e.detail
    }
    util.Requests_json(config.service.getPhone3rdSession, data).then((res) => {
      console.log(res)
      if (res == "您的登陆状态超过5分钟失效，请重新登陆") {
        wx.showModal({
          title: '提示',
          content: res,
        })
      }
      wx.setStorageSync("Phone3rdSession_Token", res)
      wx.hideLoading()
      util.Redirect_Home();
    })
  },
})