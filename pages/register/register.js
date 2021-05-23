// pages/register/register.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scheight: app.globalData.height,
    array: ['无','本科', '专科','高中','初中'],
    index:0,
  },
  radiochange: function (e) {
    console.log(e.detail.value)
  },
  bindPickerChange:function(e){
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  formsubmit: function (e) {
    console.log(e.detail.value)
    console.log()
    var userlist=e.detail.value

    userlist.openid=app.globalData.openid
    console.log(userlist.openid)
    
    wx.request({
      url: 'http://139.224.238.170:4000/user/register', //仅为示例，并非真实的接口地址
      method: "POST",
      data: {
        list:userlist
      },
      header: {
        "Content-Type": "application/json"
      },
      success (res) {
        console.log(res.data)
      }
    })
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

  }
})