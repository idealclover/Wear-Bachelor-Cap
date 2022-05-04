// pages/combine/combine.js
import Poster from "../../libs/wxa-plugin-canvas/poster/poster"
const app = getApp();
Page({
  data: {
    posters: [],
    successNum: 0,
    posterConfig: {}
  },

  onLoad: function (options) {
    wx.getImageInfo({
      src: app.globalData.bgPic,
      success: res => {
        this.bgPic = res.path;
        console.log(this.bgPic)
        this.draw();
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  draw() {
    let scale = app.globalData.scale;
    let rotate = app.globalData.rotate;
    let hat_center_x = app.globalData.hat_center_x;
    let hat_center_y = app.globalData.hat_center_y;
    let currentHatId = app.globalData.currentHatId;
    const pc = wx.createCanvasContext("myCanvas");
    const hat_size = 100 * scale;

    pc.clearRect(0, 0, 300, 300);
    pc.drawImage(this.bgPic, 0, 0, 300, 300);
    pc.translate(hat_center_x, hat_center_y);
    pc.rotate((rotate * Math.PI) / 180);
    pc.drawImage(
      "../../image/" + currentHatId + ".png", -hat_size / 2, -hat_size / 2,
      hat_size,
      hat_size
    );
    pc.draw();
  },
  savePic() {
    wx.showLoading({
      mask: true,
      title: '生成中'
    })
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      height: 300,
      width: 300,
      canvasId: "myCanvas",
      success: res => {
        app.globalData.successPic = res.tempFilePath;
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: res => {
            this.onPosterSuccess({
              detail: 'start'
            });
            // console.log("success:" + res);
          },
          fail(e) {
            console.log("err:" + e);
          }
        });
      }
    });
  },
  onPosterSuccess(e) {
    const {
      detail
    } = e;
    console.log(detail)
    const successNum = this.data.successNum;
    if (detail != 'start') this.data.posters = this.data.posters.concat([{
      id: successNum,
      url: detail
    }]);
    if (successNum >= 4) {
      app.globalData.posters = this.data.posters;
      console.log(app.globalData.posters);
      wx.hideLoading();
      wx.navigateTo({
        url: "../post/post"
      });
    } else {
      this.setData({
        successNum: successNum + 1,
        posterConfig: {
          width: 1240,
          height: 1754,
          backgroundColor: "#fff",
          debug: false,
          pixelRatio: 1,
          blocks: [],
          texts: [],
          images: [{
              width: 1240,
              height: 1754,
              x: 0,
              y: 0,
              borderRadius: 0,
              url: "/image/posters/" + (successNum + 1) + ".jpg"
            },
            {
              width: 656,
              height: 656,
              x: 292,
              y: 246,
              url: app.globalData.successPic
            },
          ]
        }
      }, () => {
        setTimeout(function () {
          Poster.create(true);
        }, 50)
      });
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let successPic = app.globalData.successPic ?
      app.globalData.successPic :
      "https://image.idealclover.cn/projects/Wear-Bachelor-Cap/avatar_share.jpg";
    return {
      title: "戴上学士帽，我们毕业啦！！",
      imageUrl: successPic,
      path: "/pages/index/index",
      success: function (res) {}
    };
  }
});