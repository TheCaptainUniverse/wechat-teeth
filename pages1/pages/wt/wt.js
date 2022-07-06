// pages1/yljg/yljg.js
Page({
  data: {
    activeName: '',
  },
  onChange(event) {
    this.setData({
      activeName: event.detail,
    });
  },
});
