// pages/demo/demo.js
import * as echarts from "../../ec-canvas/echarts"
let chart = null
Page({
  /**
   * 页面的初始数据
   */
  data: {
    ec:{
      onInit: initChart
    },
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

function getOption(){
  return{
    title: {
      text: '7号线燃弧占比',
      subtext: '单位：ms',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: '燃弧占比',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1048, name: '0~10ms' },
          { value: 735, name: '10~20ms' },
          { value: 580, name: '20~30ms' },
          { value: 484, name: '30~40ms' },
          { value: 300, name: '40~50ms' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
}

function initChart(canvas,width,height,dpr){
  chart = echarts.init(canvas,null,{
    width:width,
    height:height,
    devicePixelRatio: dpr
  })
  canvas.setChart(chart)
  let option = getOption()//这里是echarts的配置信息
  chart.setOption(option)
  return chart
}