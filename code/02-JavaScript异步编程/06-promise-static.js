// 常用 Promise 静态方法

function ajax (url) {
  return new Promise(function (resolve, reject) {
    // foo()
    // throw new Error()
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

// Promise.resolve()快速创建一个返回成功的Promise对象
// Promise.resolve()中的参数会作为成功回调的参数
Promise.resolve('foo')
  .then(function (value) {
    console.log(value) // foo
  })

// Promise.resolve('foo')相当于
new Promise(function (resolve, reject) {
  resolve('foo')
})

// 如果传入的是一个 Promise 对象，Promise.resolve 方法原样返回

var promise = ajax('/api/users.json')
var promise2 = Promise.resolve(promise)
console.log(promise === promise2) // true




// 如果传入的是带有一个跟 Promise 一样的 then 方法的对象，
// Promise.resolve 会将这个对象作为 Promise 执行

Promise.resolve({
  then: function (onFulfilled, onRejected) {
    onFulfilled('foo')
  }
})
.then(function (value) {
  console.log(value) // foo
})

// Promise.reject 传入任何值，都会作为这个 Promise 失败的理由或者说是原因

Promise.reject(new Error('rejected'))
  .catch(function (error) {
    console.log(error) // error
  })

Promise.reject('anything')
  .catch(function (error) {
    console.log(error) // anything
  })

