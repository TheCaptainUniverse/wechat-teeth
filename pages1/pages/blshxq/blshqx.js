// pages2/blshxq/blshqx.js
const app = getApp()
const API = app.globalData.requestHeader
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    name:'',
    problem:'',
    imgUrl:'',
    advice:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    var that = this;
    that.setData({
      id:options.id,
    })
    wx.request({
      //@GetMapping("/findStudentUploadReportById")
      method:'GET',
      url:API+'/medicalService/findStudentUploadReportById',
      // url: 'https://messi10zlj.xyz/tooth/blshxq.php',
      data: {
        id:that.data.id,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
      console.log(res.data)
      that.setData({
        name:res.data.name,
        problem:res.data.problem,
        imgUrl:res.data.imgUrl,
        advice:res.data.advice
      })
      }
    })
  },
  bhg(){
    var that = this;
    wx.showModal({
      title: '提示',
      content: '是否不予通过',
      success (res) {
        if (res.confirm) {
          wx.request({
            //@PostMapping("/updateStudentUploadReportByIdAndStatus")
            method:'POST',
            url:API+'/medicalService/updateStudentUploadReportByIdAndStatus',
            // url: 'https://messi10zlj.xyz/tooth/bhg.php',
            data: {
              id:that.data.id,
              status:2
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
            console.log(res.data)
            wx.navigateBack({
              delta: 2,
            })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
  },
  hg(){
    var that = this;
    wx.showModal({
      title: '提示',
      content: '是否给予通过',
      success (res) {
        if (res.confirm) {
          wx.request({
            method:'POST',
            url:API+'/medicalService/updateStudentUploadReportByIdAndStatus',
            // url: 'https://messi10zlj.xyz/tooth/bhg.php',
            data: {
              id:that.data.id,
              status:1
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
            console.log(res.data)
            wx.request({
              //insertDisease
              method:'POST',
              url:API+'/medicalService/insertDisease',
              // url: 'https://messi10zlj.xyz/tooth/ysshsccheck.php',
              data: {
                openid:app.globalData.openid,
                photo:that.data.imgUrl,
                bname:that.data.name,
                describe:that.data.problem,
                advice:that.data.advice,
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              success: function (res) {
              console.log(res.data)
              if(res.data==1){
                wx.showToast({
                  title: '审核成功',
                  icon: 'success',
                  duration: 1000,
                  mask: true,
                  success: function() {
                    setTimeout(function() {
                      //要延时执行的代码
                      wx.navigateBack({
                        delta: 2,
                      })
                    }, 1000) //延迟时间
                  },
                });      
              }
              }
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