// pages/pages1/doctor/doctor.js
var app = getApp();
const API = app.globalData.requestHeader;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gz:'',
    gztp:'',
    id:'',
    imgUrl:'',
    hospital:'',
    name:'',
    skill:'',
    doctorOpenid:'',
    introduction:'',
    tags:'',
    position:'',
    positiveReviewRate:'',
    positiveReviewNumber:'',
    appointmentCount:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options.id)
    that.setData({
      id:options.id
    })
    console.log(app.globalData.openid)
    wx.request({
      //@PostMapping("/checkSubscribeByIdAndOpenid")
      method:'POST',
      url:API+'/user/checkSubscribeByIdAndOpenid',
      // url: 'https://messi10zlj.xyz/tooth/ys.php',
      data: {
        id:options.id,
        openid:app.globalData.openid,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data)
        if(res.data==1){
          that.setData({
            gz:'取消关注',
            gztp:'../../../images/gz2.png'
          })
        }else if(res.data==2){
          that.setData({
            gz:'关注',
            gztp:'../../../images/gz1.png'
          })
        }
      }
    })
    wx.request({
      // @GetMapping("/findDoctorById")
      method:'GET',
      url:API+'/medicalService/findDoctorById',
      // url: 'https://messi10zlj.xyz/tooth/ysxx.php',
      data: {
        id:options.id,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data)
        console.log(res.data.hospital)
        console.log(res.data.imgUrl)
        that.setData({
          imgUrl:res.data.imgUrl,
          hospital:res.data.hospital,
          name:res.data.name,
          skill:res.data.skill,
          doctorOpenid:res.data.openid,
          positiveReviewNumber:res.data.positiveReviewNumber,
          positiveReviewRate:res.data.positiveReviewRate,
          appointmentCount:res.data.appointmentCount,
          introduction:res.data.introduction,
          position:res.data.position,
        })
        console.log(that.data.doctorOpenid)
        that.pl();
      }
    })   
    
    
  },
  pl(){
    var that = this;
    console.log(that.data.doctorOpenid)
    wx.request({

      // @GetMapping("/findDoctorScoreByOpenid")
      method:'GET',
      url:API+'/medicalService/findDoctorScoreByOpenid',
      // url: 'https://messi10zlj.xyz/tooth/yspjpl.php',
      data: {
        openid:that.data.doctorOpenid,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
      console.log(res)
      that.setData({
        tags:res.data
      })
       console.log(that.data.tags)
       
      }

    })
  },
  zy(){
    wx.navigateBack({
      delta: 2,
      success: (res) => {},
      fail: (res) => {},
      complete: (res) => {},
    })
  },
  gz(){
   var that = this;
   console.log(that.data.ysopenid)
   if(that.data.gz=='关注'){
    wx.showModal({
      title: '提示',
      content: '是否关注',
      success (res) {
        if (res.confirm) {
          // /@PostMapping("/insertSubscribeByIdAndOpenid")
          wx.request({
            method:'POST',
            url:API+'/user/insertSubscribeByIdAndOpenid',
            // url: 'https://messi10zlj.xyz/tooth/doctor.php',
            data: {
              id:that.data.id,
              openid:app.globalData.openid
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              console.log(res.data)
              wx.navigateBack({
                delta: 1,
                success: (res) => {},
                fail: (res) => {},
                complete: (res) => {},
              })
            }
          }) 
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
        
    }else if(that.data.gz=='取消关注'){
      console.log(that.data.ysopenid)
      wx.showModal({
        title: '提示',
        content: '是否取消关注',
        success (res) {
          if (res.confirm) {
            //@GetMapping("/findSubscribeByOpenid")

            wx.request({
              method:'POST',
              url:API+'/user/deleteSubscribeByOpenidAndDoctorOpenid',
              // url: 'https://messi10zlj.xyz/tooth/qxdoctor.php',
              data: {
                openid:app.globalData.openid,
                doctorOpenid:that.data.doctorOpenid
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              success: function (res) {
                console.log(res.data)
                wx.navigateBack({
                  delta: 1,
                  success: (res) => {},
                  fail: (res) => {},
                  complete: (res) => {},
                })
              }
            }) 
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      
    }
  },
  yyue(){
    var that = this;
    console.log(that.data.doctorOpenid)
    console.log(that.data.skill)
    console.log(that.data.hospital)
    console.log(that.data.imgUrl)
    console.log(that.data.name)
    console.log(app.globalData.openid)
    wx.showModal({
      title: '提示',
      content: '是否预约',
      success (res) {
        if (res.confirm) {
          wx.request({
            //@PostMapping("/checkAppointmentAndInsert")
            method:'POST',
            url:API+'/appointment/checkAppointmentAndInsert',
            // url: 'https://messi10zlj.xyz/tooth/yyue.php',
            data: {
              doctorOpenid:that.data.doctorOpenid,
              openid:app.globalData.openid,
              skill:that.data.skill,
              hospital:that.data.hospital,
              doctorImgUrl:that.data.imgUrl,
              name:app.globalData.name,
              imgUrl:app.globalData.avatarUrl,
              doctorName:that.data.name,
              introduction:that.data.introduction,
              position:that.data.position,
              positiveReviewRate:that.data.positiveReviewRate,
              positiveReviewNumber:that.data.positiveReviewNumber,
              appointmentCount:that.data.appointmentCount,
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              console.log(res.data)
              if(res.data==0){
                wx.showModal({
                  title: '有两次以上的预约还未解决',
                  confirmColor: 'red',//确定文字的颜色
                  success: function (res) {
                     if (res.cancel) {
                        //点击取消,默认隐藏弹框
                     } else {
                        //点击确定
                       
                     }
                  },
                  fail: function (res) { },//接口调用失败的回调函数
                  complete: function (res) { },//接口调用结束的回调函数（调用成功、失败都会执行）
               })
              }else{
                wx.showToast({
                  title: '预约成功',//提示文字
                  duration:2000,//显示时长
                  mask:true,//是否显示透明蒙层，防止触摸穿透，默认：false  
                  icon:'success', //图标，支持"success"、"loading"  
                  success:function(){ },//接口调用成功
                  fail: function () { },  //接口调用失败的回调函数  
                  complete: function () { } //接口调用结束的回调函数  
               })
              }
            }
          }) 
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
  },
  onRate(event) {
    this.setData({
      rate: event.detail,
    });
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