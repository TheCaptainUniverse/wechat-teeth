// pages/web/web.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:'',
    title:'',

  },
  onLoad(options) {
    let that = this;
    let url =decodeURIComponent(options.url);
    let title = decodeURIComponent(options.title);
    if(title == '')
    {
      title = '新闻';
    }
    wx.setNavigationBarTitle({
      title: title // 新标题文本
    })
    that.setData({
      url:url,
      title:title
    })
  },
})