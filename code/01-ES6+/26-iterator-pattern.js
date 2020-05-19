// 迭代器设计模式

// 场景：协同开发

// 内部代码 ===============================
const obj = {
  a: 1,
  b: 2
}
const life=['吃饭', '睡觉', '打豆豆']
for (const item of obj) {
  console.log(item)
}
const todos = {
  life: ['吃饭', '睡觉', '打豆豆'],
  learn: ['语文', '数学', '外语'],
  work: ['喝茶'],

  // 提供统一遍历访问接口
  each: function (callback) {
    const all = [].concat(this.life, this.learn, this.work)
    for (const item of all) {
      callback(item)
    }
  },

  // 提供迭代器（ES2015 统一遍历访问接口）
  [Symbol.iterator]: function () {
    const all = [...this.life, ...this.learn, ...this.work]
    let index = 0
    return {
      next: function () {
        return {
          value: all[index],
          done: index++ >= all.length
        }
      }
    }
  }
}

// 外部代码 ===============================

// 外部不需要考虑内部的数据形式，只要使用对外提供的统一的接口

for (const item of todos) {
  console.log(item)
}
