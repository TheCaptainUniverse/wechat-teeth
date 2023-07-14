import Dialog from '../../../miniprogram_npm/@vant/weapp/dialog/dialog';
var app = getApp();
const API = app.globalData.requestHeader;
Page({
  data: {
    imgList:'',
    br:'',
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
      problem:e.detail
    })
  },
  sc(){
    var that = this;
    console.log(app.globalData.openid)
    console.log(that.data.imgList)
    console.log(that.data.problem)
    wx.showModal({
      title: '提示',
      content: '是否上传诊断',
      success (res) {
        if (res.confirm) {
          wx.uploadFile({
            //insertDiseaseReport
            url:API+'/medicalService/insertDiseaseReport',
            // url: 'https://messi10zlj.xyz/tooth/screport.php',
            filePath: that.data.imgList[0],
            name: 'image',
            formData: {
              openid:app.globalData.openid,
              problem:that.data.problem,
            },
            header: {
              "Content-Type": "multipart/form-data"
            },
            success: function (res) {
              console.log(res)
              if(res.data == "上传成功")
             { Dialog.alert({
                message: '上传成功,请在我的病例报告中查看',
                theme: 'round-button',
              }).then(() => {
                wx.navigateBack({
                          delta: 1
                })
              });
            }
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