import logger from '../../../utils/logger';
// eslint-disable-next-line no-undef
var app = getApp();
const API = app.globalData.requestHeader;
// eslint-disable-next-line no-undef
Page({

  /**
   * 页面的初始数据
   */
  data: {
    conversationName: '',
    conversation: {},
    messageList: [],
    isShow: false,
    showImage: false,
    showChat: true,
    conversationID: '',
    config: {
      sdkAppID: '',
      userID: '',
      userSig: '',
      type: 1,
      tim: null,
    },
    unreadCount: 0,
    id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this;
    that.setData({
      id:options.id
    })
    const { config } = that.data;
    config.sdkAppID = app.globalData.SDKAppID;
    config.userID = app.globalData.userInfo.userID;
    config.userSig = app.globalData.userInfo.userSig;
    config.tim = wx.$TUIKit;
    that.setData({
      config,
    }, () => {
      that.TRTCCalling = that.selectComponent('#tui-calling');
      that.TRTCCalling.init();
    });
    // conversationID: C2C、 GROUP
    logger.log(`| TUI-chat | onLoad | conversationInfomation: ${options.conversationInfomation}`);
    const   payloadData = JSON.parse(options.conversationInfomation);
    const unreadCount = payloadData.unreadCount ? payloadData.unreadCount : 0;
    that.setData({
      conversationID: payloadData.conversationID,
      unreadCount,
    });
    wx.$TUIKit.setMessageRead({ conversationID: that.data.conversationID }).then(() => {
      logger.log('| TUI-chat | setMessageRead | ok');
    });
    wx.$TUIKit.getConversationProfile(that.data.conversationID).then((res) => {
      const { conversation } = res.data;
      that.setData({
        conversationName: that.getConversationName(conversation),
        conversation,
        isShow: conversation.type === 'GROUP',
      });
      wx.request({
        //@GetMapping("/findEmpowerInfoById")
        method:'GET',
        url:API+'/verification/findEmpowerInfoById',
        // url: 'https://messi10zlj.xyz/tooth/zhuanh.php',
        data: {
          id:that.data.id,
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log(res.data)
          
          that.setData({
            conversationName: res.data.name,
          });
        }
      }) 
    });
  },
  /**
 * 生命周期函数--监听页面卸载
 */
  onUnload() {
    this.TRTCCalling.destroyed();
  },
  getConversationName(conversation) {
    if (conversation.type === '@TIM#SYSTEM') {
      this.setData({
        showChat: false,
      });
      return '系统通知';
    }
    if (conversation.type === 'C2C') {
      return conversation.remark || conversation.userProfile.nick || conversation.userProfile.userID;
    }
    if (conversation.type === 'GROUP') {
      return conversation.groupProfile.name || conversation.groupProfile.groupID;
    }
  },
  sendMessage(event) {
    // 将自己发送的消息写进消息列表里面
    this.selectComponent('#message-list').updateMessageList(event.detail.message);
  },
  showMessageErrorImage(event) {
    this.selectComponent('#message-list').sendMessageError(event);
  },
  triggerClose() {
    this.selectComponent('#message-input').handleClose();
  },
  handleCall(event) {
    if (event.detail.groupID) {
      this.TRTCCalling.groupCall(event.detail);
    } else {
      this.TRTCCalling.call(event.detail);
    }
  },
  goBack() {
    // eslint-disable-next-line no-undef
    const pages = getCurrentPages(); // 当前页面栈
    if (pages[pages.length - 2].route === '/pages/pages1/yyqk/yyqk2/yyqk2') {
      wx.navigateBack({
        delta: 2,
      });
    } else {
      wx.navigateBack({
        delta: 1,

      });
    }
    this.TRTCCalling.destroyed();
    wx.$TUIKit.setMessageRead({
      conversationID: this.data.conversationID,
    }).then(() => {});
  },
  changeMemberCount(event) {
    this.selectComponent('#group-profile').updateMemberCount(event.detail.groupOptionsNumber);
  },
  resendMessage(event) {
    this.selectComponent('#message-input').onInputValueChange(event);
  },
});
