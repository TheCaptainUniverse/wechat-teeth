// pages1/sfsh/sfsh.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ID:'',
    avatarurl:'',
    name:'',
    sfpd:'',
    imgList:'',
    city:'',
    jj:'',
    openid:'',
    skill:'',
    work:'',
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
      url: 'https://messi10zlj.xyz/tooth/sfshxq.php',
      data: {
        ID:that.data.ID,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
      console.log(res.data)
      that.setData({
        avatarurl:res.data[0].avatarurl,
        imgList:res.data[0].imgList,
        name:res.data[0].name,
        sfpd:res.data[0].sfpd,
        city:res.data[0].city,
        jj:res.data[0].jj,
        openid:res.data[0].openid,
        skill:res.data[0].skill,
        work:res.data[0].work,
      })
      }
    })
  },
  jjsq(){
    var that = this;
    wx.showModal({
      title: '提示',
      content: '是否拒绝申请',
      success (res) {
        if (res.confirm) {
          wx.request({
            url: 'https://messi10zlj.xyz/tooth/jjsq.php',
            data: {
              ID:that.data.ID,
              sf:that.data.sfpd,
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
  tysq(){
    var that = this;
    wx.showModal({
      title: '提示',
      content: '是否同意申请',
      success (res) {
        if (res.confirm) {
          wx.request({
            url: 'https://messi10zlj.xyz/tooth/tysq.php',
            data: {
              ID:that.data.ID,
              sf:that.data.sfpd,
              avatarurl:that.data.avatarurl,
              city:that.data.city,
              jj:that.data.jj,
              name:that.data.name,
              openid:that.data.openid,
              skill:that.data.skill,
              work:that.data.work,
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