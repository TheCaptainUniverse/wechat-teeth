var app = getApp();
const API = app.globalData.requestHeader;
Page({
  data: {
    active: 0,
    value:'',
    show: false,
    index:'',
    yyjl:'',
    page:1,
    hasMore:true,
    pagesize:10,
    dataILu : false,
    gly:'',
  },
  onLoad: function (options) {
    var that = this;
    if(app.globalData.sf==3){
      that.setData({
       gly:true
      })
     }else{
       that.setData({
         gly:false
        })
     }
    that.fyjz();
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
      //@GetMapping("/getAppointmentByOpenidAndPageAndCount")
      method:'GET',
      url:API+'/appointment/getAppointmentByOpenidAndPageAndCount',
      // url: 'https://messi10zlj.xyz/tooth/yyjl.php',	
      data: {
        openid: app.globalData.openid,
        page: that.data.page,
        count: that.data.pagesize 
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data)
        var yyjla = that.data.yyjl;
        if (res.data.length > 0) {
          if (that.data.page == 1) {
            yyjla = []
          }
          var yyjls = res.data;
          if (yyjls.length < that.data.pagesize) {
            that.setData({
              yyjl: yyjla.concat(yyjls),
              hasMore: false,
              dataILu: false,
            })
            console.log(that.data.yyjl)
          } else {
            that.setData({
              yyjl: yyjla.concat(yyjls),
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
  yyqk(e) {
    var that = this;
    console.log(e.currentTarget.dataset)
    that.setData({
      index:e.currentTarget.dataset
    })
    console.log(that.data.index)
    console.log(that.data.yyjl[that.data.index.index].entity.id)
    console.log(that.data.yyjl[that.data.index.index].statusFix)
    if(that.data.yyjl[that.data.index.index].statusFix=='正在预约'){
      wx.navigateTo({
        url: '../yyqk/yyqk1/yyqk1?id='+that.data.yyjl[that.data.index.index].entity.id
       })
    }else if(that.data.yyjl[that.data.index.index].statusFix=='预约成功'){
      wx.navigateTo({
        url: '../yyqk/yyqk2/yyqk2?id='+that.data.yyjl[that.data.index.index].entity.id
       })
    }else if(that.data.yyjl[that.data.index.index].statusFix=='咨询成功'){
      wx.navigateTo({
        url: '../yyqk/yyqk3/yyqk3?id='+that.data.yyjl[that.data.index.index].entity.id
       })
    }else if(that.data.yyjl[that.data.index.index].statusFix=='取消预约'){
      wx.navigateTo({
        url: '../yyqk/yyqk4/yyqk4?id='+that.data.yyjl[that.data.index.index].entity.id
       })
    }
},
  onSearch(e){
    var that = this;
    console.log(e.detail)
    wx.request({
      //@GetMapping("/findAppointmentByDoctorNameAndOpenid")
      method:'GET',
      url:API+'/appointment/findAppointmentByDoctorNameLikeAndOpenid',
      // url: 'https://messi10zlj.xyz/tooth/zxss.php',
      data: {
        doctorName:e.detail,
        openid:app.globalData.openid,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
      console.log(res.data)
      that.setData({
        yyjl: res.data,
        hasMore: false,
        dataILu : false,
      })
      }

    })
  },
  swichNav1() {
    wx.redirectTo({
      url: '../index/index',
    })
  },
  swichNav2() {
    wx.redirectTo({
      url: '../logs/logs',
    })
  },
  swichNav3() {
    wx.redirectTo({
      url: '../mine/mine',
    })
  },
  swichNav4() {
    wx.redirectTo({
      url: '../gly/gly',
    })
  },
  swichNav5() {
    wx.redirectTo({
      url: '../ltlb/ltlb',
    })
  },
});