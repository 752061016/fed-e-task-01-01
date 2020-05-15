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
```javascript
// JavaScript引擎会先执行调用栈的代码，再执行消息队列中的代码
// 调用栈  当前执行的代码
// 消息队列  还未处理的代码
// Event loop  检查调用栈是否执行结束，执行消息队列的代码

// 加入调用栈并立即执行
console.log('global begin') // global begin

// 开启time1的定时器API
setTimeout(function () {
    console.log('time1')
}, 1800)

// 开启time2的定时器API
setTimeout(function () {
    console.log('time2')

    setTimeout(function () {
        console.log('time3')
    }, 1000)
}, 1000)

// 加入调用栈并立即执行 
console.log('global end') // global end

// 1000ms后time2定时器结束，将回调函数添加到消息队列中
// 当前调用栈代码执行结束，Event loop将消息队列中time2代码添加到调用栈中并执行
// time2

// time2中又存在定时器，再开启time3定时器

// 又800ms后time1定时器结束，添加到消息队列中
// 此时调用栈执行结束，Event loop将消息队列中time1代码添加到调用栈中并执行
// time1 

// 又200ms后time3定时器结束
// time3 
```
```flow
st=>start: 开始执行
cond1=>condition: 同步任务？ Yes or No?
op1=>operation: 压入栈
op2=>operation: 执行栈代码
op3=>operation: 添加到消息队列
cond2=>condition: 消息队列中有未执行代码？ Yes or No?
cond3=>condition: 栈执行完毕？ Yes or No?
e=>end: 进入后台

st->cond1
op1->op2->cond2
op3->cond3
cond1(yes)->op1
cond1(no)->op3
cond2(yes)->op1
cond2(no)->e
cond3(yes)->cond2
cond3(no)->op2
```















