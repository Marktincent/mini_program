//获取应用实例
var app = getApp()
Page({
  data: {
    // 后台数据结构获取参照前台js数据结构
    linkBookData: [
      {
        id: 'P_A',
        name: '物业服务',
        child: [
          {
            id: 'A',
            name: '物业电话',
            tel: '23',
            img: '../../image/data_01.png'
          },
          {
            id: 'B',
            name: '物业投诉',
            tel: '321-8888',
            img: '../../image/data_01.png'
          }
        ]
      },
      {
        id: 'P_B',
        name: '社区及公安电话',
        child: [
          {
            id: 'A',
            name: '公安局',
            tel: '123',
            img: '../../image/data_02.png'
          },
          {
            id: 'B',
            name: '户口迁移电话：',
            tel: '321',
            img: '../../image/data_01.png'
          },
          {
            id: 'C',
            name: '街道',
            tel: 'ewew',
            img: '../../image/data_01.png'
          }
        ]
      },
      {
        id: 'P_B',
        name: '社区及公安电话',
        child: [
          {
            id: 'A',
            name: '公安局派出所',
            tel: '123',
            img: '../../image/data_01.png'
          },
          {
            id: 'B',
            name: '户口迁移办理电话：',
            tel: '321',
            img: '../../image/data_02.png'
          },
          {
            id: 'C',
            name: '街道',
            tel: 'ewew',
            img: '../../image/data_01.png'
          },
          {
            id: 'C',
            name: '街道',
            tel: 'ewew',
            img: '../../image/data_02.png'
          }
        ]
      }
    ]
  },
  //拨打电话事件
  phone: function (e) {
    var tel = e.target.dataset.tel;
    wx.showModal({
      title: '提示',
      content: '确定拨打电话：' + tel + ' ? ',
      success: function (res) {
        if (res.confirm) {
          wx.makePhoneCall({
            phoneNumber: tel,
            success: function (res) {
              // success
            }
          });
          console.log('用户点击确定拨打电话')
        } else {
          console.log('用户点击取消拨打电话')
        }
      }
    });
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    // app.getUserInfo(function (userInfo) {
    //   //更新数据
    //   that.setData({
    //     userInfo: userInfo
    //   })
    // })
    that.setData({
        userInfo: userInfo
    })
  }
})