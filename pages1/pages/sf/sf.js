// pages1/sf/sf.js
const app = getApp();
const API = app.globalData.requestHeader;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    identity:'',
    imgList:'',
    sfxx: [{
      id: 1,
      name: '学生',
  }, {
      id: 2,
      name: '医生'
  }],
  sf: '学生',
  
  },
  handlesfChange(e) {
    this.setData({
        sf: e.detail.value
    });
    if(e.detail.value=='学生'){
      this.setData({
        identity : 1
      })
      // app.globalData.sfpd=1
    }else if(e.detail.value=='医生'){
      // app.globalData.sfpd=2
      this.setData({
        identity : 2
      })
    }

    console.log(e.detail.value)
    console.log(app.globalData.sfpd)
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
      content: '确定要删除这个图片吗？',
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
  rz: function (e) {
    var that = this;
    console.log(e.detail.value)
    console.log(e.detail.value.username)
    console.log(e.detail.value.phone)
    console.log(e.detail.value.email)
    console.log(e.detail.value.work)
    console.log(e.detail.value.jj)
    console.log(e.detail.value.skill)
    console.log(e.detail.value.zw)
    console.log(app.globalData.sf)
    console.log(that.data.imgList)
    if(e.detail.value.username!=''&&e.detail.value.phone!=''&&e.detail.value.email!=''&&e.detail.value.work!=''&&e.detail.value.jj!=''&&e.detail.value.skill!=''&&e.detail.value.zw!=''){
      if(/^[\u4e00-\u9fa5]+$/.test(e.detail.value.username)){
        if(/^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\d{8}$/.test(e.detail.value.phone)){
          if(/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(e.detail.value.email)){
            console.log(app.globalData.openid)
            wx.showModal({
              title: '提示',
              content: '是否认证',
              success (res) {
                if (res.confirm) {
                  wx.uploadFile({
                    url:API+'/verification/insertEmpowerInfo',
                    // url: 'https://messi10zlj.xyz/tooth/sfrz.php',
                    filePath: that.data.imgList[0],
                    name: 'image',
                    formData: {
                      openid: app.globalData.openid,
                      name:e.detail.value.username,
                      phone:e.detail.value.phone,
                      email:e.detail.value.email,
                      workPlace:e.detail.value.work,
                      position:e.detail.value.zw,
                      introduction:e.detail.value.jj,
                      skill:e.detail.value.skill,
                      city:app.globalData.txcity,
                      province:app.globalData.txprovince,
                      country:app.globalData.txcountry,
                      identityJudge:app.globalData.identityJudge,
                      identity:that.data.identity
                    },
                    header: {
                      "Content-Type": "multipart/form-data"
                    },
                    success: function (res) {
                     
                      //服务器返回格式: { "Catalog": "testFolder", "FileName": "1.jpg", "Url": "https://test.com/1.jpg" }
                      console.log(res.data);
                      if(res.data==1){
                        wx.navigateBack({
                          delta: 1,
                        })
                      }else{
                        wx.showToast({
                          title: "认证出错！",
                          icon: 'none',
                          duration: 2000
                        })
                      }
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
            
          }else{
            wx.showToast({
              title: "电子邮箱有误！",
              icon: 'none',
              duration: 2000
            })
          }
        }else{
          wx.showToast({
            title: "联系电话有误！",
            icon: 'none',
            duration: 2000
          })
        }
      }else{
        wx.showToast({
          title: "姓名只能输入中文！",
          icon: 'none',
          duration: 2000
        })
      }
    }else{
      wx.showToast({
        title: "信息不能为空！",
        icon: 'none',
        duration: 2000
      })
    }
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