// pages1/pages/blwzzl/blwzzl.js
const app = getApp();
const API = app.globalData.requestHeader;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ytys:'',
    bymz:'',
    xfmx:'',
    zhqt:'',
    blbj:'',
    yygt:'',
    qcsb:'',
    hydt:'',
    ss:'',
    xfss:false,
    pt:true,
    activeNames: ['1'],
  },
  onChange(event) {
    this.setData({
      activeNames: event.detail,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //1
    wx.request({
      // @GetMapping("/findArticleByType")
      method:'GET',
      url:API+'/content/findArticleByType',
      data:{
        type:1
      },
      // url: 'https://messi10zlj.xyz/tooth/ytys.php',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
      console.log(res.data)
      that.setData({
        ytys:res.data
      })
       console.log(that.data.ytys)
      }
    })
    //2
    wx.request({
      method:'GET',
      url:API+'/content/findArticleByType',
      data:{
        type:2
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
      console.log(res.data)
      that.setData({
        bymz:res.data
      })
       console.log(that.data.bymz)
      }
    })
    //3
    wx.request({
      method:'GET',
      url:API+'/content/findArticleByType',
      data:{
        type:3
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
      console.log(res.data)
      that.setData({
        xfmx:res.data
      })
       console.log(that.data.xfmx)
      }
    })
    //4
    wx.request({
      method:'GET',
      url:API+'/content/findArticleByType',
      data:{
        type:4
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
      console.log(res.data)
      that.setData({
        zhqt:res.data
      })
       console.log(that.data.zhqt)
      }
    })
    //5
    wx.request({
      method:'GET',
      url:API+'/content/findArticleByType',
      data:{
        type:5
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
      console.log(res.data)
      that.setData({
        blbj:res.data
      })
       console.log(that.data.blbj)
      }
    })
    //6
    wx.request({
      method:'GET',
      url:API+'/content/findArticleByType',
      data:{
        type:6
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
      console.log(res.data)
      that.setData({
        yygt:res.data
      })
       console.log(that.data.yygt)
      }
    })
    //7
    wx.request({
      method:'GET',
      url:API+'/content/findArticleByType',
      data:{
        type:7
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
      console.log(res.data)
      that.setData({
        qcsb:res.data
      })
       console.log(that.data.qcsb)
      }
    })
    //8
    wx.request({
      method:'GET',
      url:API+'/content/findArticleByType',
      data:{
        type:8
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
      console.log(res.data)
      that.setData({
        hydt:res.data
      })
       console.log(that.data.hydt)
      }
    })
  },

//1
  ytys(e) {
    var that = this;
    console.log(e.currentTarget.dataset)
    that.setData({
      index:e.currentTarget.dataset
    })
    console.log(that.data.index)
    console.log(that.data.ytys[that.data.index.index].id)
    
    wx.navigateTo({
      url: '../blwzzljj/blwzzljj?id='+that.data.ytys[that.data.index.index].id
     })
     
},
//2
bymz(e) {
  var that = this;
  console.log(e.currentTarget.dataset)
  that.setData({
    index:e.currentTarget.dataset
  })
  console.log(that.data.index)
  console.log(that.data.bymz[that.data.index.index].id)
  
  wx.navigateTo({
    url: '../blwzzljj/blwzzljj?id='+that.data.bymz[that.data.index.index].id
   })
   
},
//3
xfmx(e) {
  var that = this;
  console.log(e.currentTarget.dataset)
  that.setData({
    index:e.currentTarget.dataset
  })
  console.log(that.data.index)
  console.log(that.data.xfmx[that.data.index.index].id)
  
  wx.navigateTo({
    url: '../blwzzljj/blwzzljj?id='+that.data.xfmx[that.data.index.index].id
   })
   
},
//4
zhqt(e) {
  var that = this;
  console.log(e.currentTarget.dataset)
  that.setData({
    index:e.currentTarget.dataset
  })
  console.log(that.data.index)
  console.log(that.data.zhqt[that.data.index.index].id)
  
  wx.navigateTo({
    url: '../blwzzljj/blwzzljj?id='+that.data.zhqt[that.data.index.index].id
   })
   
},
//5
blbj(e) {
  var that = this;
  console.log(e.currentTarget.dataset)
  that.setData({
    index:e.currentTarget.dataset
  })
  console.log(that.data.index)
  console.log(that.data.blbj[that.data.index.index].id)
  
  wx.navigateTo({
    url: '../blwzzljj/blwzzljj?id='+that.data.blbj[that.data.index.index].id
   })
   
},
//6
yygt(e) {
  var that = this;
  console.log(e.currentTarget.dataset)
  that.setData({
    index:e.currentTarget.dataset
  })
  console.log(that.data.index)
  console.log(that.data.yygt[that.data.index.index].id)
  
  wx.navigateTo({
    url: '../blwzzljj/blwzzljj?id='+that.data.yygt[that.data.index.index].id
   })
   
},
//7
qcsb(e) {
  var that = this;
  console.log(e.currentTarget.dataset)
  that.setData({
    index:e.currentTarget.dataset
  })
  console.log(that.data.index)
  console.log(that.data.qcsb[that.data.index.index].id)
  
  wx.navigateTo({
    url: '../blwzzljj/blwzzljj?id='+that.data.qcsb[that.data.index.index].id
   })
   
},
//8
hydt(e) {
  var that = this;
  console.log(e.currentTarget.dataset)
  that.setData({
    index:e.currentTarget.dataset
  })
  console.log(that.data.index)
  console.log(that.data.hydt[that.data.index.index].id)
  
  wx.navigateTo({
    url: '../blwzzljj/blwzzljj?id='+that.data.hydt[that.data.index.index].id
   })
   
},
onSearch(e){
  var that = this;
  console.log(e.detail)
  wx.request({
    url: API+'/content/findArticleByTitleLike',
    data: {
      title:e.detail,
    },
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    success: function (res) {
    console.log(res.data)
    that.setData({
      ss:res.data,
      sfss: true,
      pt:false,
    })    
    }
  })
},
ss(e) {
  var that = this;
  console.log(e.currentTarget.dataset)
  that.setData({
    index:e.currentTarget.dataset
  })
  console.log(that.data.index)
  console.log(that.data.ss[that.data.index.index].id)
  
  wx.navigateTo({
    url: '../blwzzljj/blwzzljj?id='+that.data.ss[that.data.index.index].id
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