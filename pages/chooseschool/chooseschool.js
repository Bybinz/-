// pages/chooseschool/chooseschool.js
const app=getApp()
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
    console.log(options)
    this.getschool(app.globalData.chooseschoolinfo)
    // this.getschool(options.scinfo)
  },
  reback: function () {
    wx.navigateBack({
      delta: 1,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getschool: function (scinfo) {
    // // 实例化查询对象
    // var that = this
    // let query = new wx.BaaS.Query()

    // // 设置查询条件（比较、字符串包含、组合等）
    // //...

    // // 应用查询对象
    // let Product = new wx.BaaS.TableObject('school_article')
    // Product.setQuery(query).find().then(res => {
    //   // success
    //   console.log(res.data.objects)
    //   var schList = []
    //   var schoolitem={}
    //   for (var i = 0; i < res.data.objects.length; i++) {
    //        schoolitem.name=res.data.objects[i].school
    //        schoolitem.level=res.data.objects[i].level
    //        schList.push(schoolitem)
    //        schoolitem={}
           
    //   }
    //   that.setData({
    //     schList:schList
    //   })
    // }, err => {
    //   // err
    // })
    this.setData({
      schList:scinfo
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  toproject:function(e){
  console.log(e.currentTarget.dataset.sc)
  var sc=e.currentTarget.dataset.sc
  app.globalData.sc=e.currentTarget.dataset.sc
     wx.request({
      url: 'https://www.yxpss.top/main/find/data/by/school', //仅为示例，并非真实的接口地址
      method: "POST",
      data: {
        schoolName:sc,
        openid:app.globalData.openid
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "token":app.globalData.usertoken
      },
      success(res) {
        console.log(res.data)
      
        if(res.data.code==200){
          wx.hideLoading()
          app.globalData.projects=res.data.data
          wx.redirectTo({
            url: '/pages/chooseproject/chooseproject',
          })
          
        }else if(res.data.code==201 &&res.data.message=="暂未开放"){
          wx.hideLoading()
          wx.showModal({
            content: '暂未开放',
            icon: 'none',
            duration: 2000,
            showCancel: false
          })
      
        }else if(res.data.code==301){
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