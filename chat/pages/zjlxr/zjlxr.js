// pages/pages1/zjlxr/zjlxr.js
import logger from '../../../utils/logger';

// eslint-disable-next-line no-undef
Page({

  /**
   * 页面的初始数据
   */
  data: {
    conversationList: [],
    showSelectTag: false,
    array: [
      { name: '发起会话' },
      { name: '发起群聊' },
      { name: '加入群聊' },
    ],
    index: Number,
    unreadCount: 0,
    conversationInfomation: {},
    transChenckID: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    // 登入后拉去会话列表
    wx.$TUIKit.on(wx.$TUIKitEvent.CONVERSATION_LIST_UPDATED, this.onConversationListUpdated, this);
    this.getConversationList();
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    wx.$TUIKit.off(wx.$TUIKitEvent.CONVERSATION_LIST_UPDATED, this.onConversationListUpdated);
  },
  // 跳转到子组件需要的参数
  handleRoute(event) {
    const flagIndex = this.data.conversationList.findIndex(item => item.conversationID === event.currentTarget.id);
    this.setData({
      index: flagIndex,
    });
    this.getConversationList();
    this.data.conversationInfomation = { conversationID: event.currentTarget.id,
      unreadCount: this.data.conversationList[this.data.index].unreadCount };
    const url = `../TUI-Chat/chat?conversationInfomation=${JSON.stringify(this.data.conversationInfomation)}`;
    wx.navigateTo({
      url,
    });
  },
  // 更新会话列表
  onConversationListUpdated(event) {
    logger.log('| TUI-conversation | onConversationListUpdated | ok');
    this.setData({
      conversationList: event.data,
    });
  },
  // 获取会话列表
  getConversationList() {
    wx.$TUIKit.getConversationList().then((imResponse) => {
      logger.log(`| TUI-conversation | getConversationList | getConversationList-length: ${imResponse.data.conversationList.length}`);
      this.setData({
        conversationList: imResponse.data.conversationList,
      });
    });
  },
  // 展示发起会话/发起群聊/加入群聊
  showSelectedTag() {
    this.setData({
      showSelectTag: !this.data.showSelectTag,
    });
  },


  // 返回主页
  goHomePage() {

    wx.navigateBack({
      delta: 1,
    })
  },
  // 点击空白区域关闭showMore弹窗
  handleEditToggle() {
    this.setData({
      showSelectTag: false,
    });
  },
  // 跳转事件路径
  $createConversation() {
    wx.navigateTo({
      url: '../create-conversation/create',
    });
  },
  $createGroup() {
    wx.navigateTo({
      url: '../../TUI-Group/create-group/create',
    });
  },
  $joinGroup() {
    wx.navigateTo({
      url: '../../TUI-Group/join-group/join',
    });
  },
  transCheckID(event) {
    this.setData({
      transChenckID: event.detail.checkID,
    });
  },
});
