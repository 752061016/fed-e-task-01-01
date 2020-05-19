// ECMAScript 2017

const obj = {
  foo: 'value1',
  bar: 'value2'
}

// Object.values() 返回对象中所有的值组成的数组

console.log(Object.values(obj)) // ["value1", "value2"]

// Object.entries() 以数组的形式返回键值对

console.log(Object.entries(obj)) // [Array(2), Array(2)]

// 包含解构
for (const [key, value] of Object.entries(obj)) {
  console.log(key, value) // foo value1, bar value2
}

// 快速转换成Map形式
console.log(new Map(Object.entries(obj))) // {"foo" => "value1", "bar" => "value2"}

// Object.getOwnPropertyDescriptors() 获取属性中对象的完整描述信息

const p1 = {
  firstName: 'Lei',
  lastName: 'Wang',
  get fullName () {
    return this.firstName + ' ' + this.lastName
  }
}

// 只复制了文本
// const p2 = Object.assign({}, p1)
// p2.firstName = 'zce'
// console.log(p2) // Lei Wang

// 获取属性中对象的完整描述信息
const descriptors = Object.getOwnPropertyDescriptors(p1)
// 拷贝到新的地址
const p2 = Object.defineProperties({}, descriptors)
p2.firstName = 'zce'
console.log(p2.fullName) // zce Wang

// String.prototype.padStart() / String.prototype.padEnd() 用给定的字符串去填充目标字符串

const books = {
  html: 5,
  css: 16,
  javascript: 128
}

for (const [name, count] of Object.entries(books)) {
  console.log(`${name.padEnd(16, '-')}|${count.toString().padStart(3, '0')}`)
}
// html------------|005
// css-------------|016
// javascript------|128

// 在函数参数中添加尾逗号

function foo (
  bar,
  baz,
) {

}

const arr = [
  100,
  200,
  300,
]

