// pages/chooseproject/chooseproject.js
const app = getApp()
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
    this.setData({
      projects: app.globalData.projects
    })
  },
  changestatus: function (e) {
    var that = this
    var id = e.currentTarget.dataset.id
    var projects = this.data.projects
    // var projectsorigin=this.data.projects
    for (var i = 0; i < projects.length; i++) {
      if (projects[i].dataId == id) {
        console.log(id)
        console.log(i)
        var num = i
        if (!projects[i].isCollection) {
          wx.request({
            url: 'https://www.yxpss.top/main/add/data', //仅为示例，并非真实的接口地址
            method: "POST",
            data: {
              dataId: id,
              openid: app.globalData.openid
            },
            header: {
              "Content-Type": "application/x-www-form-urlencoded",
              "token": app.globalData.usertoken
            },
            success(res) {
              var projects = that.data.projects
              console.log(num)
              console.log(res.data)

              if (res.data.code == 200) {
                console.log(projects[num])
                wx.hideLoading()
                projects[num].isCollection = 1
                wx.showModal({
                  content: '收藏成功!',
                  icon: 'success',
                  duration: 2000,
                  showCancel: false
                })
                that.setData({
                  projects: projects
                })
              } else if (res.data.code == 201) {
                wx.hideLoading()
                projects[num].isCollection = 0
                wx.showModal({
                  content: '收藏失败!',
                  icon: 'false',
                  duration: 2000,
                  showCancel: false
                })
                that.setData({
                  projects: projects
                })

              } else if (res.data.code == 301) {
                wx.hideLoading()
                projects[num].isCollection = 0
                wx.showModal({
                  content: '系统超时',
                  icon: 'none',
                  duration: 2000,
                  showCancel: false
                })
                that.setData({
                  projects: projects
                })
              }

            },

          })
        }else{
          wx.showModal({
            content:'您已收藏',
            showCancel:false,
            duration:2000
          })
        }

      }

    }
    app.globalData.projects = projects
    this.setData({
      projects: projects,
    })


  },
  reback: function () {
    wx.redirectTo({
      url: '/pages/chooseschool/chooseschool',
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