// pages/pages1/blxqbg/blxqbg.js
var app = getApp();
const API = app.globalData.requestHeader;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reportId:'',
    photo:'',
    describe:'',
    problem:'',
    ywxq:'',
    wu:'',
    caseId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.reportId)
    console.log(options.caseId)
    var that = this;
    that.setData({
      reportId:options.reportId,
      caseId:options.caseId,
    }),
    wx.request({
      method:'GET',
      url:API+'/medicalService/findDiseaseReportAndCaseByIds',
      // url: 'https://messi10zlj.xyz/tooth/blxqbg1.php',
      data: {
        reportId:that.data.reportId,
        caseId:that.data.caseId,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
      console.log(res)
      if(res.data!=0){
        that.setData({
          photo:res.data.photo,
          describe:res.data.describe,
          problem:res.data.problem,
          time:res.data.time,
          imgUrl:res.data.imgUrl,
          bname:res.data.bname,
          advice:res.data.advice,
          ywxq:true,
          wu:false,
        })
        console.log(that.data.photo)
        console.log(that.data.imgUrl)
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
    var imgUrl = this.data.imgUrl;
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
})