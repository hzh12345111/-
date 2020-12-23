// components/login-dialog/index.js
var util = require('../../utils/util.js');
var api = require('../../config/api.js');
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    userInfo:{}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handeluserinfo(e) {
      //登录
      if (e.detail.errMsg === "getUserInfo:ok") {
        wx.login({
          success(res) {
            if (res.code) {
              //发起网络请求
              util.request(api.AuthLoginByWeixin, {
                code: res.code,
                userInfo: e.detail
              }, 'POST').then(res=>{
                console.log(res.data)
                this.setData({
                  userInfo: res.data.userInfo
                });
                app.globalData.userInfo = res.data.userInfo;
                app.globalData.token = res.data.token;
                wx.setStorageSync('userInfo', JSON.stringify(res.data.userInfo));
                wx.setStorageSync('token', res.data.token);
              })
            } else {
              console.log('登录失败！' + res.errMsg)
            }
          }
        })
      } else {
        wx.showToast({
          title:'用户点击了拒绝'
        })
      }
    }
  }
})