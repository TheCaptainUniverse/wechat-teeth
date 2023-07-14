// pages1/pages/sm/sm.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tp:'',
    score:'',
    bgTp:'',
    jd:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.score)

    if(0<=app.globalData.score&&app.globalData.score<10){
      var chu = app.globalData.score/10*100
      this.setData({
        tp:"../../imagessm/yc1.png",
      })
      this.setData({
        bgTp: "background-image: url('"+this.data.tp+"')"    
       })
    }else if(10<=app.globalData.score&&app.globalData.score<30){
      var chu = (app.globalData.score-10)/20*100
      this.setData({
        tp:"../../imagessm/yc2.png"
      })
      this.setData({
        bgTp: "background-image: url('"+this.data.tp+"')"    
       })
    }else if(30<=app.globalData.score&&app.globalData.score<60){
      var chu = (app.globalData.score-30)/30*100
      this.setData({
        tp:"../../imagessm/yc3.png"
      })
      this.setData({
       bgTp: "background-image: url('"+this.data.tp+"')"    
      })
      console.log(this.data.bgTp)
    }else if(60<=app.globalData.score&&app.globalData.score<100){
      var chu = (app.globalData.score-60)/40*100
      this.setData({
        tp:"../../imagessm/yc4.png"
      })
      this.setData({
        bgTp: "background-image: url('"+this.data.tp+"')"    
       })
    }else if(100<=app.globalData.score&&app.globalData.score<150){
      var chu = (app.globalData.score-100)/50*100
      this.setData({
        tp:"../../imagessm/yc5.png"
      })
      this.setData({
        bgTp: "background-image: url('"+this.data.tp+"')"    
       })
    }else if(150<=app.globalData.score&&app.globalData.score<210){
      var chu = (app.globalData.score-150)/60*100
      this.setData({
        tp:"../../imagessm/yc6.png"
      })
      this.setData({
        bgTp: "background-image: url('"+this.data.tp+"')"    
       })
    }else if(210<=app.globalData.score&&app.globalData.score<280){
      var chu = (app.globalData.score-210)/70*100
      this.setData({
        tp:"../../imagessm/yc7.png"
      })
      this.setData({
        bgTp: "background-image: url('"+this.data.tp+"')"    
       })
    }else if(280<=app.globalData.score&&app.globalData.score<360){
      var chu = (app.globalData.score-280)/80*100
      this.setData({
        tp:"../../imagessm/yc8.png"
      })
      this.setData({
        bgTp: "background-image: url('"+this.data.tp+"')"    
       })
    }else if(360<=app.globalData.score){
      var chu = (app.globalData.score-360)/90*100
      this.setData({
        tp:"../../imagessm/yc9.png"
      })
      this.setData({
        bgTp: "background-image: url('"+this.data.tp+"')"    
       })
    }
    this.setData({
      score:app.globalData.score,
      jd:chu.toFixed(2)
    })
    console.log(this.data.jd);
  },
})