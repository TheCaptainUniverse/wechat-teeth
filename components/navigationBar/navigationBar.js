Component({
  properties: {
    navigationBarType:{
      value:'default',
      type:Boolean
    },
    noticeText:{
      value:'通知',
      type:String
    },
    showTitle:{
      value:true,
      type:Boolean
    },
    showBack:{
      value:true,
      type:Boolean
    },
    showHome:{
      value:true,
      type:Boolean
    },
    title:{
      value: '标题',
      type:String
    },
    backgroundColor:{
        value:'#B0D8E4',
        type:String
    },
    textColor:{
      value:'#ffffff',
      type:String
  }
  },
  data:{
    navigationBarType:'default',
    noticeText:'通知',
    showTitle:true,
    showBack:true,
    showHome:true,
    title: '标题',
    noticeBarStyle: wx.getStorageSync('noticeBarStyle'),
    // 状态栏高度
    statusBarHeight: wx.getStorageSync('statusBarHeight') + 'px',
    // 导航栏高度
    navigationBarHeight: wx.getStorageSync('navigationBarHeight') + 'px',
    // 胶囊按钮高度
    menuButtonHeight: wx.getStorageSync('menuButtonHeight') + 'px',
    // 导航栏和状态栏高度
    navigationBarAndStatusBarHeight: wx.getStorageSync('statusBarHeight') +
      wx.getStorageSync('navigationBarHeight') +
      'px'
  },
    methods: {
      onBack()
    {
      wx.navigateBack({
        delta:1
      })
    },
    onHome()
    {
      wx.switchTab({
        url: '/pages1/pages/index/index',
      })
    }
    },
  
})