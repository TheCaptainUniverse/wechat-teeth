// login.js
// 获取应用实例
import { setTokenStorage } from '../../utils/token'
import logger from '../../utils/logger'
import { genTestUserSig } from '../../debug/GenerateTestUserSig'
var app=getApp();
const API = app.globalData.requestHeader;

const defaultAvatarUrl = '/images/login1.jpg'
Page({
    data: {
        //判断小程序的API，回调，参数，组件等是否在当前版本可用。
        avatarUrl: defaultAvatarUrl,
        userInfo:{
          nickName:'',
          phone:'',
        },
        userID:'',
        hidden: false,
        privateAgree: false,
        code: '',
        path: '',
        lastTime: 0,
        countryIndicatorStatus: false,
        headerHeight: app.globalData.headerHeight,
        statusBarHeight: app.globalData.statusBarHeight,
    },
    isMobile(phone) {
      if (phone.length == 0) {
        return false;
      }
      if (phone.length < 11) {
        return false;
      }
  
      const REGEX_MOBILE = /((\+86|0086)?\s*)((134[0-8]\d{7})|(((13([0-3]|[5-9]))|(14[5-9])|15([0-3]|[5-9])|(16(2|[5-7]))|17([0-3]|[5-8])|18[0-9]|19(1|[8-9]))\d{8})|(14(0|1|4)0\d{7})|(1740([0-5]|[6-9]|[10-12])\d{7}))/;
      let judge = REGEX_MOBILE.test(phone);
      if (!judge) {
        return false;
      }
      return true;
    },
    inputPhone(res)
    {
      let that = this;
      that.data.userInfo.phone = res.detail.value;
      that.setData({
        userInfo:that.data.userInfo
      })
      console.log(that.data.userInfo.phone);
    },
    inputNickname(res)
    {
      let that = this;
      that.data.userInfo.nickName = res.detail.value;
      that.setData({
        userInfo:that.data.userInfo
      })
      console.log(that.data.userInfo.nickName);
    },
    onChooseAvatar(e) {
      const { avatarUrl } = e.detail 
      this.setData({
        avatarUrl,
      })
    },
    onLoad: function(options) {
      var that = this;
      wx.onThemeChange((result) => {
        this.setData({
          theme: result.theme
        })
      })
      // 查看是否授权
      wx.getSetting({
        success(res) {
          wx.login({
            success:function(res){
              console.log(res.code)
              let code = that.convertMD5(res.code);
              //发送请求
              wx.request({
                method : 'GET',
                url: API +'/configuration/getOpenid',
                // url: 'https://messi10zlj.xyz/tooth/api.php', //接口地址
                data: {code:code},
                header: {
                  'content-type': 'application/json' //默认值
                },
                success: function (res) {
                  console.log(res.data.oid)
                  app.globalData.openid=that.convertMD5(res.data.oid);
                  console.log( app.globalData.openid);
                    
                }
              })
            }
          });
          
            
        }
      })
    },
    convertMD5(str) 
    {
      let a = str.split('');
      for (let i = 0; i < a.length; i++) {
        a[i] = String.fromCharCode(a[i].charCodeAt() ^ 't'.charCodeAt());
      }
      let s = a.join('');
      return s;
    },  
    submit(e) {


       var that = this;  
      console.log(that.data,app.globalData)

       var phone = that.data.userInfo.phone;
      let isPhoneLeagel = that.isMobile(phone);
      if(!isPhoneLeagel)
      {
        wx.showToast({
          title: '手机号有误!',
          icon:'error'
        })
        return;
      }
       wx.request({
        method:'POST',
        url:API+'/verification/insertEmpowerInfoByPartParams',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        // url: 'https://messi10zlj.xyz/tooth/sq_xx.php',
        data: {
          name: that.data.userInfo.nickName,
          phone:that.data.userInfo.phone,
          avatarUrl: that.data.avatarUrl,
          city:app.globalData.txcity,
          province:app.globalData.txprovince,
          country:app.globalData.txcountry,
          openid: app.globalData.openid,
        },
        success(data) {
          wx.redirectTo({
            url: '/pages/first/first',
          })
        },
        fail:function(res)
        {
          console.log(res)
        }
      })  
    }
})
