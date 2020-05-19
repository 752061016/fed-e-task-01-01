// 生成器
// ES2015提供了Generator(生成器)，在执行生成器函数时并不会马上执行，而是返回一个对象
// 调用对象中的next方法才会执行代码体，遇到yield返回，再次调用从上次的结束位置继续，以此类推，若是传入参数则会被作为yield的返回值

function * foo () {
  console.log('start')

  try {
    const res = yield 'foo'
    console.log(res)
  } catch (e) {
    console.log(e)
  }
}

const generator = foo()

const result = generator.next() 
console.log(result) // {value: "foo", done: false}


// generator.next('bar')
// 调用对象中的throw方法在代码中抛出异常以便捕获
generator.throw(new Error('Generator error')) // Error: Generator error
