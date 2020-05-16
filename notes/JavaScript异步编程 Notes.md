# JavaScript异步编程
##### 主流的JavaScript环境都是以单线程模式去执行的
##### 原因：设计初衷是运行在浏览器端的脚本语言，为的是实现页面上的动态交互，实现动态交互的核心是DOM操作，这也决定了必须使用单线程模型，否则会出现很复杂的线程同步问题，若是采用多线程同时操控，浏览器无法明确以哪个线程为准，所以为了避免线程同步的问题，在最初JavaScript就被设置成单线程模型，也成为了JavaScript的核心之一
##### 单线程的优点：在同时只能执行一个任务，有多个任务就需要排队等候，更安全更简单
##### 单线程的缺点：若是某个任务特别耗时，会导致后续任务处于等待过程，会被拖延出现假死的情况
##### JavaScript将任务的执行模式分成了两种，同步模式(Synchronous)和异步模式(Asynchronous)
### 内容概要
+ 同步模式和异步模式
+ 事件循环与消息队列
+ 异步编程的几种方式
+ Promise 异步方案、宏任务 / 微任务
+ Generator 异步方案、Async / Await 语法糖
## 同步模式 Synchronous
##### 代码当中的任务依次执行，后一个任务需要等待前一个任务执行结束才能开始执行，执行顺序跟代码的编写顺序是一致的，排队执行
##### 当代码开始执行时会将当前执行代码压入栈中，等待其运行结束后移出栈，以此类推，若某个代码执行时间过长，后面的代码就会延迟，这种延迟叫做阻塞，对于用户来说页面就会变得卡顿，所以需要异步模式解决耗时操作
## 异步模式 Asynchronous
##### 异步模式的API是不会等待这个任务的结果才开始下一个任务，开启过后立即执行下一个任务，后续逻辑一般会通过回调函数的方式定义，在耗时任务结束后立刻执行回调函数
##### 没有异步模式，单线程的JavaScript是无法处理大量的耗时任务的
##### 单线程下的异步模式最大的难点：异步模式的代码执行顺序混乱，多看多练多思考！
##### 示例
+ JavaScript引擎会先执行调用栈的代码，再执行消息队列中的代码
+ 调用栈：当前执行的代码
+ 消息队列：还未处理的代码
+ Event loop：检查调用栈是否执行结束，执行消息队列的代码
1. begin加入调用栈并立即执行
2. 开启time1的定时器API
3. 开启time2的定时器API
4. end加入调用栈并立即执行
5. 1000ms后time2定时器结束，将回调函数添加到消息队列中，Event loop将消息队列中time2代码添加到调用栈中并执行
6. time2中又存在定时器，再开启time3定时器
7. 又800ms后time1定时器结束，添加到消息队列中，Event loop将消息队列中time1代码添加到调用栈中并执行
8. 又200ms后time3定时器结束,添加到消息队列中，Event loop将消息队列中time1代码添加到调用栈中并执行
9. 调用栈执行结束，消息队列执行结束，代码结束
```javascript
console.log('global begin') // global begin

setTimeout(function () {
    console.log('time1')
}, 1800)

setTimeout(function () {
    console.log('time2')

    setTimeout(function () {
        console.log('time3')
    }, 1000)
}, 1000)

console.log('global end') // global end
```
##### 同步还是异步由运行环境提供的API是以同步还是异步模式的方式工作
### 回调函数---所有异步编程方案的根基
##### 某些语法专门为异步而生，特别是ES2015之后推出的一些新语法新特性，弥补了JavaScript编程在异步方面的不足和不便
##### 回调函数：由调用者定义。并交给执行者执行的函数称之为回调函数
## Promise
##### 直接使用传统回调的方式去完成复杂的异步流程，就无法避免大量的回调函数嵌套，俗称回调地狱，为此CommonJS社区提出了Promise的规范来，后在ES2015中被标准化，成为语言规范
##### Promise用来表示一个异步任务最终结束过后究竟是成功还是失败，在状态结果最终明确后都会有相对应的任务会被自动执行，且明确结果后无法发生改变
### Promise 基本用法
##### Promise实际上是ES2015推出的一个全局类型
```javascript
const promise = new Promise(function (resolve, reject) {
    // 兑现“承诺”的逻辑 在构造promise过程中同步执行
    
    // 因为promise执行结果是唯一的，所以resolve()和reject()只能调用一个
    resolve(100) // 代表成功的结果
    reject(new Error('promise rejected'))  // 代表失败的结果 一般传入失败的原因
})

使用.then()方法定义成功与失败的回调函数
promise.then(function (num) {
    // 成功回调
    console.log('resolved', num) // 'resolved' 100
}, function (error) {
    // 失败回调
    console.log('rejected', error) // 'rejected' 错误信息
})
```
### Promise使用案例---封装ajax
```javascript
function ajax (url) {
    return new Promise(function (resolve, reject) {
        // 建立ajax请求
        var xhr = new XMLHttpRequest()
        xhr.open('GET', url)
        xhr.responseType = 'json'
        xhr.onload = function () {
            if (this.status === 200) {
                // 在状态码为200时执行成功的回调，并把数据作为参数传入
                resolve(this.response)
            } else {
                // 否则执行错误回调并传入错误信息
                reject(new Error(this.statusText))
            }
        }
        xhr.send()
    })
}

ajax('/api/users.json').then(function (res) {
    console.log(res)
}, function () {
    console.log(error)
})
```
### Promise 常见误区
##### 最常见的错误是用嵌套的方式使用Promise，可以借助于Promise then方法链式调用的特点来尽可能保证异步任务的扁平化
### Promise 链式调用

