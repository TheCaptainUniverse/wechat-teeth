// pages1/mine/mine.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl:'',
    nickName:'',
    yhID:'',
    sf:'',
    xs:'',
    gly:'',
  },
  swichNav1() {
    wx.redirectTo({
      url: '../index/index',
    })
  },
  swichNav2() {
    wx.redirectTo({
      url: '../logs/logs',
    })
  },
  swichNav3() {
    wx.redirectTo({
      url: '../mine/mine',
    })
  },
  swichNav4() {
    wx.redirectTo({
      url: '../gly/gly',
    })
  },
  swichNav5() {
    wx.redirectTo({
      url: '../ltlb/ltlb',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.avatarUrl);
    var that = this;
    if(app.globalData.sf==3){
      that.setData({
       gly:true
      })
     }else{
       that.setData({
         gly:false
        })
     }
    that.setData({
      avatarUrl:app.globalData.avatarUrl,
      nickName:app.globalData.nickName,
      yhID:app.globalData.yhID,
      sf:app.globalData.sf,
    })
    if(that.data.sf==1||that.data.sf==2){
      that.setData({
        sf:true,
        xs:false,
      })
    }else if(that.data.sf==3){
      that.setData({
        sf:false,
        xs:false,
      })
    }else{
      that.setData({
        sf:false,
        xs:true,
      })
    }
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