// 数组的解构
// 老方法
const arr = [100, 200, 300]

const foo = arr[0]
const bar = arr[1]
const baz = arr[2]
console.log(foo, bar, baz) // 100 200 300

// 快速解构
const [foo, bar, baz] = arr
console.log(foo, bar, baz) // 100 200 300

// 获取需要的数值
const [, , baz] = arr
console.log(baz) // 300

// ...将多余的参数保存到一个数组中
const [foo, ...rest] = arr
console.log(rest) // 200 300

// 多余参数会传入undefined
const [foo, bar, baz, more] = arr
console.log(more) // undefined

// 设置默认值
const [foo, bar, baz = 123, more = 'default value'] = arr
console.log(bar, more) // 100 200 123 'default value'

// 快速解构路径
const path = '/foo/bar/baz'
const tmp = path.split('/')
const rootdir = tmp[1] // foo

const [, rootdir] = path.split('/') 
console.log(rootdir) // foo
