// Set 数据结构

const s = new Set()

// 为集合添加元素，若当前元素已存在则忽略
s.add(1).add(2).add(3).add(4)

console.log(s) // Set(4) {1, 2, 3, 4}

// 以下两个方法都可对集合进行遍历
s.forEach(i => console.log(i))
for (let i of s) {
    console.log(i)
}

// 集合的长度
s.size

// 判断集合中是否含有该值
s.has(100) // false 

// 删除集合中某个值 成功返回true 若不存在则返回false
s.delete(3) // true

// 清空集合内的元素
s.clear() 



// 应用场景：去重

const arr = [1, 2, 6, 4, 8, 1, 2]

// 两种方法都能转换成数组
// const result = Array.from(new Set(arr))
const result = [...new Set(arr)]

console.log(result)

// 弱引用版本 WeakSet
// 差异就是 Set 中会对所使用到的数据产生引用
// 即便这个数据在外面被消耗，但是由于 Set 引用了这个数据，所以依然不会回收
// 而 WeakSet 的特点就是不会产生引用，
// 一旦数据销毁，就可以被回收，所以不会产生内存泄漏问题。
