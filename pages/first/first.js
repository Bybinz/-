// pages/first/first.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    background: ['https://cloud-minapp-40414.cloud.ifanrusercontent.com/1lmsFwbWP0NRyONp.png', 'https://cloud-minapp-40414.cloud.ifanrusercontent.com/1lmsFwbWP0NRyONp.png'],
    scheight: app.globalData.height,
    indcor: '#d6e5e0',
    indactcor: '#ffffff',
    schoolname: '太原理工大学',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    console.log(app.globalData.sc)
    
    if (app.globalData.sc != this.data.schoolname) {
      this.setData({
        schoolname: app.globalData.sc
        
      })
    }
   
    
    this.getarticleList(this.data.schoolname)
    // setTimeout(function(){wx.hideLoading({
    //   success: (res) => {console.log(res)},
    // })},500);
    this.getdate()
    
  },
  getdate:function(){
    var time=new Date(2021,11,25)
    var currenttime=new Date()
    var secds=24*60*60*1000
    havetime=(parseInt((time-currenttime)/secds)).toString()
    console.log(havetime.charAt(0))
    this.setData({
      havetime:havetime,
      havetime1:havetime.charAt(0),
      havetime2:havetime.charAt(1),
      havetime3:havetime.charAt(2),
    })
  },
  getarticleid:function(e){
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
    console.log(e.currentTarget.dataset.articleid)
    wx.redirectTo({
      url: '/pages/articledetail/articledetail?articleid='+e.currentTarget.dataset.articleid+'&schoolname='+this.data.schoolname
    })
    }
  },
  changearticle:function(){
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
    }else{
      this.getarticleList(this.data.schoolname)
    }
  },
  getarticleList: function (schoolname) {
    // 实例化查询对象
    
    var that = this
    let query = new wx.BaaS.Query()
    console.log(schoolname)
    // 设置查询条件（比较、字符串包含、组合等）
    //...
    query.compare('school', '=', schoolname)
    // 应用查询对象
    let Product = new wx.BaaS.TableObject('school_article')
    Product.setQuery(query).find().then(res => {
      // success
      console.log(res.data.objects[0].articleList.articles)
      var articles=res.data.objects[0].articleList.articles
      app.globalData.articles=articles
      // console.log(res.data.objects[0].articleList.articles)
      // that.setData({
      //   articleslen: res.data.objects[0].articleList.articles.length
      // })
      // app.globalData.articles = res.data.objects[0].articleList.articles
      // app.globalData.articleslen = res.data.objects[0].articleList.articles.length
    //   this.create3article(this.data.articleslen)
    //   for(var i=0;i<3;i++){
    //     console.log(this.data.array[i])
    //     articles.push(res.data.objects[0].articleList.articles[this.data.array[i]])
    //  }
     that.setData({
      articles: articles,
      
    })
    wx.hideLoading({
      success: (res) => {},
    })
 
    }, err => {
      // err
    })

    // return articleslen
  },
  upper: function () {
    console.log("到顶了")
  },
  lower: function () {
    console.log("到底了")
  },
  create3article: function (articleslen) {
    var array=[]; 
    // 循环N次生成随机数 
    for(var i = 0 ; ; i++){ 
        // 只生成10个随机数 
        if(array.length<3){ 
              this.generateRandom(articleslen,array); 
        }else{ 
          break; 
        } 
       
    } 
    console.log(array)
    this.setData({
      array:array
    })
  },
  generateRandom:function(count,array){ 
    var rand = parseInt(Math.random()*count); 
    for(var i = 0 ; i < array.length; i++){ 
         if(array[i] == rand){ 
              return false; 
         }      
    } 
    array.push(rand); 
  },
  tokaoyaninfo: function () {
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
      wx.navigateTo({
        url: '/pages/kaoyaninfo/kaoyaninfo',
      })

    }
  },
  toschoolinfo: function () {
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
      wx.navigateTo({
        url: '/pages/school_search/school_search?totype='+'schoolsearch',
      })

    }
  },
  tocontactinfo: function () {
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
      wx.navigateTo({
        url: '/pages/lookfor/lookfor',
      })

    }
  },
  lookmore: function () {
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
      wx.redirectTo({
        url: '/pages/school_search/school_search?totype='+'lookmore',
      })

    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

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