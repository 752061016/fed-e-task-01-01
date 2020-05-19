// Generator 函数

function * foo () {
  console.log('1111')
  yield 100
  console.log('2222')
  yield 200
  console.log('3333')
  yield 300
}

const generator = foo()

console.log(generator.next()) // 函数体开始执行遇到第一个 yield 暂停
console.log(generator.next()) // 从暂停位置继续，直到遇到下一个 yield 再次暂停
console.log(generator.next()) // 从暂停位置继续，直到遇到下一个 yield 再次暂停
console.log(generator.next()) // 第四次调用，已经没有需要执行的内容了，所以直接得到 undefined
