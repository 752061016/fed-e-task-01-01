/**
 * 类型注解
 *
 * @flow
 */

function square (n: number) {
  return n * n
}

// number类型
let num: number = 100

// num = 'string' // error 提示类型错误

// 返回值为number类型
function foo (): number {
  return 100 // ok
  // return 'string' // error
}

// 没有返回值 相当于undefined
function bar (): void {
  // return undefined
}
