var dateTimePicker = require('../../libs/Date/dateTimePicker.js');

Page({
  data: {
    Maketest:null,
    dateTimeArray1: null,
    dateTime1: null,
    haha:null,
  },
  onLoad() {
    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // 精确到分的处理，将数组的秒去掉
    var lastArray = obj1.dateTimeArray.pop();
    var lastTime = obj1.dateTime.pop();
    this.setData({
      dateTime: obj.dateTime,
      dateTimeArray: obj.dateTimeArray,
      dateTimeArray1: obj1.dateTimeArray,
      dateTime1: obj1.dateTime
    });
    var thast= this;
    wx.request({
      url: 'http://127.0.0.1:5757/weapp/getbyphone?ids=12',
      method:'get',
      success: function (result){
        console.log("执行成功")
        // console.log(result.data)
        // for(let i=0; i<result.data.length;i++){
        //   console.log(result.data[i]);
        // }
        thast.setData({
          haha: result.data
        })
        // console.log("dd:" + result.data.id);
        // console.log("dd:" + result.data.username);
      }
    })
  },

 
  changeDateTime1(e) {
    this.setData({ dateTime1: e.detail.value });
  },
  changeDateTimeColumn1(e) {
    var arr = this.data.dateTime1, dateArr = this.data.dateTimeArray1;
    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
    this.setData({
      Maketest: 1,
      dateTimeArray1: dateArr,
      dateTime1: arr,
    });
  }

})