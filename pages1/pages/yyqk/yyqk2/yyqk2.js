// pages/pages1/yyqk/yyqk2/yyqk2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgList:'',
    name:'',
    skill:'',
    hospital:'',
    userID: '',
    searchUser: {},
    userInfo: {
    },
    ysopenid:'',
    ID:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    console.log(options.ID);
    wx.request({
      url: 'https://messi10zlj.xyz/tooth/yyqk.php',
      data: {
        ID: options.ID,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
      console.log(res.data)
      that.setData({
        imgList:res.data[0].imgList,
        name:res.data[0].ysname,
        skill:res.data[0].skill,
        hospital:res.data[0].hospital,
        ysopenid:res.data[0].ysopenid,
        ID:res.data[0].ID,
        hpl:res.data[0].hpl,
        jj:res.data[0].jj,
        zw:res.data[0].zw,
        hps:res.data[0].hps,
        yyrs:res.data[0].yyrs,
      })
      }

    })
  },
  zx(){
    var that = this;
   
    console.log(that.data.ysopenid)
    wx.request({
      url: 'https://messi10zlj.xyz/tooth/ljlt.php',
      data: {
        openid:that.data.ysopenid,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
      console.log(res.data)
      wx.request({
        url: 'https://messi10zlj.xyz/tooth/qwzx.php',
        data: {
          ID:that.data.ID,
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
     
        }
      })    

      that.setData({
        userID: res.data[0].ID,
        searchUser: {},
      });

      wx.$TUIKit.getUserProfile({
        userIDList: [that.data.userID],
      }).then((imRes) => {
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


          if (that.data.searchUser.isChoose) {
            const payloadData = {
              conversationID: `C2C${that.data.searchUser.userID}`,
            };
            wx.navigateTo({
              url: `/chat/pages/TUI-Chat/chat?conversationInfomation=${JSON.stringify(payloadData)}`,
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