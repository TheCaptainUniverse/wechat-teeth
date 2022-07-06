// pages/pages1/scqk/scqk.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    value:'',
    show: false,
    index:'',
    shenhe:'',
    page:1,
    hasMore:true,
    pagesize:8,
    dataILu :false,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
      that.fyjz();
  },

  fyjz:function(){
    var that = this;
  
    wx.request({
      url: 'https://messi10zlj.xyz/tooth/shxq.php',	
      data: {
        page: that.data.page,
        count: that.data.pagesize,
        openid:app.globalData.openid, 
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data)
        var shenhea = that.data.shenhe;
        if (res.data.length > 0) {
          if (that.data.page == 1) {
            shenhea = []
          }
          var shenhes = res.data;
          if (shenhes.length < that.data.pagesize) {
            that.setData({
              shenhe: shenhea.concat(shenhes),
              hasMore: false,
              dataILu: false,
            })
            console.log(that.data.shenhe)
          } else {
            that.setData({
              shenhe: shenhea.concat(shenhes),
              hasMore: true,
              dataILu: true,
              page: that.data.page + 1
            })
          }
        } 
      },
      fail: function (res) {
        
      },
      complete: function (res) {
      
      },
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
    if (this.data.hasMore) {
      this.fyjz('加载更多数据')
    } else {
      this.setData({
        dataILu : false,
      })
      wx.showToast({
        title: '没有更多数据',
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})