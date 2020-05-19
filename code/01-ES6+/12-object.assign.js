// Object.assign 方法

const source1 = {
  a: 123,
  b: 123
}

const source2 = {
  b: 789,
  d: 789
}

const target = {
  a: 456,
  c: 456
}

// 把目标对象的成员拷贝到源对象中且同名属性会被覆盖
const result = Object.assign(target, source1, source2)

console.log(target) // {a: 123, c: 456, b: 789, d: 789}
console.log(result === target) // true

// 应用场景 设置默认值

function func (obj) {
  // 可以在源对象设置默认值
  const funcObj = Object.assign({}, obj)
  funcObj.name = 'func obj'
  console.log(funcObj)
}

const obj = { name: 'global obj' }

func(obj) // {name: "func obj"}
console.log(obj) // {name: "global obj"}
