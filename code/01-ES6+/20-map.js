// Map 数据结构 严格意义上的键值对集合

// 对象只能使用字符串形式的键名
// const obj = {}
// obj[true] = 'value'
// obj[123] = 'value'
// obj[{ a: 1 }] = 'value'

// console.log(Object.keys(obj))
// console.log(obj['[object Object]'])

const map = new Map()

const tom = { name: 'tom' }

map.set(tom, 90)

console.log(map) // Map(1) {{…} => 90}

// 获取某个值
map.get(tom) // 90

// 判断某个键是否存在
map.has(tom) // true

// 删除某个值 成功true 不存在false
map.delete(tom) // true

// 遍历所有的值
map.forEach((value, key) => {
    console.log(value, key)
})



// 弱引用版本 WeakMap
// 差异就是 Map 中会对所使用到的数据产生引用
// 即便这个数据在外面被消耗，但是由于 Map 引用了这个数据，所以依然不会回收
// 而 WeakMap 的特点就是不会产生引用，
// 一旦数据销毁，就可以被回收，所以不会产生内存泄漏问题。
