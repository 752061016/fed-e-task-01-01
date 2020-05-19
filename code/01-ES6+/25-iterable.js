// 实现可迭代接口（Iterable）
// 对象要想实现for...of必须要带有Symbol.iterator的方法，返回一个对象，内部带有next方法，返回{value，done}形式的对象
const obj = {
  [Symbol.iterator]: function () {
    return {
      next: function () {
        return {
          value: 'zce',
          done: true
        }
      }
    }
  }
}

// 可迭代接口 iterable 需要有返回迭代器的方法
const obj = {
  store: ['foo', 'bar', 'baz'],

  [Symbol.iterator]: function () {
    let index = 0
    const self = this

    // 迭代器接口 iterator 需要有迭代的next()方法
    return {
      next: function () {
        // 迭代结果接口 iterationResult
        const result = {
          value: self.store[index],
          done: index >= self.store.length
        }
        index++
        return result
      }
    }
  }
}

for (const item of obj) {
  console.log(item) // 'foo' 'baz' 'bar'
}
