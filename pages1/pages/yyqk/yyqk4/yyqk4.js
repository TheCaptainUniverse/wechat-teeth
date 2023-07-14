// pages/pages1/yyqk/yyqk4/yyqk4.js
var app = getApp();
const API = app.globalData.requestHeader;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    doctorImgUrl:'',
    name:'',
    skill:'',
    hospital:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    console.log(options.ID);
    wx.request({
      method:'GET',
      url:API+'/appointment/getAppointmentById',
      // url: 'https://messi10zlj.xyz/tooth/yyqk.php',
      data: {
        id: options.id,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
      console.log(res.data)
      that.setData({
        doctorImgUrl:res.data.doctorImgUrl,
        name:res.data.ysname,
        skill:res.data.skill,
        hospital:res.data.hospital,
        positiveReviewRate:res.data.positiveReviewRate,
        introduction:res.data.introduction,
        position:res.data.position,
        positiveReviewNumber:res.data.positiveReviewNumber,
        appointmentCount:res.data.appointmentCount,
      })
      }

    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  cxyy(){
    var that = this;
    console.log(that.data.ysopenid)
    wx.showModal({
      title: '提示',
      content: '是否重新预约',
      success (res) {
        if (res.confirm) {
          wx.request({
            //@PostMapping("/updateAppointmentStatusById")
            method:'POST',
            url:API+'/appointment/updateAppointmentStatusByIdAndStatus',
            data: {
              id: that.options.id,
              status:1
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              console.log(res.data)
              wx.redirectTo({
                url: '../../logs/logs',
              })
            }
          })  
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
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