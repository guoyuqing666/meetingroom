// pages/jyty/jyty.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  // loginQuestion() {
  //   var that = this
  //   console.log('ggggggggg')
  //   wx.cloud.downloadFile({
  //     fileID: 'cloud://cloud1-3gyawfuoa1e6708d.636c-cloud1-3gyawfuoa1e6708d-1306884350/1123.docx', // 文件 ID
  //     // 下载云存储里的文件
  //     success(res){
  //       console.log("文件下载成功",res)
  //       // return
  //       // 因为一开始直接调用wx.getFileSystemManager().saveFile接口没反应，我只好又加了个下载本地缓存的文件
  //       // 后来一点一点改动完成，经过测试后这个下载本地文件的接口可有可无，但是朋友们如果不能运行函数的话可以加上这个接口试试
  //       wx.downloadFile({
  //         url: res.tempFilePath,
  //         success(res){
  //           console.log(res)
  //           that.setData({
  //             filePath: '/' + "登录操作"+ /\.[^\.]+$/.exec(res.tempFilePath)[0],
  //           })
  //           // 现在获取到的tempFilePath才可以用了，我就开始调用全局文件接口
  //           wx.getFileSystemManager().saveFile({
  //             tempFilePath: res.tempFilePath,
  //             // 一开始直接把变量写在wx.env.USER_DATA_PATH后，没反应，然后就把东西放在data里，这个时候手机端可以下载并打开了，但是windows还是没反应
  //             filePath: wx.env.USER_DATA_PATH + that.data.filePath,
  //             // 下边这条语句是我一开始用的
  //             // filePath: wx.env.USER_DATA_PATH + "/" + bianliangming（这个是变量名） + "文件名"（这个是字符串） + /\.[^\.]+$/.exec(res.tempFilePath)[0]（这个是正则表达式）
  //             success(res) {
  //               console.log('save ->', res) // 上传文件结果
  //               wx.showToast({
  //                 title: '文件已保存至：' + res.savedFilePath,
  //                 icon: 'none',
  //                 duration: 15000
  //               })
  //               //console.log('文件保存至：'+res.savedFilePath)
  //               // 打开该文件
  //               wx.openDocument({
  //                 filePath: res.savedFilePath,
  //                 success: function (res) {
  //                   console.log('打开文档成功')
  //                 }
  //               })
  //             }
  //           })
  //         }
  //       })

  //     },
  //     fail(err){
  //       console.log("文件下载失败",err)
  //     }
  //   })

  //     }


  // 下载并预览文件
  loginQuestion: function (e) {
    console.log(e);
    let url = e.currentTarget.dataset.url;
    wx.cloud.downloadFile({
      fileID: 'cloud://cloud1-3gyawfuoa1e6708d.636c-cloud1-3gyawfuoa1e6708d-1306884350/1123.docx'
    }).then(res => {
      console.log("获取临时链接成功", res.tempFilePath)
      var filePath = res.tempFilePath;
      console.log(filePath);
      wx.openDocument({
        filePath: filePath,
        success: function (res) {
          console.log('打开文档成功')
        },
        fail: function (res) {
          console.log('打开文档失败', res);
        },
        complete: function (res) {
          console.log(res);
        }
      })
    })
  }



})