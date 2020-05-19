// 同步模式，在上一步结束后才能进行下一步
console.log('global begin')

function bar () {
  console.log('bar task')
}

function foo () {
  console.log('foo task')
  bar()
}

foo()

console.log('global end')

// global begin -> foo task -> bar task ->global end