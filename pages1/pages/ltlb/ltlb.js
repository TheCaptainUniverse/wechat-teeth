// pages1/pages/ltlb/ltlb.js
var app = getApp();
const API = app.globalData.requestHeader;
Page({
  data: {
    active: 0,
    value:'',
    show: false,
    index:'',
    ltlb:'',
    page:1,
    hasMore:true,
    pagesize:4,
    dataILu : false,
    gly:'',
    isPopping: false,//是否已经弹出
    animationPlus: {},//旋转动画
    animationcollect: {},//item位移,透明度
    animationTranspond: {},//item位移,透明度
    animationInput: {},//item位移,透明度
    ys:'',
  },
  onLoad: function (options) {
    var that = this;
    if(app.globalData.identity==3){
      that.setData({
       gly:true
      })
     }else{
       that.setData({
         gly:false
        })
     }
     if(app.globalData.identity==2){
      that.setData({
       ys:true
      })
     }else{
       that.setData({
         ys:false
        })
     }
    wx.request({
      //@PostMapping("/updateCommentAndLikeInfoAndViewerNumber")
      method:'POST',
      url:API+'/content/updateCommentAndLikeInfoAndViewerNumber',
      // url: 'https://messi10zlj.xyz/tooth/rsdjz.php',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
      console.log(res)
      that.fyjz();
      }
    })
    
  },
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
      //@GetMapping("/findForumItemByPageAndCount")
      method:'GET',
      url:API+'/content/findForumItemByPageAndCount',
      // url: 'https://messi10zlj.xyz/tooth/ltlb.php',	
      data: {
        page: that.data.page,
        count: that.data.pagesize 
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data)
        var ltlba = that.data.ltlb;
        if (res.data.length > 0) {
          if (that.data.page == 1) {
            ltlba = []
          }
          var ltlbs = res.data;
          if (ltlbs.length < that.data.pagesize) {
            that.setData({
              ltlb: ltlba.concat(ltlbs),
              hasMore: false,
              dataILu: false,
            })
            console.log(that.data.ltlb)
            console.log(that.data.ltlb[0].imgList)
          } else {
            that.setData({
              ltlb: ltlba.concat(ltlbs),
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
  ltxq(e){
    var that = this;
    console.log(e.currentTarget.dataset)
    that.setData({
      index:e.currentTarget.dataset
    })
    console.log(that.data.index)
    console.log(that.data.ltlb[that.data.index.index])
    console.log(that.data.ltlb[that.data.index.index].entity.id)
    wx.request({
      //@PostMapping("/insertViewNumberByOpenidAndJudge")
      method:'POST',
      url:API+'/content/insertViewNumberByOpenidAndJudge',
      // url: 'https://messi10zlj.xyz/tooth/gk.php',
      data: {
        openid:app.globalData.openid,
        judge:that.data.ltlb[that.data.index.index].entity.id,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
      console.log(res.data)
      }
    })
    console.log(that.data.ltlb[that.data.index.index].entity)
    wx.navigateTo({
      url: '../ltpl/ltpl?id='+that.data.ltlb[that.data.index.index].entity.id+'&avatarUrl='+that.data.ltlb[that.data.index.index].entity.imgUrl+'&picUrl='+that.data.ltlb[that.data.index.index].entity.picUrl+'&nickName='+that.data.ltlb[that.data.index.index].entity.nickName+'&content='+that.data.ltlb[that.data.index.index].entity.content+'&title='+that.data.ltlb[that.data.index.index].entity.title+'&time='+that.data.ltlb[that.data.index.index].timeFix
     })
  },
  onChange(e) {
    console.log(e.detail)
    this.setData({
      value: e.detail,
    });
    
  },
  onSearch() {
    this.Toast(this.data.value);
  },
  onClick() {
    this.Toast(this.data.value);
  },
  Toast(value){
    console.log(value)
    var that = this;
    that.data.ltlb = '';
    that.data.page = 1;
    console.log(that.data.ltlb)
    console.log(that.data.pagesize )
    console.log(that.data.page)
	  wx.request({
      //@GetMapping("/findForumItemByTitleAndPageAndCount")
      method:'GET',
      url:API+'/content/findForumItemByTitleAndPageAndCount',
      data: {
        page: that.data.page,
        count: that.data.pagesize,
        title:value,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data)
        var ltlba = that.data.ltlb;
        if (res.data.length > 0) {
          if (that.data.page == 1) {
            ltlba = []
          }
          var ltlbs = res.data;
          if (ltlbs.length < that.data.pagesize) {
            that.setData({
              ltlb: ltlba.concat(ltlbs),
              hasMore: false,
              dataILu: false,
            })
            console.log(that.data.ltlb)
            console.log(that.data.ltlb[0].imgList)
          } else {
            that.setData({
              ltlb: ltlba.concat(ltlbs),
              hasMore: true,
              dataILu: true,
              page: that.data.page + 1
            })
          }
        }else{
          wx.showToast({
            title: '没有内容哦',
            icon: 'error'
          });
          that.setData({
            ltlb: '',
            hasMore: false,
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
  onPullDownRefresh: function () {
    console.log('--------下拉刷新-------')
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.fyjz();
  },
  swichNav1() {
    console.log("非医生身份返回首页");
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
  swichNav6() {
    console.log("医生身份返回首页")
    wx.redirectTo({
      url: '../../../pages2/pages/index/index',
    })
  },
  swichNav7() {
    wx.redirectTo({
      url: '../../../pages2/pages/logs/logs',
    })
  },
  swichNav8() {
    wx.redirectTo({
      url: '../../../pages2/pages/mine/mine',
    })
  },
//返回顶部
  gotop:function(e){
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },

  //我的论坛点击事件
  plus: function () {
    if (this.data.isPopping) {
      //缩回动画
      popp.call(this);
      this.setData({
        isPopping: false
      })
    } else {
      //弹出动画
      takeback.call(this);
      this.setData({
        isPopping: true
      })
    }
  },
  xzfb: function () {
  console.log(1)
  wx.navigateTo({
    url: '../ltfb/ltfb',
  })
  },
  wdxx: function () {
    console.log(2)
    wx.navigateTo({
      url: '../wdfbtz/wdfbtz',
    })
  },
});

//弹出动画
function popp() {
  //plus顺时针旋转
  var animationPlus = wx.createAnimation({
    duration: 500,
    timingFunction: 'ease-out'
  })
  var animationcollect = wx.createAnimation({
    duration: 500,
    timingFunction: 'ease-out'
  })
  var animationTranspond = wx.createAnimation({
    duration: 500,
    timingFunction: 'ease-out'
  })
  var animationInput = wx.createAnimation({
    duration: 500,
    timingFunction: 'ease-out'
  })
  animationPlus.rotateZ(180).step();
  animationcollect.translate(-100, -100).rotateZ(180).opacity(1).step();
  animationTranspond.translate(-140, 0).rotateZ(180).opacity(1).step();
  animationInput.translate(-100, 100).rotateZ(180).opacity(1).step();
  this.setData({
    animationPlus: animationPlus.export(),
    animationcollect: animationcollect.export(),
    animationTranspond: animationTranspond.export(),
    animationInput: animationInput.export(),
  })
}
//收回动画
function takeback() {
  //plus逆时针旋转
  var animationPlus = wx.createAnimation({
    duration: 500,
    timingFunction: 'ease-out'
  })
  var animationcollect = wx.createAnimation({
    duration: 500,
    timingFunction: 'ease-out'
  })
  var animationTranspond = wx.createAnimation({
    duration: 500,
    timingFunction: 'ease-out'
  })
  var animationInput = wx.createAnimation({
    duration: 500,
    timingFunction: 'ease-out'
  })
  animationPlus.rotateZ(0).step();
  animationcollect.translate(0, 0).rotateZ(0).opacity(0).step();
  animationTranspond.translate(0, 0).rotateZ(0).opacity(0).step();
  animationInput.translate(0, 0).rotateZ(0).opacity(0).step();
  this.setData({
    animationPlus: animationPlus.export(),
    animationcollect: animationcollect.export(),
    animationTranspond: animationTranspond.export(),
    animationInput: animationInput.export(),
  })
}