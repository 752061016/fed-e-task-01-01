// 模板字符串

// 反引号包裹
const str = `hello es2015, this is a string`

// 允许换行 方便输入html
const str = `hello es2015,

this is a \`string\``

console.log(str)

// 插值表达式
const name = 'tom'
// 可以通过 ${} 插入表达式，表达式的执行结果将会输出到对应位置
const msg = `hey, ${name} --- ${1 + 2} ---- ${Math.random()}` 
console.log(msg) // hey, tom --- 3 ---- 0.6310662467594021



// 带标签的模板字符串

// 模板字符串的标签就是一个特殊的函数，
// 使用这个标签就是调用这个函数
const str = console.log`hello world` // ["hello world", raw: Array(1)]

const name = 'tom'
const gender = false

function myTagFunc (strings, name, gender) {
  // console.log(strings, name, gender)
  // return '123'
  const sex = gender ? 'man' : 'woman'
  return strings[0] + name + strings[1] + sex + strings[2]
}

const result = myTagFunc`hey, ${name} is a ${gender}.`

console.log(result) // hey, tom is a woman.

