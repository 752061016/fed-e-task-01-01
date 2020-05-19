/**
 * 数组类型
 *
 * @flow
 */
// 两种方式都能表示元素为number的数组
const arr1: Array<number> = [1, 2, 3]

const arr2: number[] = [1, 2, 3]

// 定义规定长度且规定类型的数组,叫 元组
const foo: [string, number] = ['foo', 100]
