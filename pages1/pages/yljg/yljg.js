const chooseLocation = requirePlugin('chooseLocation')//地图选点结果插件实例
var app = getApp();
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
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
    }, {
      id: 1,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
    }, {
      id: 3,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
    }, {
      id: 4,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
    }, {
      id: 5,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
    }, {
      id: 6,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
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

//   //地图
//   clickMap(e){
//     console.log(e.currentTarget.dataset.index)
//     let that = this;
//     that.setData({
//       xdxh:e.currentTarget.dataset.index,
//       xz:1,
//       weiz:true,
//     })
// 		//获取用户的当前设置。返回值中只会出现小程序已经向用户请求过的权限
// 		wx.getSetting({
// 		success(res){
// 			//console.log(res)
// 			//scope.userLocation 就是地理授权的标志：
// 			//res.authSetting['scope.userLocation'] == undefined 表示初始进入该页面
// 			//res.authSetting['scope.userLocation'] == false 表示非初始化进入该页面 且未授权
// 			//res.authSetting['scope.userLocation'] == true 表示地理位置授权
// 			if(res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true){
// 				//表示非初始化进入该页面 且未授权：
// 				wx.showModal({
// 					title: '请求授权当前位置',
// 					content: '需要获取您的地理位置，请确认授权',
// 					showCancel: true,
// 					cancelText: '取消',
// 					cancelColor: '#000000',
// 					confirmText: '确定',
// 					confirmColor: '#3CC51F',
// 					success: (result) => {
// 						if(res.cancel){
// 							wx.showToast({
// 								title: '拒绝授权',
// 								icon: 'none',
// 								duration: 1000
// 							});
// 						}else if (result.confirm) {
// 							//调起客户端小程序设置界面，返回用户设置的操作结果。 
// 							//设置界面只会出现小程序已经向用户请求过的权限
// 							wx.openSetting({
// 								success: (dataAu) => {
// 								if(dataAu.authSetting["scope.userLocation"] == true) {
// 									wx.showToast({
// 										title: '授权成功',
// 										icon: 'success',
// 										duration: 1000
// 									});
// 									//再次授权之后，调用腾讯位置服务的地图选点插件API
// 									that.callQQPlugin()
// 								}else {
// 										wx.showToast({
// 										title: '授权失败',
// 										icon: 'none',
// 										duration: 1000
// 									});
// 								}
// 								}
// 							});
							
// 						}
// 					}
// 				});
				
// 			}else if(res.authSetting['scope.userLocation'] == undefined){
// 				//调用腾讯位置服务的地图选点插件API
// 				that.callQQPlugin()
// 			}else{
// 				//调用腾讯位置服务的地图选点插件API
// 				that.callQQPlugin()
// 			}
// 		}

// 	  })
// 	},
// 	//调用腾讯位置服务的地图选点插件API
// 	callQQPlugin(){
// 		const key = this.data.key; //使用在腾讯位置服务申请的key
// 		const referer = this.data.referer; //调用插件的app的名称
// 		const latitude = app.globalData.latitude
// 		const longitude = app.globalData.longitude
// 		if(latitude !="" && longitude !=""){
// 			const location = JSON.stringify({
// 			latitude: latitude,
// 			longitude: longitude,
// 			});
// 			wx.navigateTo({
// 				url: 'plugin://chooseLocation/index?key=' + key + '&referer=' + referer + '&location=' + location
// 			});
// 	   }else{
// 			wx.navigateTo({
// 				url: 'plugin://chooseLocation/index?key=' + key + '&referer=' + referer 
// 			});
// 	   }
//   },
//   ////
// 	routePlan1(){
//     console.log(122)
//     var that = this;
//     if(that.data.cs==true){
//       let that = this
//       //获取用户的当前设置。返回值中只会出现小程序已经向用户请求过的权限
//       wx.getSetting({
//       success(res){
        
//         //console.log(res)
//         //scope.userLocation 就是地理授权的标志：
//         //res.authSetting['scope.userLocation'] == undefined 表示初始进入该页面
//         //res.authSetting['scope.userLocation'] == false 表示非初始化进入该页面 且未授权
//         //res.authSetting['scope.userLocation'] == true 表示地理位置授权
//         if(res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true){
//           //表示非初始化进入该页面 且未授权：
//           wx.showModal({
//             title: '请求授权当前位置',
//             content: '需要获取您的地理位置，请确认授权',
//             showCancel: true,
//             cancelText: '取消',
//             cancelColor: '#000000',
//             confirmText: '确定',
//             confirmColor: '#3CC51F',
//             success: (result) => {
//               if(res.cancel){
//                 wx.showToast({
//                   title: '拒绝授权',
//                   icon: 'none',
//                   duration: 1000
//                 });
//               }else if (result.confirm) {
//                 //调起客户端小程序设置界面，返回用户设置的操作结果。 
//                 //设置界面只会出现小程序已经向用户请求过的权限
//                 wx.openSetting({
//                   success: (dataAu) => {
//                   if(dataAu.authSetting["scope.userLocation"] == true) {
//                     wx.showToast({
//                       title: '授权成功',
//                       icon: 'success',
//                       duration: 1000
//                     });
//                     console.log(222)
//                     //再次授权之后，调用腾讯位置服务的路线规划插件API
//                     that.callRoutePlanPlugin()
//                   }else {
//                       wx.showToast({
//                       title: '授权失败',
//                       icon: 'none',
//                       duration: 1000
//                     });
//                   }
//                   }
//                 });
                
//               }
//             }
//           });
          
//         }else if(res.authSetting['scope.userLocation'] == undefined){
//           //调用腾讯位置服务的路线规划插件API
//           that.callRoutePlanPlugin()
//         }else{
//           //调用腾讯位置服务的路线规划插件API
//           that.callRoutePlanPlugin()
//         }
//       }
    
//       })
//     }else{

//     }
//   },
//   routePlan(e){
//     console.log(e.currentTarget.dataset)
//     console.log(this.data.xz)
//     this.setData({
//       xz:0,
//     })
//     if(this.data.xz=='1'){
      
//     }else if(this.data.xz=='0'){
//       this.setData({
//         xdxh:e.currentTarget.dataset.index,
//         latitude: e.currentTarget.dataset.jingdu,
//         longitude: e.currentTarget.dataset.wd,
//         dizhi:e.currentTarget.dataset.wzmc,
//       })
//     }  
//     console.log(1)
//     var that = this;
//     if(that.data.cs==true){
//       let that = this
//       //获取用户的当前设置。返回值中只会出现小程序已经向用户请求过的权限
//       wx.getSetting({
//       success(res){
        
//         //console.log(res)
//         //scope.userLocation 就是地理授权的标志：
//         //res.authSetting['scope.userLocation'] == undefined 表示初始进入该页面
//         //res.authSetting['scope.userLocation'] == false 表示非初始化进入该页面 且未授权
//         //res.authSetting['scope.userLocation'] == true 表示地理位置授权
//         if(res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true){
//           //表示非初始化进入该页面 且未授权：
//           wx.showModal({
//             title: '请求授权当前位置',
//             content: '需要获取您的地理位置，请确认授权',
//             showCancel: true,
//             cancelText: '取消',
//             cancelColor: '#000000',
//             confirmText: '确定',
//             confirmColor: '#3CC51F',
//             success: (result) => {
//               if(res.cancel){
//                 wx.showToast({
//                   title: '拒绝授权',
//                   icon: 'none',
//                   duration: 1000
//                 });
//               }else if (result.confirm) {
//                 //调起客户端小程序设置界面，返回用户设置的操作结果。 
//                 //设置界面只会出现小程序已经向用户请求过的权限
//                 wx.openSetting({
//                   success: (dataAu) => {
//                   if(dataAu.authSetting["scope.userLocation"] == true) {
//                     wx.showToast({
//                       title: '授权成功',
//                       icon: 'success',
//                       duration: 1000
//                     });
//                     console.log(222)
//                     //再次授权之后，调用腾讯位置服务的路线规划插件API
//                     that.callRoutePlanPlugin()
//                   }else {
//                       wx.showToast({
//                       title: '授权失败',
//                       icon: 'none',
//                       duration: 1000
//                     });
//                   }
//                   }
//                 });
                
//               }
//             }
//           });
          
//         }else if(res.authSetting['scope.userLocation'] == undefined){
//           //调用腾讯位置服务的路线规划插件API
//           that.callRoutePlanPlugin()
//         }else{
//           //调用腾讯位置服务的路线规划插件API
//           that.callRoutePlanPlugin()
//         }
//       }
    
//       })
//     }else{

//     }
//   },
//    //
//    callRoutePlanPlugin(){
//     let plugin = requirePlugin('routePlan')//路线规划插件
//     let key = this.data.key; //使用在腾讯位置服务申请的key
//     let referer = this.data.referer; //调用插件的app的名称
//     console.log(this.data.weiz)
//     console.log(this.data.xz)
//     if(this.data.weiz==true&&this.data.weiz==1){
//       var latitude = this.data.latitude1
//       var longitude = this.data.longitude1
//     }else if(this.data.weiz==false&&this.data.weiz==0){
//       var latitude = this.data.latitude
//       var longitude = this.data.longitude
//     }
   
//     this.setData({
//       weiz:false,
//     })
//     if(latitude !="" && longitude !=""){
//       if (this.data.xz=='0') {
//         var endPoint = JSON.stringify({ //终点
//           name:this.data.dizhi,
//           latitude: this.data.latitude,
//           longitude: this.data.longitude
//         })
//       }else{
//         var endPoint = JSON.stringify({ //终点
//           name:this.data.address,
//           latitude:  this.data.latitude1,
//           longitude:  this.data.longitude1
//         })
//       }
      
//       wx.navigateTo({
//         url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer+'&endPoint= ' +endPoint
//       });
//       }else{
//       console.log('请先选择地点')
//     }
//    },
  
//    moveend(e) {
//     let query = wx.createSelectorQuery();
//     let queryString = '.movable-view';
//     query.select(queryString).boundingClientRect();
//     // 屏幕宽度
//     let winwidth = this.data.winwidth;
//     query.exec(function(res){
//         let ballwidth = res[0].width;
//          // 移动过后悬浮球的位置
//         let endPointleft = res[0].left;
//         let endPointright = res[0].right;
//         // 以屏幕中间为界划分屏幕左右两边
//         let leftwin = endPointright < (winwidth / 2);
//         if (leftwin == true) {
//             console.log("我在左边")
//         } else {
//             console.log("我在右边")
//         }
//         if (endPointright >= winwidth || endPointleft <= 0) {
//             console.log("我到边了")
//         }
//     })
// },
// balltap(){
// console.log(1111)
// },
  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://messi10zlj.xyz/tooth/yyzylb.php',	
      data: {
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data)
        that.data.swiperList[0].url=res.data[0].imgList;
        that.data.swiperList[1].url=res.data[1].imgList;
        that.data.swiperList[2].url=res.data[2].imgList;
        that.data.swiperList[3].url=res.data[3].imgList;
        that.data.swiperList[4].url=res.data[4].imgList;
        that.data.swiperList[5].url=res.data[5].imgList;
        that.data.swiperList[6].url=res.data[6].imgList;
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
      url: 'https://messi10zlj.xyz/tooth/yyzy.php',	
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
    console.log(that.data.yyxx[that.data.index.index].ID)
    wx.navigateTo({
      url: '../yljgxqym/yljgxqym?ID='+that.data.yyxx[that.data.index.index].ID
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