// Promise 方式的 ajax

// 封装ajax请求
function ajax (url) {
  // 返回的是Promise对象
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest()
    xhr.open('GET', url)
    xhr.responseType = 'json'
    xhr.onload = function () {
      if (this.status === 200) {
        resolve(this.response)
      } else {
        reject(new Error(this.statusText))
      }
    }
    xhr.send()
  })
}

// 接口获取成功时打印数据，失败时打印错误
ajax('/api/foo.json').then(function (res) {
  console.log(res)
}, function (error) {
  console.log(error)
})

// Promise最常见的误区是使用嵌套的方式书写异步回调
// 错误示范
// ajax(urls.users).then(function (users) {
//   ajax(urls.users).then(function (users) {
//     ajax(urls.users).then(function (users) {

//     })
//   })
// })


// 因为Promise.then()返回的也是一个Promise对象，所以可以使用链式的方法
// 正确示范
ajax('/api/users.json')
  .then(function (value) {
    console.log(1111)
    return ajax('/api/urls.json')
  }) // => Promise
  .then(function (value) {
    console.log(2222)
    console.log(value)
    return ajax('/api/urls.json')
  }) // => Promise
  .then(function (value) {
    console.log(3333)
    return ajax('/api/urls.json')
  })

// Promise 异常处理

// 可以在then中定义失败回调，但同时注册的失败回调只是给当前 Promise 对象注册的失败回调，它只能捕获到当前 Promise 对象的异常
// 使用catch是比较常用的方法，相当于给整个 Promise 链条注册失败回调
// 因为 Promise 链条上的任何一个异常都会被一直向后传递，直至被捕获
// 执行顺序，失败时->找到下个then中定义的失败回调->找不到继续往下->直到catch
ajax('/api/users11.json')
  .then(function onFulfilled (value) {
    console.log('onFulfilled', value)
    // 这里如果报错了会触发catch中的回调
  }, function onRejected (error) {
    console.log('onRejected', error)
  })
  .catch(function onRejected (error) {
    console.log('onRejected', error)
  })

// 全局捕获 Promise 异常，类似于 window.onerror
// 能捕获所有未被手动捕获的异常
window.addEventListener('unhandledrejection', event => {
  const { reason, promise } = event

  console.log(reason, promise)
  // reason => Promise 失败原因，一般是一个错误对象
  // promise => 出现异常的 Promise 对象

  event.preventDefault()
}, false)

// Node.js 中使用以下方式
// process.on('unhandledRejection', (reason, promise) => {
//   console.log(reason, promise)
//   // reason => Promise 失败原因，一般是一个错误对象
//   // promise => 出现异常的 Promise 对象
// })



