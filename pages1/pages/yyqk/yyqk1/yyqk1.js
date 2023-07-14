// pages/pages1/yyqk/yyqk1/yyqk1.js
var app = getApp();
const API = app.globalData.requestHeader;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    doctorImgUrl:'',
    doctorName:'',
    skill:'',
    hospital:'',
    introduction:'',
    id:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    console.log(options.id);
    that.setData({
      id:options.id,
    })
    wx.request({
      //@GetMapping("/getAppointmentById")
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
  qxyy(){
    var that = this;
    console.log(that.data.id)
    wx.showModal({
      title: '提示',
      content: '是否取消预约',
      success (res) {
        if (res.confirm) {
          wx.request({
            //@PostMapping("/updateAppointmentStatusByIdAndStatus")
            method:'POST',
            url:API+'/appointment/updateAppointmentStatusByIdAndStatus',
            // url: 'https://messi10zlj.xyz/tooth/qxyy.php',
            data: {
              id: that.data.id,
              status:4
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