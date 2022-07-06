// pages1/pages/rczpxq/rczpxq.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        ID:'',
        gstp:'',
        gsmz:'',
        xinzi:'',
        gsjs:'',
        zpyq:'',
        lxfs:'',
        dizhi:'',
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
            url: 'https://messi10zlj.xyz/tooth/rczpxq.php',	
            data: {
                ID:that.data.ID,
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              console.log(res.data)
              that.setData({
                gstp:res.data[0].gstp,
                gsmz:res.data[0].gsmz,
                xinzi:res.data[0].xinzi,
                gsjs:res.data[0].gsjs,
                zpyq:res.data[0].zpyq,
                lxfs:res.data[0].lxfs,
                dizhi:res.data[0].dizhi,
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