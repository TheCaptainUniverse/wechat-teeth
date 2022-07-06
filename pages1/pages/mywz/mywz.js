// pages1/mywz/mywz.js
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
    doctor:'',
    page:1,
    hasMore:true,
    pagesize:6,
    dataILu :false,
    fy:false,
    fyqk:'',
  },
  ysxq(e) {
    var that = this;
    console.log(e.currentTarget.dataset)
    that.setData({
      index:e.currentTarget.dataset
    })
    console.log(that.data.index)
    console.log(that.data.doctor)
    console.log(that.data.doctor[that.data.index.index].ID)
    wx.navigateTo({
      url: '../doctor/doctor?ID='+that.data.doctor[that.data.index.index].ID
     })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(app.globalData.txcity)
    that.fyjz();
  },

  fyjz:function(){
    var that = this;
    console.log(app.globalData.txcity)
    wx.request({
      
      url: 'https://messi10zlj.xyz/tooth/ysxq.php',	
      data: {
        page: that.data.page,
        count: that.data.pagesize,
        openid:app.globalData.openid,
        city:app.globalData.txcity,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          fy:true,
          fyqk:1,
        })
        var doctora = that.data.doctor;
        if (res.data.length > 0) {
          if (that.data.page == 1) {
            doctora = []
          }
          var doctors = res.data;
          if (doctors.length <= that.data.pagesize) {
            that.setData({
              doctor: doctora.concat(doctors),
              hasMore: false,
              dataILu: false,
            })
            console.log(that.data.doctor)
          } else {
            that.setData({
              doctor: doctora.concat(doctors),
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
  fyjz1:function(){
    var that = this;
    console.log(app.globalData.txcity)
    wx.request({
      
      url: 'https://messi10zlj.xyz/tooth/ysxq1.php',	
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
        that.setData({
          fy:false,
          
        })
        var doctora = that.data.doctor;
        if (res.data.length > 0) {
          if (that.data.page == 1) {
            doctora = []
          }
          var doctors = res.data;
          if (doctors.length < that.data.pagesize) {
            that.setData({
              doctor: doctora.concat(doctors),
              hasMore: false,
              dataILu: false,
            })
            console.log(that.data.doctor)
          } else {
            that.setData({
              doctor: doctora.concat(doctors),
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
  onSearch(e){
    var that = this;
    console.log(e.detail)
    wx.request({
      url: 'https://messi10zlj.xyz/tooth/doctorlb.php',
      data: {
        czxx:e.detail,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
      console.log(res.data)
      that.setData({
        doctor:res.data,
        hasMore: false,
        dataILu : false,
      })
      
       
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
    console.log(this.data.fyqk);
    if (this.data.hasMore&&this.data.fyqk==0) {
      this.fyjz('加载更多数据')
      console.log(1);
    }else if(this.data.hasMore&&this.data.fyqk==1){
      this.fyjz1('加载更多数据')
      console.log(2);
    } else {
      console.log(3);
      this.setData({
        dataILu : false,
      })
      wx.showToast({
        title: '没有更多数据',
      })
    }
  },
  onRate(event) {
    this.setData({
      rate: event.detail,
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})