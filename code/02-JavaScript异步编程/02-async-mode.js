// 异步模式 
// setTimeout函数回调是以异步模式运行的
// 将异步开启后就会直接进入下一步代码
// 在栈中代码运行结束后才会执行对应的回调

console.log('global begin')

setTimeout(function timer1 () {
  console.log('timer1 invoke')
}, 1800)

setTimeout(function timer2 () {
  console.log('timer2 invoke')

  setTimeout(function inner () {
    console.log('inner invoke')
  }, 1000)
}, 1000)

console.log('global end')
// global begin -> global end -> timer2 invoke -> timer1 invoke -> inner invoke