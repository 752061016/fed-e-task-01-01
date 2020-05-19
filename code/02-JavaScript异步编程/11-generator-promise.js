// Generator 配合 Promise 的异步方案

function * main () {
  try{
      const result = yield Promise.resolve('foo') // 成功回调

      const result2 = yield Promise.resolve('bar') // 成功回调

      const result3 = yield Promise.reject('error') // 失败回调

      const result4 = yield Promise.resolve('error') // 因为异常捕获所以被强制停止了
  }catch (e) {
      // 捕获失败时的异常
      console.error(e)
  }
}

function co (fn) {
  const g = fn()
  
  function handleResult (result) {
      if (result.done) return // 生成器执行结束

      result.value
          // 注册成功回调，递归调用函数
          .then(data => {
              console.log(data)
              handleResult(g.next(data))
          }, error =>{
              // 给生成器抛出异常，由生成器中的try...catch捕获
              g.throw(new Error(error))
          })
  }

  handleResult(g.next())
}

co(main) // foo bar Error

 