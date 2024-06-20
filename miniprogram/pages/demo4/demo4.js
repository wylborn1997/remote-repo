const db = wx.cloud.database();
const demolist = db.collection('demolist');
Page({
  data: {
    dataList:[],
    dateData: 
      [['小菜鸡', 30, 38, 0.79, 5, 4300, 4300, 4]]
      ,     
      historyList:[
        [
        ["姓名","站数","一发得分","二发得分","一发失分","二发失分","双误数"],//
        ["小菜鸡",23,0,0,0,0,0],//由计分器传递
        ["cc",23,0,0,0,0,0],// 
      ],
      [
        ["姓名","站数","一发得分","二发得分","一发失分","二发失分","双误数"],//
        ["小菜鸡",23,0,0,0,0,0],//由计分器传递
        [],//
      ],
    ],
  },
  onTap:function(event){
  // 获取Datalist[1]的值
  var value = this.data.dateData[1];
  // 页面跳转并传递参数
  wx.navigateTo({
    url: '/pages/shoplist/shoplist?value=' + value
  });
  },
  tapName: function(e) {
  var dataHi = e.currentTarget.dataset.hi;
  // 获取Datalist[1]的值
  var value = this.data.dateData[dataHi];
  console.log(value)
  // 页面跳转并传递参数
  wx.navigateTo({
    url: '/pages/shoplist/shoplist?value=' + value
  });
  },
  // getData(){
  //   db.collection('demolist')
  //   .get()
  //   .then(res=>{
  //     console.log(res)
  //     this.setData({
  //       dataArr:res.data,
  //       shenglv:res.data.shengchangshu * 100 / res.data.zongchangshu
  //     })
  //   })
  // },
  getData(num=23,page=0){
    //数量从这里传的，传过去就在event里面
    wx.cloud.callFunction({
      name:"paiMing",
      data:{
        num:num,
        page:page
      }
    }).then(res=>{
      console.log(res.result.data[1])
      var oldData=this.data.dataList
      var newData=oldData.concat(res.result.data);
      for (let i = 0; i < newData.length; i++) {
        let sum = 0;
        let obj = newData[i];
        obj['wSum'] = 0;
        for (let key in obj) {
          if (key.startsWith('w')&&obj[key]!== "") {
            sum += (obj[key])
          }
        }
        obj['wSum'] = sum;
      }
      console.log(newData);
      //下拉后将新旧数据拼接
      this.setData({
        dataList:newData
      })
    })
  },
  Order(){
    wx.showLoading({
      title: '数据加载中...',
      mask:true
    })
    wx.cloud.callFunction({
      name:"Order"
    }).then(res=>{
      console.log(res,"order")
      wx.hideLoading(),
      wx.navigateTo({
        url: '/pages/demo4/demo4'
        })
    })

  },
  back: function() {
    wx.navigateTo({
      url: '/pages/demo8/demo8'
      })
  },
  onReachBottom() {
    var page=this.data.dataList.length
    this.getData(23,page)
  },
  onLoad(options) { 
    this.getData()
    console.log(data[0]);
  }
})

