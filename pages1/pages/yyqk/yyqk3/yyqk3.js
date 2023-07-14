// pages/pages1/yyqk/yyqk3/yyqk3.js
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
    introduction:'',
    id:'',
    userID: '',
    doctorOpenid:'',
    index:'',
    item:'0',
    pl:'',
    page:1,
    hasMore:true,
    pagesize:5,
    dataILu : false,
  },
  rate(event) {
    this.setData({
      item: event.detail,
    });
  },
  qrpj(){
    var that = this;
    console.log(that.data.item)
    console.log(that.data.openid)
    wx.request({
      //@PostMapping("/updateDoctorRaterNumberByOpenidAndScoreAndAvatarUrl")
      method:'POST',
      url:API+'/medicalService/updateDoctorRaterNumberByOpenidAndScoreAndAvatarUrl',
      // url: 'https://messi10zlj.xyz/tooth/yspf.php',
      data: {
        openid: app.globalData.openid,
        score:that.data.item,
        avatarUrl:app.globalData.avatarUrl,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
      console.log(res.data)
      if(res.data=='执行成功'){
        wx.showToast({
          title: '评价成功',
          icon:"success",
        },2000)
      }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    console.log(options.id);
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
      console.log(res.data.imgList)
      console.log(res.data.id)
      console.log(res.data.ysopenid)
      that.setData({
        doctorImgUrl:res.data.doctorImgUrl,
        name:res.data.doctorName,
        skill:res.data.skill,
        hospital:res.data.hospital,
        positiveReviewRate:res.data.positiveReviewRate,
        introduction:res.data.introduction,
        position:res.data.position,
        positiveReviewNumber:res.data.positiveReviewNumber,
        appointmentCount:res.data.appointmentCount,
        id:res.data.id,
        doctorOpenid:res.data.doctorOpenid,
      })
      console.log(that.data.id)
      that.fyjz();
      }

    })
    
  },
  fyjz:function(){
    var that = this;
    console.log(that.data.id)
	  wx.request({
      //
// @GetMapping("/findAfterConsultationByJudgeAndPageAndCount")
method:'GET',
url:API+'/content/findAfterConsultationByJudgeAndPageAndCount',
      // url: 'https://messi10zlj.xyz/tooth/zxpl.php',	
      data: {
        page: that.data.page,
        count: that.data.pagesize,
        judge:that.data.id,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data)
        var pla = that.data.pl;
        if (res.data.length > 0) {
          if (that.data.page == 1) {
            pla = []
          }
          var pls = res.data;
          if (pls.length <= that.data.pagesize) {
            that.setData({
              pl: pla.concat(pls),
              hasMore: false,
              dataILu: false,
            })
            console.log(that.data.pl)
          } else {
            that.setData({
              pl: pla.concat(pls),
              hasMore: true,
              dataILu: true,
              page: that.data.page + 1
            })
          }
        }else{
          that.setData({
            dataILu: false,
          })
        }
      },
      fail: function (res) {
        
      },
      complete: function (res) {
      
      },
    })
  },
  pl: function (e) {
    var that = this;
    console.log(e.detail.value.pl)
    console.log(app.globalData.nickName)
    console.log(app.globalData.avatarUrl)
    console.log(that.data.id)
    wx.showModal({
      title: '提示',
      content: '是否评论',
      success (res) {
        if (res.confirm) {
          wx.request({
            //@PostMapping("/insertAfterConsultation")
            method:'POST',
            url:API+'/content/insertAfterConsultation',
            // url: 'https://messi10zlj.xyz/tooth/xzxpl.php',
            data: {
              judge:that.data.id,
              name:app.globalData.name,
              avatarUrl:app.globalData.avatarUrl,
              comment:e.detail.value.pl,
              doctorOpenid:that.data.doctorOpenid,
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
            console.log(res.data)
            wx.showToast({
              title: '评论成功',
              icon: 'success',
              duration: 1000,
              mask: true,
              success: function() {
                that.data.pl = '';
                that.fyjz();
              },
            });
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