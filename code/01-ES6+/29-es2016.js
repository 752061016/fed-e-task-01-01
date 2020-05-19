// ECMAScript 2016

// Array.prototype.includes 

const arr = ['foo', 1, NaN, false]

// 老方法
// 找到返回元素下标
console.log(arr.indexOf('foo')) // 0
// 找不到返回 -1
console.log(arr.indexOf('bar')) // -1
// 无法找到数组中的 NaN
console.log(arr.indexOf(NaN)) // -1

// 新方法
// 直接返回是否存在指定元素
console.log(arr.includes('foo')) // true
// 能够查找 NaN
console.log(arr.includes(NaN)) // true

// 指数运算符 

// 老方法
console.log(Math.pow(2, 10)) // 1024

console.log(2 ** 10) // 1024
