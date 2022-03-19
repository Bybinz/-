// pages/login/login.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    scheight: app.globalData.height+48,
    namevalue:'白彬佐',
    snovalue:'2018005692'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.height)
  },
  toregister:function(){
    wx.navigateTo({
      url: '/pages/register/register',
    })
  },
  reback:function(){
    wx.switchTab({
      url: '/pages/my/my',
    })
  },
  formsubmit: function (e) {
    var that=this
    if(this.checkInfo()){
      console.log(e)
      var name=e.detail.value.username
      var sno=e.detail.value.sno

      wx.request({
        url: 'https://www.yxpss.top/user/login', //仅为示例，并非真实的接口地址
        method: "POST",
        data: {
          // name:'白彬佐',
          // sno:'2018005692',
          name:name,
          sno:sno,
         
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
          "token":app.globalData.usertoken // 默认值
        },
        success(res) {
          console.log(res.data)
          // this.setData({
          //   namevalue:this.data.namevalue,
          //   snovalue:this.data.namevalue
          // })
          if(res.data.code==200){
            wx.hideLoading()
            wx.showModal({
              content: '登录成功!',
              icon: 'success',
              duration: 2000,
              showCancel: false,
              success(res){
                 if(res.confirm){
                  that.setData({
                    namevalue:'',
                    snovalue:''
                  })
                 }
              }
            })
            // that.setData({
            //   disSubmit: false
            // })
            
            app.globalData.usertoken=res.data.data.token
            app.globalData.usertrueinfo=res.data.data.user
            wx.setStorageSync('usertoken', res.data.data.token)
            wx.setStorageSync('usertrueinfo', res.data.data.user)
            wx.switchTab({
              url: '/pages/my/my',
              success(e){
                app.globalData.pageid='login'
                app.globalData.havelogin=true
              var page=getCurrentPages().pop()
              if(!page)return;
              page.onLoad();
              }
            })
          }else if(res.data.code==201&&res.data.message=="用户名或密码错误"){
            wx.showModal({
              content: '姓名和学号不匹配!如未注册，请先注册',
              icon: 'false',
              duration: 2000,
              showCancel: false,
              success(res){
                if(res.confirm){
                 that.setData({
                   namevalue:'',
                   snovalue:''
                 })
                }
             }
            })
            
          }else if(res.data.code==301||res.data.code==302){
            wx.showModal({
              content: '系统超时，请稍后登录',
              icon: 'none',
              duration: 2000,
              showCancel: false,
              success(res){
                if(res.confirm){
                 that.setData({
                   namevalue:'',
                   snovalue:''
                 })
                }
             }
            })
            
          }
        }
      })
      app.globalData.usertruename=e.detail.value.username
      console.log(e.detail.value);
    }
    

    // if (e.detail.value.xingming.length == 0 || e.detail.value.xingming.length >= 8) {
    //   wx.showToast({
    //     title: '姓名不能为空或过长!',
    //     icon: 'loading',
    //     duration: 1500
    //   })
    //   setTimeout(function () {
    //     wx.hideToast()
    //   }, 2000)
    // } else if (e.detail.value.xingbie.length == 0) {
    //   wx.showToast({
    //     title: '性别不能为空!',
    //     icon: 'loading',
    //     duration: 1500
    //   })
    //   setTimeout(function () {
    //     wx.hideToast()
    //   }, 2000)
    // } else if (e.detail.value.aihao.length == 0) {
    //   wx.showToast({
    //     title: '爱好不能为空!',
    //     icon: 'loading',
    //     duration: 1500
    //   })
    //   setTimeout(function () {
    //     wx.hideToast()
    //   }, 2000)
    // } else {
    //   wx.request({
    //     url: '接口路径',
    //     header: {
    //       "Content-Type": "application/x-www-form-urlencoded"
    //     },
    //     method: "POST",
    //     data: {
    //       xingming: e.detail.value.xingming,
    //       xingbie: e.detail.value.xingbie,
    //       aihao: e.detail.value.aihao
    //     },
    //     success: function (res) {
    //       console.log(res.data);
    //       if (res.data.status == 0) {
    //         wx.showToast({
    //           title: '提交失败！！！',
    //           icon: 'loading',
    //           duration: 150
    //         })
    //       } else {
    //         wx.showToast({
    //           title: '提交成功！！！', //这里打印出登录成功
    //           icon: 'success',
    //           duration: 1000
    //         })
    //       }
    //     }
    //   })
    // }
  },
  nameinput:function(e){
  this.setData({
    namevalue:e.detail.value
  })
  },
  snoinput:function(e){
    this.setData({
      snovalue:e.detail.value
    })
  },
checkInfo: function () {
    //console.log(this.data)
    this.setData({
      nameCorrect: true,
      snoCorrect: true,
    })
    //检测姓名
    var nameReg = /^[\·\u4e00-\u9fa5]{2,15}$/
    if (!nameReg.test(this.data.namevalue)) {
      this.setData({
        nameCorrect: false
      })
    }
    if(this.data.namevalue=""){
      this.setData({
        nameCorrect: false
      })
    }
    //检测学号
    var idReg = /20[18,19,20]{1,}\d{6}$/
    if (!idReg.test(this.data.snovalue)) {
      this.setData({
        snoCorrect: false
      })
    }
    if(this.data.snovalue=""){
      this.setData({
        snoCorrect: false
      })
    }
    
   
    if (!this.data.snoCorrect || !this.data.nameCorrect ) {
      wx.showModal({
        content: '请正确填写个人信息',
        showCancel: false
      })
      return false;
    } else
      return true;
  
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