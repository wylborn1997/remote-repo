// pages/demo/demo.js
import * as echarts from "../../ec-canvas/echarts"
let chart = null
Page({
  /**
   * 页面的初始数据
   */
  data: {
    ec1:{
      onInit: initChart
    },
    ec2:{
      onInit: initzhuChart
    },
    ec3:{
      onInit: initrChart
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
//饼状图绘制
function getOption(){
  return{
    title: {
      text: '燃弧大小分布图',
      bottom:"bottom",
      left: "center",
      top: '86%',
      textStyle: {
        fontSize: 16
    }
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center',
      itemWidth: 10
    },
    series: [
      {
        name: '燃弧占比',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 104, name: '0~10ms' },
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
//柱状图绘制
function getOption2(){
  return{
    title: {
      text: '燃弧统计图',
      subtext: '单位：ms',
      bottom:"bottom",
      left: "center",
      top: '86%',
      textStyle: {
        fontSize: 16
    }
    },
    legend: {
      top: '5%',
      left: 'center',
      // 图例文字颜色
      textStyle: {
          color: "#333",
      },
      bottom: 'bottom',
  },
  grid: {
      left: "20%",
  },
  // 提示框
  tooltip: {
      trigger: "axis",
  },
  xAxis: {
      type: "category", // 柱状图
      data: ["廖家湾","华桂路","北部商贸城","柏水场","九道堰"], //遍历uData数据
      axisLine: {
          lineStyle: {
              color: "#17b3a3",
          },
      },
      axisLabel: {
          interval: 0,
          color: "#333",
      },
  },
  yAxis: [{
      type: "value",
      axisLine: {
          lineStyle: {
              color: "#17b3a3",
          },
      },
  }, ],
  color: ["#2ec7c9", "#b6a2de"],
  series: [{
          name: '燃弧值',
          data: [78,44,32,33,14], //遍历userData数据
          type: 'bar'
      },
      {
          name: '重复次数',
          data: [4,3,5,3,2], //遍历userData数据
          type: 'bar' 
      }
  ],
  }
}
function initzhuChart(canvas,width,height,dpr){
  chart = echarts.init(canvas,null,{
    width:width,
    height:height,
    devicePixelRatio: dpr
  })
  canvas.setChart(chart)
  let option = getOption2()//这里是echarts的配置信息
  chart.setOption(option)
  return chart
}
function getOption3(){
  return{
    title: {
      text: '燃弧位置统计图',
      bottom:"bottom",
      left: "center",
      top: '86%',
      textStyle: {
        fontSize: 16
    }
    },
    legend: {
      top: '5%',
      left: 'center',
      data: ['上月', '本月']
  },
    grid: {
        left: '8%',
        right: '8%',
        top: '10%'
    },
    xAxis: {
        axisLabel: {
            formatter: 'M{value}'
        },
        splitLine: {
            lineStyle: {
                type: 'dashed'
            }
        }
    },
    yAxis: {
        splitLine: {
            lineStyle: {
                type: 'dashed'
            }
        },
        scale: true
    },
    series: [{
            name: '上月',
            data: 
              [
                  [286, 7, 17, '琉璃场', 1990, 1],
                  [311, 4, 27, '火车南站', 1990, 3],
                  [151, 5, 95, '火车北站', 1990, 5],
                  [136, 2, 10, '三瓦窑', 1990, 7],
                  [138, 4, 10, '川师', 1990, 12],
              ],

            type: 'scatter',
            tooltip: {
                valueFormatter: value => "重复" + value + '次'
            },
            symbolSize: function (data) {
                return Math.sqrt(data[2]) * 3;
            },
            emphasis: {
                focus: 'series',
                label: {
                    show: true,
                    formatter: function (param) {
                        return param.data[3] + " M" + Math.floor(param.data[0])  + "\n" + "燃弧大小：" + param.data[2] + "ms";
                    },
                    position: 'top'
                }
            },
            itemStyle: {
                shadowBlur: 10,
                shadowColor: 'rgba(120, 36, 50, 0.5)',
                shadowOffsetY: 5,
                color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                        offset: 0,
                        color: 'rgb(251, 118, 123)'
                    },
                    {
                        offset: 1,
                        color: 'rgb(204, 46, 72)'
                    }
                ])
            }
        },
        {
            name: '本月',
            data: 
              [
                  [44, 3, 23, '武侯大道', 2015, 31],
                  [13, 3, 35, '理工大', 2015, 15],
                  [151, 2, 13, '火车北站', 2015, 9],
                  [127, 1, 43, '文化宫', 2015, 9],
              ],
          
            type: 'scatter',
            tooltip: {
                valueFormatter: value => '重复' + value + '次'
            },
            symbolSize: function (data) {
                return Math.sqrt(data[2]) * 3;
            },
            emphasis: {
                focus: 'series',
                label: {
                    show: true,
                    formatter: function (param) {
                        return param.data[3] + " M" + Math.floor(param.data[0]) + "\n" + "燃弧大小：" + param.data[2] + "ms";
                    },
                    position: 'top'
                }
            },
            itemStyle: {
                shadowBlur: 10,
                shadowColor: 'rgba(25, 100, 150, 0.5)',
                shadowOffsetY: 5,
                color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                        offset: 0,
                        color: 'rgb(129, 227, 238)'
                    },
                    {
                        offset: 1,
                        color: 'rgb(25, 183, 207)'
                    }
                ])
            }
        }
    ],
    tooltip: {
        trigger: 'axis',
    }
}
}
function initrChart(canvas,width,height,dpr){
  chart = echarts.init(canvas,null,{
    width:width,
    height:height,
    devicePixelRatio: dpr
  })
  canvas.setChart(chart)
  let option = getOption3()//这里是echarts的配置信息
  chart.setOption(option)
  return chart
}
