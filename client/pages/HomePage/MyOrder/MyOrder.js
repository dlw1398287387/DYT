// pages/HomePage/MyOrder/MyOrder.js
var config = require('../../../config.js')
var util = require('../../../utils/util.js')

var OrderPage = []

var statu = 0;
var chushihua = [];
var userid = wx.getStorageSync("UserInfos3rdSession_Token");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    OrderList: {},
    conText: "加载更多"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var data = {
      openid: userid
    }
    util.Requests(config.service.getUserOrder, data).then((res) => {
      // res.reverse();
      OrderPage = res
      that.setData({
        OrderList: res
      })
    })

    // console.log(userid)
    // var that = this;
    // wx.request({
    //   url: config.service.getUserOrder + "?openid=" + userid,
    //   method: "get",
    //   header: {
    //     "Content-Type": "application/x-www-form-urlencoded"
    //   },
    //   success: function(res) {
    //     // console.log("执行成功")
    //     // console.log(res.data)
    //     //由于查看订单需要看近几天的需要把订单倒叙过来
    //     // res.data.reverse();
    //     OrderPage = res.data
    //     // console.log(OrderPage)
    //     that.setData({
    //       OrderList: res.data
    //     })
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
    statu = 0;
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    statu = 0;
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    // wx.showNavigationBarLoading()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var that = this;
    wx.showLoading({
      title: '加载中~',
    })
    statu += 6
    if (statu > that.data.OrderList.length) {
      console.log("已经没有更多订单了")
      wx.showLoading({
        title: '已无更多信息！',
      })
      setTimeout(function() {
        wx.hideLoading();
      }, 2000)
    } else {
      var data = {
        openid: userid,
        index: statu
      }
      util.Requests(config.service.getUserOrderoffset, data).then((res) => {
        wx.hideLoading()
        for (let i = 0; i < res.length; i++) {
          that.data.OrderList.push(res[i])
          that.setData({
            OrderList: that.data.OrderList
          })
        }
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  openloding: function() {
    console.log(OrderPage)
  },
  orderparticulars: function(e) {
    console.log(e)
  }

})