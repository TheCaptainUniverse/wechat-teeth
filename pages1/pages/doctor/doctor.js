// pages/pages1/doctor/doctor.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gz:'',
    gztp:'',
    ID:'',
    imgList:'',
    hospital:'',
    name:'',
    skill:'',
    ysopenid:'',
    jj:'',
    yspj:'',
    zw:'',
    hpl:'',
    hps:'',
    yyrs:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options.ID)
    that.setData({
      ID:options.ID
    })
    console.log(app.globalData.openid)
    wx.request({
      url: 'https://messi10zlj.xyz/tooth/ys.php',
      data: {
        ID:options.ID,
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
      url: 'https://messi10zlj.xyz/tooth/ysxx.php',
      data: {
        ID:options.ID,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data)
        console.log(res.data[0].hospital)
        console.log(res.data[0].imgList)
        that.setData({
          imgList:res.data[0].imgList,
          hospital:res.data[0].hospital,
          name:res.data[0].name,
          skill:res.data[0].skill,
          ysopenid:res.data[0].openid,
          hps:res.data[0].hps,
          hpl:res.data[0].hpl,
          yyrs:res.data[0].yyrs,
          jj:res.data[0].jj,
          zw:res.data[0].zw,
        })
        console.log(that.data.ysopenid)
        that.pl();
      }
    })   
    
    
  },
  pl(){
    var that = this;
    console.log(that.data.ysopenid)
    wx.request({
      url: 'https://messi10zlj.xyz/tooth/yspjpl.php',
      data: {
        openid:that.data.ysopenid,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
      console.log(res.data)
      that.setData({
        yspj:res.data
      })
       console.log(that.data.yspj)
       
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
          wx.request({
            url: 'https://messi10zlj.xyz/tooth/doctor.php',
            data: {
              ID:that.data.ID,
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
            wx.request({
              url: 'https://messi10zlj.xyz/tooth/qxdoctor.php',
              data: {
                openid:that.data.ysopenid
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
    console.log(that.data.ysopenid)
    console.log(that.data.skill)
    console.log(that.data.hospital)
    console.log(that.data.imgList)
    console.log(that.data.name)
    console.log(app.globalData.openid)
    wx.showModal({
      title: '提示',
      content: '是否预约',
      success (res) {
        if (res.confirm) {
          wx.request({
            url: 'https://messi10zlj.xyz/tooth/yyue.php',
            data: {
              openid1:that.data.ysopenid,
              openid2:app.globalData.openid,
              skill:that.data.skill,
              hospital:that.data.hospital,
              imgList:that.data.imgList,
              name:that.data.name,
              avatarurl:app.globalData.avatarUrl,
              xsname:app.globalData.nickName,
              jj:that.data.jj,
              zw:that.data.zw,
              hpl:that.data.hpl,
              hps:that.data.hps,
              yyrs:that.data.yyrs,
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