// 函数参数的默认值

function foo (enable) {
  // 若传入false也会被赋值成true 不合适使用
  // enable = enable || true
  enable = enable === undefined ? true : enable
  console.log(enable) // 
}

foo() //true

// 默认参数一定是在形参列表的最后
function foo1 (enable = true) {
  console.log(enable)
}

foo1() // true
