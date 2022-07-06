// pages1/pages/wdfbtz/wdfbtz.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:'',
    ltlb:'',
    page:1,
    hasMore:true,
    pagesize:6,
    dataILu : false,
  },
  onClose(event) {
    const { position, instance } = event.detail;
    console.log(event.currentTarget.id)
    switch (position) {
      case 'cell':
        instance.close();
        break;
      case 'right':
        wx.showModal({
          title: '提示',
          content: '确定要删除吗？',
          success: function (sm) {
            if (sm.confirm) {
              wx.request({
                url: 'https://messi10zlj.xyz/tooth/sctz.php',
                data: {
                  ID:event.currentTarget.id,
                },
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                success: function (res) {
                console.log(res.data)
                wx.showToast({
                  title: '删除成功',
                  icon: 'success',
                  duration: 1000,
                  mask: true,
                  success: function() {
                    setTimeout(function() {
                      //要延时执行的代码
                      wx.navigateBack({
                        delta: 1
                      })
                    }, 1000) //延迟时间
                  },
                });
                }
              })
                // 用户点击了确定 可以调用删除方法了
              } else if (sm.cancel) {
                instance.close();
              }
            }
          });
        break;
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.fyjz();
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

  fyjz:function(){
    var that = this;
    console.log(app.globalData.openid)
	  wx.request({
      url: 'https://messi10zlj.xyz/tooth/wdqbtz.php',	
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
        var ltlba = that.data.ltlb;
        if (res.data.length > 0) {
          if (that.data.page == 1) {
            ltlba = []
          }
          var ltlbs = res.data;
          if (ltlbs.length <= that.data.pagesize) {
            that.setData({
              ltlb: ltlba.concat(ltlbs),
              hasMore: false,
              dataILu: false,
            })
            console.log(that.data.ltlb)
            console.log(that.data.ltlb[0].imgList)
          } else {
            that.setData({
              ltlb: ltlba.concat(ltlbs),
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
  ltxq(e){
    var that = this;
    console.log(e.currentTarget.dataset)
    that.setData({
      index:e.currentTarget.dataset
    })
    console.log(that.data.index)
    console.log(that.data.ltlb[that.data.index.index])
    console.log(that.data.ltlb[that.data.index.index].ID)
    wx.navigateTo({
      url: '../ltpl/ltpl?ID='+that.data.ltlb[that.data.index.index].ID+'&avatarUrl='+that.data.ltlb[that.data.index.index].avatarUrl+'&imgList='+that.data.ltlb[that.data.index.index].imgList+'&nickName='+that.data.ltlb[that.data.index.index].nickName+'&nr='+that.data.ltlb[that.data.index.index].nr+'&title='+that.data.ltlb[that.data.index.index].title+'&time='+that.data.ltlb[that.data.index.index].time
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