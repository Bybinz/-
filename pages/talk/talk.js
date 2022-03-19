// pages/talk/talk.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    animPlus: {},
    animDocument: {},
    animVedio: {},
    flag: true,
    isPopping: false, //是否已经弹出
    daibancount: 1,
    havedui: false,
    itemid: 0,
    tasklist: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      scheight: app.globalData.height
    })
    console.log(app.globalData.usertoken)
    if (app.globalData.usertoken) {
      this.gettasklist()
    }


    // this.setData({
    //   tasklistlen: 
    // })
  },
  ListTouchStart(e) {
    console.log(e, e.touches[0])
    
    var aaa = e.currentTarget.dataset.target
    // this.data.jobID.indexOf("y") == 0
    // console.log(aaa.substr(aaa.length - 1, 1))
    // for(var i=0;i<tasklist.length;i++){
    //   if(aaa==tasklist[i].taskId){
    //     tasklist[i].isleft=true
    //   }
    // }
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
    var tasklist=this.data.tasklist
    console.log(e, e.changedTouches[0].pageX)
    this.setData({
      ListTouchEndx: e.changedTouches[0].pageX,
      ListTouchEndy: e.changedTouches[0].pageY,
    })
    if ((this.data.ListTouchStartx - this.data.ListTouchEndx) > 5 ) {
      for(var i=0;i<tasklist.length;i++){
        if(aaa==tasklist[i].taskId){
          tasklist[i].isleft=true
        }
      }
      
    } else if ((this.data.ListTouchStartx - this.data.ListTouchEndx) < -5 ) {
      for(var i=0;i<tasklist.length;i++){
        if(aaa==tasklist[i].taskId){
          tasklist[i].isleft=false
        }
      }
    }this.setData({
      tasklist:tasklist
    })
   

  },
  deleteitem: function (e) {
    wx.showLoading({
      title: '加载中',
    })
    var id = parseInt(e.target.dataset.itemid)
    console.log(id)
    var that = this
    wx.request({
      url: 'https://www.yxpss.top/user/delete/daily/task', //仅为示例，并非真实的接口地址
      method: "DELETE",
      data: {
        taskId: id

      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "token": app.globalData.usertoken
      },
      success(res) {
        console.log(res.data)

        if (res.data.code == 200) {
          wx.hideLoading({
            success: (res) => {},
          })
          wx.showToast({
            title: '删除成功',
            icon: 'success',
            duration: 2000
          })
         that.gettasklist()
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
  close:function(){
    console.log("close")
     this.setData({
       havedui:false
     })
  },
  gettasklist: function (e) {
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    wx.request({
      url: 'https://www.yxpss.top/user/find/all/daily/tasks', //仅为示例，并非真实的接口地址
      method: "POST",
      data: {
        openid: app.globalData.openid
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "token": app.globalData.usertoken
      },
      success(res) {
        console.log(res.data)

        if (res.data.code == 200) {
          wx.hideLoading()
         for(var i=0;i<res.data.data.length;i++){
           res.data.data[i].isleft=false
         }
          that.setData({
            tasklist: res.data.data,
            tasklistlen: res.data.data.length
          })
        } else if (res.data.code == 201) {
          wx.hideLoading()

          wx.showModal({
            content: '失败!',
            icon: 'false',
            duration: 2000,
            showCancel: false
          })


        } else if (res.data.code == 301) {
          wx.hideLoading()

          wx.showModal({
            content: '系统超时',
            icon: 'none',
            duration: 2000,
            showCancel: false
          })

        }

      },
    })







  },
  vedio: function () {
    wx.navigateTo({
      url: '../check/check',
    })
    this.touchend();
    //console.log("vedio")
  },
  document: function () {
    this.setData({
      havedui: true
    })
    this.touchend();
    //console.log("document")
  },
  /*遮罩层*/
  touchend: function () {
    this.setData({
      flag: true,
      isPopping: false
    })
    this.takeback();
  },
  titleinput: function (e) {
    this.setData({
      titlevalue: e.detail.value
    })
  },
  contentinput: function (e) {
    this.setData({
      contentvalue: e.detail.value
    })
  },
  submititem: function () {
    wx.showLoading({
      title: '加载中',
    })
    console.log("havedone")
    var that = this
    var item = {}
    item.title = this.data.titlevalue
    item.content = this.data.contentvalue
    var tasklist = this.data.tasklist
    tasklist.push(item)
    this.setData({
      tasklist: tasklist,
      havedui: false,
      tasklistlen: tasklist.length
    })
    wx.request({
      url: 'https://www.yxpss.top/user/publish/daily/tasks', //仅为示例，并非真实的接口地址
      method: "POST",
      data: {
        openid: app.globalData.openid,
        title: that.data.titlevalue,
        content: that.data.contentvalue
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "token": app.globalData.usertoken
      },
      success(res) {
        console.log(res.data)
        if (res.data.code == 200) {
          wx.hideLoading()
          wx.showModal({
            content: '添加成功!',
            icon: 'success',
            duration: 2000,
            showCancel: false
          })
          that.setData({
            havedui: false,
            itemid: item.id,
            titlevalue:'',
            contentvalue:''
          })
          that.gettasklist()
        } else if (res.data.code == 201) {
          wx.hideLoading()

          wx.showModal({
            content: '失败!',
            icon: 'false',
            duration: 2000,
            showCancel: false
          })


        } else if (res.data.code == 301) {
          wx.hideLoading()

          wx.showModal({
            content: '系统超时',
            icon: 'none',
            duration: 2000,
            showCancel: false
          })

        }

      },
    })

  },
  changedone: function (e) {
    wx.showLoading({
      title: '加载中',
    })
    var that=this
    console.log(e.currentTarget.dataset.itemid)
    var id=e.currentTarget.dataset.itemid
    var tasklist = this.data.tasklist
    for (var i = 0; i < tasklist.length; i++) {
      if (tasklist[i].taskId==id) {
        wx.request({
          url: 'https://www.yxpss.top/user/finish/daily/task', //仅为示例，并非真实的接口地址
          method: "POST",
          data: {
            taskId:id
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded",
            "token": app.globalData.usertoken
          },
          success(res) {
            console.log(res.data)
            if (res.data.code == 200) {
              wx.hideLoading()
              that.gettasklist()
            } else if (res.data.code == 201) {
              wx.hideLoading()
    
              wx.showModal({
                content: '失败!',
                icon: 'false',
                duration: 2000,
                showCancel: false
              })
    
    
            } else if (res.data.code == 301) {
              wx.hideLoading()
    
              wx.showModal({
                content: '系统超时',
                icon: 'none',
                duration: 2000,
                showCancel: false
              })
    
            }
    
          },
        })
      } 
    }

  },
  plus: function () {
    if (!app.globalData.usertoken) {
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
    } else {
      if (this.data.isPopping) {
        //缩回动画
        this.popp();
        //console.log(this.data.isPopping)
        this.setData({
          isPopping: false,
          flag: false
        })
      } else if (!this.data.isPopping) {
        //弹出动画
        this.takeback();
        //console.log(this.data.isPopping)
        this.setData({
          isPopping: true,
          flag: true
        })
      }
    }


  },
  popp: function () {
    if (this.data.isroot) {
      //plus顺时针旋转
      var animationPlus = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease-out'
      })
      var animationVedio = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease-out'
      })
      var animationDocument = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease-out'
      })

      animationPlus.rotateZ(180).step();
      animationVedio.translate(-40, -80).rotateZ(180).opacity(1).step();
      animationDocument.translate(-80, -49).rotateZ(180).opacity(1).step();

      this.setData({
        animPlus: animationPlus.export(),

        animDocument: animationDocument.export(),
        animVedio: animationVedio.export()
      })
    } else {
      //plus顺时针旋转
      var animationPlus = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease-out'
      })

      var animationDocument = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease-out'
      })

      animationPlus.rotateZ(180).step();

      animationDocument.translate(-80, -49).rotateZ(180).opacity(1).step();

      this.setData({
        animPlus: animationPlus.export(),
        animVedio: animationPlus.export(),
        animDocument: animationDocument.export()
      })
    }

  },
  //收回动画
  takeback: function () {
    if (this.data.isroot) {
      //plus逆时针旋转
      var animationPlus = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease-out'
      })
      var animationVedio = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease-out'
      })
      var animationDocument = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease-out'
      })

      animationPlus.rotateZ(0).step();
      animationVedio.translate(0, 0).rotateZ(0).opacity(0).step();
      animationDocument.translate(0, 0).rotateZ(0).opacity(0).step();

      this.setData({
        animPlus: animationPlus.export(),

        animDocument: animationDocument.export(),
        animVedio: animationVedio.export()

      })
    } else {
      //plus逆时针旋转
      var animationPlus = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease-out'
      })

      var animationDocument = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease-out'
      })

      animationPlus.rotateZ(0).step();

      animationDocument.translate(0, 0).rotateZ(0).opacity(0).step();

      this.setData({
        animPlus: animationPlus.export(),
        animVedio: animationPlus.export(),
        animDocument: animationDocument.export()

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