+ Promise对象的then方法会返回一个全新的Promise对象
+ 后面的then方法实际上在是为上一个then返回的Promise注册回调
+ 前面then方法中回调函数的返回值会作为后面then方法回调的参数
+ 如果回调中返回的是Promise，那后面then方法的回调会等待它的结束
```javascript
const promise = new Promise(function (resolve, reject) {
    resolve(100)
})
promise
    .then(function (num) {
        console.log(num) // 100
        return new Promise(function (resolve, reject) {
            resolve(200)
        })
    }).then(function (num) {
        console.log(num) // 200 该回调会等上个then中的Promise执行结束再开始执行
        return 300
    }).then(function (num) {
        console.log(num) // 300
    })
```
### Promise 异常处理
+ 在Promise函数内部只要遇见失败或异常都会直接开始执行失败的回调函数
+ 除在then方法的第二个参数中添加失败回调，也可使用catch方法在then之后添加失败回调函数
+ then方法是为上一个Promise添加回调，但如果发生错误则会跳过中间的成功回调直到找到失败回调
+ 在then方法中添加的失败回调只能给上一个Promise失败时执行的回调
+ catch方法更像是给整个Promise链条进行错误回调
+ 可以在全局对象上注册unhandledrejection事件处理代码中没有被手动捕获的Promise异常(全局捕获不推荐，应该在代码中明确捕获每个异常)
```javascript
const promise = new Promise(function (resolve, reject) {
    // 在此前只要异常或错误就不会继续执行resolve()方法，而是直接执行reject()方法
    resolve(100)
})
promise
    .then(function (num) {
        console.log(num) // 100
        a() // 异常 函数未定义 则会跳转到catch回调
    }, function (error) {
        console.log('1')
    })
    .catch(function (error) {
        console.error('2')
    })
```
### Promise 静态方法
+ Promise.resolve() 快速的创建一个成功的Promise对象,还能包装一个Promise对象
```javascript
Promise.resolve('foo')
    .then(function (value) {
        console.log(value) // foo
    })

// 传入的是Promise
const promise = new Promise(function (resolve, reject) {
    resolve(100)
})
const promise2 = Promise.resolve(promise)
console.log(promise === promise2) // true 包装之后的Promise与原Promise相同

// 传入的是对象 对象中也有then方法 带有这种方法的对象可以说是实现了thenable的接口
Promise.resolve({
    then: function (onFulfilled, onRejected) {
        onFulfilled('foo')
    }
})
    .then(function (value) {
        console.log(value) // foo
    })
```
+ Promise.reject() 快速的创建一个失败的Promise对象，无论参数是什么都会作为失败的原因
```javascript
Promise.reject('anything')
    .catch(function (error) {
        console.log(error) // anything
    })
```
### Promise 并行执行
+ Promise.all()接收一个数组，数组中的每个成员都是Promise对象,收集所有的Promise并统一管理
  + 该方法返回一个全新的Promise对象
  + 这个Promise成功的返回值是由内部所有的Promise的返回值组成的数组
  + 当数组中的任意一个Promise失败时会执行这个Promise失败的返回值
```javascript
const promise = new Promise(function (resolve) {
    resolve(100)
})

const promiseAll = Promise.all([
    promise,
    promise,
    promise,
])

promiseAll
    .then(function (values) {
        console.log(values) // [100, 100, 100]
    })
    .catch(function (error) {
        console.log(error) // 任意一个失败就会执行
    })
```
##### 应用场景---无关联的ajax异步请求
```javascript
const obj = {
    url1: '/api/1',
    url1: '/api/2',
    url1: '/api/3',
}

// 获取所有的路径地址并整合成以Promise为元素的数组并使用Promise.all()统一管理
const urls = Object.values(obj)
const tasks = urls.map(url => Promise.resolve(url))
const ajax = Promise.all(tasks)

ajax
    .then(function (val) {
        // ajax获取正常
    })
    .cactch(function (val) {
        // ajax异常
    })
```
+ Promise.race()也可以将多个Promise对象组合成一个新的Promise对象
  + 与Promise.all()不同的是：只会等待第一个结束的任务，只要有一个任务完成，新的Promise也会完成
