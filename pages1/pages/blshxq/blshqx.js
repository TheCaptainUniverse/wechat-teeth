// pages2/blshxq/blshqx.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ID:'',
    name:'',
    nr:'',
    imgList:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.ID)
    var that = this;
    that.setData({
      ID:options.ID,
    })
    wx.request({
      url: 'https://messi10zlj.xyz/tooth/blshxq.php',
      data: {
        ID:that.data.ID,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
      console.log(res.data)
      that.setData({
        name:res.data[0].name,
        nr:res.data[0].nr,
        imgList:res.data[0].imgList,
      })
      }
    })
  },
  bhg(){
    var that = this;
    wx.showModal({
      title: '提示',
      content: '是否不予通过',
      success (res) {
        if (res.confirm) {
          wx.request({
            url: 'https://messi10zlj.xyz/tooth/bhg.php',
            data: {
              ID:that.data.ID,
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
            console.log(res.data)
            wx.navigateBack({
              delta: 2,
            })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
  },
  hg(){
    var that = this;
    wx.showModal({
      title: '提示',
      content: '是否给予通过',
      success (res) {
        if (res.confirm) {
          wx.request({
            url: 'https://messi10zlj.xyz/tooth/hg.php',
            data: {
              ID:that.data.ID,
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
            console.log(res.data)
            wx.request({
              url: 'https://messi10zlj.xyz/tooth/ysshsccheck.php',
              data: {
                openid:app.globalData.openid,
                photo:that.data.imgList,
                bname:that.data.name,
                describe1:that.data.nr,
                zljy:that.data.zljy,
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              success: function (res) {
              console.log(res.data)
              if(res.data==1){
                wx.showToast({
                  title: '审核成功',
                  icon: 'success',
                  duration: 1000,
                  mask: true,
                  success: function() {
                    setTimeout(function() {
                      //要延时执行的代码
                      wx.navigateBack({
                        delta: 2,
                      })
                    }, 1000) //延迟时间
                  },
                });      
              }
              }
            })
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