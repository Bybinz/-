// pages/kaoyaninfo/kaoyaninfo.js
const app =getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selected1: true,
    havecollected:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.getallinfo()
  },
  getprosch: function () {
    // 实例化查询对象
    var that = this
    let query = new wx.BaaS.Query()

    // 设置查询条件（比较、字符串包含、组合等）
    //...

    // 应用查询对象
    let Product = new wx.BaaS.TableObject('province_school')
    Product.setQuery(query).find().then(res => {
      // success
      console.log(res.data.objects.length)
      var proschList = []
      var proschListitem = {}
      var ischoose = []
      for (var i = 0; i < res.data.objects.length; i++) {
        console.log(i)
        proschListitem.id = i
        proschListitem.province = res.data.objects[i].province
        proschListitem.school = res.data.objects[i].school
        proschList.push(proschListitem)
        proschListitem = {}
        if (i == 0) {
          ischoose.push(true)
        } else {
          ischoose.push(false)
        }


      }
      that.setData({
        proschList: proschList,
        ischoose: ischoose,
        schoolList: proschList[0].school
      })
    }, err => {
      // err
    })
  },
  chooseprovince:function(e){
    console.log(e.currentTarget.dataset.pro)
    var pro=e.currentTarget.dataset.pro
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://www.yxpss.top/main/find/school/by/location', //仅为示例，并非真实的接口地址
      method: "POST",
      data: {
        location:pro
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "token":app.globalData.usertoken
      },
      success(res) {
        console.log(res.data)

        if(res.data.code==200){
          wx.hideLoading()
          app.globalData.chooseschoolinfo=res.data.data
          console.log(res.data.data)
          wx.redirectTo({
            url: '/pages/chooseschool/chooseschool',
          })
          
        }else if(res.data.code==201){
          wx.hideLoading()
          
      
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
  getallinfo:function(){
    var that =this
    wx.request({
      url: 'https://www.yxpss.top/main/find/all/data', //仅为示例，并非真实的接口地址
      method: "POST",
      data: {
        openid:app.globalData.openid
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded" ,
        "token":app.globalData.usertoken// 默认值
      },
      success(res) {
        var departmentname=[]
        console.log(res.data) 
        that.setData({
          provinceList:res.data.data.autonomyData,
          infoList:res.data.data.generalData
        })
      }
    })
  },
  changetitle: function () {
    this.setData({
      selected1: true
    })
  },
  changetitle1: function () {
    this.setData({
      selected1: false
    })
  },
  reback: function () {
    wx.navigateBack({
      delta: 1,
    })
  },
  changestatus:function(e){
      var that=this
      var id=e.currentTarget.dataset.id
      var infoList=this.data.infoList
      // var infoListorigin=this.data.infoList
      for(var i=0;i<infoList.length;i++){
        if(infoList[i].dataId==id){
          console.log(id)
          console.log(i)
          var num=i
          if(!infoList[i].isCollection){
            wx.request({
              url: 'https://www.yxpss.top/main/add/data', //仅为示例，并非真实的接口地址
              method: "POST",
              data: {
                id:id,
                openid:app.globalData.openid
              },
              header: {
                "Content-Type": "application/x-www-form-urlencoded",
                "token":app.globalData.usertoken
              },
              success(res) {
                var infoList=that.data.infoList
                console.log(num)
                console.log(res.data)
  
                if(res.data.code==200){
                  console.log(infoList[num])
                  wx.hideLoading()
                  infoList[num].isCollection=1
                  wx.showModal({
                    content: '收藏成功!',
                    icon: 'success',
                    duration: 2000,
                    showCancel: false
                  })
                  that.setData({
                    infoList:infoList
                  })
                }else if(res.data.code==201){
                  wx.hideLoading()
                  infoList[num].isCollection=0
                  wx.showModal({
                    content: '收藏失败!',
                    icon: 'false',
                    duration: 2000,
                    showCancel: false
                  })
                  that.setData({
                    infoList:infoList
                  })
              
                }else if(res.data.code==301){
                  wx.hideLoading()
                  infoList[num].isCollection=0
                  wx.showModal({
                    content: '系统超时',
                    icon: 'none',
                    duration: 2000,
                    showCancel: false
                  })
                  that.setData({
                    infoList:infoList
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
          }else{
            wx.showModal({
              content:'您已收藏',
              showCancel:false,
              duration:2000
            })
          }
          
        }
  
      }
      app.globalData.infoList=infoList
      this.setData({
        infoList:infoList,
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