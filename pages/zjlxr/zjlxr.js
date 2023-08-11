import TIM from 'tim-wx-sdk';
import TIMUploadPlugin from 'tim-upload-plugin';
import TIMProfanityFilterPlugin from 'tim-profanity-filter-plugin';
import { SDKAPPID,genTestUserSig,SECRETKEY }  from '../../debug/GenerateTestUserSig';
var app = getApp();

Page({
    data: {
        config: {
            userID: app.globalData.uid, //User ID
            SDKAPPID: SDKAPPID, // Your SDKAppID
            SECRETKEY: SECRETKEY, // Your secretKey
            EXPIRETIME: 604800,
        }
    },

    onLoad() {
      // app.initTIM();
        // const userSig = genTestUserSig(this.data.config).userSig 
        const userSig = app.globalData.userInfo.userSig;
        const userID = app.globalData.uid;
        console.log("userSign",userSig)
        wx.$TUIKit = TIM.create({
            SDKAppID: this.data.config.SDKAPPID
        })
        wx.$chat_SDKAppID = this.data.config.SDKAPPID;
        wx.$chat_userID = userID;
        wx.$chat_userSig = userSig;
        wx.$TUIKitTIM = TIM;
        wx.$TUIKit.registerPlugin({ 'tim-upload-plugin': TIMUploadPlugin });
        wx.$TUIKit.registerPlugin({ 'tim-profanity-filter-plugin': TIMProfanityFilterPlugin });
        wx.$TUIKit.login({
            userID: userID,
            userSig
        });
        wx.setStorage({
            key: 'currentUserID',
            data: [],
        });
        wx.$TUIKit.on(wx.$TUIKitTIM.EVENT.SDK_READY, this.onSDKReady,this);
    },
    onUnload() {
        wx.$TUIKit.off(wx.$TUIKitTIM.EVENT.SDK_READY, this.onSDKReady,this);
    },
    onSDKReady() {
        const TUIKit = this.selectComponent('#TUIKit');
        TUIKit.init();
    }
  });