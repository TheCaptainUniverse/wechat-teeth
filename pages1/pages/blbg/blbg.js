// pages/pages1/blbg/blbg.js
var app = getApp();
const API = app.globalData.requestHeader;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    value:'',
    show: false,
    index:'',
    blbg:'',
    page:1,
    hasMore:true,
    pagesize:5,
    dataILu : false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.fyjz();
  },
//触底事件
onReachBottom:function(){
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
fyjz:function(){
  var that = this;
 
  wx.request({
    //@GetMapping("/findDiseaseReport")
    method:'GET',
    url:API+'/medicalService/findDiseaseReport',
    // url: 'https://messi10zlj.xyz/tooth/blbgsj.php',	
    data: {
      openid: app.globalData.openid,
      page: that.data.page,
      count: that.data.pagesize 
    },
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    success: function (res) {
      console.log(res.data)
      var blbga = that.data.blbg;
      if (res.data.length > 0) {
        if (that.data.page == 1) {
          blbga = []
        }
        var blbgs = res.data;
        if (blbgs.length < that.data.pagesize) {
          that.setData({
            blbg: blbga.concat(blbgs),
            hasMore: false,
            dataILu: false,
          })
          console.log(that.data.blbg)
        } else {
          that.setData({
            blbg: blbga.concat(blbgs),
            hasMore: true,
            dataILu: true,
            page: that.data.page + 1
          })
        }
      }
      else{
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
  go(e){
    var that = this;
    console.log(e.currentTarget.dataset)
    that.setData({
      index:e.currentTarget.dataset
    })
    console.log(that.data.index)
    console.log(that.data.blbg[that.data.index.index].entity.id)
    wx.navigateTo({
      url: '../bllb/bllb?id='+that.data.blbg[that.data.index.index].entity.id
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})