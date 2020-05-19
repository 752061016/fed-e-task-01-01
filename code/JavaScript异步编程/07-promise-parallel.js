// Promise并行控制

// Promise.all()接收一个数组，数组中的每个成员都是Promise对象,收集所有的Promise并统一管理
// 该方法返回一个全新的Promise对象
// 这个Promise成功的返回值是由内部所有的Promise的返回值组成的数组
// 当数组中的任意一个Promise失败时会执行这个Promise失败的返回值
// 只要全部成功才会调用成功回调，如何一个失败会执行失败回调

// 应用场景：无关联的ajax请求
var promise = Promise.all([
  ajax('/api/users1.json'),
  ajax('/api/posts2.json'),
  ajax('/api/posts3.json')
]).then(() => {
  console.log('全部成功')
}).catch(() => {
  console.log('有失败的Promise')
})


// Promise.race()也可以将多个Promise对象组合成一个新的Promise对象
// Promise.race()只会等待第一个结束的任务，只要有一个任务完成，新的Promise也会完成

// 应用场景：请求超时
const request = ajax('/api/posts.json')
const timeout = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error('timeout')), 500)
})

Promise.race([
  request,
  timeout
])
.then(value => {
  console.log(value)
})
.catch(error => {
  console.log(error)
})
