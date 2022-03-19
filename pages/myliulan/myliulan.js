// pages/myliulan/myliulan.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    userLeft: 0,
    liulanlistlen:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getmyliulan(app.globalData.openid)
    console.log(this.data.liulanlistlen)
    
  },
  getmyliulan(openid) {
    var that = this
    wx.request({
      url: 'https://www.yxpss.top/user/find/browser/history', //仅为示例，并非真实的接口地址
      method: "POST",
      data: {
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
          for (var i = 0; i < res.data.data.length; i++) {
            res.data.data[i].isleft = false
          }
          that.setData({
            liulanlist: res.data.data,
            liulanlistlen:res.data.data.length
          })
          if(res.data.data.length==0){
            that.setData({
              noliulan:true
            })
          }else{
            that.setData({
              noliulan:false
            })
          }
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
  ListTouchStart(e) {
    console.log(e, e.touches[0])
    var aaa = e.currentTarget.dataset.target
    // this.data.jobID.indexOf("y") == 0
    // console.log(aaa.substr(aaa.length - 1, 1))
    this.setData({
      ListTouchStartx: e.touches[0].pageX,
      ListTouchStarty: e.touches[0].pagey,
      userIndex: aaa
    })
  },


  // ListTouch计算滚动
  ListTouchEnd(e) {
    var aaa = e.currentTarget.dataset.itemid
    console.log(aaa)
    var liulanlist = this.data.liulanlist
    console.log(e, e.changedTouches[0].pageX)
    this.setData({
      ListTouchEndx: e.changedTouches[0].pageX,
      ListTouchEndy: e.changedTouches[0].pageY,
    })
    if ((this.data.ListTouchStartx - this.data.ListTouchEndx) > 5) {
      for (var i = 0; i < liulanlist.length; i++) {
        if (aaa == liulanlist[i].id) {
          liulanlist[i].isleft = true
        }
      }

    } else if ((this.data.ListTouchStartx - this.data.ListTouchEndx) < -5) {
      for (var i = 0; i < liulanlist.length; i++) {
        if (aaa == liulanlist[i].id) {
          liulanlist[i].isleft = false
        }
      }
    }
    this.setData({
      liulanlist: liulanlist
    })


  },
  toarticledetail:function(e){
    var articleid=e.currentTarget.dataset.articleid
    console.log(e)
    wx.redirectTo({
      url: '/pages/articledetail/articledetail?articleid='+articleid,
    })
  },
  deleteitem: function (e) {
    var id = parseInt(e.target.dataset.itemid)
    console.log(id)
    var that = this
    wx.request({
      url: 'https://www.yxpss.top/user/delete/browser/history', //仅为示例，并非真实的接口地址
      method: "DELETE",
      data: {
        id: id

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
            title: '删除成功',
            icon: 'success',
            duration: 2000
          })
         that.getmyliulan(app.globalData.openid)
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
  reback: function () {
    wx.switchTab({
      url: '/pages/my/my',
    })
  },
  // isCard(e) {
  //   this.setData({
  //     isCard: e.detail.value
  //   })
  // },
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