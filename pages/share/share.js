// pages/share.js
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    actionSheetHidden: true,
  },
  actionSheetTap: function() {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  listenerActionSheet: function() {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  onLoad: function() {
    let successPic = app.globalData.successPic ?
      app.globalData.successPic :
      "https://image.idealclover.cn/projects/Wear-Bachelor-Cap/avatar.jpg";
    // : "https://idealclover.top/icon.jpg";
    const posterConfig = {
      width: 840,
      height: 1280,
      backgroundColor: "#fff",
      debug: false,
      pixelRatio: 1,
      blocks: [],
      texts: [],
      images: [{
          width: 840,
          height: 1280,
          x: 0,
          y: 0,
          borderRadius: 0,
          url: "https://image.idealclover.cn/projects/Wear-Bachelor-Cap/bg.png"
        },
        {
          width: 670,
          height: 670,
          x: 85,
          y: 211,
          url: successPic
        },
      ]
    };
    this.setData({
      posterConfig: posterConfig
    });
  },

  onPosterSuccess(e) {
    const {
      detail
    } = e;
    wx.previewImage({
      current: detail,
      urls: [detail]
    });
  },
  onPosterFail(err) {
    console.error(err);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    let successPic = app.globalData.successPic ?
      app.globalData.successPic :
      "https://image.idealclover.cn/projects/Wear-Bachelor-Cap/avatar_share.jpg";
    return {
      title: "戴上学士帽，我们毕业啦！",
      imageUrl: successPic,
      path: "/pages/index/index",
      success: function(res) {}
    };
  }
});