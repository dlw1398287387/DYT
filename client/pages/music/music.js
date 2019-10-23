// pages/music/music.js
const Music_Url = "http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46"
var stuta = false
var Action = null

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
    var Music = wx.getStorageSync("backgroundMusic")
    console.log(Music)
    if (Music.length == 0) {
      console.log("第一次播放")
      this.Action = wx.createInnerAudioContext()
      this.Action.autoplay = stuta
      this.Action.src = Music_Url
      this.Action.onPlay(() => {
        const download = wx.downloadFile({
          url: Music_Url,
          success: function (res) {
            wx.setStorageSync("backgroundMusic", res.tempFilePath)
          }
        })
        download.onProgressUpdate((res) => {
          console.log("下载进度" + res.progress + "%")
        })
        console.log("开始播放")
      })
      this.Action.onError((res) => {
        console.log(res.errMsg)
        console.log(res.errCode)
      })
    } else {
      console.log("缓存下载")
      this.Action = wx.createInnerAudioContext()
      this.Action.autoplay = stuta
      this.Action.src = Music
      this.Action.onPlay(() => {
        console.log("开始播放")
      })
      this.Action.onError((res) => {
        console.log(res.errMsg)
        console.log(res.errCode)
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },



  audioPause: function() {
    // wx.chooseImage({
    //   success: function(res) {
    //     var tempFilePaths = res.tempFilePaths
    //     wx.saveFile({
    //       tempFilePath: tempFilePaths[0],
    //       success:function(ret){
    //         console.log("缓存成功")
    //         console.log(ret.savedFilePath)
    //         console.log(ret)
    //       }
    //     })
    //   },
    // })

    const download = wx.downloadFile({
      url: Music_Url,
      success: function(res) {
        // console.log(res)
        console.log(res.tempFilePath)
        wx.setStorageSync("backgroundMusic", res.tempFilePath)
      }
    })
    download.onProgressUpdate((res) => {
      console.log("下载进度" + res.progress + "%")
    })
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

  }
})
