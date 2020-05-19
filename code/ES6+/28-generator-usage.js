// Generator 应用

// 案例1：发号器

function * createIdMaker () {
  let id = 1
  while (true) {
    yield id++
  }
}

const idMaker = createIdMaker()
// 每次调用会返回一个数值，递增
console.log(idMaker.next().value) // 1
console.log(idMaker.next().value) // 2
console.log(idMaker.next().value) // 3

// 案例2：使用 Generator 函数实现 iterator 方法

const todos = {
  life: ['吃饭', '睡觉', '打豆豆'],
  learn: ['语文', '数学', '外语'],
  work: ['喝茶'],
  [Symbol.iterator]: function * () {
    const all = [...this.life, ...this.learn, ...this.work]
    for (const item of all) {
      yield item
    }
  }
}

// 因为generator函数和for...of中iterator接口的返回值一样
for (const item of todos) {
  console.log(item) // 吃饭 睡觉 ...
}
