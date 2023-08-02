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

    const { statusBarHeight, platform } = wx.getSystemInfoSync()
    const { top, height } = wx.getMenuButtonBoundingClientRect()
 
    const noticeBarStyle = `top: ${wx.getMenuButtonBoundingClientRect().top - 10}px; width: ${wx.getSystemInfoSync().screenWidth - wx.getMenuButtonBoundingClientRect().width}px;`;

    wx.setStorageSync('noticeBarStyle',noticeBarStyle)
    // 状态栏高度
    wx.setStorageSync('statusBarHeight', statusBarHeight)
    // 胶囊按钮高度 一般是32 如果获取不到就使用32
    wx.setStorageSync('menuButtonHeight', height ? height : 32)
    
    // 判断胶囊按钮信息是否成功获取
    if (top && top !== 0 && height && height !== 0) {
        const navigationBarHeight = (top - statusBarHeight) * 2 + height
        // 导航栏高度
        wx.setStorageSync('navigationBarHeight', navigationBarHeight)
    } else {
        wx.setStorageSync(
          'navigationBarHeight',
          platform === 'android' ? 48 : 40
        )
    }
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
        let country = res.result.ad_info.nation
        that.globalData.txcity=city;
        that.globalData.txprovince=province;
        that.globalData.latitude=latitude;
        that.globalData.longitude=longitude;
        that.globalData.txcountry=country;
        console.log(that.globalData.txcity)
        console.log(that.globalData.txprovince)
        console.log(that.globalData.txcountry)
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
    // requestHeader : 'http://124.220.9.73:8099/teethAPI',
    // requestHeader :'http://127.0.0.1:8099/teethAPI',
    requestHeader :'https://ly.lingyahuichi.top/teethAPI',
    userInfo: null,
    isTUIKit: true,
    // 个人信息
    userProfile: null,
    headerHeight: 0,
    statusBarHeight: 0,
    SDKAppID: SDKAPPID,
    openid:'',
    name:'',
    avatarUrl:'',
    province:'',
    country:'',
    uid:'',
    identityJudge:1,
    identity:'',
    score:'',
    imgList: [],
    phone:'',

    txprovince:'',
    txcity:'',
    txcountry:'',
    latitude:'',
    longitude:'',
  },
  onSDKReady() {
    console.log('SDKREADY')
    // let login = wx.$TUIKit.login({userID:this.globalData.userInfo.userID, userSig:this.globalData.userInfo.userSig});
    //                         login.then(function(imResponse) {
    //                         console.log(imResponse.data); // 登录成功
                            let promise = wx.$TUIKit.updateMyProfile({
                              nick:this.globalData.name,
                              avatar:this.globalData.avatarUrl
                            });
                            promise.then(function(imResponse) {
                              console.log(imResponse.data); // 更新资料成功
                            }).catch(function(imError) {
                              console.warn('updateMyProfile error:', imError); // 更新资料失败的相关信息
                            });
                            // if (imResponse.data.repeatLogin === true) {
                            // // 标识帐号已登录，本次登录操作为重复登录。v2.5.1 起支持
                            // console.log(imResponse.data.errorInfo);
                            // }
                            // }).catch(function(imError) {
                            // console.warn('login error:', imError); // 登录失败的相关信息
                            // });
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
