//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    infoArr: [],
    imageWidth: wx.getSystemInfoSync().windowWidth,
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    pageNum: 1,
    pageSize: 3,
    hasMoreData: true,
    contentlist: [],
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
    this.initInfoData()
  },
  //获得首页图片函数
  initInfoData: function() {
    var that = this
    var tempArr = {};
    wx.request({
      url: app.globalData.dataUrl+'/infoList', //仅为示例，并非真实的接口地址
      data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        //console.log(res.data)
        for (var i = 0; i < res.data.length;i++){
          var info = res.data[i];
          // console.log(app.globalData.dataUrl+info.uploadPath);
          info.uploadPath = app.globalData.dataUrl + '/download?fileAllPath=' +info.uploadPath
          tempArr[i] = info;
        }
        that.setData({
          infoArr: tempArr
        })
      }
    })
  },
  getContentInfo: function (message) {
    wx.showLoading({
      title: message,
    })
    var that = this;
    wx.request({
      url: app.globalData.dataUrl + '/contentList',
      //method: "POST",
      data: {
        pageNum: that.data.pageNum,
        pageSize: that.data.pageSize
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var contentlistTem = that.contentlist;
        if (res.statusCode == 200) {
          if (that.data.pageNum == 1) {
            contentlistTem = []
          }
          var contentlist = res.data.pageInfo;
          if (that.data.pageNum >= res.data.totalPages) {
            that.setData({
              contentlist: contentlistTem.concat(contentlist),
              hasMoreData: false
            })
          } else {
            that.setData({
              contentlist: contentlistTem.concat(contentlist),
              hasMoreData: true,
              pageNum: that.pageNum + 1
            })
          }
        }
        console.log(that.data.pageNum);
      },
      fail: function () {
        wx.showToast({
          title: '加载数据失败',
          icon: none
        })
      },
      complete: function () {
        wx.hideLoading();
        // complete
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      }
    })
  },
  /**
 * 页面相关事件处理函数--监听用户下拉动作
 */
  onPullDownRefresh: function () {
    console.log('下拉');
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.data.pageNum = 1
    this.getContentInfo('正在刷新数据')
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.hasMoreData) {
      this.getContentInfo('加载更多数据')
    } else {
      wx.showToast({
        title: '没有更多数据',
      })
    }
  }
})