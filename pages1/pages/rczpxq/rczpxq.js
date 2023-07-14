// pages1/pages/rczpxq/rczpxq.js
const app = getApp();
const API = app.globalData.requestHeader;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id:'',
        picture:'',
        name:'',
        salary:'',
        description:'',
        requirement:'',
        phone:'',
        address:'',
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
        console.log(that.data.id)
        wx.request({
          method:'GET',
          url:API+'/user/findRecruitmentById',	
            data: {
                id:that.data.id,
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              console.log(res)
              that.setData({
                picture:res.data.picture,
                name:res.data.name,
                salary:res.data.salary,
                description:res.data.description,
                requirement:res.data.requirement,
                phone:res.data.phone,
                address:res.data.address,
              })
            }
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