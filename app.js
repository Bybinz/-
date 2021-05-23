// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    if (wx.cloud) {
      wx.cloud.init({
        env: "mycloud-9g90k8sa78e38a8e",
        traceUser: true
      })
    }
    this.globalData.height=wx.getSystemInfoSync().windowHeight
    wx.cloud.callFunction({
      name: "helloCloud",
      data: {
        message: 'helloCloud'
      }
    }).then(res => {
      this.globalData.openid=res.result.openid
    })
    
    // 登录
    wx.login({
      success: res => {
        console.log(res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code){
          wx.request({
            url: 'https://apis.map.qq.com',
            data: {
              code: res.code
            },
            header:{
              'content-type':'json'
            },
            success:res=>console.log(res.data)
          })
        }else{
          console.log('登录失败！'+res.errMsg)
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})
