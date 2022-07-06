// pages1/pages/ltpl/ltpl.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ID:'',
    title:'',
    nr:'',
    nickName:'',
    avatarUrl:'',
    time:'',
    imgList:'',
    pl:'',
    page:1,
    hasMore:true,
    pagesize:10,
    dataILu : false,
    dz:"../../../images/dz.png",
    x:0,
    wz:'点赞',
  },
  dz(){
    var that = this;
    if(that.data.x==0){
      wx.request({
        url: 'https://messi10zlj.xyz/tooth/dz.php',
        data: {
          openid:app.globalData.openid,
          pd:that.data.ID,
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
        console.log(res.data)
        }
      })
      that.setData({
        x:1,
        dz:'../../../images/dz1.png',
        wz:'取消点赞',
      })
    }else if(that.data.x==1){
      wx.request({
        url: 'https://messi10zlj.xyz/tooth/qxdz.php',
        data: {
          openid:app.globalData.openid,
          pd:that.data.ID,
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
        console.log(res.data)
        }
      })
      that.setData({
        x:0,
        dz:'../../../images/dz.png',
        wz:'点赞',
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    console.log(options.ID)
    var that = this;
    that.setData({
      ID:options.ID,
      title:options.title,
      nr:options.nr,
      nickName:options.nickName,
      avatarUrl:options.avatarUrl,
      time:options.time,
      imgList:options.imgList,
    })
    wx.request({
      url: 'https://messi10zlj.xyz/tooth/ckdz.php',
      data: {
        openid:app.globalData.openid,
        pd:that.data.ID,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
      console.log(res.data)
      if(res.data==1){
        that.setData({
          x:1,
          dz:'../../../images/dz1.png',
          wz:'取消点赞',
        })
      }else if(res.data==2){
        that.setData({
          x:0,
          dz:'../../../images/dz.png',
          wz:'点赞',
        })
      }
      }
    })
    that.fyjz();
  },
  fyjz:function(){
    var that = this;
   
	  wx.request({
      url: 'https://messi10zlj.xyz/tooth/pl.php',	
      data: {
        page: that.data.page,
        count: that.data.pagesize,
        pd:that.data.ID,
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
    console.log(that.data.ID)
    wx.showModal({
      title: '提示',
      content: '是否评论',
      success (res) {
        if (res.confirm) {
          wx.request({
            url: 'https://messi10zlj.xyz/tooth/xpl.php',
            data: {
              pd:that.data.ID,
              nickName:app.globalData.nickName,
              avatarUrl:app.globalData.avatarUrl,
              pl:e.detail.value.pl,
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})