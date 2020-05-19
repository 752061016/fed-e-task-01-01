// Symbol 补充

console.log(
  // 就算传入同样的字符串也是不同的
  Symbol('foo') === Symbol('foo') // false
)

// Symbol 全局注册表 Symbol.for()注册一个唯一的Symbol

const s1 = Symbol.for('foo')
const s2 = Symbol.for('foo')
console.log(s1 === s2) // true

console.log(
  // 只能传入字符串，若不是字符串类型也会被隐式的转换
  Symbol.for(true) === Symbol.for('true') // true
)

// 内置 Symbol 常量

console.log(Symbol.iterator)  // Symbol(Symbol.iterator)
console.log(Symbol.hasInstance) // Symbol(Symbol.hasInstance)

const obj = {
  [Symbol.toStringTag]: 'XObject'
}
console.log(obj.toString()) // [object XObject]

// Symbol 属性名获取

const obj = {
  [Symbol()]: 'symbol value',
  foo: 'normal value'
}

for (var key in obj) {
  console.log(key) // foo
}
console.log(Object.keys(obj)) // ["foo"]
console.log(JSON.stringify(obj)) // {"foo":"normal value"}

console.log(Object.getOwnPropertySymbols(obj)) //[Symbol()]
