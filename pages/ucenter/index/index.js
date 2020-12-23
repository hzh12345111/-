// pages/ucenter/index/index.js
const util = require('../../../utils/util.js');
const api = require('../../../config/api.js');
const user = require('../../../services/user.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    showLoginDialog: false
  },
  onShow: function () {
    this.setData({
      userInfo: app.globalData.userInfo,
    });
  },
  onUserInfoClick: function () {
    //判断有没有token 没有就显示登录方式
    if (wx.getStorageSync('token')) {

    } else {
      this.showLoginDialog();
    }
  },
  showLoginDialog() {
    //没有登录 弹框显示
    this.setData({
      showLoginDialog: true
    })
  },
  onWechatLogin(e) {
    //微信登录
    console.log(e)
    if (e.detail.errMsg !== 'getUserInfo:ok') {
      if (e.detail.errMsg === 'getUserInfo:fail auth deny') {
        return false
      }
      wx.showToast({
        title: '微信登录失败',
      })
      return false
    }
    util.login().then((res) => {
      return util.request(api.AuthLoginByWeixin, {
        code: res,
        userInfo: e.detail
      }, 'POST');
    }).then((res) => {
      console.log(res)
      if (res.errno !== 0) {
        wx.showToast({
          title: '微信登录失败',
        })
        return false;
      }
      // 设置用户信息
      this.setData({
        userInfo: res.data.userInfo,
        showLoginDialog: false
      });
      app.globalData.userInfo = res.data.userInfo;
      app.globalData.token = res.data.token;
      wx.setStorageSync('userInfo', JSON.stringify(res.data.userInfo));
      wx.setStorageSync('token', res.data.token);
    }).catch((err) => {
      console.log(err)
    })
  },
  onWechatLogin(e) {
    //手机号登录
    if (e.detail.errMsg !== 'getUserInfo:ok') {
      if (e.detail.errMsg === 'getUserInfo:fail auth deny') {
        return false
      }
      wx.showToast({
        title: '微信登录失败',
      })
      return false
    }
    util.login().then((res) => {
      return util.request(api.AuthLoginByWeixin, {
        code: res,
        userInfo: e.detail
      }, 'POST');
    }).then((res) => {
      console.log(res)
      if (res.errno !== 0) {
        wx.showToast({
          title: '微信登录失败',
        })
        return false;
      }
      // 设置用户信息
      this.setData({
        userInfo: res.data.userInfo,
        showLoginDialog: false
      });
      app.globalData.userInfo = res.data.userInfo;
      app.globalData.token = res.data.token;
      wx.setStorageSync('userInfo', JSON.stringify(res.data.userInfo));
      wx.setStorageSync('token', res.data.token);
    }).catch((err) => {
      console.log(err)
    })
  },
  onCloseLoginDialog() {
    this.setData({
      showLoginDialog: false
    })
  },
  siginoutLogin() {
    //退出登录
    this.setData({
      userInfo: '',
    });
    wx.clearStorageSync('userInfo',"")
    wx.clearStorageSync('token',"")
    wx.showToast({
      title: '退出成功',
    })
  },
  onLoad: function (options) {

  },
})