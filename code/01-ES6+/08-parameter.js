// 剩余参数
// 旧方法 通过arguments获取所有的值
function foo () {
  console.log(arguments)
}

function foo1 (first, ...args) {
  console.log(args)
}

foo1(1, 2, 3, 4) // [2,3,4]

// 展开数组参数

const arr = ['foo', 'bar', 'baz']

console.log(
  arr[0], 
  arr[1],
  arr[2], // 需要把每个参数加进去
) // 'foo', 'bar', 'baz'

// console.log.apply(console, arr)
// 把数组拆分成单个参数全加进去
console.log(...arr) // 'foo', 'bar', 'baz'