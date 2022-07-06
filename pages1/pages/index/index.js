import logger from '../../../utils/logger';
const app = getApp();
Page({
  data: {
    dj:'black',
    index:'',
    gly:'',
    mrtj: [{
      ID:'',
      title:'',
      xx:'',
      ms:'',
      zt:'',
    }],
    gd:true,
    gd1:false,
  },
  onLoad: function (options) {
    var that = this;
    if(app.globalData.sf==3){
     that.setData({
      gly:true
     })
    }else{
      that.setData({
        gly:false
       })
    }
    wx.request({
      url: 'https://messi10zlj.xyz/tooth/mrtj.php',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
      console.log(res.data)
      that.setData({
        mrtj:res.data
      })
       console.log(that.data.mrtj)
       
      }

    })
  },
  onShow() {
    logger.log(`| index | onshow | first |userSig:${app.globalData.userInfo.userSig} userID:${app.globalData.userInfo.userID}`);
    wx.$TUIKit.login({
      userID: app.globalData.userInfo.userID,
      userSig: app.globalData.userInfo.userSig,
    }).then(() => {
    })
      .catch(() => {
      });
  },
  tjxx (e) {
    var that = this;
    console.log(e.currentTarget.dataset)
    that.setData({
      index:e.currentTarget.dataset
    })
    console.log(that.data.index)
    console.log(that.data.mrtj[that.data.index.index].ID)
    
    wx.navigateTo({
      url: '../gzhwz/gzhwz?ID='+that.data.mrtj[that.data.index.index].ID
     })
     
},
  swichNav1() {
    wx.redirectTo({
      url: '../index/index',
    })
  },
  swichNav2() {
    wx.redirectTo({
      url: '../logs/logs',
    })
  },
  swichNav3() {
    wx.redirectTo({
      url: '../mine/mine',
    })
  },
  swichNav4() {
    wx.redirectTo({
      url: '../gly/gly',
    })
  },
  swichNav5() {
    wx.redirectTo({
      url: '../ltlb/ltlb',
    })
  },
  swichNav111(){
    this.setData({
      gd:false,
      gd1:true,
    })
  },
  swichNav222(){
    this.setData({
      gd:true,
      gd1:false,
    })
  },
});