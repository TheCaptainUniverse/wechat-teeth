// pages1/pages/bllb/bllb.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    knbl:'',
    xx:false,
  },
  fh(){
    wx.navigateBack({
      delta: 1,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.ID)
    var that = this;
    that.setData({
      ID:options.ID
    })
    wx.request({
      url: 'https://messi10zlj.xyz/tooth/blxqbg.php',
      data: {
        ID:that.data.ID
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
      console.log(res.data)
      if(res.data!=0&&res.data!=null){
        wx.request({
          url: 'https://messi10zlj.xyz/tooth/gjc.php',
          data: {
            gjc:res.data,
            ID:that.data.ID
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
          console.log(res.data)
          if(res.data!=1){
            that.setData({
              knbl:res.data
            })
          }else{
            that.setData({
              xx:true,
            })
          } 
          }
    
        })
      }else{
        that.setData({
          xx:true,
        })
      } 
      
      }

    })
  },
  ck(e){
    var that = this;
    console.log(e.currentTarget.dataset)
    that.setData({
      index:e.currentTarget.dataset
    })
    console.log(that.data.index)
    console.log(that.data.knbl[that.data.index.index].ID)
    wx.navigateTo({
      url: '../blxqbg/blxqbg?ID='+that.data.knbl[that.data.index.index].ID+'&zjID='+that.data.ID
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