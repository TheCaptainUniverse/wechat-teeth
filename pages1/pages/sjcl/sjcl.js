var app = getApp();
Page({
  data: {
    imgList:'',
    br:'',
    bname:'',
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
  onChange(e){
    var that = this;
    console.log(e.detail)
    that.setData({
      nr:e.detail
    })
  },
  onChangebname(e){
    var that = this;
    console.log(e.detail.value)
    that.setData({
      bname:e.detail.value
    })
  },
  onChangezljy(e){
    var that = this;
    console.log(e.detail.value)
    that.setData({
      zljy:e.detail.value
    })
  },
  sc(){
    var that = this;
    console.log(app.globalData.openid)
    console.log(that.data.imgList)
    console.log(that.data.nr)
    wx.showModal({
      title: '提示',
      content: '是否上传病例材料',
      success (res) {
        if (res.confirm) {
          wx.uploadFile({
            url: 'https://messi10zlj.xyz/tooth/sccheck.php',
            filePath: that.data.imgList[0],
            name: 'file',
            formData: {
              openid:app.globalData.openid,
              xsname:app.globalData.nickName,
              avatarurl:app.globalData.avatarUrl,
              nr:that.data.nr,
              bname:that.data.bname,
              zljy:that.data.zljy,
            },
            header: {
              "Content-Type": "multipart/form-data"
            },
            success: function (res) {
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
});