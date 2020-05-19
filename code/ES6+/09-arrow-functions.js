// 箭头函数

// 函数声明
function inc (number) {
  return number + 1
}

// 快速声明
const inc = n => n + 1

// 参数列表，函数体多条语句，返回值仍需 return
const inc = (n, m) => {
  console.log('inc invoked')
  return n + 1
}

console.log(inc(100)) // 101

// 获取奇数值
const arr = [1, 2, 3, 4, 5, 6, 7]

arr.filter(function (item) {
  return item % 2
}) // [1, 3, 5, 7]

// 常用场景，回调函数
arr.filter(i => i % 2) // [1, 3, 5, 7]
