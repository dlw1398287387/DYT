// pages/My/My.js
var util = require('../../utils/util.js')
var config = require('../../config.js')
const usercontent = wx.getStorageSync("UserInfos3rdSession_Token")
Page({

  /** 
   * 页面的初始数据
   */
  data: {
    OrderCount: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var data = {
      userId: usercontent
    }
    util.Requests(config.service.getUserPersonal, data).then((res) => {
      this.setData({
        OrderCount: res
      })
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
  OpenHelp: function() {
    wx.navigateTo({
      url: '../Heip/Heip',
    })
  },
  My_collect: function() {
    wx.navigateTo({
      url: '../Di_Home/My_Collect/My_Collect',
    })
  },
  OpenOrder: function() {
    wx.navigateTo({
      url: '/pages/HomePage/MyOrder/MyOrder',
    })
  },

})