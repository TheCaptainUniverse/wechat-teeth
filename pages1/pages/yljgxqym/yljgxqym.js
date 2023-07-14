// pages1/pages/yljgxqym/yljgxqym.js
var app = getApp();
const API = app.globalData.requestHeader;
Page({

    /**
     * 页面的初始数据
     */
    data: {
      avatarUrl:'',
      name:'',
      positiveReviewRate:'',
      introduce:'',
        serviceName:[],
        address:'',
        consultation:'',
        id:'',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options.id)
        this.setData({
            id:options.id,
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
        var that = this;
        wx.request({
          //@GetMapping("/findHospitalById")
          method:'GET',
          url:API+'/medicalService/findHospitalById',
            // url: 'https://messi10zlj.xyz/tooth/yyzyxq.php',	
            data: {
                id:that.data.id,
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              console.log(res.data)
              console.log(res.data.positive_review_rate)
              that.setData({
                avatarUrl:res.data.avatar_url,
                name:res.data.name,
                positiveReviewRate:res.data.positive_review_rate,
                introduce:res.data.introduce,
                address:res.data.address,
                consultation:res.data.consultation,
              })
            },
           
          })
          wx.request({
            //@GetMapping("/findHospitalServiceById")
            method:'GET',
            url:API+'/medicalService/findHospitalServiceById',
            // url: 'https://messi10zlj.xyz/tooth/yyzyxqfw.php',	
            data: {
                id:that.data.id,
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              console.log(res.data)
              that.setData({
                serviceName:res.data
              })
            },
           
          })
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