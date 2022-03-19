// pages/publish/publish.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courses: [{
      name: "政治"
    }, {
      name: "英语"
    }, {
      name: "高数"
    }, {
      name: "..."
    }],
    imgpaths: [],
    imglen: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (this.data.imgpaths.length == 0) {
      this.setData({
        havechoose: false
      })
    } else {
      this.setData({
        havechoose: true,
        imglen: this.data.imgpaths.length
      })
    }
  },
  chooseimg: function () {
    var that = this
    wx.chooseImage({
      count: 3,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        console.log(res)
        const tempFilePaths = res.tempFilePaths
        var imgpaths = that.data.imgpaths
        if (imgpaths.length < 3) {
          if(tempFilePaths.length==1){
            imgpaths.push(tempFilePaths)
          }else{
            for(var i=0;i<tempFilePaths.length;i++){
              imgpaths.push(tempFilePaths[i])
            }
          }
          that.setData({
            imgpaths: imgpaths,
            havechoose: true,
            imglen: imgpaths.length
          })
        }

      }
    })
  },
  checkinfo: function () {
    if (!this.data.questionvalue || !this.data.phonevalue) {
      wx.showModal({
        content: '请正确填写反馈意见',
        showCancel: false,
        duration: 2000
      })
      return false
    } else if (this.data.imglen == 0) {
      wx.showModal({
        content: '请选择至少一张图片',
        showCancel: false,
        duration: 2000
      })
      return false
    }
    return true
  },
  questioninput: function (e) {
    this.setData({
      questionvalue: e.detail.value
    })
  },
  phoneinput: function (e) {
    this.setData({
      phonevalue: e.detail.value
    })
  },
  reback: function () {
    wx.switchTab({
      url: '/pages/my/my',
    })
  },
  submit: function () {
    if(this.checkinfo()){
      wx.showLoading({
        title: '加载中',
      })
      var context = this.data.questionvalue
      var phone = this.data.phonevalue
      var imgList = this.data.imgpaths
      var that = this
      wx.request({
        url: 'https://www.yxpss.top/user/add/feed/back', //仅为示例，并非真实的接口地址
        method: "POST",
        data: {
          context: context,
          openid: app.globalData.openid,
          name: '',
          contact: phone,
          imgList: imgList
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
          "token": app.globalData.usertoken
        },
        success(res) {
          console.log(res.data)
  
          if (res.data.code == 200) {
            wx.hideLoading()
            wx.showToast({
              title: '提交成功',
              icon: 'success',
              duration: 2000
            })
            that.setData({
              imgpaths: [],
              questionvalue: '',
              phonevalue: '',
              imglen:0
            })
  
          } else if (res.data.code == 201) {
            wx.hideLoading()
            wx.showModal({
              content: '暂未开放',
              showCancel: false,
              duration: 2000
            })
  
          } else if (res.data.code == 301) {
            wx.hideLoading()
            wx.showModal({
              content: '系统超时,请稍后重试',
              icon: 'none',
              duration: 2000,
              showCancel: false
            })
  
          }
  
        },
  
      })
    }
  },
  resetimg:function(){
    this.setData({
      imgpaths:[],
      imglen:0
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