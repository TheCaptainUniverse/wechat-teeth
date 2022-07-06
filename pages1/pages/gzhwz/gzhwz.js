// pages/pages1/gzhwz/gzhwz.js
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
    console.log(options.ID)
    var that = this;
    that.setData({
      ID:options.ID,
    })
    wx.request({
      url: 'https://messi10zlj.xyz/tooth/gghwz.php',
      data: {
        ID:that.data.ID,
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
    if(10<=intIndexTime){
      wx.request({
        url: 'https://messi10zlj.xyz/tooth/zjjf.php',
        data: {
          openid:app.globalData.openid,
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
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