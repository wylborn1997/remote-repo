// pages/message/message.js
var count = 0;//全局小分
var jcount= 0;//全局局分
var count1 = 0;
var jcount1= 0;
var huanfa = 0;
var m=[0,0,0,0,0];//甲:0一发得分、1二发得分、2一发失分、3二发失分、4双误、5发球方
var n=[0,0,0,0,0];//乙:0一发得分、1二发得分、2一发失分、3二发失分、4双误、5发球方
var stack=[];
var currentTime = 0
Page({
  /**
   * 页面的初始数据
   */
  data: {
    Zcount:0,
    xiaofen: 0,// 用于表示小分的值
    jufen: 0 ,// 用于表示局分的值,
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
    nameList: ["球员1","球员2"], // 备忘录列表
    inputValue: '', // 输入框的值
    localdata:[],
    zhanhao:0,
   },

   time() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    currentTime = month + "-" + day + " " + hour + ":" + minute;
    console.log(currentTime)
  },

   inputzhanhao(e){
    this.setData({
      zhanhao: e.detail.value
    })
    console.log("站号",this.data.zhanhao)
  },
  
  localsave(){
    this.time()
    const zhan = this.data.zhanhao;
    const Ctime = currentTime;
    const content = [
      this.data.nameList[0],
      this.data.nameList[1],
      zhan,
      m,//甲:0一发得分、1二发得分、2一发失分、3二发失分、4双误、5发球方
      n,//乙:0一发得分、1二发得分、2一发失分、3二发失分、4双误、5发球方
      this.data.jufen,//局分
      this.data.jufen1,
      this.data.Zcount,//小分
      this.data.Zcount1,
      this.data.faqiu,//发球
      this.data.faqiu1,
      this.data.ace,//ace球
      this.data.ace1,
      this.data.shuangwu,//双误
      this.data.shuangwu1,
      Ctime,//时间
    ];
    const localdata = this.data.localdata
    localdata.push(content);
    console.log(content)
    if (zhan){
      this.setData({
        localdata
      })
      }
    // 弹出对话框
    wx.showModal({
      title: '提示',
      content: '确认已经录完比分并保存数据吗？',
      success(res) {
          console.log('保存数据');
          wx.setStorageSync("history",localdata)
        }
    });
    wx.showLoading({
      title: '数据加载中...',
      mask:true
    })
    wx.cloud.callFunction({
      name:"addScore",
      data:{
        name1:this.data.nameList[0],
        name2:this.data.nameList[1],
        jufen:this.data.jufen,
        m:m,
        n:n,
        jufen1:this.data.jufen1,
        Zcount:this.data.Zcount,
        Zcount1:this.data.Zcount1,
        faqiu:this.data.faqiu,
        faqiu1:this.data.faqiu1,
        ace:this.data.ace,
        ace1:this.data.ace1,
        shuangwu:this.data.shuangwu,
        shuangwu1:this.data.shuangwu1,
      }
    }
    ).then(res=>{
      console.log(res,"保存到云")
      wx.hideLoading()
  })
  },

  onInput(e){
    this.setData({
      inputValue:e.detail.value
    })
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
  mList:function(){
    if(this.data.status === '一发' && this.data.j === 0 ){
      m[0] = m[0]+1//甲一发得分加一
    }else if(this.data.status === '二发' && this.data.j === 0 ){
      m[1] = m[1]+1//甲二发得分加一
    }else if(this.data.status === '一发' && this.data.j === 1 ){
      n[2] = n[2]+1//乙一发失分加一
    }else if(this.data.status === '二发'&& this.data.j === 1 ){
      n[3] = n[3]+1//乙二发失分加一
    }
  },
  jifen:function(){
    count++; // 每次点击按钮，count加1
    if(jcount < 4){
    this.mList()
    if (count === 1 || count === 2) {
      this.setData({
        xiaofen: this.data.xiaofen + 15
      });
    } else if (count === 3) {
      this.setData({
        xiaofen: this.data.xiaofen + 10
      });
    } else if (count === 4 && this.data.j===0) 
    {
      this.setData({
        xiaofen: 0,//小分置零
        xiaofen1: 0,//小分置零
        jufen: this.data.jufen + 1,//局分加一
        j:1//换发
      });
      count = 0;
      count1 = 0;
      jcount = this.data.jufen 
    } else if (count === 4 && this.data.j===1) {
      this.setData({
        xiaofen: 0,
        xiaofen1: 0,
        jufen: this.data.jufen + 1,
        j:0//换发
      });
      count = 0;
      count1 = 0;
      jcount = this.data.jufen 
    }

  }else if(jcount === 4 && jcount1<3){
    this.mList()
    this.setData({
      xiaofen: 0,
    });
    count = 0;
  }else if(jcount === 4 && jcount1===3){
    this.mList()
    if (count === 1 || count === 2) {
      this.setData({
        xiaofen: this.data.xiaofen + 15
      });
    } else if (count === 3) {
      this.setData({
        xiaofen: this.data.xiaofen + 10
      });
    } else if (count === 4 && this.data.j===0) {
      this.setData({
        xiaofen: 0,//小分置零
        xiaofen1: 0,//小分置零
        jufen: this.data.jufen + 1,//局分加一
        j:1//换发
      });
      count = 0;
      count1 = 0;
      jcount = this.data.jufen 
    } else if (count === 4 && this.data.j===1) {
      this.mList()
      this.setData({
        xiaofen: 0,
        xiaofen1: 0,
        jufen: this.data.jufen + 1,
        j:0//换发
      });
      count = 0;
      count1 = 0;
      jcount = this.data.jufen 
    }
  }else if(jcount === 4 && jcount1===4){
    this.mList()
    if (count < 7) {
      this.setData({
        xiaofen: this.data.xiaofen + 1
      });
  }else if(count = 7){
    this.setData({
      xiaofen: 7,//小分锁定
      jufen:5
    });
  }    
  }
  this.setData({
    Zcount: this.data.Zcount + 1
  })
  this.setData({
    faqiu:m[0]+m[1],
    faqiu1:n[0]+n[1],
  });
},
  jisuan:function(){
    this.setData({

      yifade: Math.floor(m[0]/(m[0]+m[2])*100),

      erfade: Math.floor(m[1]/(m[1]+m[3])*100),
  
      yifacheng: Math.floor((m[0]+m[2])/(m[0]+m[1]+m[2]+m[3])*100),
  
      erfacheng:Math.floor((m[1]+m[3])/(m[1]+m[3]+m[4])*100),
  
      shuangwulv: Math.floor((m[4])/(m[0]+m[1]+m[2]+m[3])*100),
  
      yifade1: Math.floor(n[0]/(n[0]+n[2])*100),
  
      erfade1: Math.floor(n[1]/(n[1]+n[3])*100),
  
      yifacheng1: Math.floor((n[0]+n[2])/(n[0]+n[1]+n[2]+n[3])*100),
  
      erfacheng1:Math.floor((n[1]+n[3])/(n[1]+n[3]+n[4])*100),
  
      shuangwulv1: Math.floor((n[4])/(n[0]+n[1]+n[2]+n[3])*100),

  })
  },
  AClick: function() {
    this.jifen()
    this.jisuan()
    this.changeproColor()
    this.changeColor()
    this.erfa()
    this.changeyifaColor()
    this.save()
    stack.push(JSON.parse(JSON.stringify(this.data)))
    console.log(stack)
    console.log("xiaofen",this.data.xiaofen1)
  },
  nList:function(){
    if(this.data.status === '一发' && this.data.j === 1 ){
      n[0]= n[0]+1//乙一发得分加一
    }else if(this.data.status === '二发' && this.data.j === 1 ){
      n[1]= n[1]+1//乙二发得分加一
    }else if(this.data.status === '一发' && this.data.j === 0 ){
      m[2]= m[2]+1//甲一发失分加一
    }else if(this.data.status === '二发' && this.data.j === 0 ){
      m[3]= m[3]+1//甲二发失分加一
    }
  },
  jifen1:function(){
    count1++;// 每次点击按钮，count加1
    if(jcount1 < 4){
     this.nList() 
    if (count1 === 1 || count1 === 2) {
      this.setData({
        xiaofen1: this.data.xiaofen1 + 15
      });
    } else if (count1 === 3) {
      this.setData({
        xiaofen1: this.data.xiaofen1 + 10
      });
    } else if (count1 === 4 && this.data.j===0) {
      this.setData({
        xiaofen:0,
        xiaofen1: 0,
        jufen1: this.data.jufen1 + 1,
        j:1
      });
      count = 0;
      count1 = 0;
      jcount1 = this.data.jufen1 
    } else if (count1 === 4 && this.data.j===1) {
      this.setData({
        xiaofen:0,
        xiaofen1: 0,
        jufen1: this.data.jufen1 + 1,
        j:0
      });
      count = 0;
      count1 = 0;
      jcount1 = this.data.jufen1 
    }

  }else if(jcount1 === 4 && jcount<3){
    this.nList() 
    this.setData({
      xiaofen1: 0,
    });
    count1 = 0;
    jcount1 = 0;
  }else if(jcount1 === 4 && jcount===3){
    this.nList() 
    if (count1 === 1 || count1 === 2) {
      this.setData({
        xiaofen1: this.data.xiaofen1 + 15
      });
    } else if (count1 === 3) {
      this.setData({
        xiaofen1: this.data.xiaofen1 + 10
      });
    } else if (count1 === 4 && this.data.j===0) {
      this.setData({
        xiaofen:0,
        xiaofen1: 0,
        jufen1: this.data.jufen1 + 1,
        j:1
      });
      count = 0;
      count1 = 0;
      jcount1 = this.data.jufen1 
    } else if (count1 === 4 && this.data.j===1) {
      this.setData({
        xiaofen:0,
        xiaofen1: 0,
        jufen1: this.data.jufen1 + 1,
        j:0
      });
      count = 0;
      count1 = 0;
      jcount1 = this.data.jufen1 
    }
    this.setData({
      Zcount1: this.data.Zcount1 + 1
    })
  }else if(jcount1 === 4 && jcount===4){
    this.nList() 
    if (count1 < 7) {
      this.setData({
        xiaofen1: this.data.xiaofen1 + 1
      });
  }else if(count1 = 7){
    this.setData({
      xiaofen1: 7,//小分锁定
      jufen1: 5,//局分加一
      j:1//换发
    });
  }    
  }
  this.setData({
    Zcount1: this.data.Zcount1 + 1
  })
  this.setData({
    faqiu:m[0]+m[1],
    faqiu1:n[0]+n[1],
  });
  },
  BClick: function() {
    this.jifen1()
    this.jisuan()    
    this.changeproColor()
    this.changeColor()
    this.erfa()
    this.changeyifaColor()
    this.save()
    stack.push(JSON.parse(JSON.stringify(this.data)))
    console.log(stack)
    console.log("xiaofen",this.data.xiaofen1)
  },
  huanfaColor: function() {
    if (this.data.j === 0) {
      this.setData({
        j: 1
      });
    } else {
      this.setData({
       j: 0
      });
    }
    this.changeColor()
  },
  yifa: function() {
    if (this.data.status === '一发') {
      this.setData({
        status: '二发',
      });
    } else {
      this.setData({
        status: '一发'
      });
    }
    this.changeyifaColor()
  },//点击1发按钮，切换二发
  erfa:function(){
    if (this.data.status === '二发') {
      this.setData({
        status: '一发',
      });
    }
  },//点击AB按钮，自动切换为一发
  shuangwu: function() {
    if (this.data.j === 0) {
      this.setData({
        shuangwu: this.data.shuangwu +1
      });
    m[4]= m[4]+1//双误数加一
    console.log("发球方",this.data.j)
    this.jifen1()
    } else if(this.data.j === 1){
      this.setData({
        shuangwu1: this.data.shuangwu1 +1
      });
      n[4]= n[4]+1//双误数加一
      this.jifen()
    }
  this.jisuan()
  this.changeColor()
  this.changeproColor()
  this.erfa()
  this.changeyifaColor()
  this.save()
  stack.push(JSON.parse(JSON.stringify(this.data)))
  console.log(stack)
  console.log("xiaofen",this.data.xiaofen1)
  },
  ace: function() {
    if (this.data.j === 0) {
      this.setData({
        ace: this.data.ace +1
      });
    this.jifen()
    } else if(this.data.j === 1){
      this.setData({
        ace1: this.data.ace1 +1
      });
      this.jifen1()
    }
  this.jisuan()
  this.changeColor()
  this.changeproColor()
  this.erfa()
  this.changeyifaColor()
  this.save()
  stack.push(JSON.parse(JSON.stringify(this.data)))
  console.log(stack)
  console.log("xiaofen",this.data.xiaofen1)
  },


  clearData: function() {
    // 清零数据的逻辑代码
    count = 0;//全局小分
      jcount= 0;//全局局分
      count1 = 0;
      jcount1= 0;
      huanfa = 0;
      m=[0,0,0,0,0];//甲:0一发得分、1二发得分、2一发失分、3二发失分、4双误、5发球方
      n=[0,0,0,0,0];//乙:0一发得分、1二发得分、2一发失分、3二发失分、4双误、5发球方
      stack=[]
    // 例如：将数据重置为初始值
    this.setData({
      Zcount:0,
      xiaofen: 0,// 用于表示小分的值
      jufen: 0 ,// 用于表示局分的值,
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
      nameList: ["球员1","球员2"], // 备忘录列表
      inputValue: '', // 输入框的值
      localdata:[],
      zhanhao:0,
     });
  },


  undo() {
    if (stack.length > 0) {
      const lastResult = stack.pop(); // 取出栈顶元素作为上一次的结果
      this.setData(
        lastResult,
        count = lastResult.xiaofenstack,//全局小分
        jcount = lastResult.jufenstack,//全局局分
        count1 = lastResult.xiaofen1stack,
        jcount1= lastResult.jufen1stack,
        m = lastResult.mstack,
        n = lastResult.nstack
      );
    }
    console.log(stack)
    console.log("xiaofen",this.data.xiaofen1)
  },
  onTap(){
    wx.switchTab({
      url: '/pages/message/message'
    })
    console.log("点击")
  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad(options) {
    this.save()
    stack.push(JSON.parse(JSON.stringify(this.data)))
    console.log(stack)
    console.log("xiaofen",this.data.xiaofen1)
    const localdata = wx.getStorageSync('history') || [];    //重加载数据
    this.setData({
      localdata
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