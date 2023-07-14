import logger from '../../../utils/logger';
const app = getApp();
const API = app.globalData.requestHeader;
Page({
  data: {
    dj:'black',
    index:'',
    gly:'',
    mrtj: [{
      id:'',
      title:'',
      information:'',
      description:'',
      ageGroup:'',
      url:'',
      lable:''
    }],
    gd:true,
    gd1:false,
  },
  onLoad: function (options) {
    var that = this;
    wx.request({
      method:'GET',
      // url: 'https://messi10zlj.xyz/tooth/mrtj.php',
      url:API+'/content/findLastScience',
      data:{
        number : 5
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
      console.log(res.data)
      that.setData({
        mrtj:res.data
      })
       console.log(that.data.mrtj)
       
      },
      fail: function(res)
      {
        console.log(res)
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
    console.log(that.data.mrtj[that.data.index.index].id)
    wx.navigateTo({
      url: '../../../pages1/pages/gzhwz/gzhwz?id='+that.data.mrtj[that.data.index.index].id
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
    url: '../../../pages1/pages/ltlb/ltlb',
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