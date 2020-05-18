// 无法修改值内容
const name = 'zce'
name = 'jack' // 报错


// const要求声明同时赋值
const name
name = 'zce'

// const只是要求内层指向不允许被修改
const obj = {}
// 但可以修改成员属性
obj.name = 'zce'

obj = {} // 报错