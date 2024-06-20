// pages/message/message.js
import * as echarts from "../../ec-canvas/echarts"
let chart = null
var count = 0;//全局小分
var jcount= 0;//全局局分
var count1 = 0;
var jcount1= 0;
var huanfa = 0;
var m=[8,1,9,0,0];//甲:0一发得分、1二发得分、2一发失分、3二发失分、4双误
var n=[0,0,0,0,0];//乙:0一发得分、1二发得分、2一发失分、3二发失分、4双误
var stack=[]
var pageArr = []
Page({
  /**
   * 页面的初始数据
   */
  data: {
    ec:{
      onInit: initChart
    },
    namehistory:[],
    history:[],
    Zcount:0,
    xiaofen: 0,// 用于表示小分的值
    jufen: 0 ,// 用于表示局分的值
    j: 0,//发球方
    shuangwu:0,
    shuangwu1:0,
    ace:0,
    ace1:0,
    Zcount1:0,
    xiaofen1: 0, // 用于表示小分的值
    jufen1: 0,// 用于表示局分的值
    status: '一发',
    yifade:0,
    yifade1:0,
    erfade:0,
    erfade1:0,
    yifacheng:0,
    yifacheng1:0,
    erfacheng:0,
    erfacheng1:0,
    shuangwulv:0,
    shuangwulv1:0,
    buttonAColor: 'yellow',
    buttonBColor: 'white',
    proAColor: "#C2405B",
    proBColor: "#EFD1CE",
    proAColor1: "#9BED2F",
    proBColor1: "#BFEFA9",
    proAColor2: "#4BD9F0",
    proBColor2: "#BFEFF0",
    faqiu:0,
    faqiu1:0,
    backAColor: "#81BE05",
    backBColor: "#60AD2A",
    xiaofenstack:0,
    jufenstack:0,
    xiaofen1stack:0,
    jufen1stack:0,
    huanfastack:0,
    mstack:[[0,0,0,0,0]],
    nstack:[[0,0,0,0,0]],
    nameList: ["球员1","球员2"], //备忘录列表
    inputValue: '', //输入框的值
   },
   onInput(e) {
    this.setData({
      inputValue: e.detail.value,
    });
  },
  onSave() {
    const { nameList, inputValue } = this.data;
    if (inputValue.trim() !== '') {
      nameList.push(inputValue);
      nameList.shift()
      this.setData({
        nameList,
        inputValue: '',
      });
    }
    console.log(this.data.nameList)
    console.log(this.data.nameList.slice(-1)[0])
  },
  changeColor: function() {
    if (this.data.j === 0) {
      this.setData({
        buttonAColor: 'yellow',
        buttonBColor: 'white',
        backAColor: "#81BE05",
        backBColor: "skyblue",
        qiuyuanColor1:"#81BE05",
        qiuyuanColor2:"skyblue",
        Astatus:"🎾",
        Bstatus:""
      });
    } else{
      this.setData({
        buttonAColor: 'white',
        buttonBColor: 'yellow',
        backAColor: "skyblue",
        backBColor: "#81BE05",
        qiuyuanColor1:"skyblue",
        qiuyuanColor2:"#81BE05",
        Astatus:"",
        Bstatus:"🎾"
      });
    }
  },
  changeproColor:function(){
    if (this.data.shuangwulv > this.data.shuangwulv1) {
      this.setData({
        proAColor: "#C2405B",
        proBColor: "#EFD1CE"
      });
    }else if (this.data.shuangwulv === this.data.shuangwulv1) {
      this.setData({
        proAColor: "#C2405B",
        proBColor: "#C2405B"
      });
    } else{
      this.setData({
        proAColor: "#EFD1CE",
        proBColor: "#C2405B"
      });
    }
    if (this.data.yifade > this.data.yifade1) {
      this.setData({
        proAColor1: "#9BED2F",
        proBColor1: "#BFEFA9",
      });
    }else if (this.data.yifade === this.data.yifade1) {
      this.setData({
        proAColor1: "#9BED2F",
        proBColor1: "#9BED2F",
      });
    } else{
      this.setData({
        proAColor1: "#BFEFA9",
        proBColor1: "#9BED2F",
      });
    }
    if (this.data.erfade > this.data.erfade1) {
      this.setData({
        proAColor2: "#9BED2F",
        proBColor2: "#BFEFA9",
      });
    }else if (this.data.erfade === this.data.erfade1) {
      this.setData({
        proAColor2: "#9BED2F",
        proBColor2: "#9BED2F",
      });
    } else{
      this.setData({
        proAColor2: "#BFEFA9",
        proBColor2: "#9BED2F",
      });
    }
    if (this.data.yifacheng > this.data.yifacheng1) {
      this.setData({
        proAColor3: "#4BD9F0",
        proBColor3: "#BFEFF0",
      });
    }else if (this.data.yifacheng === this.data.yifacheng1) {
      this.setData({
        proAColor3: "#4BD9F0",
        proBColor3: "#4BD9F0",
      });
    } else{
      this.setData({
        proAColor3: "#BFEFF0",
        proBColor3: "#4BD9F0",
      });
    }
    if (this.data.erfacheng > this.data.erfacheng1) {
      this.setData({
        proAColor4: "#4BD9F0",
        proBColor4: "#BFEFF0",
      });
    }else if (this.data.erfacheng === this.data.erfacheng1) {
      this.setData({
        proAColor4: "#4BD9F0",
        proBColor4: "#4BD9F0",
      });
    } else{
      this.setData({
        proAColor4: "#BFEFF0",
        proBColor4: "#4BD9F0",
      });
    }
    if (this.data.Zcount > this.data.Zcount1) {
      this.setData({
        proAColor5: "#632EFA",
        proBColor5: "#C5B5FA",
      });
    }else if (this.data.Zcount === this.data.Zcount1) {
      this.setData({
        proAColor5: "#632EFA",
        proBColor5: "#632EFA",
      });
    } else{
      this.setData({
        proAColor5: "#C5B5FA",
        proBColor5: "#632EFA",
      });
    }
    if (this.data.faqiu > this.data.faqiu1) {
      this.setData({
        proAColor6: "#632EFA",
        proBColor6: "#C5B5FA",
      });
    }else if (this.data.faqiu === this.data.faqiu1) {
      this.setData({
        proAColor6: "#632EFA",
        proBColor6: "#632EFA",
      });
    } else{
      this.setData({
        proAColor6: "#C5B5FA",
        proBColor6: "#632EFA",
      });
    }
    if (this.data.ace > this.data.ace1) {
      this.setData({
        proAColor7: "#2F7BED",
        proBColor7: "#A5C5F5",
      });
    }else if (this.data.ace === this.data.ace1) {
      this.setData({
        proAColor7: "#2F7BED",
        proBColor7: "#2F7BED",
      });
    } else{
      this.setData({
        proAColor7: "#A5C5F5",
        proBColor7: "#2F7BED",
      });
    }
  },
  changeyifaColor: function() {
    //点击一发按钮变换颜色
    if (this.data.status === "二发"){
      this.setData({
        yifaColor: '#C19B9A',
      });
    }else{
      this.setData({
        yifaColor: "skyblue",
      });
    }
  },
  save:function(){
    this.setData({
      xiaofenstack:count,
      jufenstack:jcount,
      xiaofen1stack:count1,
      jufen1stack:jcount1,
      huanfastack:huanfa,
      mstack:m,
      nstack:n
    });
    console.log("=====",this.data.xiaofenstack)
  },
  onTap(){
    wx.switchTab({
      url: '/pages/message/message'
    })
    console.log("点击")
  },
  saveMemo() {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.save()
    stack.push(JSON.parse(JSON.stringify(this.data)))
    console.log(stack)
    console.log("xiaofen",this.data.xiaofen1)
    // 获取本地数据
    const history = wx.getStorageSync('history') || [];
    this.setData({
    history,
    });
    console.log("history",history)  
    // 获取传递过来的参数
    let str = options.value;
    let value = str.split(",");
    console.log("传入值",value) 
    var str1 = value[0];
    var num = parseInt(str1);    
    const name = value[1]
    const namehistory = this.data.namehistory
    //判断选手1姓名
    for (var i = 0; i < history.length; i++) {
      if (history[i][0] === name) {
        namehistory.unshift(history[i])
      }
    console.log("namehistory",namehistory)
    }    
    var shoplistvalue = namehistory[num]
    console.log("shoplistvalue",shoplistvalue)
    //配置本地参数
    this.setData({
      yifade:Math.floor(shoplistvalue[3][0]/(shoplistvalue[3][0]+shoplistvalue[3][2])*100),

      erfade: Math.floor(shoplistvalue[3][1]/(shoplistvalue[3][1]+shoplistvalue[3][3])*100),
  
      yifacheng: Math.floor((shoplistvalue[3][0]+shoplistvalue[3][2])/(shoplistvalue[3][0]+shoplistvalue[3][1]+shoplistvalue[3][2]+shoplistvalue[3][3])*100),
  
      erfacheng:Math.floor((shoplistvalue[3][1]+shoplistvalue[3][3])/(shoplistvalue[3][1]+shoplistvalue[3][3]+shoplistvalue[3][4])*100),
  
      shuangwulv: Math.floor((shoplistvalue[3][4])/(shoplistvalue[3][0]+shoplistvalue[3][1]+shoplistvalue[3][2]+shoplistvalue[3][3])*100),

      yifade1: Math.floor(shoplistvalue[4][0]/(shoplistvalue[4][0]+shoplistvalue[4][2])*100),
  
      erfade1: Math.floor(shoplistvalue[4][1]/(shoplistvalue[4][1]+shoplistvalue[4][3])*100),
  
      yifacheng1: Math.floor((shoplistvalue[4][0]+shoplistvalue[4][2])/(shoplistvalue[4][0]+shoplistvalue[4][1]+shoplistvalue[4][2]+shoplistvalue[4][3])*100),
  
      erfacheng1:Math.floor((shoplistvalue[4][1]+shoplistvalue[4][3])/(shoplistvalue[4][1]+shoplistvalue[4][3]+shoplistvalue[4][4])*100),
  
      shuangwulv1: Math.floor((shoplistvalue[4][4])/(shoplistvalue[4][0]+shoplistvalue[4][1]+shoplistvalue[4][2]+shoplistvalue[4][3])*100),

       nameList: shoplistvalue,
       zhan :shoplistvalue[2],
       jufen :shoplistvalue[5],
       jufen1 :shoplistvalue[6],
       Zcount :shoplistvalue[7],
       Zcount1 :shoplistvalue[8],
       faqiu :shoplistvalue[9],
       faqiu1 :shoplistvalue[10],
       ace :shoplistvalue[11],
       ace1 :shoplistvalue[12],
       shuangwu :shoplistvalue[13],
       shuangwu1 :shoplistvalue[14],
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
   * 页面相二发事件处理函数--监听用户下拉动作
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
  pageArr = getCurrentPages()
  console.log("获取page中的data",pageArr[pageArr.length-1].data)
  return{
    color: ['#67F9D8', '#FFE434', '#56A3F1', '#FF917C'],
    title: {
      text: ''
    },
    legend: {},
    radar: [
      {
        indicator: [
          { text: 'ace球' },
          { text: '一发成功功率' },
          { text: '一发得分率' },
          { text: '双误' },
          { text: '二发得分率' },
          { text: '二发成功率' }
        ],
        center: ['50%',"60%"],//雷达图中心点位置
        radius: 70,//属性定义了雷达图的半径
        startAngle: 90,//属性定义了雷达图的起始角度
        splitNumber: 4,//属性定义了雷达图中各个指标之间的分割数
        shape: 'circle',//属性定义了雷达图的形状，这里是圆形
        axisName: {
          formatter: '【{value}】',
          color: '#428BD4'
        },//性定义了雷达图中各个指标轴线上显示的文字格式和颜色
        splitArea: {
          areaStyle: {
            color: ['#77EADF', '#26C3BE', '#64AFE9', '#428BD4'],
            shadowColor: 'rgba(0, 0, 0, 0.2)',
            shadowBlur: 10
          }
        },//属性定义了雷达图中各个指标区域的填充颜色和阴影效果
        axisLine: {
          lineStyle: {
            color: 'rgba(211, 253, 250, 0.8)'
          }
        },//属性定义了雷达图中各个指标轴线的颜色。
        splitLine: {
          lineStyle: {
            color: 'rgba(211, 253, 250, 0.8)'
          }
        }
      }
    ],
    series: [
      {
        type: 'radar',
        emphasis: {
          lineStyle: {
            width: 4
          }
        },
        data: [
          {
            value: [
            pageArr[pageArr.length-1].data.ace,
            pageArr[pageArr.length-1].data.yifacheng, 
            pageArr[pageArr.length-1].data.yifade, 
            pageArr[pageArr.length-1].data.shuangwu,
            pageArr[pageArr.length-1].data.erfade,
            pageArr[pageArr.length-1].data.erfacheng],
            name: pageArr[pageArr.length-1].data.nameList[0],
            label: {
              show: true,
              formatter: function (params) {
                return params.value;
              }
            }//显示刻度
          },
         
          {
            value: [            
              pageArr[pageArr.length-1].data.ace1,
              pageArr[pageArr.length-1].data.yifacheng1, 
              pageArr[pageArr.length-1].data.yifade1, 
              pageArr[pageArr.length-1].data.shuangwu1,
              pageArr[pageArr.length-1].data.erfade1,
              pageArr[pageArr.length-1].data.erfacheng1],
            name: pageArr[pageArr.length-1].data.nameList[1],
            areaStyle: {
              color: 'rgba(255, 228, 52, 0.6)'
            }
          }
        ]
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

