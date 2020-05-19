/**
 * 特殊类型
 *
 * @flow
 */

// 字面量类型，为了限制变量为某一个值，只要不是这个值都会报错

const a: 'foo' = 'foo'
a = 'baz' // 提示类型错误

// 配合联合的用法去组合几个特定的值

const type: 'success' | 'warning' | 'danger' = 'success' // 只能是这三个值中的一个

// 声明类型:可以用type去声明一个自定义的类型，重复使用一种类型

type StringOrNumber = string | number // 只能是这两种类型之一

const b: StringOrNumber = 'string' // 100

// Maybe 类型:可能存在的类型，表示该值也可以为null或undefined，用法：在类型前加?

const gender: ?number = undefined // 可以为null或undefined
// 相当于
// const gender: number | null | void = undefined
