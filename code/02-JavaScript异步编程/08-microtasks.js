// 微任务

console.log('global start')

// setTimeout 的回调是 宏任务，进入回调队列排队
setTimeout(() => {
  console.log('setTimeout')
}, 0)

// Promise 的回调是 微任务，在执行栈结束后直接调用
Promise.resolve()
  .then(() => {
    console.log('promise')
  })
  .then(() => {
    console.log('promise 2')
  })
  .then(() => {
    console.log('promise 3')
  })

console.log('global end')

// 打印顺序 global start --> global end --> promise --> promise2 --> promise3 --> setTimeout

