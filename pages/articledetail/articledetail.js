// pages/articledetail/articledetail.js
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
    console.log(options)
    this.setData({
      articleid:options.articleid
    })
    console.log(options.schoolname)
    console.log(app.globalData.articles)
    var detailList = {}
    for (var i = 0; i < app.globalData.articles.length; i++) {
      if (options.articleid == app.globalData.articles[i].articleid) {
        detailList = app.globalData.articles[i]
      }
    }
    console.log(detailList)
    this.setData({
      detailList: detailList
    })
    this.addtomyliulan(options.articleid, app.globalData.openid, detailList.article, detailList.firstimg, detailList.secondimg, detailList.title, detailList.type1, detailList.type2)
    this.atiiscollect(options.articleid, app.globalData.openid)
  },
  reback: function () {
    wx.switchTab({
      url: '/pages/first/first',
    })
  },
  addtomyliulan(id, openid, article, firstimg, secondimg, title, type1, type2) {
    wx.request({
      url: 'https://www.yxpss.top/main/add/browser/history', //仅为示例，并非真实的接口地址
      method: "POST",
      data: {
        articleId: id,
        openid: openid,
        article: article,
        firstimg: firstimg,
        secondimg: secondimg,
        title: title,
        type1: type1,
        type2: type2
      },
      header: {
        "Content-Type": "application/json",
        "token": app.globalData.usertoken
      },
      success(res) {
        console.log(res.data)

        if (res.data.code == 200) {
          wx.hideLoading()


        } else if (res.data.code == 201) {
          wx.hideLoading()
          wx.showModal({
            content: '超时',
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
  },
  atiiscollect(id, openid) {
    var that = this
    wx.request({
      url: 'https://www.yxpss.top/main/is/collection', //仅为示例，并非真实的接口地址
      method: "GET",
      data: {
        articleId: id,
        openid: openid
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "token": app.globalData.usertoken
      },
      success(res) {
        console.log(res.data)

        if (res.data.code == 200) {
          wx.hideLoading()
          that.setData({
            iscollected: res.data.data
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
  },
  collectarticle: function () {
    var that = this
    if (!this.data.iscollected) {
      wx.request({
        url: 'https://www.yxpss.top/main/add/collection', //仅为示例，并非真实的接口地址
        method: "POST",
        data: {
          articleId:that.data.detailList.articleid,
          openid: app.globalData.openid,
          article:that.data.detailList.article,
          firstimg: that.data.detailList.firstimg,
          secondimg: that.data.detailList.secondimg,
          title: that.data.detailList.title,
          type1: that.data.detailList.type1,
          type2: that.data.detailList.type2
        },
        header: {
          "Content-Type": "application/json",
          "token": app.globalData.usertoken
        },
        success(res) {
          console.log(res.data)
      
          if (res.data.code == 200) {
            wx.hideLoading()
            wx.showToast({
              title: '收藏成功',
              icon:'success',
              duration:2000
            })
            that.setData({
              iscollected:1
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

    }else{
      var articleid=this.data.articleid
      wx.request({
        url: 'https://www.yxpss.top/main/cancel/my/collection', //仅为示例，并非真实的接口地址
        method: "DELETE",
        data: {
          articleId:articleid,
          openid: app.globalData.openid,
          
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
              title: '取消成功',
              icon:'success',
              duration:2000
            })
            that.setData({
              iscollected:0
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
  onShareAppMessage: function (res) {
    console.log(res)
    if (res.from == "button") {
      return {
        title: this.data.detailList.title,
        path: '/pages/articledetail/articledetail'
      }
    }


  }
})