// pages/pages1/mygz/mygz.js

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
    gz:'',
    page:1,
    hasMore:true,
    pagesize:6,
    dataILu :false,
    good:'97%',
    num:'355',
    talk:'86'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.fyjz();
  },

  fyjz:function(){
    var that = this;
  
    wx.request({
      url: 'https://messi10zlj.xyz/tooth/mygz.php',	
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
        var gza = that.data.gz;
        if (res.data.length > 0) {
          if (that.data.page == 1) {
            gza = []
          }
          var gzs = res.data;
          if (gzs.length < that.data.pagesize) {
            that.setData({
              gz: gza.concat(gzs),
              hasMore: false,
              dataILu: false,
            })
            console.log(that.data.gz)
          } else {
            that.setData({
              gz: gza.concat(gzs),
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
  qxgz(e){
    var that = this;
    console.log(e.currentTarget.dataset)
    that.setData({
      index:e.currentTarget.dataset
    })
    console.log(that.data.index)
    console.log(that.data.gz)
    console.log(that.data.gz[that.data.index.index].openid2)
    wx.showModal({
      title: '提示',
      content: '是否取消关注',
      success (res) {
        if (res.confirm) {
          wx.request({
            url: 'https://messi10zlj.xyz/tooth/qxdoctor.php',
            data: {
              openid:that.data.gz[that.data.index.index].openid2
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
  yy(e){
    var that = this;
    console.log(e.currentTarget.dataset)
    that.setData({
      index:e.currentTarget.dataset
    })
    console.log(that.data.index)
    console.log(that.data.gz)
    console.log(that.data.gz[0].ID)
    wx.showModal({
      title: '提示',
      content: '是否预约',
      success (res) {
        if (res.confirm) {
          wx.request({
            url: 'https://messi10zlj.xyz/tooth/yyue.php',
            data: {
              openid1:that.data.gz[0].openid2,
              openid2:that.data.gz[0].openid1,
              skill:that.data.gz[0].skill,
              hospital:that.data.gz[0].hospital,
              imgList:that.data.gz[0].imgList,
              name:that.data.gz[0].ysname,
              avatarurl:app.globalData.avatarUrl,
              xsname:app.globalData.nickName,
              jj:that.data.gz[0].jj,
              zw:that.data.gz[0].zw,
              hpl:that.data.gz[0].hpl,
              hps:that.data.gz[0].hps,
              yyrs:that.data.gz[0].yyrs,
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
        gz:res.data,
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