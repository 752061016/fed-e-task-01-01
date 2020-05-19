// Reflect 对象

const obj1 = {
  foo: '123',
  bar: '456'
}

const proxy = new Proxy(obj1, {
  get (target, property) {
    console.log('watch logic~')
    // 原本的get方法
    return Reflect.get(target, property)
  }
})

console.log(proxy.foo) // 'watch logic~' , 123

const obj = {
  name: 'zce',
  age: 18
}
// 老方法使用方式不同，容易混乱
// console.log('name' in obj)
// console.log(delete obj['age'])
// console.log(Object.keys(obj))

// 新方法使用方式大致相同
console.log(Reflect.has(obj, 'name'))
console.log(Reflect.deleteProperty(obj, 'age'))
console.log(Reflect.ownKeys(obj))