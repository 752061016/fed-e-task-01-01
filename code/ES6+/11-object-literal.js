// 对象字面量

const bar = '345'

const obj = {
  foo: 123,
  // 属性名与变量名相同，可以省略 : bar
  bar,
  // 方法可以省略 : function
  method1 () {
    // 这种方法就是普通的函数，同样影响 this 指向。
    console.log(this)
  },
  // 通过 [] 让表达式的结果作为属性名
  [bar]: 123
}

obj[Math.random()] = 123

console.log(obj) //{345: 123, foo: 123, bar: "345", method1: ƒ, 0.08485939388507213: 123}
obj.method1() // {345: 123, foo: 123, bar: "345", method1: ƒ, 0.08485939388507213: 123}
