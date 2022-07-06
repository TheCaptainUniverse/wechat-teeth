// pages1/pages/gly/gly.js
var app = getApp();
import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gly:'',
    winWidth: 0,
    winHeight: 0,
    currentTab: 0,
    index:'',
    sh:'',
    sfsh:'',
    zt:'',
    bq:'',
    value: '',
    show:false,
    xbt:'', 
    columns: ['龋病', '牙髓病', '牙周病', '牙列缺损(失)', '牙列不齐','其他','蔬菜','水果','相关食物','牙刷','牙膏','牙线','牙贴','漱口水'],
  },
  showPopup(e){      //点击选择性别，打开弹出层（选择器）
    this.setData({show:true})
  },
  onClose() {     //点击空白处开闭弹出层（选择器）及选择器左上角的取消
    this.setData({ show: false });
  },
  onConfirm(e){    //选择器右上角的确定，点击确定获取值
    console.log(e.detail.value)
    this.setData({
      xbt:e.detail.value,
      show:false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if(that.data.currentTab==0||that.data.currentTab==''){
      that.fyjz1();
    }else if(that.data.currentTab==1){
      that.fyjz2();
    }
    wx.getSystemInfo( {

      success: function( res ) {
          that.setData( {
              winWidth: res.windowWidth,
              winHeight: res.windowHeight
          });
      }

  });
    if(app.globalData.sf==3){
      that.setData({
       gly:true
      })
     }else{
       that.setData({
         gly:false
        })
     }
  },
  swichNav: function( e ) {

    var that = this;

    if( this.data.currentTab === e.target.dataset.current ) {
        return false;
    } else {
        that.setData( {
            currentTab: e.target.dataset.current
        })
        
    }

},
bindChange: function( e ) {

  var that = this;
  that.setData( { currentTab: e.detail.current });
  console.log(that.data.currentTab)
  if(that.data.currentTab==0||that.data.currentTab==''){
    that.fyjz1();
  }else if(that.data.currentTab==1){
    that.fyjz2();
  }
},
fyjz1:function(){
  var that = this;
  wx.request({
    url: 'https://messi10zlj.xyz/tooth/shnehesf.php',	
    data: {
      page: that.data.page,
      count: that.data.pagesize 
    },
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    success: function (res) {
      console.log(res.data)
      that.setData({
        sfsh:res.data
      })
      

    },
    fail: function (res) {
      
    },
    complete: function (res) {
    
    },
  })
},
fyjz2:function(){
  var that = this;
	  wx.request({
      url: 'https://messi10zlj.xyz/tooth/shnehe.php',	
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          sh:res.data
        })
      },
      fail: function (res) {
        
      },
      complete: function (res) {
      
      },
    })
},

  sfshqk(e){
    var that = this;
    console.log(e.currentTarget.dataset)
    that.setData({
      index:e.currentTarget.dataset
    })
    console.log(that.data.index)
    console.log(that.data.sfsh[that.data.index.index].ID)
    wx.navigateTo({
      url: '../sfsh/sfsh?ID='+that.data.sfsh[that.data.index.index].ID
    })
  },
  shqk(e){
    var that = this;
    console.log(e.currentTarget.dataset)
    that.setData({
      index:e.currentTarget.dataset
    })
    console.log(that.data.index)
    console.log(that.data.sh[that.data.index.index].ID)
    wx.navigateTo({
      url: '../blshxq/blshqx?ID='+that.data.sh[that.data.index.index].ID
    })
  },

  create_sc: function (e) {
    var that = this;
    console.log(e.detail.value)
    console.log(e.detail.value.lj)
    console.log(e.detail.value.title)
    console.log(e.detail.value.xxxx)
    console.log(e.detail.value.ms)
    console.log(e.detail.value.zt)
    console.log(that.data.xbt)
    wx.showModal({
      title: '提示',
      content: '是否上传口腔热点',
      success (res) {
        if (res.confirm) {
          if(e.detail.value.zt==''||e.detail.value.ms==''||e.detail.value.xxxx==''||e.detail.value.title==''||e.detail.value.lj==''||that.data.xbt==''){
            wx.showToast({
              title: '输入的信息不能为空白!',//提示文字
              duration:1000,//显示时长
              mask:true,//是否显示透明蒙层，防止触摸穿透，默认：false  
           })
          }else{
            if(0<=e.detail.value.zt&&e.detail.value.zt<=6){
              that.setData({
                zt:'婴幼儿'
              })
            }else if(7<=e.detail.value.zt&&e.detail.value.zt<=12){
              that.setData({
                zt:'儿童'
              })
            }else if(13<=e.detail.value.zt&&e.detail.value.zt<=17){
              that.setData({
                zt:'青少年'
              })
            }else if(18<=e.detail.value.zt&&e.detail.value.zt<69){
              that.setData({
                zt:'成人'
              })
            }else if(69<e.detail.value.zt){
              that.setData({
                zt:'老年'
              })
            }else{
              that.setData({
                zt:e.detail.value.zt
              })
            }
              wx.request({
              url: 'https://messi10zlj.xyz/tooth/sckqrd.php',
              data: {
                lj:e.detail.value.lj,
                title:e.detail.value.title,
                xxxx:e.detail.value.xxxx,
                ms:e.detail.value.ms,
                zt:that.data.zt,
                xbt:that.data.xbt,
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              success: function (res) {
              console.log(res.data)
              if(res.data==1){
                wx.showToast({
                  title: '上传成功',
                  icon: 'success',
                  duration: 1000,
                  mask: true,
                  success: function() {
                    setTimeout(function() {
                      //要延时执行的代码
                      wx.navigateTo({
                        url: '../gly/gly',
                      })
                    }, 1000) //延迟时间
                  },
                });      
              }
              }
            })
          }
          
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
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
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})