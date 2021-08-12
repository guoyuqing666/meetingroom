var db = wx.cloud.database();
var app = getApp();
Page({
  options: {
    addGlobalClass: true,
  },
  data: {
    avatarUrl: '',
    nickName: '',
    order: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { //通过openid获取到数据库中的用户信息
    db.collection('userInfo').where({
      _openid: app.globalData.openid
    }).get({
      success: res => {
        console.log(res.data)
        this.setData({
          avatarUrl: res.data[0].avatarUrl,
          nickName: res.data[0].userInfo.nickName,
        })
      },
      fail: err => {
        console.error(' 调用数据库失败', err)
      }
    })

    //获取个人最新预定时间
    db.collection('order').orderBy('startTime', 'desc').where({
      username: app.globalData.username
    }).get({
      success: res => {
        this.setData({
          order: res.data[0].startTime
        })
      },
      fail: err => {
        console.error(' 调用数据库失败', err)
      }
    })

  },
  goAbout: function () {
    wx.navigateTo({
      url: '../about/about',
    })

  },
  busTime() {
    console.log('ggggggggg')
    wx.previewImage({
      urls: ['cloud://cloud1-3gyawfuoa1e6708d.636c-cloud1-3gyawfuoa1e6708d-1306884350/微信图片_20210812215317.png'],
      current: 'cloud://cloud1-3gyawfuoa1e6708d.636c-cloud1-3gyawfuoa1e6708d-1306884350/微信图片_20210812215317.png'
    })

  },

  showNewscode() {
    wx.previewImage({
      urls: ['cloud://meeting-ghimf.6d65-meeting-ghimf/newsCode.png'],
      current: 'cloud://meeting-ghimf.6d65-meeting-ghimf/newsCode.png' // 当前显示图片的http链接      
    })
  },
  showOurcode() {
    wx.serviceMarket.invokeService({
      service: 'wx79ac3de8be320b71', // '固定为服务商OCR的appid，非小程序appid',
      api: 'OcrAllInOne',
      data: {
        //img_url: "cloud://meeting-ghimf.6d65-meeting-ghimf/newsCode.png",
        // 用 CDN 方法标记要上传并转换成 HTTP URL 的文件
         img_url: new wx.serviceMarket.CDN({
           type: 'photo',
           filePath: 'cloud://meeting-ghimf.6d65-meeting-ghimf/newsCode.png',
         }),
        data_type: 3,
        ocr_type: 8,
      },
    }).then(res => {
      console.log('invokeService success', res)
      wx.showModal({
        title: 'cost',
        content: (Date.now() - d) + '',
      })
    }).catch(err => {
      console.log( err)
      console.log( JSON.stringify(err))
      console.error( JSON.stringify(err))
      wx.showModal({
        title: 'fail',
        content: err + '',
      })
    })
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

  }
})