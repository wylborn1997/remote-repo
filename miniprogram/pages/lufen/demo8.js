// pages/demo8/demo8.js
Page({
  data: {
    name: '',
    score: '',
    rank: '',
    date: ''
  },
  onNameInput(e) {
    this.setData({
      name: e.detail.value
    })
  },
  onScoreInput(e) {
    this.setData({
      score: e.detail.value
    })
  },
  onRankInput(e) {
    this.setData({
      rank: e.detail.value
    })
  },
  onDateInput(e) {
    this.setData({
      date: e.detail.value
    })
  },
  onShengInput(e) {
    this.setData({
      sheng: e.detail.value
    })
  },
  onZongInput(e) {
    this.setData({
      zong: e.detail.value
    })
  },
  onSubmit() {
    wx.showLoading({
      title: '数据加载中...',
      mask:true
    })
    const dataArr = wx.getStorageSync('dataArr') || []
    dataArr.push({
      name: this.data.name,
      score: this.data.score,
      rank: this.data.rank,
      date: this.data.date,
      sheng: this.data.sheng,
      zong: this.data.zong
    })
    console.log(dataArr)
    wx.cloud.callFunction({
      name:"addData",
      data:{
        name: this.data.name,
        score: this.data.score,
        rank: this.data.rank,
        date: this.data.date,
        sheng: this.data.sheng,
        zong: this.data.zong
      }
    }
    ).then(res=>{
      console.log(res)
      wx.hideLoading()
      wx.navigateTo({
        url: '/pages/demo4/demo4'
        })
    })
    wx.setStorageSync('dataArr', dataArr)
    wx.showToast({
      title: '保存成功',
      icon: 'success'
    })
    this.setData({
      dataArr:dataArr
    })
  },
  onLoad:function(){

  }
})