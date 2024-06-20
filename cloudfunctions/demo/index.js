// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db=cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  var num=event.num;
  var page=event.page;
  //这里没有获取到对应的页面和分页数量
  console.log(num,page)
  return await db.collection("demouser").skip(page).limit(num).get()
}