// @flow

function sum (a: number, b: number) {
  return a + b
}

sum(100, 100) 

sum('100', '100') // 在flow编译时会提示错误
