// pages2/kqrd/kqrd.js
var app = getApp();
const API = app.globalData.requestHeader;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    value:'',
    show: false,
    index:'',
    kqrd:'',
    page:1,
    hasMore:true,
    pagesize:10,
    dataILu : false,
    xz:false,
    dxnr:'',
    option1: [
      { text: '龋病', value: '龋病' },
      { text: '牙髓病', value: '牙髓病' },
      { text: '牙周病', value: '牙周病' },
      { text: '牙列缺损（失）', value: '牙列缺损（失）' },
      { text: '牙列不齐', value: '牙列不齐' },
      { text: '其他', value: '其他' },
    ],
    option2: [
      { text: '婴幼儿', value: '婴幼儿' },
      { text: '儿童', value: '儿童' },
      { text: '青少年', value: '青少年' },
      { text: '成人', value: '成人' },
      { text: '老年人', value: '老年人' },
      { text: '孕妇', value: '孕妇' },
    ],
    option3: [
      { text: '蔬菜', value: '蔬菜' },
      { text: '水果', value: '水果' },
      { text: '相关食物', value: '相关食物' },
    ],
    option4: [
      { text: '牙刷', value: '牙刷' },
      { text: '牙膏', value: '牙膏' },
      { text: '牙线', value: '牙线' },
      { text: '牙贴', value: '牙贴' },
      { text: '漱口水', value: '漱口水' },
    ],
    value1: '',
    value2: '',
    value3: '',
    value4: '',
    kong:false,
  },
  tc(e){
    console.log(4)
    this.setData({
      xz:true,
    })
    console.log(this.data.xz)
  },
  onLoad: function (options) {
    var that = this
    that.fyjz();
  },
  cjjb:function(e){
    var t1 =this.data.value1
    console.log(t1)
    this.setData({
      dxnr:t1,
      xz:false,
    })
    this.onChange(e);
  },
  rq:function(e){
    var t1 =this.data.value2
    console.log(t1)
    this.setData({
      dxnr:t1,
      xz:false,
    })
    this.onChange(e);
  },
  yshl(e){
    var t1 =this.data.value3
    console.log(t1)
    this.setData({
      dxnr:t1,
      xz:false,
    })
    this.onChange(e);
  },
  yp(e){
    var t1 =this.data.value4
    console.log(t1)
    this.setData({
      dxnr:t1,
      xz:false,
    })
    this.onChange(e);
  },
  onChange(e){
    console.log(e.detail)
    this.onSearch(e);
  },
  //触底事件
  onReachBottom:function(){
    if (this.data.hasMore) {
      this.fyjz('加载更多数据')
    } else {
      this.setData({
        dataILu : false,
      })
      wx.showToast({
        title: '没有更多数据',
      })
    }
  },
  fyjz:function(){
    var that = this;
   
	  wx.request({
     //@GetMapping("/findScienceByPageAndCount")
     method:'GET',
     url:API+'/content/findScienceByPageAndCount',
     // url: 'https://messi10zlj.xyz/tooth/kqrd.php',	
     data: {
       page: that.data.page,
       count: that.data.pagesize 
     },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data)
        var kqrda = that.data.kqrd;
        if (res.data.length > 0) {
          if (that.data.page == 1) {
            kqrda = []
          }
          var kqrds = res.data;
          if (kqrds.length < that.data.pagesize) {
            that.setData({
              kqrd: kqrda.concat(kqrds),
              hasMore: false,
              dataILu: false,
            })
            console.log(that.data.kqrd)
          } else {
            that.setData({
              kqrd: kqrda.concat(kqrds),
              hasMore: true,
              dataILu: true,
              page: that.data.page + 1
            })
          }
        }else{
          that.setData({
            dataILu: false,
          })
        } 
      },
      fail: function (res) {
        
      },
      complete: function (res) {
      
      },
    })
  },
  kqrd(e) {
    var that = this;
    console.log(e.currentTarget.dataset)
    that.setData({
      index:e.currentTarget.dataset
    })
    console.log(that.data.index)
    console.log(that.data.kqrd[that.data.index.index].id)
    wx.navigateTo({
      url: '../../../pages1/pages/gzhwz/gzhwz?id='+that.data.kqrd[that.data.index.index].id
    })
},
onCancel(e){
  console.log(3)
    this.setData({
      xz:false,
    })
},
  onSearch(e){
    var that = this;
    that.setData({
      xz:false,
    })
    console.log(e.detail)
    wx.request({
      //@GetMapping("/findScienceByData")
      method:'GET',
      url:API+'/content/findScienceByData',
      // url: 'https://messi10zlj.xyz/tooth/kqrdss.php',
      data: {
        data:e.detail,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
      console.log(res.data)
      that.setData({
        kqrd:res.data,
        hasMore: false,
        dataILu : false,
      })
      
       
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})