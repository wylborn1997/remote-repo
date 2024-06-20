// 云函数入口文件
const cloud = require('wx-server-sdk');
const { DataModel } = require('XrFrame/kanata/lib/index');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db=cloud.database();
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  const { name, score = 0, rank = 0, date = 'unknown',sheng=0,zong=0 } = event
  //这里没有获取到对应的页面和分页数量
  return await db.collection("demolist").where({
    name
  }).update({
    data:{    
       shengChang: _.inc(parseInt(sheng)),
       zongChang:_.inc(parseInt(zong)),
       [date]:parseInt(score),
       paiMing:_.inc(parseInt(score)) 
       //zongChang:_.inc(zongChang)
      }
  })
}