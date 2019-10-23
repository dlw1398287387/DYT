// pages/HomePage/OrderContent/OrderContent.js
var config = require('../../../config.js')
var util = require('../../../utils/util.js')
var app = getApp()
var count = 5;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: {},
    stars: [0, 1, 2, 3, 4],
    normalSrc: '../../../images/no-star.png',
    selectedSrc: '../../../images/full-star.png',
    halfSrc: '../../../images/half-star.png',
    key: 5, //评分,
    evaluationcontent: '',
    Orderstates: '', //订单状态
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var orderid = options.id;
    var states = options.state;
    that.setData({
      evaluationcontent: '特别满意',
      Orderstates: states
    })
    console.log(states)
    console.log(orderid)

    wx.request({
      url: config.service.getOrderContent + "?orderid=" + orderid,
      method: "get",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        console.log(res.data)
        that.setData({
          content: res.data[0]
        })
      }
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
  //点击左边,半颗星
  selectLeft: function(e) {
    var key = e.currentTarget.dataset.key
    if (this.data.key == 0.5 && e.currentTarget.dataset.key == 0.5) {
      //只有一颗星的时候,再次点击,变为0颗
      key = 0;
    }
    count = key
    this.setData({
      key: key
    })
    switch (count) {
      case 5:
        this.setData({
          evaluationcontent: '特别满意'
        })
        break;
      case 4.5:
        this.setData({
          evaluationcontent: '比较满意'
        })
        break;
      case 4:
        this.setData({
          evaluationcontent: '较满意'
        })
        break;
      case 3.5:
        this.setData({
          evaluationcontent: '满意'
        })
        break;
      case 3:
        this.setData({
          evaluationcontent: '一般'
        })
        break;
      case 2.5:
        this.setData({
          evaluationcontent: '不满意'
        })
        break;
      case 2:
        this.setData({
          evaluationcontent: '差'
        })
        break;
      case 1.5:
        this.setData({
          evaluationcontent: '很差'
        })
        break;
      case 1:
        this.setData({
          evaluationcontent: '特别差'
        })
        break;
      case 0.5:
        this.setData({
          evaluationcontent: '极差'
        })
        break;
      case 0:
        this.setData({
          evaluationcontent: '态度恶劣'
        })
        break;
    }

  },
  //点击右边,整颗星
  selectRight: function(e) {
    var key = e.currentTarget.dataset.key
    count = key
    this.setData({
      key: key
    })

    switch (count) {
      case 5:
        this.setData({
          evaluationcontent: '特别满意'
        })
        break;
      case 4.5:
        this.setData({
          evaluationcontent: '比较满意'
        })
        break;
      case 4:
        this.setData({
          evaluationcontent: '较满意'
        })
        break;
      case 3.5:
        this.setData({
          evaluationcontent: '满意'
        })
        break;
      case 3:
        this.setData({
          evaluationcontent: '一般'
        })
        break;
      case 2.5:
        this.setData({
          evaluationcontent: '不满意'
        })
        break;
      case 2:
        this.setData({
          evaluationcontent: '差'
        })
        break;
      case 1.5:
        this.setData({
          evaluationcontent: '很差'
        })
        break;
      case 1:
        this.setData({
          evaluationcontent: '特别差'
        })
        break;
      case 0.5:
        this.setData({
          evaluationcontent: '极差'
        })
        break;
      case 0:
        this.setData({
          evaluationcontent: '态度恶劣'
        })
        break;
    }

  },
  startRating: function(e) {
    wx.showModal({
      title: '分数',
      content: "" + count,
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    })
  },
  returnHome: function() {
    util.Redirect_Home();
  }
})