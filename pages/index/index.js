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
    wx.cloud.callFunction({
      name: "helloCloud",
      data: {
        message: 'helloCloud'
      }
    }).then(res => {
      console.log(res.result.openid)
    })
   var loi=['男','女']
   console.log(loi.indexOf('男'))
  },
  getUserProfile: function (e){
    wx.getUserProfile({
      desc:'业务需要',
      success:function(res){
         console.log(res.userInfo)
      },
      fail(){
        console.log('授权失败')
      }
    })
  },
  getopenid:function(){
  
  }

})