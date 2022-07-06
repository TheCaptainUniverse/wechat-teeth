// pages/pages1/yyqk/yyqk1/yyqk1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgList:'',
    name:'',
    skill:'',
    hospital:'',
    jj:'',
    ID:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    console.log(options.ID);
    that.setData({
      ID:options.ID,
    })
    wx.request({
      url: 'https://messi10zlj.xyz/tooth/yyqk.php',
      data: {
        ID: options.ID,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
      console.log(res.data)
      that.setData({
        imgList:res.data[0].imgList,
        name:res.data[0].ysname,
        skill:res.data[0].skill,
        hospital:res.data[0].hospital,
        hpl:res.data[0].hpl,
        jj:res.data[0].jj,
        zw:res.data[0].zw,
        hps:res.data[0].hps,
        yyrs:res.data[0].yyrs,
      })
      
      }

    })
  },
  qxyy(){
    var that = this;
    console.log(that.data.ID)
    wx.showModal({
      title: '提示',
      content: '是否取消预约',
      success (res) {
        if (res.confirm) {
          wx.request({
            url: 'https://messi10zlj.xyz/tooth/qxyy.php',
            data: {
              ID: that.data.ID,
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
            console.log(res.data)
           
            wx.redirectTo({
              url: '../../logs/logs',
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