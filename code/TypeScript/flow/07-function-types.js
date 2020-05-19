/**
 * 函数类型
 * 一般是对函数的参数和返回值进行类型约束
 * @flow
 */

 // 当函数作为参数传入函数的回调时，可使用类似箭头函数签名的方式对回调函数的参数及返回值进行定义
function foo (callback: (string, number) => void) {
  callback('string', 100)
}

foo(function (str, n) {
  // str => string
  // n => number
})