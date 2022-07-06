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
    sf:true,
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
      url: '../../../pages1/pages/ltlb/ltlb',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.avatarUrl);
    var that = this;
    that.setData({
      avatarUrl:app.globalData.avatarUrl,
      nickName:app.globalData.nickName,
      yhID:app.globalData.yhID,
    })
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