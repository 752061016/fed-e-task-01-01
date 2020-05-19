// Promise 基本示例

// Promise接收一个函数，内有两个参数resolve和reject
// 这是两个函数，resolve调用时会执行成功回调，reject执行时会执行失败的回调

const promise = new Promise(function (resolve, reject) {  
  // resolve(100) // 成功
  reject(new Error('promise rejected')) // 失败
})

// 通过then方法添加两个函数参数，第一个为成功时执行的回调，第二个为失败时执行的回调
promise.then(function (value) {

  // 即便没有异步操作，then 方法中传入的回调仍然会被放入队列，等待下一轮执行
  console.log('resolved', value)
}, function (error) {
  console.log('rejected', error)
})

