// 只会在所声明的块中生效 
if(true){
    var foo = 0
    let baz = 1
}
console.log(foo) // 0
console.log(baz) // 错误

// for 循环中
for (var i = 0; i < 3; i++) {
  for (var i = 0; i < 3; i++) {
    console.log(i)
  }
}

for (var i = 0; i < 3; i++) {
  for (let i = 0; i < 3; i++) {
    console.log(i) // 0 1 2
  }
}

// 事件绑定
var elements = [{}, {}, {}]
for (var i = 0; i < elements.length; i++) {
  elements[i].onclick = function () {
    console.log(i)
  }
}
elements[2].onclick() // 3

var elements = [{}, {}, {}]
for (var i = 0; i < elements.length; i++) {
  elements[i].onclick = (function (i) {
    return function () {
      console.log(i)
    }
  })(i)
}
elements[0].onclick() // 0

// for 循环会产生两层作用域

for (let i = 0; i < 3; i++) {
  let i = 'foo'
  console.log(i) // foo
}

let i = 0

if (i < 3) {
  let i = 'foo'
  console.log(i) // foo
}

i++

if (i < 3) {
  let i = 'foo'
  console.log(i) // foo
}

i++

if (i < 3) {
  let i = 'foo'
  console.log(i) // foo
}

i++

// let不会变量声明提升

console.log(foo) // underfined
var foo = 'zce' 

console.log(foo) // 未定义
let foo = 'zce'