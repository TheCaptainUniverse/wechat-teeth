// pages/pages1/gzhwz/gzhwz.js
const app = getApp()
const API = app.globalData.requestHeader
var timerIndex; // 计时器
var intIndexTime = 0
Page({

  data: {
    url:'',
    id:'',
    intIndexTime:0,
  },

  onLoad: function (options) 
  {
    console.log(options.id)
    var that = this;
    that.setData({
      id:options.id,
    })
    wx.request({
      method:'GET',
      url:API+'/content/findScienceUrlById',
      // url: 'https://messi10zlj.xyz/tooth/gghwz.php',
      data: {
        id:that.data.id,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
      console.log(res.data)
      console.log(res.data.url)
      if(res.data.url!=''){
        that.setData({
          url:res.data.url,
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
        method:'POST',
        url:API+'/user/updateAndInsertClockByOpenidAndName',
        // url: 'https://messi10zlj.xyz/tooth/zjjf.php',
        data: {
          openid:app.globalData.openid,
          name:app.globalData.name
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