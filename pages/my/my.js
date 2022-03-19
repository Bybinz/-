// pages/my/my.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isuserauth: false,
    havedui: false,
    msglist: [{
        id: 0,
        img: 'https://cloud-minapp-40414.cloud.ifanrusercontent.com/1lmsFwUciEoO4nmr.png',
        txts: '浏览历史'
      },
      {
        id: 1,
        img: 'https://cloud-minapp-40414.cloud.ifanrusercontent.com/1lmsFwuQSLuz5McG.png',
        txts: '我的题库'
      },
      {
        id: 2,
        img: 'https://cloud-minapp-40414.cloud.ifanrusercontent.com/1lmsFwvCGHN6D9ml.png',
        txts: '我的收藏'
      },
      {
        id: 3,
        img: 'https://cloud-minapp-40414.cloud.ifanrusercontent.com/1lmsFwRLOU9aeEyh.png',
        txts: '意见反馈'
      },
     

    ],
    gender: ['女', '男'],
    gender1:['男', '女'],
  },
  getfucid:function(e){
    console.log(e.currentTarget.dataset.fucid)
    if(!app.globalData.usertoken){
      wx.showModal({
        content: '登录才能体验更多功能喔',
        showCancel: false,
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }else{
      if(e.currentTarget.dataset.fucid==0){
        wx.redirectTo({
          url: '/pages/myliulan/myliulan',
        })
      }else if(e.currentTarget.dataset.fucid==1||e.currentTarget.dataset.fucid==2){
        wx.redirectTo({
          url: '/pages/mycollect/mycollect?fucid='+e.currentTarget.dataset.fucid,
        })
      }else if(e.currentTarget.dataset.fucid==3){
         wx.redirectTo({
           url: '/pages/publish/publish',
         })
      }
    }
     
  },
  nameinput:function(e){
    this.setData({
      namevalue:e.detail.value
    })
  },
  sexinput:function(e){
    this.setData({
      sexvalue:e.detail.value
    })
  },
  educationinput:function(e){
    this.setData({
      educationvalue:e.detail.value
    })
  },
  phoneinput:function(e){
    this.setData({
      phonevalue:e.detail.value
    })
  },
  qqinput:function(e){
    this.setData({
      qqvalue:e.detail.value
    })
  },
  submititem: function (e) {
    var usertrueinfo=this.data.usertrueinfo
    usertrueinfo.username=this.data.namevalue
    usertrueinfo.username=this.data.namevalue
    usertrueinfo.username=this.data.namevalue
    usertrueinfo.username=this.data.namevalue
    usertrueinfo.username=this.data.namevalue
    
  },
  tologin: function () {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  editinfo: function () {
    this.setData({
      havedui:true
    })
  },
  getUserProfile: function (e) {
    var that = this
    wx.getUserProfile({
      desc: '业务需要',
      success: function (res) {
        console.log(res.userInfo)
        wx.setStorageSync('userwxinfo', res.userInfo)
        app.globalData.userwxinfo = res.userInfo
        wx.navigateTo({
          url: '/pages/login/login',
        })
        that.setData({
          isuserauth: true
        })
      },
      fail() {
        wx.showModal({
          content: "授权失败",
          showCancel: false,
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定')
              that.setData({
                isuserauth: false
              })
            }
          }
        })
      }
    })


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      scheight:app.globalData.height
    })
    if (app.globalData.pageid == 'login') {
      this.setData({
        isuserauth: true
      })
    }
    if (this.data.isuserauth) {
      this.setData({
        userwxinfo: wx.getStorageSync('userwxinfo'),
        usertruename: app.globalData.usertruename,
        usertrueinfo:app.globalData.usertrueinfo,
        havelogin:app.globalData.havelogin
      })
    } else {
      console.log("用户还未授权")
    }
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