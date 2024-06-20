// 云函数入口文件
const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db=cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  const {       
    m,
    n,
    name1,
    name2,
    jufen,
    jufen1,
    Zcount,
    Zcount1,
    faqiu,
    faqiu1,
    ace,
    ace1,
    shuangwu,
    shuangwu1,} = event
  //这里没有获取到对应的页面和分页数量
  return await db.collection("h2h").add({
    data:{    
      m,
      n,
      name1,
      name2,
      jufen,
      jufen1,
      Zcount,
      Zcount1,
      faqiu,
      faqiu1,
      ace,
      ace1,
      shuangwu,
      shuangwu1,
      }
  })
}