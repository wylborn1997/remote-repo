const db=wx.cloud.database();
var myVlu="";
// pages/demo1/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  // 更新内容
  upData(){
    db.collection('demouser').doc('9fcadd616649a44e012ba757199ebf76').update({
      // data 传入需要局部更新的数据
      data: {
        // 表示将 done 字段置为 true
        title: "xiaozhu1"
      },
      success: function(res) {
        console.log(res.data)
      }
    })
  },
  // 获取输入的内容
  myIpt(res){
    var vlu = res.detail.value;
    myVlu = vlu
    console.log(myVlu)
  },
  // 删除记录
  delData(){
    db.collection('demouser')
    .doc(myVlu)
    .remove()
    .then(res=>{
        console.log(res)
      })
    //由于权限设置，读写仅限于创建者
    // .remove({
    //   success: function(res) {
    //     console.log(myVlu)
    //     console.log("删除",res.data)
    //   }
    // })
  },
  //获取记录个数
  btnNum(){
    // db.collection('demouser').get().then(res=>{
    //   console.log(res)
    // })
    db.collection('demouser').count().then(res=>{
      console.log(res)
    })
  },
  getData(){
    db.collection('demouser')
    .get()
    .then(res=>{
      console.log(res)
      this.setData({
        dataArr:res.data
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getData();
    db.collection('demouser').watch({
      onChange:res=>{
        this.setData({
          dataArr:res.docs
        })
      },
      onError:err=>{
        console.log('the watch closed because of error', err)
      }
    })
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
