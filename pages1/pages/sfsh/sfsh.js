// pages1/sfsh/sfsh.js
var app = getApp();
const API = app.globalData.requestHeader;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    avatarUrl:'',
    name:'',
    identityJudge:'',
    identity:'',
    imgUrl:'',
    city:'',
    introduction:'',
    openid:'',
    skill:'',
    workPlace:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    var that = this;
    that.setData({
      id:options.id,
    })
    wx.request({
      //@GetMapping("/findEmpowerInfoById")
      method:'GET',
      url:API+'/verification/findEmpowerInfoById',
      // url: 'https://messi10zlj.xyz/tooth/sfshxq.php',
      data: {
        id:that.data.id,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
      console.log(res.data)
      that.setData({
        avatarUrl:res.data.avatarUrl,
        imgUrl:res.data.imgUrl,
        name:res.data.name,
        identityJudge:res.data.identityJudge,
        city:res.data.city,
        introduction:res.data.introduction,
        openid:res.data.openid,
        skill:res.data.skill,
        workPlace:res.data.workPlace,
        identity:res.data.identity,
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
            //updateEmpowerInfoByIdAndIdentityAndIdentityJudge
            method:'POST',
            url:API+'/verification/updateEmpowerInfoByIdAndIdentityAndIdentityJudge',
            // url: 'https://messi10zlj.xyz/tooth/jjsq.php',
            data: {
              id:that.data.id,
              identityJudge:-1,
              identity:that.data.identity,
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
            method:'POST',
            url:API+'/verification/updateEmpowerInfoByIdAndIdentityAndIdentityJudge',
            // url: 'https://messi10zlj.xyz/tooth/jjsq.php',
            data: {
              id:that.data.id,
              identityJudge:1,
              identity:that.data.identity,
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