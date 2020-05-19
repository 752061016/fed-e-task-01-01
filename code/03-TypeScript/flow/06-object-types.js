/**
 * 对象类型
 *
 * @flow
 */

 // 定义对象内的元素名及类型
const obj1: { foo: string, bar: number } = { foo: 'string', bar: 100 }

// 可选属性：定义对象内不确定是否有无的元素，在定义的元素名后加?，则这个对象没有这个参数也不会报错
const obj2: { foo?: string, bar: number } = { bar: 100 }

// 对象可以通过字面量方式添加元素，可以定义成员的元素类型，但没有数量要求
// 定义了对象的键名及值都为string类型
const obj3: { [string]: string } = {}

obj3.key1 = 'value1' 
obj3.key2 = 'value2'
obj3.key3 = 3 // 值类型错误
obj3[1] = 'string' // 键类型错误


