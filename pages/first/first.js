// first/first.js
import {
  setTokenStorage
} from '../../utils/token'
import logger from '../../utils/logger'
import {
  genTestUserSig
} from '../../debug/GenerateTestUserSig'
const app = getApp()
const API = app.globalData.requestHeader

Page({
  data: {
    loading: 'true',
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
  convertMD5(str) {
    let a = str.split('');
    for (let i = 0; i < a.length; i++) {
      a[i] = String.fromCharCode(a[i].charCodeAt() ^ 't'.charCodeAt());
    }
    let s = a.join('');
    return s;
  },
  onShow: function (options) {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success() {
        wx.login({
          success: function (res) {
            console.log(res)
            let code = that.convertMD5(res.code);
            console.log(res.code)
            console.log(code)
            //发送请求
            wx.request({
              method: 'GET',
              url: API + '/configuration/getOpenid',
              // url: 'https://messi10zlj.xyz/tooth/api.php', //接口地址
              data: {
                code: code
              },
              header: {
                'content-type': 'application/json' //默认值
              },
              success: function (res) {
                console.log(res.data)
                app.globalData.openid = that.convertMD5(res.data.oid);
                console.log(app.globalData.openid);

                wx.request({
                  method: 'GET',
                  url: API + '/verification/checkEmpowerInfoByOpenid',
                  // url: 'https://messi10zlj.xyz/tooth/cfsq.php',
                  data: {
                    openid: app.globalData.openid,
                  },

                  success(data) {
                    console.log(data.data)

                    if (data.data == 1) {
                      wx.request({
                        method: 'GET',
                        url: API + '/verification/findEmpowerInfoByOpenId',
                        // url: 'https://messi10zlj.xyz/tooth/qbxx.php',
                        data: {
                          openid: app.globalData.openid,
                        },
                        success(data) {
                          console.log(data)
                          app.globalData.score = data.data.score;
                          that.setData({
                            userID: data.data.uid.toString(),
                          })
                          const userID = that.data.userID
                          const userSig = genTestUserSig(userID).userSig
                          app.globalData.name = data.data.name,
                            app.globalData.avatarUrl = data.data.avatarUrl,
                            app.globalData.uid = data.data.uid,
                            app.globalData.identity = data.data.identity,
                            app.globalData.phone = data.data.phone,

                            logger.log(`first | first  | userSig:${userSig} userID:${userID}`)
                          app.globalData.userInfo = {
                            userSig,
                            userID,
                          };
                          // app.initTIM();
                          // setTokenStorage({
                          //   userInfo: app.globalData.userInfo,
                          // }),


                          console.log(that.data)
                          if (that.data.path && that.data.path !== 'undefined') {
                            wx.redirectTo({
                              url: that.data.path,
                            })
                          } else {
                            if (app.globalData.identity == 0) {
                              setTimeout(function () {
                                wx.redirectTo({
                                  url: '/pages1/pages/index/index'
                                })
                              }, 1000)
                            } else if (app.globalData.identity == 1) {
                              setTimeout(function () {
                                wx.redirectTo({
                                  url: '/pages1/pages/index/index'
                                })
                              }, 1000)
                            } else if (app.globalData.identity == 2) {
                              setTimeout(function () {
                                wx.redirectTo({
                                  url: '/pages2/pages/index/index'
                                })
                              }, 1000)
                            } else if (app.globalData.identity == 3) {
                              setTimeout(function () {
                                wx.redirectTo({
                                  url: '/pages1/pages/index/index'
                                })
                              }, 1000)
                            }

                          }
                        },
                        fail: function (res) {
                          that.setData({
                            loading: false
                          })
                        }
                      })
                    } else {
                      setTimeout(function () {
                        wx.redirectTo({
                          url: '/pages/login/login'
                        })
                      }, 1000)

                    }
                  },
                  fail(res) {
                    that.setData({
                      loading: false
                    })
                  }
                })


              },
              fail(res) {
                that.setData({
                  loading: false
                })
              }
            })
          },
          fail: function (res) {
            that.setData({
              loading: false
            })
          }
        });
      },
      fail(res) {
        that.setData({
          loading: false
        })
      }
    })
  },

  onReady: function () {

  },
})