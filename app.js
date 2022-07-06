// app.js
import TIM from './static/tim-wx'
import TIMUploadPlugin from './static/tim-upload-plugin'
import logger from './utils/logger'
import { SDKAPPID } from './debug/GenerateTestUserSig'
var QQMapWX = require('./utils/qqmap-wx-jssdk1.2/qqmap-wx-jssdk');
var qqmapsdk;
// app.js
App({
  
  onLaunch() {
    qqmapsdk = new QQMapWX({
      key: '2NOBZ-FKEWW-VVKRK-OEMHF-X6YO7-SYBYZ' //这里自己的key秘钥进行填充
    });

    wx.setStorageSync('islogin', false)
    const SDKAppID = this.globalData.SDKAppID
    wx.setStorageSync(`TIM_${SDKAppID}_isTUIKit`, true)
    wx.$TUIKit = TIM.create({ SDKAppID: this.globalData.SDKAppID })
    wx.$TUIKit.registerPlugin({ 'tim-upload-plugin': TIMUploadPlugin })
    wx.$TUIKitTIM = TIM
    wx.$TUIKitEvent = TIM.EVENT
    wx.$TUIKitVersion = TIM.VERSION
    wx.$TUIKitTypes = TIM.TYPES
    // 监听系统级事件
    wx.$TUIKit.on(wx.$TUIKitEvent.SDK_NOT_READY, this.onSdkNotReady)
    wx.$TUIKit.on(wx.$TUIKitEvent.KICKED_OUT, this.onKickedOut)
    wx.$TUIKit.on(wx.$TUIKitEvent.ERROR, this.onTIMError)
    wx.$TUIKit.on(wx.$TUIKitEvent.NET_STATE_CHANGE, this.onNetStateChange)
    wx.$TUIKit.on(wx.$TUIKitEvent.SDK_RELOAD, this.onSDKReload)
    wx.$TUIKit.on(wx.$TUIKitEvent.SDK_READY, this.onSDKReady)
  },


  onShow() {
    var that = this;
    wx.getLocation({
      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        //赋值经纬度
        console.log(res.latitude)
        console.log(res.longitude)
        that.getLocal(res.latitude,res.longitude);
      }
    })
    wx.setKeepScreenOn({
      keepScreenOn: true,
    })
  },
  getLocal: function (latitude, longitude) {
    let that = this;
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function (res) {
        console.log(JSON.stringify(res));
        let province = res.result.ad_info.province
        let city = res.result.ad_info.city
        that.globalData.txcity=city;
        that.globalData.txprovince=province;
        that.globalData.latitude=latitude;
        that.globalData.longitude=longitude;
        console.log(that.globalData.txcity)
        console.log(that.globalData.txprovince)
        console.log(that.globalData.latitude)
        console.log(that.globalData.longitude)
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        // console.log(res);
      }
    });
  },
  // TODO:
  resetLoginData() {
    this.globalData.expiresIn = ''
    this.globalData.sessionID = ''
    this.globalData.userInfo = {
      userID: '',
      userSig: '',
      token: '',
      phone: '',
    }
    this.globalData.userProfile = null
    logger.log(`| app |  resetLoginData | globalData: ${this.globalData}`)
  },
  
  globalData: {
    
    userInfo: null,
    isTUIKit: true,
    // 个人信息
    userProfile: null,
    headerHeight: 0,
    statusBarHeight: 0,
    SDKAppID: SDKAPPID,
    openid:'',
    nickName:'',
    avatarUrl:'',
    province:'',
    country:'',
    yhID:'',
    sfpd:1,
    sf:'',
    jf:'',
    imgList: [],

    txprovince:'',
    txcity:'',
    latitude:'',
    longitude:'',
  },
  onSDKReady() {

  },
  onSdkNotReady() {

  },

  onKickedOut() {
    wx.showToast({
      title: '您被踢下线',
      icon: 'error',
    })
    wx.navigateTo({
      url: './pages/first/first',
    })
  },

  onTIMError() {
  },

  onNetStateChange() {

  },

  onSDKReload() {

  },
})
