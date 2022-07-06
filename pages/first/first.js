// first/first.js
import { setTokenStorage } from '../../utils/token'
import logger from '../../utils/logger'
import { genTestUserSig } from '../../debug/GenerateTestUserSig'
const app = getApp()

Page({
  data: {
    userID: '',
    hidden: false,
    privateAgree: false,
    code: '',
    path: '',
    lastTime: 0,
    countryIndicatorStatus: false,
    headerHeight: app.globalData.headerHeight,
    statusBarHeight: app.globalData.statusBarHeight,
  },

  onLoad: function (options) {
    var that = this;
      // 查看是否授权
      wx.getSetting({
        success() {
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
                  console.log(app.globalData.openid);
                  

                  
                  wx.request({   
                    url: 'https://messi10zlj.xyz/tooth/cfsq.php',
                    data: {
                      openid: app.globalData.openid,
                    },
                    
                    success(data) {
                      console.log(data.data)
                      
                      if(data.data==1){
                        wx.request({
                          
                      
                          url: 'https://messi10zlj.xyz/tooth/qbxx.php',
            
                          data: {
                            openid: app.globalData.openid,
                          },
                          success(data) {
                            console.log(data.data);
                            app.globalData.jf=data.data[0].jf;
                            console.log(app.globalData.jf);
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
                            app.globalData.sf=data.data[0].sf,

                            logger.log(`first | first  | userSig:${userSig} userID:${userID}`)
                            app.globalData.userInfo = {
                              userSig,
                              userID,
                            }
                            setTokenStorage({
                              userInfo: app.globalData.userInfo,
                            })
                            console.log(that.data.path)
                            if (that.data.path && that.data.path !== 'undefined') {
                              wx.redirectTo({
                                url: that.data.path,
                              })
                            } else {
                              if(app.globalData.sf == 0){
                                setTimeout(function () {
                                  wx.redirectTo({
                                  url: '/pages1/pages/index/index'
                                  })
                                  }, 1000)
                              }else if(app.globalData.sf ==1){
                                setTimeout(function () {
                                  wx.redirectTo({
                                  url: '/pages1/pages/index/index'
                                  })
                                  }, 1000)
                              }else if(app.globalData.sf ==2){
                                setTimeout(function () {
                                  wx.redirectTo({
                                  url: '/pages2/pages/index/index'
                                  })
                                  }, 1000)
                              }else if(app.globalData.sf ==3){
                                setTimeout(function () {
                                  wx.redirectTo({
                                  url: '/pages1/pages/index/index'
                                  })
                                  }, 1000)
                              }
                              
                            }  
                          }
                        })    
                      }else{
                        setTimeout(function () {
                          wx.reLaunch({
                          url: '/pages/login/login'
                          })
                          }, 1000)
                      
                      }
                    }
                  })
                    
                
              }
              })
            }
          });
          
            
        }
      })
  },

  onReady: function () {

  },

  onShow: function (res) {
   
  },
})