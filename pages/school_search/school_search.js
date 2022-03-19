// pages/school_search/school_search.js
const app =getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    proschList: [],
    ischoose: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getprosch()
    this.setData({
      totype:options.totype
    })
  },
  reback: function () {
    wx.switchTab({
      url: '/pages/first/first',
    })
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
        schoolList:proschList[0].school
      })
    }, err => {
      // err
    })
  },
  chooseprocince: function (e) {
    console.log(e.currentTarget.dataset.id)
    var id = e.currentTarget.dataset.id
    var schoolList = this.data.proschList[id].school
    var ischoose=this.data.ischoose
    for(var i=0;i<ischoose.length;i++){
      ischoose[i]=false
    }
    ischoose[id]=true
    this.setData({
      schoolList: schoolList,
      ischoose:ischoose
    })
  },
  chooseschool:function(e){
    console.log(this.data.totype)
    if(this.data.totype=='lookmore'){
      console.log("hahahahhhahahahaahahahhahaah")
      console.log(e.currentTarget.dataset.scn)
      app.globalData.sc=e.currentTarget.dataset.scn
      wx.switchTab({
       url: '/pages/first/first',
      })
    }else if(this.data.totype=='schoolsearch'){
      console.log(e.currentTarget.dataset.scn)
      app.globalData.sc=e.currentTarget.dataset.scn
      wx.redirectTo({
       url: '/pages/school_detail/school_detail',
     })
    }
    

  },
  upper: function () {
    console.log("到顶了")
  },
  lower: function () {
    console.log("到底了")
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