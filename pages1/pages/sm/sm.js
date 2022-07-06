// pages1/pages/sm/sm.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tp:'',
    jf:'',
    bgTp:'',
    jd:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.jf)

    if(0<=app.globalData.jf&&app.globalData.jf<10){
      var chu = app.globalData.jf/10*100
      this.setData({
        tp:"../../imagessm/yc1.png",
      })
      this.setData({
        bgTp: "background-image: url('"+this.data.tp+"')"    
       })
    }else if(10<=app.globalData.jf&&app.globalData.jf<30){
      var chu = (app.globalData.jf-10)/20*100
      this.setData({
        tp:"../../imagessm/yc2.png"
      })
      this.setData({
        bgTp: "background-image: url('"+this.data.tp+"')"    
       })
    }else if(30<=app.globalData.jf&&app.globalData.jf<60){
      var chu = (app.globalData.jf-30)/30*100
      this.setData({
        tp:"../../imagessm/yc3.png"
      })
      this.setData({
       bgTp: "background-image: url('"+this.data.tp+"')"    
      })
      console.log(this.data.bgTp)
    }else if(60<=app.globalData.jf&&app.globalData.jf<100){
      var chu = (app.globalData.jf-60)/40*100
      this.setData({
        tp:"../../imagessm/yc4.png"
      })
      this.setData({
        bgTp: "background-image: url('"+this.data.tp+"')"    
       })
    }else if(100<=app.globalData.jf&&app.globalData.jf<150){
      var chu = (app.globalData.jf-100)/50*100
      this.setData({
        tp:"../../imagessm/yc5.png"
      })
      this.setData({
        bgTp: "background-image: url('"+this.data.tp+"')"    
       })
    }else if(150<=app.globalData.jf&&app.globalData.jf<210){
      var chu = (app.globalData.jf-150)/60*100
      this.setData({
        tp:"../../imagessm/yc6.png"
      })
      this.setData({
        bgTp: "background-image: url('"+this.data.tp+"')"    
       })
    }else if(210<=app.globalData.jf&&app.globalData.jf<280){
      var chu = (app.globalData.jf-210)/70*100
      this.setData({
        tp:"../../imagessm/yc7.png"
      })
      this.setData({
        bgTp: "background-image: url('"+this.data.tp+"')"    
       })
    }else if(280<=app.globalData.jf&&app.globalData.jf<360){
      var chu = (app.globalData.jf-280)/80*100
      this.setData({
        tp:"../../imagessm/yc8.png"
      })
      this.setData({
        bgTp: "background-image: url('"+this.data.tp+"')"    
       })
    }else if(360<=app.globalData.jf){
      var chu = (app.globalData.jf-360)/90*100
      this.setData({
        tp:"../../imagessm/yc9.png"
      })
      this.setData({
        bgTp: "background-image: url('"+this.data.tp+"')"    
       })
    }
    this.setData({
      jf:app.globalData.jf,
      jd:chu.toFixed(2)
    })
    console.log(this.data.jd);
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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