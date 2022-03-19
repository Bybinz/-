// pages/school_detail/school_detail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fclist: [{
      "name": "科研条件"
    }, {
      "name": "导师队伍"
    }, {
      "name": "学费"
    }, {
      "name": "奖贷学金"
    }, {
      "name": "联系方法"
    }, {
      "name": "其他"
    }]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.sc)
    console.log(app.globalData.usertoken)
    this.getschoolinfo(app.globalData.sc)
    this.setData({
      schoolname:app.globalData.sc
    })
  },
  getschoolinfo: function (schoolname) {
    var that = this
    wx.request({
      url: 'https://www.yxpss.top/main/find/schoolInfo', //仅为示例，并非真实的接口地址
      method: "POST",
      data: {
        schoolName: schoolname,
        
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "token": app.globalData.usertoken, // 默认值
      },
      success(res) {
        var departmentname = []
        console.log(res.data)
        that.setData({
          schdetailinfo: res.data.data
        })


      }
    })
  },
  todetail: function (e) {
    var detailinfo = ""
    if (e.currentTarget.dataset.id == "科研条件") {
      detailinfo = this.data.schdetailinfo.scientificResearchCondition
    } else if (e.currentTarget.dataset.id == "导师队伍") {
      detailinfo = this.data.schdetailinfo.tutorInfo
    } else if (e.currentTarget.dataset.id == "学费") {
      detailinfo = this.data.schdetailinfo.schoolTuition
    } else if (e.currentTarget.dataset.id == "奖贷学金") {
      detailinfo = this.data.schdetailinfo.scholarship
    } else if (e.currentTarget.dataset.id == "联系方法") {
      detailinfo = this.data.schdetailinfo.contactInfo
    } else if (e.currentTarget.dataset.id == "其他") {
      detailinfo = this.data.schdetailinfo.otherInfo
    }
     wx.redirectTo({
       url: '/pages/sc_detail_info/sc_detail_info?detailinfo='+detailinfo+"&fucid="+e.currentTarget.dataset.id,
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