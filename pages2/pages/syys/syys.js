// pages2/syys/syys.js
const app = getApp();
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
      //@GetMapping("/getAppointmentByOpenidAndStatusAndPageAndCount")
      method:'GET',
      url:API+'/appointment/getAppointmentByOpenidAndStatusAndPageAndCount',
      // url: 'https://messi10zlj.xyz/tooth/yykbsq.php',	
      data: {
        openid:app.globalData.openid,
        page: that.data.page,
        count: that.data.pagesize ,
        status:1
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
    console.log(that.data.yykb[that.data.index.index].id)
    wx.showModal({
      title: '提示',
      content: '是否通过预约申请',
      success (res) {
        if (res.confirm) {
          wx.request({
            //@PostMapping("/updateAppointmentStatusByIdAndStatus")
            method:'POST',
            url:API+'/appointment/updateAppointmentStatusByIdAndStatus',
            // url: 'https://messi10zlj.xyz/tooth/tgyyue.php',
            data: {
              id:that.data.yykb[that.data.index.index].id,
              status:2
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
})