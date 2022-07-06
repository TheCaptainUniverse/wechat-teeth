// login.js
// 获取应用实例
import { setTokenStorage } from '../../utils/token'
import logger from '../../utils/logger'
import { genTestUserSig } from '../../debug/GenerateTestUserSig'
var app=getApp();
Page({
    data: {
        //判断小程序的API，回调，参数，组件等是否在当前版本可用。
        canIUse: false,
        userInfo:{},
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
    onLoad: function(options) {
      var that = this;
      // 查看是否授权
      wx.getSetting({
        success(res) {
          wx.login({
            success:function(res){
              console.log(res.code)
              //发送请求
              wx.request({
                url: 'https://messi10zlj.xyz/tooth/api.php', //接口地址
                data: {code:res.code},
                header: {
                  'content-type': 'application/json' //默认值
                },
                success: function (res) {
                  console.log(res.data.openid)
                  getApp().globalData.openid=res.data.openid;
                  console.log( app.globalData.openid);
                
                    
                }
              })
            }
          });
          
            
        }
      })
    },
    bindGetUserInfo(e) {
       var that = this;  
        wx.getUserProfile({
          desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
          success: (file) => {
            console.log(file)
            console.log(app.globalData.openid);
            that.setData({
              userInfo:file.userInfo,
              canIUse: true,
            })
            wx.request({
                      
              url: 'https://messi10zlj.xyz/tooth/sq_xx.php',

              data: {
                openid: app.globalData.openid,
                nickName: file.userInfo.nickName,
                avatarUrl: file.userInfo.avatarUrl,
                province:file.userInfo.province,
                country: file.userInfo.country
              },
              success(data) {
                console.log(data.data);
                app.globalData.nickName=file.userInfo.nickName,
                app.globalData.avatarUrl=file.userInfo.avatarUrl,
                app.globalData.province=file.userInfo.province,
                app.globalData.country=file.userInfo.country,
                app.globalData.yhID=data.data.yhID,
                wx.request({
                          
                      
                  url: 'https://messi10zlj.xyz/tooth/qbxx.php',
    
                  data: {
                    openid: app.globalData.openid,
                  },
                  success(data) {
                    console.log(data.data);
                    that.setData({
                      userID:data.data[0].ID,
                    })
                    const userID = that.data.userID
                    const userSig = genTestUserSig(userID).userSig
                    console.log(userID)
                    console.log(data.data[0].avatarUrl);
                    app.globalData.nickName=data.data[0].nickName,
                    app.globalData.avatarUrl=data.data[0].avatarUrl,
                    app.globalData.yhID=data.data[0].yhID,

                    logger.log(`first | first  | userSig:${userSig} userID:${userID}`)
                    app.globalData.userInfo = {
                      userSig,
                      userID,
                    }
                    setTokenStorage({
                      userInfo: app.globalData.userInfo,
                    })
                    
                    if (that.data.path && that.data.path !== 'undefined') {
                      wx.redirectTo({
                        url: that.data.path,
                      })
                    } else {
                      setTimeout(function () {
                        wx.redirectTo({
                        url: '/pages1/pages/index/index'
                        })
                        }, 1000)
                    }  
                  }
                }) 
              }
            })                 
          }
        })
    }
})
