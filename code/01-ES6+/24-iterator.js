// 迭代器（Iterator）

const set = new Set(['foo', 'bar', 'baz'])

// 返回一个对象，通过调用其中的next方法执行
const iterator = set[Symbol.iterator]() // SetIterator {"foo", "bar", "baz"}

// console.log(iterator.next())
// console.log(iterator.next())
// console.log(iterator.next())
// console.log(iterator.next())
// console.log(iterator.next())

while (true) {
  const current = iterator.next()
  if (current.done) { // 对象的done属性为true时代表变量结束
    break // 迭代已经结束了，没必要继续了
  }
  console.log(current.value) // foo bar baz
}
