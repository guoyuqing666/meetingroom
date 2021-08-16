const db = wx.cloud.database();
const app = getApp();


Page({
  data: {
    code: '',
    avatarUrl: '',
    userInfo: {},
    hide: true,
    isBackTo: true
  },

  userLogin: function () {
    wx.getSetting({ //调用接口判断是否登录
      success: res => { //调用成功调用获取信息API
        console.log('调用getsetting成功');
        wx.getUserProfile({
          success: res => { //调用成功获取用户信息
            console.log('获取信息成功' + res);
            this.setData({ //将用户信息传递给data
              avatarUrl: res.userInfo.avatarUrl,
              userInfo: res.userInfo,
            })

            wx.cloud.callFunction({ //调用云函数，获取用户openid
              name: 'login',
              data: {},
              success: res => { //调用成功并获取到用户openid将openid传递给globalData
                console.log('云函数调用成功')
                console.log(res)
                console.log(res.result.appid)
                console.log('gyq2  ', res.result.openid)
                app.globalData.openid = res.result.openid
                //调云数据库
                console.log('gyq1  ', app.globalData.openid)
                db.collection('userInfo').where({
                  _openid: app.globalData.openid,
                }).get({ //根据openid寻找到对应集合，如果没有记录则添加记录
                  success: res => {
                    if (res.data.length == 0) {
                      console.log('未找到记录，正在添加');
                      db.collection('userInfo').add({
                        data: {
                          avatarUrl: this.data.avatarUrl,
                          userInfo: this.data.userInfo,
                        }
                      })
                      console.log('用户数据添加成功')
                    } else {
                      console.log('已有记录，不添加');
                    }
                  },
                  fail: err => {
                    console.error(' 调用数据库失败', err)
                  }
                })
              },
              fail: err => {
                console.log('aaaaaaaa')
                console.error(' 调用云函数失败', err)
              }


            })


          }
        })
      },
      fail: res => {
        console.log('接口调用失败')
      }
    })
  },

  judgeCode: function (e) {
    let _this = this;
    let dataset = e.currentTarget.dataset;
    let value = e.detail.value
    let changeData = dataset.code;
    _this.data[changeData] = value;
    _this.setData({
      code: _this.data[changeData]
    });
  },

  goIndex: function () { //授权完成跳转到首页
    console.log('gyq', app.globalData.openid)
    db.collection('userInfo').where({
      _openid: app.globalData.openid,
    }).get({
      success: res => {
        if (res.data.length == 0) {
          wx.showToast({
            title: '信息变更，请重新注册信息！',
            icon: 'none',
          })
          console.log('未找到记录，正在添加');
          db.collection('userInfo').add({
            data: {
              avatarUrl: this.data.avatarUrl,
              userInfo: this.data.userInfo,
            }
          })
        }
        db.collection('userInfo').doc(res.data[0]._id).get({
          success: res => { //判断数据库中是否有相应openid的注册数据，如果没有则跳转到注册页面
            if ((res.data.name || res.data.phone) == undefined) {
              wx.reLaunch({
                url: '../register/register',
              })
            } else {
              wx.reLaunch({ //有相关注册数据，跳转到首页
                url: '../index/index',
              })
            }
          }
        })
      }
    })
  },

  goOrder: function () {
    if (this.data.code == '7') {
      this.setData({
        hide: false
      })
    } else if(this.data.code=='1'){
      this.setData({
        hide:false
      },function(){
        wx.reLaunch({ //有相关注册数据，跳转到首页
          url: '../jyty/jyty',
        })
      })


    }else{
      wx.showToast({
        title: '企业代码错误！',
        icon: 'none',
        duration: 2000
      })
    }
  },

  onLoad: function (options) {

    wx.getUserProfile({
      success: res => {
        this.setData({
          avatarUrl: res.userInfo.avatarUrl,
          userInfo: res.userInfo,
        })
      },
      fail: error => {
        console.error(error)
      }
    })

  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
          avatarUrl: res.userInfo.avatarUrl,
          userInfo: res.userInfo,
        })
        wx.cloud.callFunction({ //调用云函数，获取用户openid
          name: 'login',
          data: {},
          success: res => { //调用成功并获取到用户openid将openid传递给globalData
            console.log('云函数调用成功')
            console.log(res)
            console.log(res.result.appid)
            console.log('gyq2  ', res.result.openid)
            app.globalData.openid = res.result.openid
            //调云数据库
            console.log('gyq1  ', app.globalData.openid)
            db.collection('userInfo').where({
              _openid: app.globalData.openid,
            }).get({ //根据openid寻找到对应集合，如果没有记录则添加记录
              success: res => {
                if (res.data.length == 0) {
                  console.log('未找到记录，正在添加');
                  db.collection('userInfo').add({
                    data: {
                      avatarUrl: this.data.avatarUrl,
                      userInfo: this.data.userInfo,
                    }
                  })
                  console.log('用户数据添加成功')
                } else {
                  console.log('已有记录，不添加');
                }
              },
              fail: err => {
                console.error(' 调用数据库失败', err)
              }
            })
          },
          fail: err => {
            console.log('aaaaaaaa')
            console.error(' 调用云函数失败', err)
          }


        })


      }
    })
  },

  onShow: function () {
    // if (this.data.isBackTo) {
    //   this.setData({
    //     hide: true
    //   })
    // }
  }

})