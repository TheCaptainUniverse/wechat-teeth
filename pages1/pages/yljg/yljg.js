// const chooseLocation = requirePlugin('chooseLocation')//地图选点结果插件实例
var app = getApp();
const API = app.globalData.requestHeader;

// pages/yljg/yljg.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    weiz:false,
    cardCur: 0,
    xdxh:'',
    xz:0,
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://captainuniverse.oss-cn-huhehaote.aliyuncs.com/banner1.png'
    }],
    latitude: "",
    longitude: "",
    latitude1: "",
    longitude1:"",
    markers: [],
    address:"寻址",
    dizhi:'',
		key: '2NOBZ-FKEWW-VVKRK-OEMHF-X6YO7-SYBYZ',//在腾讯位置服务申请的key
    referer: 'tooth', //调用腾讯位置服务相关插件的app的名称
    cs:true,
    yyxx:'',
    page:1,
    hasMore:true,
    pagesize:5,
    dataILu : false,
    index:'',
  },
  DotStyle(e) {
    this.setData({
      DotStyle: e.detail.value
    })
  },
  // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  // towerSwiper
  // 初始化towerSwiper
  towerSwiper(name) {
    let list = this.data[name];
    for (let i = 0; i < list.length; i++) {
      list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
      list[i].mLeft = i - parseInt(list.length / 2)
    }
    this.setData({
      swiperList: list
    })
  },
  onLoad: function (options) {
    var that = this;
    wx.request({
      //@GetMapping("/getAllBanner")
      method:'GET',
      url:API+'/content/getAllBannerByType',
      // url: 'https://messi10zlj.xyz/tooth/yyzylb.php',	
      data: {
        type:2
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data)
        that.data.swiperList = res.data.map(item => ({ 
          url: item.img_url ,
          id: item.id,
          type:'image'
        }));
        console.log(that.data.swiperList)
        that.setData({
          swiperList:that.data.swiperList,
        })
      },
     
    })
    that.fyjz();
  },
  fyjz:function(){
    var that = this;
   
	  wx.request({
      //@GetMapping("/findHospitalByPageAndCount")
      method:'GET',
      url:API+'/medicalService/findHospitalByPageAndCount',
      // url: 'https://messi10zlj.xyz/tooth/yyzy.php',	
      data: {
        page: that.data.page,
        count: that.data.pagesize 
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data)
        var yyxxa = that.data.yyxx;
        if (res.data.length > 0) {
          if (that.data.page == 1) {
            yyxxa = []
          }
          var yyxxs = res.data;
          if (yyxxs.length < that.data.pagesize) {
            that.setData({
              yyxx: yyxxa.concat(yyxxs),
              hasMore: false,
              dataILu: false,
            })
            console.log(that.data.yyxx)
          } else {
            that.setData({
              yyxx: yyxxa.concat(yyxxs),
              hasMore: true,
              dataILu: true,
              page: that.data.page + 1
            })
          }
          that.setData({
            yyxx:that.data.yyxx,
        })
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
  dj(e){
    var that = this;
    console.log(e.currentTarget.dataset.index)
    that.setData({
    index:e.currentTarget.dataset,
    })
    console.log(that.data.index)
    console.log(that.data.yyxx[that.data.index.index].id)
    wx.navigateTo({
      url: '../yljgxqym/yljgxqym?id='+that.data.yyxx[that.data.index.index].id
    })
  },
  // rad(d){
  //   return d*Math.PI/180.0;
  // },
  // getDistance(lat1, lng1, lat2, lng2) {
  //   var radLat1 = this.rad(lat1);
  //   var radLat2 = this.rad(lat2);
  //   var a = radLat1 - radLat2;
  //   var b = this.rad(lng1) - this.rad(lng2);
  //   var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
  //   Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
  //   s = s * 6378.137; // EARTH_RADIUS;
  //   s = Math.round(s * 10000) / 10000; //输出为公里
  //   s=s.toFixed(1) + 'km';
  //   console.log(s);
  //   return s;
  // },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // var that = this;
    // // 从地图选点插件返回后，在页面的onShow生命周期函数中能够调用插件接口，取得选点结果对象
    // console.log(chooseLocation.getLocation())
    // if (that.data.weiz==false) {
      
    // }else if (that.data.weiz==true) {
    //   const location = chooseLocation.getLocation(); // 如果点击确认选点按钮，则返回选点结果对象，否则返回null
    // console.log(location)
		// if(location != null){
		// 	console.log(location)
		// 	this.setData({
		// 		latitude1: location.latitude,
		// 		longitude1:location.longitude,
    //     address:location.name,
    //     cs:true,
    //   })
    //   this.routePlan1();
		// }
    // }
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    chooseLocation.location = null;
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})