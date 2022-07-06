// pages1/pages/ltfb/ltfb.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgList:'',
  },
  ChooseImage() {
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
          console.log(this.data.imgList)
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
          console.log(this.data.imgList)
        }
        console.log(this.data.imgList)
      }
     
    });
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    wx.showModal({
      content: '确定要删除这张照片吗？',
      cancelText: '再看看',
      confirmText: '再见',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
  fbxz: function (e) {
    var that = this;
    console.log(app.globalData.openid)
    console.log(app.globalData.avatarUrl)
    console.log(app.globalData.nickName)
    console.log(e.detail.value.title)
    console.log(e.detail.value.nr)
    console.log(that.data.imgList)
    wx.showModal({
      title: '提示',
      content: '是否发帖',
      success (res) {
        if (res.confirm) {
          wx.uploadFile({
            url: 'https://messi10zlj.xyz/tooth/fbtz.php',
            filePath: that.data.imgList[0],
            name: 'file',
            formData: {
              openid:app.globalData.openid,
              avatarUrl:app.globalData.avatarUrl,
              nickName:app.globalData.nickName,
              title:e.detail.value.title,
              nr:e.detail.value.nr,
            },
            header: {
              "Content-Type": "multipart/form-data"
            },
            success: function (res) {
              console.log(res.data);
              wx.showToast({
                title: '上传成功',
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
              //服务器返回格式: { "Catalog": "testFolder", "FileName": "1.jpg", "Url": "https://test.com/1.jpg" }
              console.log(res.data);
            },
            fail: function (res) {
              wx.hideToast();
              wx.showModal({
                title: '错误提示',
                content: '上传图片失败',
                showCancel: false,
                success: function (res) { }
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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