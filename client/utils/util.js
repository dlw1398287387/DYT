const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
 
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


// 显示繁忙提示
var showBusy = text => wx.showToast({
  title: text,
  icon: 'loading',
  duration: 10000
})

// 显示成功提示
var showSuccess = text => wx.showToast({
  title: text,
  icon: 'success'
})

// 显示失败提示
var showModel = (title, content) => {
  wx.hideToast();
  wx.showModal({
    title,
    content: JSON.stringify(content),
    showCancel: false
  })
}

function isnotLogin() {
  wx.showModal({
    title: '提示！',
    content: '您还未登陆呢！',
    success: function(e) {
      if (e.confirm) {
        wx.navigateTo({
          url: '/pages/HomePage/Login/Login',
        })
      }
    }
  })
}


function Requests(url, data) {
  return new Promise((resolv, reject) => {
    wx.request({
      url: url,
      data: data,
      method: "get",
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        if (res.data == "服务器异常") {
          wx.hideLoading()
          wx.showModal({
            title: '提示',
            content: '网络错误或服务器繁忙!',
          })
        } else {
          resolv(res.data)
        }
      },
      fail: function(err) {
        console.log(err)
        reject(err)
        wx.hideLoading()
        wx.showModal({
          title: '提示',
          content: '网络错误或服务器繁忙!',
        })
      }
    })
  })
}

function Requests_json(url, data) {
  return new Promise((resolv, reject) => {
    wx.request({
      url: url,
      data: data,
      method: "POST",
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        if (res.data == "服务器异常") {
          wx.hideLoading()
          wx.showModal({
            title: '提示',
            content: '网络错误或服务器繁忙!',
          })
        } else {
          resolv(res.data)
        }
      },
      fail: function(err) {
        wx.hideLoading()
        console.log(err)
        reject(err)
        wx.showModal({
          title: '提示',
          content: '网络错误或服务器繁忙!',
        })
      }
    })
  })
}
//登陆跳转
function Redirect_Login() {
  wx.navigateTo({
    url: '/pages/HomePage/Login/Login',
  })
}
//获取手机号跳转
function Redirect_Phone() {
  wx.redirectTo({
    url: '/pages/Di_Home/GetPhone/GetPhone',
  })
}
// 主页
function Redirect_Home() {
  wx.redirectTo({
    url: '/pages/HomePage/Di_Home/Di_Home',
  })
}

function CRedirect_Home() {
  wx.navigateTo({
    url: '/pages/HomePage/Di_Home/Di_Home',
  })
}

function verifyUserContent() {
  return new Promise((resolv, reject) => {
    var user_o = wx.getStorageSync("UserInfos3rdSession_Token")
    var user_p = wx.getStorageSync("Phone3rdSession_Token")

    if (user_o.length == 0) {
      wx.showModal({
        title: '提示',
        content: '您还未登陆，请登陆后重试！',
        success: function(opens) {
          if (opens.confirm) {
            wx.navigateTo({
              url: '/pages/HomePage/Login/Login',
            })
          }
        }
      })
      return;
    }
    if (user_p.length == 0) {
      wx.showModal({
        title: '提示',
        content: '您还未绑定手机号，请绑定手机号后重试！',
        success: function(opens) {
          if (opens.confirm) {
            wx.navigateTo({
              url: '/pages/Di_Home/GetPhone/GetPhone',
            })
          }
        }
      })
    } else {
      resolv("true")
    }
  })
}

//else if (user_p == null) {
// wx.showModal({
//   title: '提示',
//   content: '您还未绑定手机号，请绑定手机号后重试！',
//   success: function (opens) {
//     if (opens.confirm) {
//       wx.navigateTo({
//         url: '/pages/Di_Home/GetPhone/GetPhone',
//       })
//     }
//   }
// })
//   }

module.exports = {
  formatTime,
  showBusy,
  showSuccess,
  showModel,
  isnotLogin,
  Requests,
  Requests_json,
  Redirect_Phone,
  Redirect_Login,
  Redirect_Home,
  verifyUserContent,
  CRedirect_Home
}