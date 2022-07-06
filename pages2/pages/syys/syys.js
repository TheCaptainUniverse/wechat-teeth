// pages2/syys/syys.js
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
    yykb:'',
    page:1,
    hasMore:true,
    pagesize:8,
    dataILu : false,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.fyjz();
  },
  fyjz:function(){
    var that = this;
	  wx.request({
      url: 'https://messi10zlj.xyz/tooth/yykbsq.php',	
      data: {
        openid:app.globalData.openid,
        page: that.data.page,
        count: that.data.pagesize 
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data)
        var yykba = that.data.yykb;
        if (res.data.length > 0) {
          if (that.data.page == 1) {
            yykba = []
          }
          var yykbs = res.data;
          if (yykbs.length < that.data.pagesize) {
            that.setData({
              yykb: yykba.concat(yykbs),
              hasMore: false,
              dataILu: false,
            })
            console.log(that.data.yykb)
          } else {
            that.setData({
              yykb: yykba.concat(yykbs),
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
  xkb(e){
    var that = this;
    console.log(e.currentTarget.dataset)
    that.setData({
      index:e.currentTarget.dataset
    })
    console.log(that.data.index)
    console.log(that.data.yykb[that.data.index.index].ID)
    wx.showModal({
      title: '提示',
      content: '是否通过预约申请',
      success (res) {
        if (res.confirm) {
          wx.request({
            url: 'https://messi10zlj.xyz/tooth/tgyyue.php',
            data: {
              ID:that.data.yykb[that.data.index.index].ID,
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
            console.log(res.data)
             wx.navigateBack({
               delta: 1,
             })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  wdzx(){
    wx.navigateTo({
      url: '/chat/pages/zjlxr/zjlxr',
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