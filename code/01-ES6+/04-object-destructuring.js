// 对象的解构

const obj = { name: 'zce', age: 18 }

const { name } = obj
console.log(name) // zce

// 变量名已被定义
const name = 'tom'
const { name: objName } = obj
console.log(objName) // zce

// 设置默认值
const name = 'tom'
const { name: objName = 'jack' } = obj
console.log(objName) // zce

// 解构对象中的函数 减少代码量
const { log } = console
log('foo')
log('bar')
log('123')
