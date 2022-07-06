// pages/pages1/blxqbg/blxqbg.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ID:'',
    photo:'',
    describe1:'',
    problem:'',
    ywxq:'',
    wu:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.ID)
    console.log(options.zjID)
    var that = this;
    that.setData({
      ID:options.ID,
      zjID:options.zjID,
    })
    wx.request({
      url: 'https://messi10zlj.xyz/tooth/blxqbg1.php',
      data: {
        ID:that.data.ID,
        zjID:that.data.zjID,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
      console.log(res.data)
      if(res.data!=0){
        that.setData({
          photo:res.data[0].photo,
          describe1:res.data[0].describe1,
          problem:res.data[0].problem,
          time:res.data[0].time,
          imgList:res.data[0].imgList,
          bname:res.data[0].bname,
          zljy:res.data[0].zljy,
          ywxq:true,
          wu:false,
        })
        console.log(that.data.photo)
        console.log(that.data.imgList)
      }else{
        that.setData({
          ywxq:false,
          wu:true,
        })
      }
      
      
      
       
      }

    })
  },
  fh(){
    wx.navigateBack({
      delta: 1,
    })
  },
  clickImg1: function(e){
    var imgUrl = this.data.imgList;
    wx.previewImage({
      urls: [imgUrl],
      current:'',
      
      success: function(res){
        console.log(imgUrl);
        console.log(res);
      },
      fail: function(res){
        console.log(res);
      },
      complete: function(res){
        console.log(res);
      }
    })
  },
  clickImg2: function(e){
    var imgUrl = this.data.photo;
    wx.previewImage({
      urls: [imgUrl],
      current:'',
      
      success: function(res){
        console.log(imgUrl);
        console.log(res);
      },
      fail: function(res){
        console.log(res);
      },
      complete: function(res){
        console.log(res);
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