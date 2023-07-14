// pages/pages1/yyqk/yyqk2/yyqk2.js
var app = getApp();
const API = app.globalData.requestHeader;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    doctorImgUrl:'',
    name:'',
    skill:'',
    hospital:'',
    introduction:'',
    id:'',
    userID: '',
    doctorOpenid:'',
    searchUser: {},
    userInfo: {
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    console.log(options.id);
    wx.request({
      method:'GET',
      url:API+'/appointment/getAppointmentById',
      // url: 'https://messi10zlj.xyz/tooth/yyqk.php',
      data: {
        id: options.id,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
      console.log(res.data)
      that.setData({
        doctorImgUrl:res.data.doctorImgUrl,
        name:res.data.ysname,
        skill:res.data.skill,
        hospital:res.data.hospital,
        positiveReviewRate:res.data.positiveReviewRate,
        introduction:res.data.introduction,
        position:res.data.position,
        positiveReviewNumber:res.data.positiveReviewNumber,
        appointmentCount:res.data.appointmentCount,
        id:res.data.id,
        doctorOpenid:res.data.doctorOpenid,
      })
      }

    })
  },
  zx(){
    var that = this;
   
    console.log(that.data.doctorOpenid)
    wx.request({
      //@GetMapping("/findEmpowerInfoByOpenId")
      method:'GET',
      url:API+'/verification/findEmpowerInfoByOpenId',
      // url: 'https://messi10zlj.xyz/tooth/ljlt.php',
      data: {
        openid:that.data.doctorOpenid,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
      console.log(res)
      that.setData({
        userID:res.data.uid
      })
      wx.request({
        //@PostMapping("/updateAppointmentStatusByIdAndStatus")
        method:'POST',
        url:API+'/appointment/updateAppointmentStatusByIdAndStatus',
        // url: 'https://messi10zlj.xyz/tooth/qwzx.php',
        data: {
          id:that.data.id,
          status:3
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
     
        }
      })    

      that.setData({
        // userID: options.uid,
        searchUser: {},
      });

      wx.$TUIKit.getUserProfile({
        userIDList: [that.data.userID],
      }).then((imRes) => {
        console.log(imRes)
        if (imRes.data.length > 0) {
          that.setData({
            searchUser: imRes.data[0],
          });
          console.log(that.data.searchUser)
          that.data.searchUser.isChoose = !that.data.searchUser.isChoose;
          console.log(that.data.searchUser.isChoose)
          that.setData({
            searchUser: that.data.searchUser,
          });
          console.log(that.data.searchUser)
          console.log(that.data.id)


          if (that.data.searchUser.isChoose) {
            const payloadData = {
              conversationID: `C2C${that.data.searchUser.userID}`,
            };
            wx.navigateTo({
              url: `/chat/pages/TUI-Chat/chat?conversationInfomation=${JSON.stringify(payloadData)}&id=${that.data.id}`
            });
          } else {
            wx.showToast({
              title: '请选择相关用户',
              icon: 'none',
            });
          }
        } else {
          wx.showToast({
            title: '用户不存在',
            icon: 'error',
          });
          that.setData({
            userID: '',
          });
        }
      });

      


      

      }

    })

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})