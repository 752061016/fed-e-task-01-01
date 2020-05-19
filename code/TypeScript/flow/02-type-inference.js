/**
 * 类型推断
 *
 * @flow
 */

function square (n) {
  return n * n // 推断为number
}

square(100)   // 10000
square('100') // 报错