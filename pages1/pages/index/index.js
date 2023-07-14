import logger from '../../../utils/logger';
const app = getApp();
const API = app.globalData.requestHeader;
Page({
  data: {
    showNotice: false,
    navigationBarNoticeText: '',
    bannerList: [
      "/images/doctor0.svg",
      "/images/doctor1.svg",
      "/images/doctor2.svg",
      "/images/doctor3.svg",
      "/images/doctor4.svg",
    ],
    dj: 'black',
    index: '',
    gly: '',
    mrtj: [{
      id: '',
      title: '',
      information: '',
      description: '',
      ageGroup: '',
      url: '',
      lable: ''
    }],
    gd: true,
    gd1: false,
  },
  onLoad: function (options) {
    var that = this;
    if (app.globalData.identity == 3) {
      that.setData({
        gly: true
      })
    } else {
      that.setData({
        gly: false
      })
    }
    this.init();
  },
  init() {
    let that = this;
    that.getBannerList();
    that.getNoticeText();
    that.findLastScience();
  },
  getBannerList() {
    let that = this;
    wx.request({
      method: 'GET',
      url: API + '/content/getAllBannerByType',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data:{
        type:1
      },
      success(res) {
        console.log(res.data);
        that.setData({
          bannerList: res.data
        })
      },
      fail(res) {
        console.log(res);
      }
    })
  },
  onBannerImage(res) {
    let info = res.currentTarget.dataset.info;
    let url = info.target_url;
    let title = info.title;
    if (url != null && url != '' && url != 'undefined') {
      if(title == null || title == '' || title == 'undefined')
      {
        title = '文章';
      }
    console.log(url,title);

      wx.navigateTo({
        url: '/pages/web/web?title=' + encodeURIComponent(title) + '&url=' + encodeURIComponent(url)
      })
    }
  },
  getNoticeText() {
    let that = this;
    wx.request({
      method: 'GET',
      url: API + '/configuration/getNoticeByType',
      data: {
        type: 0
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        console.log(res)
        if (res.data.data != '暂无公告') {
          that.setData({
            showNotice: true,
            navigationBarNoticeText: res.data.data
          })
        }
      },
      fail(res) {
        console.log(res)
      }
    })

  },
  findLastScience() {
    let that = this;
    wx.request({
      method: 'GET',
      // url: 'https://messi10zlj.xyz/tooth/mrtj.php',
      url: API + '/content/findLastScience',
      data: {
        number: 5
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          mrtj: res.data
        })
        console.log(that.data.mrtj)

      },
      fail: function (res) {
        console.log(res)
      }

    })
  },
  onShow() {
    logger.log(`| index | onshow | first |userSig:${app.globalData.userInfo.userSig} userID:${app.globalData.userInfo.userID}`);
    wx.$TUIKit.login({
        userID: app.globalData.userInfo.userID,
        userSig: app.globalData.userInfo.userSig,
      }).then(() => {})
      .catch(() => {});
  },
  tjxx(e) {
    var that = this;
    console.log(e.currentTarget.dataset)
    that.setData({
      index: e.currentTarget.dataset
    })
    console.log(that.data.index)
    console.log(that.data.mrtj[that.data.index.index].id)

    wx.navigateTo({
      url: '../gzhwz/gzhwz?id=' + that.data.mrtj[that.data.index.index].id
    })
  },
  getRandomNumber() {
    return Math.floor(Math.random() * 5); // 生成0-4之间的整数
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
  swichNav111() {
    this.setData({
      gd: false,
      gd1: true,
    })
  },
  swichNav222() {
    this.setData({
      gd: true,
      gd1: false,
    })
  },
});