##### 应用场景---连接超时
```javascript
const ajax = Promise.resolve('请求成功')
const time = new Promise( (resolve, reject) => {
    setTimeout(() => rreject(new Error('超时')), 500)
})

Promise.race([ajax, time])
.then(value => {
    // 若是ajax先完成则打印ajax数据，若定时器先完成则打印错误信息，就算后续ajax请求成功也无法被打印出来
    console.log(value)
})
.catch(error => {
    // ajax在定时器时间内出现了异常
    console.log(error)
})
```
### Promise 执行时序 / 宏任务 vs 微任务
+ 就算Promise中并没有任何的异步操作，它的回调函数还是会进到回调队列当中去排队，所以要等待所有的同步代码执行完后才会执行Promise当中的回调
```javascript
console.log('global start')

setTimeout(() => {
    console.log('setTimeout')
}, 0)
Promise.resolve()
    .then(() => {
        console.log('promise')
    })
    .then(() => {
        console.log('promise2')
    })
    .then(() => {
        console.log('promise3')
    })

console.log('global end')
// 打印顺序 global start --> global end --> promise --> promise2 --> promise3 --> setTimeout
```
+ 回调队列中的任务称之为 宏任务，宏任务执行过程中可以临时加上额外的需求
  + 可以选择作为一个新的宏任务进到队列中排队
  + 也可以作为当前任务的微任务，直接在当前任务结束后立即执行

+ 微任务的出现是为了提高整体的响应能力
  + Promise的回调会作为微任务执行，所以出现上述Promise比setTimeout先打印的情况
  + 目前绝大多数异步调用都是作为宏任务执行，而Promise、MutationObserver和node中的process.nextTick都会作为微任务在本轮调用的末尾就执行
### Generator 异步方案
+ 虽然Promise使用链式使所有任务串联执行的方式解决了函数嵌套的问题，但存在大量的回调函数，虽然相互间没有嵌套，但代码不像传统同步代码一样有很高的可读性
+ ES2015提供了Generator(生成器)，在执行生成器函数时并不会马上执行，而是返回一个对象
  + 调用对象中的next方法才会执行代码体，遇到yield返回，再次调用从上次的结束位置继续，以此类推，若是传入参数则会被作为yield的返回值
  + 调用对象中的throw方法则会捕获代码中的异常，在发生异常时进行处理
```javascript
function * foo () {
    console.log('start')

    while (true) {
        try{
            const res = yield 'foo'
            console.log(res)
        }catch (e) {
            console.log(e)
        }
    }
}

const generator = foo()

const result1 = generator.next() // start
console.log(result1.value) // foo

const result2 = generator.next('bar') // bar
console.log(result2.value) // foo

const result3 = generator.throw(new Error('error')) // error
console.log(result3.value) // foo
```
##### 应用场景:利用生成器封装Promise，优化了代码使代码更加扁平化
+ 第一次执行，成功，返回带foo参数的Promise对象
+ 将生成器返回对象作为参数传入handleResult方法
+ 判断生成器是否执行结束，未结束则继续
+ 生成器返回对象的value保存着返回的Promise对象，添加then方法
  + 若Promise返回成功递归调用handleResult(g.next(data))，继续执行，直到生成器执行结束
  + 若Promise返回失败则为生成器函数提交异常，生成器函数中利用try/catch捕获异常并打印
+ 继续执行生成器函数，再次遇见yield返回成功带foo参数的Promise对象，继续递归
+ 继续执行生成器函数，遇见yield返回失败带err参数的Promise对象，代码结束，捕获异常
```javascript
function * main () {
    try{
        const result = yield Promise.resolve('foo')

        const result2 = yield Promise.resolve('bar')

        const result3 = yield Promise.reject('error')
    }catch (e) {
        console.error(e)
    }
}

function co (fn) {
    const g = fn()
    
    function handleResult (result) {
        if (result.done) return // 生成器执行结束

        result.value
            .then(data => {
                console.log(data)
                handleResult(g.next(data))
            }, errpr =>{
                g.throw(new Error('error'))
            })
    }

    handleResult(g.next())
}
 
co(main)
```
## Async / Await 语法糖
##### 语言层面的异步编程标准
+ Async确实是生成器函数一种更为方便的语法糖，所以两者的使用方式类似
  + 生成器函数使用 * 修饰，Async函数使用async修饰
  + 生成器函数每次执行从上一个yield开始执行，Async函数需要在await成功后才会继续执行
+ Async函数会返回一个Promise对象，更加方便对整体代码进行控制
+ 目前await只能在Async函数内部使用，不能直接在外层直接使用await
```javascript
async function main () {
    const result = await Promise.resolve('foo')
    console.log(result) // foo

    const result2 = await Promise.resolve('bar')
    console.log(result2) // bar

    const result3 = await Promise.reject('error')
    // 异常，停止执行
    console.log(result3) // error

    const result4 = await Promise.resolve('bas')
}

const result = main()

result.then(() => {
    console.log('函数全部成功执行')
}, error => {
    console.log('函数并未全部成功执行') // 被打印
})
```

