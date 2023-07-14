// pages/rcsc/rcsc.js
const app = getApp();
const API = app.globalData.requestHeader;
Page({
   data: {
    value:"",
    page:1,
    hasMore:true,
    pagesize:5,
    dataILu : false,
    rcsc:"",
  },
    onChange(e) {
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
    onLoad: function (options) {
        var that = this;
        that.fyjz();
      },
    Toast(value){
        console.log(value)
        var that = this;
        that.data.ltlb = '';
        that.data.page = 1;
          wx.request({
            //@GetMapping("/findRecruitmentByPositionLikeAndPageAndCount")
            method:'GET',
            url:API+'/user/findRecruitmentByPositionLikeAndPageAndCount',
          // url: 'https://messi10zlj.xyz/tooth/rcscss.php',	
          data: {
            page: that.data.page,
            count: that.data.pagesize,
            position:value,
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            console.log(res.data)
            if(res.data==0){
                wx.showToast({
                  title: '未查询到信息',
                  icon:'loading', 
                })
            }
            var rcsca = that.data.rcsc;
            if (res.data.length > 0) {
              if (that.data.page == 1) {
                rcsca = []
              }
              var rcscs = res.data;
              if (rcscs.length < that.data.pagesize) {
                that.setData({
                    rcsc: rcsca.concat(rcscs),
                  hasMore: false,
                  dataILu: false,
                })
                console.log(that.data.rcsc)
                console.log(that.data.rcsc[0].gstp)
              } else {
                that.setData({
                  rcsc: rcsca.concat(rcscs),
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
            //@GetMapping("/findRecruitmentByPageAndCount")
            method:'GET',
            url:API+'/user/findRecruitmentByPageAndCount',
          // url: 'https://messi10zlj.xyz/tooth/rcsc.php',	
          data: {
            page: that.data.page,
            count: that.data.pagesize 
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            console.log(res.data)
            var rcsca = that.data.rcsc;
            if (res.data.length > 0) {
              if (that.data.page == 1) {
                rcsca = []
              }
              var rcscs = res.data;
              if (rcscs.length < that.data.pagesize) {
                that.setData({
                    rcsc: rcsca.concat(rcscs),
                  hasMore: false,
                  dataILu: false,
                })
                console.log(that.data.rcsc)
              } else {
                that.setData({
                    rcsc: rcsca.concat(rcscs),
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
      djxq(e){
        var that = this;
        console.log(e.currentTarget.dataset.index)
        that.setData({
          index:e.currentTarget.dataset,
        })
        console.log(that.data.index)
        console.log(that.data.rcsc[that.data.index.index].entity.id)
        wx.navigateTo({
          url: '../rczpxq/rczpxq?id='+that.data.rcsc[that.data.index.index].entity.id
        })
      },
  });