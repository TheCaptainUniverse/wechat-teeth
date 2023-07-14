// pages1/pages/ltpl/ltpl.js
var app = getApp();
const API = app.globalData.requestHeader;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    title:'',
    content:'',
    nickName:'',
    avatarUrl:'',
    time:'',
    pciUrl:'',
    comment:'',
    page:1,
    hasMore:true,
    pagesize:10,
    dataILu : false,
    dz:"../../../images/dz.png",
    x:0,
    wz:'赞',
  },
  dz(){
    var that = this;
    if(that.data.x==0){
      wx.request({
        //@PostMapping("/insertLikeByOpenidAndInvitation")
        method:'POST',
        url:API+'/content/insertLikeByOpenidAndInvitation',
        // url: 'https://messi10zlj.xyz/tooth/dz.php',
        data: {
          openid:app.globalData.openid,
          invitation:that.data.id,
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
        //deleteLikeInfoByOpenidAndJudge

      method:'POST',
      url:API+'/content/deleteLikeInfoByOpenidAndJudge',
        // url: 'https://messi10zlj.xyz/tooth/qxdz.php',
        data: {
          openid:app.globalData.openid,
          invitation:that.data.id,
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
    console.log(options.id)
    var that = this;
    that.setData({
      id:options.id,
      title:options.title,
      content:options.content,
      nickName:options.nickName,
      avatarUrl:options.avatarUrl,
      time:options.time,
      picUrl:options.picUrl,
    })
    wx.request({
      // @PostMapping("/checkLikeByOpenidAndInvitation")
      method:'POST',
      url:API+'/content/checkLikeByOpenidAndInvitation',
      // url: 'https://messi10zlj.xyz/tooth/ckdz.php',
      data: {
        openid:app.globalData.openid,
        invitation:that.data.id,
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
      //@GetMapping("/findCommentByJudgeAndPageAndCount")
      method:'GET',
      url:API+'/content/findCommentByJudgeAndPageAndCount',
      // url: 'https://messi10zlj.xyz/tooth/pl.php',	
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
        var pla = that.data.comment;
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
            console.log(that.data.comment)
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
    console.log(app.globalData.name)
    console.log(app.globalData.avatarUrl)
    console.log(that.data.id)
    wx.showModal({
      title: '提示',
      content: '是否评论',
      success (res) {
        if (res.confirm) {
          console.log(e.detail.value)
          wx.request({
            //@PostMapping("/insertComment")
            method:'POST',
            url:API+'/content/insertComment',
            // url: 'https://messi10zlj.xyz/tooth/xpl.php',
            data: {
              judge:that.data.id,
              nickName:app.globalData.name,
              avatarUrl:app.globalData.avatarUrl,
              comment:e.detail.value.pl
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
                that.data.comment = '';
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