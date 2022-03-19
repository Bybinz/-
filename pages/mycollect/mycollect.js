// pages/mycollect/mycollect.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    istiku:false,
    isshoucang:false,
    mycollectlen:0,
    collectslen:0
  },
  getcollect: function () {
    var that=this
    wx.request({
      url: 'https://www.yxpss.top/user/find/my/data', //仅为示例，并非真实的接口地址
      method: "POST",
      data: {
        openid:app.globalData.openid
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "token":app.globalData.usertoken // 默认值
      },
      success(res) {
        console.log(res.data)
        if(res.data.code==200){
          wx.hideLoading()
          that.setData({
            collects:res.data.data,
            collectslen:res.data.data.length
          })
          if(res.data.data.length==0){
            that.setData({
              notiku:true
            })
          }else{
            that.setData({
              notiku:false
            })
          }
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
        
      }
    })
  },
  gettotalid:function(e){
   console.log(e.currentTarget.dataset.totalid)
   var id=e.currentTarget.dataset.totalid
    var collects=this.data.collects
    console.log(collects)
     for(var i=0;i<collects.length;i++){
       if(collects[i].dataId==e.currentTarget.dataset.totalid&collects[i].isPop==0){
            collects[i].isPop=1
       }else{
            collects[i].isPop=0
       }
     }
     this.setData({
       collects:collects
     })
  },
  showurl:function(e){
    var url=e.currentTarget.dataset.detailurl
      wx.showModal({
        content:"url为:"+url,
        confirmText:'复制',
        success(res){
          if (res.confirm) {
            wx.setClipboardData({
              data:url,
              success: function (res) {
                wx.getClipboardData({
                  success: function (res) {
                    wx.showToast({
                      title: '复制成功'
                    })
                  }
                })
              }
            })
        
  
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.fucid==1){
      this.getcollect()
      this.setData({
        istiku:true
      })
      
    }else if(options.fucid==2){
      this.getcollectlist(app.globalData.openid)
      this.setData({
        isshoucang:true
      })
      
    }
   
  },
  return:function(){
    wx.switchTab({
      url: '/pages/my/my',
    })
  },
  toarticledetail:function(e){
    var articleid=e.currentTarget.dataset.articleid
    console.log(e)
    wx.redirectTo({
      url: '/pages/articledetail/articledetail?articleid='+articleid,
    })
  },
 getcollectlist(openid) {
   wx.showLoading({
     title: '加载中',
   })
    var that= this
    wx.request({
      url: 'https://www.yxpss.top/user/find/collections', //仅为示例，并非真实的接口地址
      method: "GET",
      data: {
        openid:openid
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "token":app.globalData.usertoken
      },
      success(res) {
        console.log(res.data)
      
        if(res.data.code==200){
          wx.hideLoading()
          that.setData({
            mycollect:res.data.data,
            mycollectlen:res.data.data.length
          })
          if(res.data.data.length==0){
            that.setData({
              noshoucang:true
            })
          }else{
            that.setData({
              noshoucang:false
            })
          }
        }else if(res.data.code==201){
          wx.hideLoading()
          wx.showModal({
            content:'暂未开放',
            showCancel:false,
            duration: 2000
          })
      
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
  deleteitem:function(e){
    var openid=app.globalData.openid
    var dataId=e.target.dataset.totalid
    var that= this
    wx.request({
      url: 'https://www.yxpss.top/user/delete/my/date ', //仅为示例，并非真实的接口地址
      method: "DELETE",
      data: {
        openid:openid,
        dataId:dataId
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "token":app.globalData.usertoken
      },
      success(res) {
        console.log(res.data)
      
        if(res.data.code==200){
          wx.hideLoading()
          wx.showModal({
            content:'删除成功',
            showCancel:false,
            duration: 2000
          })
          that.getcollect()
        }else if(res.data.code==201){
          wx.hideLoading()
          wx.showModal({
            content:'暂未开放',
            showCancel:false,
            duration: 2000
          })
      
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