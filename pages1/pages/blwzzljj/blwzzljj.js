// pages1/pages/blwzzljj/blwzzljj.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wzlj:'',
    ID:'',
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
      url: 'https://messi10zlj.xyz/tooth/blwzzljj.php',
      data: {
        ID:that.data.ID,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
      console.log(res.data)
      console.log(res.data[0].wzlj)
      if(res.data[0].wzlj!=''){
        that.setData({
          wzlj:res.data[0].wzlj,
        })
      }else{
      } 
      }
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