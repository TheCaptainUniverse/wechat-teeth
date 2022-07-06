// pages1/pages/yljgxqym/yljgxqym.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        yytp:'',
        yyname:'',
        hpl:'',
        yyjs:'',
        fw:'',
        yydizhi:'',
        zixun:'',
        ID:'',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options.ID)
        this.setData({
            ID:options.ID,
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
            url: 'https://messi10zlj.xyz/tooth/yyzyxq.php',	
            data: {
                ID:that.data.ID,
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              console.log(res.data)
              console.log(res.data[0].hpl)
              that.setData({
                yytp:res.data[0].yytp,
                yyname:res.data[0].yyname,
                hpl:res.data[0].hpl,
                yyjs:res.data[0].yyjs,
                yydizhi:res.data[0].yydizhi,
                zixun:res.data[0].zixun,
              })
            },
           
          })
          wx.request({
            url: 'https://messi10zlj.xyz/tooth/yyzyxqfw.php',	
            data: {
                ID:that.data.ID,
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              console.log(res.data)
              that.setData({
                fw:res.data
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