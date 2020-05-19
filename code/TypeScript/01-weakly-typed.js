// 弱类型产生的问题

// 1. 异常需要等到运行时才能发现

const obj = {}

obj.foo() // 运行时才会报错

setTimeout(() => { // 或者运行时不会马上触发
  obj.foo()
}, 1000000)


// 2. 函数功能与预期不同

function sum (a, b) {
  return a + b
}

console.log(sum(100, 100))   // 200
console.log(sum(100, '100')) // 100100


// 3. 对象索引器的错误用法

const obj = {}

obj[true] = 100 // 属性名会自动转换为字符串

console.log(obj['true']) // 100
