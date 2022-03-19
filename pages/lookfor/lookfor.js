// pages/lookfor/lookfor.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index1: 0,
    index2: 0,
    array1: ['无', '太原理工大学', '中北大学', '山西大学'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  checkschool: function (e) {
    if(this.data.index1==0){
      wx.showModal({
        content:'请先选择学校',
        showCancel:false
      })
    }
  },
  formsubmit:function(e){
  console.log(e)
  },
  bindPickerChange2: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index2: e.detail.value
    })
  },
  bindPickerChange1: function (e) {
    var that=this
    console.log(this.data.array1[e.detail.value])
    this.setData({
      index1: e.detail.value
    })
    wx.request({
      url: 'https://www.yxpss.top/user/register/find/major/by/schoolName', //仅为示例，并非真实的接口地址
      method: "POST",
      data: {
        schoolName: this.data.array1[e.detail.value]
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "token":app.globalData.usertoken // 默认值
      },
      success(res) {
        var departmentname=[]
        console.log(res.data)
        console.log(res.data.data.length)
        
        that.setData({
          departmentname:res.data.data
        })
      }
    })
  },
  checkschool: function (e) {
    if(this.data.index1==0){
      wx.showModal({
        content:'请先选择学校',
        showCancel:false
      })
    }
  },
  tolookfor:function(){
    if(!this.data.index1){
      wx.showModal({
        content:'请先选择学校',
        showCancel:false
      })
    }else{
      wx.showLoading({
        title: '加载中',
      })
      wx.request({
        url: 'https://www.yxpss.top/main/find/senior/students', //仅为示例，并非真实的接口地址
        method: "POST",
        data: {
          schoolName: this.data.array1[this.data.index1],
          major:this.data.departmentname[this.data.index2]
        },
        header: {
          "token":app.globalData.usertoken,
          "Content-Type": "application/x-www-form-urlencoded" // 默认值
        },
        success(res) {
          wx.hideLoading({
            success: (res) => {},
          })
          console.log(res.data)
          app.globalData.contactinfo=res.data.data
          wx.redirectTo({
            url: '/pages/contact_info/contact_info',
          })
         
          
        }
      })
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