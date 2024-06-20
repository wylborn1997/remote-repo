// pages/demo6/demo6.js
var urlArr=[];
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  clickBtn(){
    wx.chooseImage({
      success:res=>{
        console.log(res,"123")
        var filePath=res.tempFilePaths
        filePath.forEach((item,idx)=>{
          console.log(idx)
          var fileName=Date.now()+"_"+idx;
          this.cloudFile(fileName,item)
        })
      }
    }) 
  },
  cloudFile(filiName,path){
    wx.showLoading({
      title: '数据加载中...',
      mask:true
    })
    wx.cloud.uploadFile({
      cloudPath:filiName+".jpg",//云存储路径，命名限制见文件名命名限制
      filePath:path//要上传文件资源的路径
    }).then(res=>{
      console.log(res)
      urlArr.push(res.fileID)
      this.setData({
        urlArr
      })
    })
    wx.hideLoading()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})