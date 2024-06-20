// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  const demolist = db.collection('demolist')

  // 按照paiMing的大小顺序进行重新排序
  const res = await demolist.orderBy('paiMing', 'desc').get()
  const list = res.data

  // 更新索引值index，并将变化量存在字段change中
  for (let i = 0; i < list.length; i++) {
    const item = list[i]
    const oldIndex = item.index
    const newIndex = i + 1
    const change =   oldIndex-newIndex

    await demolist.doc(item._id).update({
      data: {
        index: newIndex,
        change: change
      }
    })
  }

  return 'success'
}