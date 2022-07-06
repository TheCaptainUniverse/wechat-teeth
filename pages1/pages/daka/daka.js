// pages1/pages/daka/daka.js
const app = getApp()
var timerIndex; // 计时器
var intIndexTime = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src:'',
    ID:'',
    intIndexTime:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.showToast({
      title: '请观看视频打卡',//提示文字
      duration:2000,//显示时长
      mask:true,//是否显示透明蒙层，防止触摸穿透，默认：false  
   })
    wx.request({
      url: 'https://messi10zlj.xyz/tooth/daka.php',
      data: {
        ID:1,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
      console.log(res.data)
      console.log(res.data[0].src)
      if(res.data[0].src!=''){
        
        that.setData({
          src:res.data[0].src,
        })
      }else{
      } 
      }
    })
  },

  countTime() {
    let that = this
    // 计时过程
    timerIndex = setTimeout(function () {
      console.log('主页计时器+1', intIndexTime);
      intIndexTime = intIndexTime + 1
      wx.setStorage({
          key: "timerIndex",
          data: intIndexTime
      })
      that.countTime();
  }, 1000);
    if(240<=intIndexTime){
      wx.request({
        url: 'https://messi10zlj.xyz/tooth/zjjf.php',
        data: {
          openid:app.globalData.openid,
          nickName:app.globalData.nickName,
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          wx.showToast({
            title: '积分+1',
          })
        console.log(res.data)
        intIndexTime = 0
        wx.setStorage({
          key: "timerIndex",
          data: 0
        })
        clearTimeout(timerIndex);
        }
      })
    }
},

// 计时器暂停
pauseBtn: function () {
  console.log('主页计时器暂停并且清零');
  intIndexTime = 0
  wx.setStorage({
    key: "timerIndex",
    data: 0
  })
  clearTimeout(timerIndex);
  
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.countTime()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.pauseBtn();
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.pauseBtn();
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})