// pages/share.js
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [],
  },
  savePic() {
    let swiperList = this.data.swiperList;
    let taskList = [];
    for (let i = 0; i < swiperList.length; i++) {
      taskList.push(new Promise((resolve, reject) => {
        wx.saveImageToPhotosAlbum({
          filePath: swiperList[i].url,
          success: resolve(),
          fail: reject()
        });
      }))
    }
    Promise.all(taskList).then(res => {
      wx.navigateTo({
        url: "../share/share"
      });
    })
  },
  notSavePic() {
    wx.navigateTo({
      url: "../share/share"
    });
  },
  onLoad: function() {
    let successPic = app.globalData.successPic ?
      app.globalData.successPic : "https://image.idealclover.cn/projects/Wear-Bachelor-Cap/avatar.jpg";
    console.log(app.globalData.posters);
    this.setData({
      swiperList: app.globalData.posters
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    let successPic = app.globalData.successPic ?
      app.globalData.successPic : "https://image.idealclover.cn/projects/Wear-Bachelor-Cap/avatar_share.jpg";
    return {
      title: "戴上学士帽，我们毕业啦！",
      imageUrl: successPic,
      path: "/pages/index/index",
      success: function(res) {}
    };
  }
});