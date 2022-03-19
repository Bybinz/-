// pages/register/register.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scheight: app.globalData.height+48,
    array: ['无', '本科', '专科', '高中', '初中'],
    array1: ['无', '太原理工大学', '中北大学', '山西大学'],
    index: 0,
    isclick: false,
    index1: 0,
    index2: ''
  },
  radiochange: function (e) {
    console.log(e.detail.value)
  },
  checkschool: function (e) {
    if(this.data.index1==0){
      wx.showModal({
        content:'请先选择学校',
        showCancel:false
      })
    }
  },
  
  getfocus: function (e) {
    this.setData({
      isclick: true
    })
  },
  losefocus: function (e) {
    this.setData({
      isclick: false
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
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
  reback:function(){
  wx.redirectTo({
    url: '/pages/login/login',
  })
  },
  formsubmit: function (e) {
    var that=this
    if (this.checkInfo()) {
      wx.showLoading({
        title: '正在上传信息...',
      })

      var userlist = e.detail.value

      userlist.education = this.data.array[e.detail.value.education]
      userlist.openid = app.globalData.openid
      
      let userlist1 = JSON.stringify(userlist, (key, val) => typeof val === 'number' ? "" + val : val)
      console.log(userlist)
      console.log(userlist1)
      wx.request({
        url: 'https://www.yxpss.top/user/register', //仅为示例，并非真实的接口地址
        method: "POST",
        data: {
          education:userlist.education,
          major:userlist.major,
          openid:userlist.openid,
          phone:userlist.phone,
          qqno:userlist.qqno,
          schoolName:userlist.schoolName,
          sex:userlist.sex,
          sno:userlist.sno,
          username:userlist.username,

        },
        header: {
          "Content-Type": "application/json",
          "token":app.globalData.usertoken
        },
        success(res) {
          console.log(res.data)
          if(res.data.code==200){
            wx.hideLoading()
            wx.showModal({
              content: '提交成功!',
              icon: 'success',
              duration: 2000,
              showCancel: false
            })
            that.setData({
              disSubmit: false
            })
            wx.redirectTo({
              url: '/pages/login/login',
            })
          }else if(res.data.code==201){
            wx.hideLoading()
            wx.showModal({
              content: '提交失败!',
              icon: 'false',
              duration: 2000,
              showCancel: false
            })
            that.setData({
              disSubmit: true
            })
          }else if(res.data.code==301){
            wx.hideLoading()
            wx.showModal({
              content: '系统超时，请稍后提交',
              icon: 'none',
              duration: 2000,
              showCancel: false
            })
            that.setData({
              disSubmit: false
            })
          }
          
        },
        // false(res){
        //   wx.hideLoading()
        //   wx.showModal({
        //     title: '提交失败',
        //     content: '请等待三秒后重新点击<立即注册>',
        //     showCancel: false,
        //     success: res => {
        //       if (res.confirm) {
        //         this.setData({
        //           disSubmit: true
        //         })
  
        //         setTimeout(function () {
        //           that.setData({
        //             disSubmit: false
        //           })
        //         }, 2000)
                
        //       }
        //     }
        //   })
        // }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
   
    
  },
  nameinput: function (e) {
    this.setData({
      namevalue: e.detail.value
    })
    console.log(e.detail.value)
  },
  snoinput: function (e) {
    this.setData({
      snovalue: e.detail.value
    })
  },
  qqinput: function (e) {
    this.setData({
      qqvalue: e.detail.value
    })
  },
  phoneinput: function (e) {
    this.setData({
      phonevalue: e.detail.value
    })
  },
  upper: function () {
    console.log("到顶了")
  },
  lower: function () {
    console.log("到底了")
  },
  checkInfo: function () {
    //console.log(this.data)
    this.setData({
      nameCorrect: true,
      phoneCorrect: true,
      snoCorrect: true,
      qqCorrect: true,

    })
    //检测姓名
    var nameReg = /^[\·\u4e00-\u9fa5]{2,15}$/
    if (!nameReg.test(this.data.namevalue)) {
      this.setData({
        nameCorrect: false
      })
    }
    //检测辅导员
    // var teacherReg = /^[\·\u4e00-\u9fa5]{2,15}$/
    // if (!teacherReg.test(this.data.counselor)) {
    //   this.setData({
    //     teacherCorrect: false
    //   })
    // }
    //检测学号
    var idReg = /20[18,19,20]{1,}\d{6}$/
    if (!idReg.test(this.data.snovalue)) {
      this.setData({
        snoCorrect: false
      })
    }
    //检测手机号
    var phoneReg = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/
    if (!phoneReg.test(this.data.phonevalue)) {
      this.setData({
        phoneCorrect: false
      })
    }
    // if(this.data.first == "无"){
    //   this.setData({
    //     firstCorrect:false
    //   })
    // }
    // if(this.data.second == "无"){
    //   this.setData({
    //     secondCorrect: false
    //   })
    // }
    //检测班级
    // var userClassReg = /^[\u4e00-\u9fa5\a-\z\A-\Z]{2,}19[0-9]{2}$/
    // if (!userClassReg.test(this.data.studentClass)) {
    //   this.setData({
    //     userClassCorrect: false
    //   })
    // }
    //检测最小输入
    // if (this.data.hobby) {
    //   if(this.data.hobby.length < 15){
    //     this.setData({
    //       hobbyCorrect: false
    //     })
    //   }

    // }
    // else{
    //   this.setData({
    //     hobbyCorrect:false
    //   })
    // }
    if (!this.data.snoCorrect || !this.data.nameCorrect || !this.data.qqCorrect || !this.data.phoneCorrect) {
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