# ECMAScript
2015年发布出ES2015后ECMAScript都以年号来命名，而程序员喜欢使用ES6来泛指ES2015及之后所发布的版本
### 范围
web包括：ECMAScript+BOM+DOM

Node包括： ECMAScript+Node API

## ES2015 (ES6)
### 作用
- 解决原有语法上的一些问题或不足
- 对原有语法进行增强
- 全新的对象、全新的方法、全新的功能
- 全新的数据类型和数据结构
### 准备环境
任何一个支持ES2015语法的环境，如：node或最新Chrome浏览器
### let 作用域
##### 块级作用域

以前块没有单独的作用域，会导致块内部的变量被外部访问到，而块级作用域则不能被外部访问到
```javascript
if(true){
    var foo = 0
    let baz = 1
}
console.log(foo) // 0
console.log(baz) // 错误
```
```javascript
for(var i = 0; i < 3; i++){
    for(var i = 0; i < 3; i++){
        console.log(i)// 0 1 2
        // 内层声明的i会覆盖外层所声明的i，所以只会执行内部的三次循环
    } 
}
```
```javascript
for(let i = 0; i < 3; i++){
    for(let i = 0; i < 3; i++){
        console.log(i)// 0 1 2 0 1 2 0 1 2
        // 内层的i会重新声明，所以不会导致被覆盖
    }
}
```
ps：一般不建议用相同的计数名，方便后期理解与维护 

##### 应用场景：
```javascript
var arr = [{}, {}, {}]
for(var i = 0; i < arr.length; i++){
    arr[i].onclick = function(){
        console.log(i)
    }
}
arr[0].onclick() // 3
arr[1].onclick() // 3
arr[2].onclick() // 3
// 此时的i作为全局作用域i，每个输出的i都为同一个值

// 在没有出现块级作用域前可用闭包利用函数作用域来摆脱全局作用域的影响
for(var i = 0; i < arr.length; i++){
    arr[i].onclick = (function(i){
        return function(){
            console.log(i)
        }
    })(i)
}
arr[0].onclick() // 0
arr[1].onclick() // 1
arr[2].onclick() // 2

// 块级作用域出现后则不需要使用闭包也有相同的效果
for(let i = 0; i < arr.length; i++){
    arr[i].onclick = function(){
        console.log(i)
    }
}
arr[0].onclick() // 0
arr[1].onclick() // 1
arr[2].onclick() // 2
```

ps：for循环内部其实有两个作用域
```javascript
for(let i = 0; i < 3; i++){
    let i = 'foo'
    console.log(i) // foo
    // 两个i互不影响，作用于两个作用域中
    // 循环体中的i是内层独立的作用域
    // 外层的是for循环本身的作用域
}
```
##### 不会变量提升

var会导致所声明的变量会被提升到代码最开始的位置，let则不会变量提升
```javascript
console.log(foo) // undefined
console.log(baz) // 报错 引用异常
var foo = 'foo'
let baz = 'baz'
```
ps：选择不升级var而推出let的原因：修改var会导致原有文件的bug，无法正常工作，所以推出新的定义let
### const 恒量/常量
##### 只读特性

使用const定义的成员不能被修改，所以在const在声明时需要一个初始值

ps：不允许声明过后重新去指向一个新的内存地址，但能修改恒量中的属性成员
```javascript
const foo = 'foo'
foo = 'baz' // 报错 无法被修改

const obj = []
obj.name = 'obj' // 正常 可以修改属性成员
obj = {} // 报错 指向了一个新的内存地址
```
##### 其他特性与let相同
##### 最佳实践：不用var，主用const，配合let，能提高代码质量，主用const的原因是能更明确在代码中所声明的成员会不会被修改，例如多人协作中定义了相同的变量则会报错

### 数组解构
##### 从数组中获取指定元素的快捷方式

在定义成员时以[]的形式输入成员名，数组则会按位置顺序依次赋值给对应的成员
```javascript
const arr = [100, 200, 300]
const [foo, bar, baz] = arr
console.log(foo, bar, baz) // 100 200 300
```
若只想获取某个位置的成员，则其余位置可不输入成员名来获取某一个对应的成员
```javascript
const arr = [100, 200, 300]
const [, , fov] = arr
console.log(fov) // 300
```
在解构时添加...可将剩余的成员以数组的形式添加到该成员之中

ps: ...的形式只能用在解构位置的最后一个成员上使用
```javascript
const arr = [100, 200, 300]
const [ret, ...args] = arr
console.log(ret, args) // 100 [200,300]
```
若解构的成员数量小于数组长度，则会按顺序赋值成员
```javascript
const arr = [100, 200, 300]
const [foo, baz] = arr
console.log(foo, baz) // 100 200
```
若解构的成员数量大于数组长度，则多余成员则会赋值undefined

可以在解构位置成员后使用=设置默认值，当该成员为undefined时会被设置成默认值
```javascript
const arr = [100, 200, 300]
const [foo, baz, bar = 400, ret, arg = 500] = arr
console.log(foo, baz, bar, ret, arg) // 100 200 300 undefined 500
```
##### 应用场景：解构路径
```javascript
const path = '/foo/baz/bar'

// 旧方法
// const tmp = path.split('/')
// const rootdir = temp[1]

// 数组解构
const [, rootdir] = path.split('/')
console.log(rootdir) // foo
```
### 对象解构
##### 从对象中获取指定元素的快捷方式

对象不像数组存在下标存在顺序规则，所以对象解构不能使用顺序去提取

对象解构需要使用{}中输入成员名来匹配需要解构对象的成员

使用方法与解构数组类似，查找不到的成员也会被设置为undefined，也可设置默认值
```javascript
const obj = {name: 'bar', age: 20}
const { name } = obj
console.log(name) // bar
```
若在对象解构前已设置同名的成员，此时解构会出现错误

可以使用重命名的方式解决：在成员名后添加(: 新成员名)来实现重命名
```javascript
const obj = {name: 'bar', age: 20}
const name = 'baz'
// const { name } = obj // 报错
const { name: objName } = obj //name为匹配的成员名，objNmae为新成员名
console.log(name, objName) // baz bar
```
##### 应用场景
```javascript
// 在大量使用console.log的代码里单独解构该方法，简化代码的编写并减小代码的体积
const { log } = console
log('foo') // 等同于console.log('foo')
```
### 模板字符串自变量
##### 传统字符串以单引号''或双引号""，模板字符串以反语号``声明，可以使用\进行转义
```javascript
// const str = '旧模板字符串'
const str1 = `新模板字符串`
const str2 = `新模板字符串转义\``
```
##### 传统字符串不支持换行，模板字符串支持多行字符串，可以直接输出换行符，方便输出html字符串
```javascript
const str = `新模板字符串

可以携带多行空格，方便编写html字符串`
```
##### 支持通过插值表达式的方式嵌入所对应的数值
${}也可输入表达式，将其返回值作为字符串插入
```javascript
const name = 'tom'
const msg = `hello, ${name}, 1+1=${1+1}`
console.log(msg) // hello, tom, 1+1=2
```
### 模板字符串标签函数
##### 在一个函数表达式后添加模板字符串,模板字符串中定值会被分割成数组形式作为第一个参数，也可在函数中访问模板中变量的值，用来对模板字符串进行二次加工
```javascript
const name = 'tom'
const gender = true

function myTagFunc (strings, name, gender) {
    console.log(strings, name, gender) // ['hey, ', ' is a ', ''] 'tom' true
}
const result = myTagFunc`hey, ${name} is a ${gender}`
```
##### 应用场景：翻译、检查模板字符串中是否含有违规词汇(不安全字符)、小型模板引擎
### 字符串的扩展方法
##### includes() 判断字符串对象中是否包含该字符片段
##### startsWith() 判断字符串对象是否以该字符片段开头
##### endsWith() 判断字符串对象是否以该字符片段开头
``` javascript
const msg = 'Error: foo is not defined.'
msg.includes('foo')     // true
msg.startsWith('Error') // true
msg.endsWith('.')       // true
```
### 参数默认值
旧方法：在函数体中判断参数是否为undefined来决定是否为其设置默认值
``` javascript
function fn (enable) {
    // enable = enable || true // 不可取，当enable为false时也会被设置为true
    enable = enable === undefined ? true : enable // 正确用法
}
```
新方法：参数默认值可在形参的后面用=设置默认值
``` javascript
function fn (arg, enable = false) {
    console.log(enable)
}

fn(true) // fasle
```
ps:因为参数是按照次序传递的，带有参数默认值的参数应该在参数列表的最后，否则默认值无法正常工作
### 剩余参数
##### 使用...的形式将函数体中剩余的参数以数组的形式添加到该参数中
``` javascript
function fn (bar, ...args) {
    console.log(bar, args)
}

fn(1, 2, 3, 4) // 1 [2, 3, 4]
```
ps:这是将剩余的参数以数组的形式添加到对应参数中，所以只能使用一次且必须放在形参的最后
### 展开数组
##### ...除了收取剩余参数的用法外也能展开数组
``` javascript
const arr = ['foo', 'bar', 'baz']

console.log.apply(console,arr) // 依次打印arr中的成员

console.log(...arr) // 遍历arr成员，并将每个成员作为参数调用函数
```
### 箭头函数
##### 简化了函数的定义方式，允许使用=>箭头的形式来定义函数，作用：
+ 简化了函数的定义
+ 多了一些特性
``` javascript
// 原函数定义
function inc(num) {
    return num + 1
}

// 箭头函数方法
const newInc = n => n + 1

console.log(inc(100), newInc(100)) // 101 101
```
##### 应用场景：筛选数组中的奇数值
```javascript
const arr = [1, 2, 3, 4, 5, 6]
arr.filter(i => i % 2)
```
#### 箭头函数与this
##### 箭头函数并不会改变this的指向
```javascript
const person = {
    names: 'tom',
    sayHi1: function(){
        console.log(this.names)
    },
    sayHi2: () => {
        console.log(this.names)
    },
    sayHiAsync1: function(){
        setTimeout(function () {
            console.log(this.names)
        },1000)
    },
    sayHiAsync2: function(){
        setTimeout(() => {
            console.log(this.names)
        },1000)
    }
}
person.sayHi1()      // tom
person.sayHi2()      // undefined
person.sayHiAsync1() // undefined
person.sayHiAsync2() // tom
```
### 对象字面量增强
对象定义方法：
```javascript
const bar = 'bar'

const obj = {
    foo: 123,
    // bar: bar // 旧方法需使用变量名：变量的方法进行定义
    bar, // 若定义成员名与变量名相同，新方法可省了冒号和后面的参数名
    // mouthod: function(){}, 
    mouthod () {
        console.log(this)
    }, // 定义函数也可省略冒号和function
}

obj.mouthod() // obj
```
计算属性名：将表达式返回值或变量的值作为对象的属性名并赋值
```javascript
const bar = 'bars'

const obj = {
    [Math.random()]: '123',
    [bar]: '123'
}

// 旧方法只能在对象外部手动添加一个对象的值
// obj[Math.random()] = '123'

console.log(obj) // {{0.44269706532540654: "123", bars: "123"}}
```
### 对象拓展方法 Object.assign()
##### 将多个源对象中的属性复制到一个目标对象中，并覆盖目标对象的值
```javascript
const sourcel = {
    a: 123,
    b: 123
}

const target = {
    b: 456,
    c: 456
}

const result = Object.assign(target, sourcel)
console.log(result) // {a: 123, b: 123, c: 456}
console.log(target === result) // true 在修改后目标对象也会发生改变 指向同一个内存地址
```
##### 应用场景：函数内部复制一个对象并修改则不会影响外部对象的数据，或设置默认值
```javascript
function fn (obj) {
    //复制obj且设置foo与bar的默认值，且new_obj是全新的对象，修改new_obj不会影响外部obj的值
    const new_obj = Object.assign({foo:123, bar: 456}, obj)
    return new_obj
}
const obj = {baz: 123, bar: 321}
const results = fn(obj)
console.log(result) // {foo: 123, bar: 321, baz: 123}
console.log(result === obj) // false
```
### 对象拓展方法 Object.is()
##### 比较两个对象是否相等 == ===
+ 双等号 == 进行比较时会将转换数据类型 存在 0 == false 为 true 的情况
+ 三等号 === 进行比较时不会转换数据类型，但对于数字0的正负是无法区分的，存在 +0 === -0 为true和 NaN === NaN 为false(NaN代表一个特别的值，所以该表达式应该为true)的情况
+ Object.is()能够区分+0和-0和NaN，且不会转换数据类型，一般来说该方法用的不多，还是建议使用三等号进行判断
```javascript
Object.is(+0, -0)   // false
Object.is(NaN, NaN) // true
```
### Proxy 代理
##### 在vue3版本以前使用Object.defineProperty进行数据的拦截与响应
##### 在ES2015中新增Proxy专门为对象设置访问代理器，监听对象的读写
```javascript
const person = {
    name: 'zxd',
    age: 25
}

// @person {object} 代理的目标对象
const personProxy = new Proxy(person, {
    // @target {object} 代理的目标对象
    // @property {string} 目标对象的属性名
    get (target, property) {
        console.log(target, property)
        return property in target ? target[property] : 'default'
    },
    // @value {any} 给目标对象的属性所赋的值
    set (target, property, value) {
        console.log(target, property, value)
        // 设置拦截器，设置的值必须为数字，否则报错
        if (!Number.isInteger(value)) {
            throw new TypeError(`${value} is not an int`)
        }
        target[property] = value
        return value
    }
})

personProxy.name   // {name: 'zxd', age: 25} 'name'   'zxd'
personProxy.weight // 'default'
personProxy.height = 175 // {name: 'zxd', age: 25} 'height' 175
personProxy.height = 'zxd' // 报错
```
### Proxy vs Object.defineProperty()
+ Proxy功能更为强大，Object.defineProperty()只能监听数据的读写，Proxy能够监视对象更多的操作，如delete删除操作
+ Proxy能更好的支持数组对象的监视，以往是使用Object.defineProperty()来重写数组的操作方法，如push(),以此来实现对数组的监听
```javascript
const list = []

const listProxy = new Proxy(list, {
    set (target, property, value) {
        console.log('set', property, value)
        target[property] = value
        return true
    }
})

// 在添加数组元素时还会增加数组长度
listProxy.push(100) // set 0 100   set length 1
```
+ Proxy是以非侵入的方式监管了对象的读写，不需要再对对象本身进行操作，而Object.defineProperty()需要单独定义对象中需要被监听的属性，会增加许多操作
### Reflect
+ 以java的解释Reflect是一个静态类，无法使用<s>new Reflect()</s>来创建一个实例对象，只能调用静态类的静态方法
+ Reflect内部封装了一系列对对象的底层操作，与Proxy的处理对象的方法成员相对应，Reflect成员方法接受Proxy处理对象的默认实现
```javascript
const person = {
    name: 'zxd',
    age: 25
}

const proxy = new Proxy (person, {
    //若该对象内未设置get()方法，则会为其默认添加为Reflect.get()方法
    get (target, property) {
        return Reflect.get(target, property)
    },

    // 正确使用Proxy的方法：在不影响原先对象的操作方法的前提下添加自定义方法
    set (target, property, value) {
        // 自定义的操作
        console.log(target, property, value)

        // 再调用原生的操作方法
        return Reflect.set(target, property, value)
    }
})
```
+ 统一提供一套用于操作对象的API：传统操作方法的不同写法也不同，容易乱
```javascript
const person = {
    name: 'zxd',
    age: 25
}

// 传统的操作方法
console.log('name' in person)
console.log(delete person['age'])
console.log(Object.keys(person))

// Reflect的操作方法，统一对象的操作方式
console.log(Reflect.has(person, 'name'))
console.log(Reflect.deleteProperty(person, 'age'))
console.log(Reflect.ownKeys(person))
```
### Promise
##### 一种更优的异步编程解决方案：解决了传统异步编程中回调函数嵌套过深的问题
##### 在模块二JavaScript异步编程中详细介绍
### Class 类
##### 在Class之前使用构造函数配合原型对象来创建实例对象
##### 优点：更容易理解，结构更清晰
```javascript
class Person {
    constructor (name) {
        this.name = name
    }
    say () {
        console.log(this.name)
    }
}
const foo = new Person('tom')
foo.say() // tom
```
##### 静态方法：ES2015中新增添加静态成员的static关键词，调用静态方法：类.方法名()
```javascript
class Person {
    constructor (name) {
        this.name = name
    }
    say () {
        console.log(this.name)
    }
    static create (name) {
        console.log(this) // Person
        return new Person(name)
    }
}
const foo = Person.create('tom')
foo.say() // tom
```
##### ps：静态方法是挂载到类型上的，在静态方法内部的this是不会去指向某个实例对象，而是当前的类型，也就是当前Person类
### 类的继承
##### ES2015之前大多使用原型方法来实现继承，ES2015则使用extends来实现继承，更方便，更清晰
```javascript
class Person {
    constructor (name) {
        this.name = name
    }
    say () {
        console.log(this.name)
    }
}

// 子类 Student 继承父类 Person
class Student extends Person {
    constructor (name, number) {
        // super()始终指向父类，调用super()就是调用父类的构造函数
        super(name)
        this.number = number
    }
    hello () {
        super.say()
        console.log(this.number)
    }
}

const bar = new Student('jerry', '100')
bar.hello() // jerry 100
```
### Set数据结构
##### 集合：与传统的数组类似，但内部的成员不允许是重复的，每个成员都是唯一的
```javascript
const s = new Set()

// 为集合添加元素，若当前元素已存在则忽略
s.add(1).add(2).add(3).add(4)

console.log(s) // Set(4) {1, 2, 3, 4}

// 以下两个方法都可对集合进行遍历
s.forEach(i => console.log(i))
for (let i of s) {
    console.log(i)
}

// 集合的长度
s.size

// 判断集合中是否含有该值
s.has(100) // false 

// 删除集合中某个值 成功返回true 若不存在则返回false
s.delete(3) // true

// 清空集合内的元素
s.clear()
```
##### 应用场景：去重
```javascript
const arr = [1, 2, 6, 4, 8, 1, 2]

// 集合可接受一个数组，并将其不重复的值保存在集合中,再使用Array.from()或数组展开符转换回数组
const result = Array.from(new Set(arr))

const result2 = [...new Set(arr)]
```
### Map数据结构
##### 严格意义上的键值对集合，在对象中添加的键不为字符串，就会将这个键的toString()的结果作为键存储,而Map的键不会转换
##### Map类型能用任何类型的键，对象只能用字符串或Symbol类型的键
```javascript
const map = new Map()

const tom = { name: 'tom' }

map.set(tom, 90)

console.log(map) // Map(1) {{…} => 90}

// 获取某个值
map.get(tom) // 90

// 判断某个值是否存在
map.has(tom) // true

// 删除某个值 成功true 不存在false
map.delete(tom) // true

// 遍历所有的值
map.forEach((value, key) => {
    console.log(value, key)
})
```
### Symbol 一种全新的原始数据类型
+ 最主要的作用就是为对象添加独一无二的属性名
##### 在不同的两个模块中修改相同对象同一个值，则该值会被覆盖，ES2015以后对象的属性名也可使用Symbol()
##### 使用Symbol()创建的值永远是唯一的，不会重复
##### Symbol()允许传入一个字符串作为描述文本，如：Symbol('foo')

```javascript
Symbol() === Symbol() // false 永远是唯一的
Symbol('foo') === Symbol('foo') // false 永远是唯一的

const obj = {
    [Symbol()]: '123'
}

obj[Symbol()] = '456'
obj[Symbol()] = '789'

console.log(obj) // {Symbol(): "123", Symbol(): "456", Symbol(): "789"}
```
##### 应用场景：除了避免对象属性名重复，还能模拟对象的私有成员
```javascript
// a.js ===================
const name = Symbol()
const Person = {
    [name]: 'zxd',
    say () {
        console.log(this[name])
    }
}

// b.js ===================
// 在其他模块无法访问到a.js中的name，也无法创建一个相同的Symbol，所以无法直接访问到该成员，只能调用对象中的普通成员
Person.say() // 'zxd'
```
##### 可在全局使用Symbol.for()注册一个唯一的Symbol值
```javascript
const s1 = Symbol.for('foo')
const s2 = Symbol.for('foo')
console.log(s1 === s2) // true

const s3 = Symbol.for(true)
const s4 = Symbol.for('true')
console.log(s3 === s4) // true
```
##### ps:Symbol.for()传入的参需要是字符串，若不是字符串也会被转换成字符串
##### Symbol设置了很多内置的常量作为内部方法的标识,让自定义对象实现js内置的接口
```javascript
console.log(Symbol.iterator) // Symbol(Symbol.iterator)
console.log(Symbol.hasInstance) // Symbol(Symbol.hasInstance)

const obj = {}
console.log(obj.toString()) // [object Object] 对象的toString标签 可以自定义toString标签

// 直接添加字符串标识符可能会跟内部成员产生重复，所以要求使用Symbol来实现接口
const objSymbol = {
    // toStringTag: 内置的Symbol常量
    [Symbol.toStringTag]: 'XObjcect'
}
console.log(objSymbol.toString()) // [object XObjcect]
```
##### 使用Symbol作为属性名，大部分方法是拿不到这个属性名的，Symbol属性特别适合作为对象的私有属性
```javascript
const obj = {
    [Symbol()]: 'Symbol value',
    foo: 'normal value'
}

for (var key in obj){
    console.log(key) // foo 拿不到Symbol
}

console.log(Object.keys(obj)) // ["foo"] 拿不到Symbol

console.log(JSON.stringify(obj)) // {"foo":"normal value"} 拿不到Symbol

console.log(Object.getOwnPropertySymbols(obj)) // [Symbol()] 拿到对象中所有的Symbol属性名
```
### for...of 循环
##### for循环适合遍历数组，for...in适合遍历键值对，还有各种函数式的遍历方法如forEach()等,都存在一定的局限性
##### 推出for...of循环作为遍历所有数据结构的统一方式，包括伪数组arguments、元素节点的列表、Set、Map(Map返回的是[键,值])
```javascript
const arr = [100, 200, 300, 400]
for (const item of arr) {
    // for...of循环出来的是当前元素本身，并不是下标
    console.log(item) // 100 200 300 400

    // 同样可以使用break退出该循环
    if (item > 300){
        break
    }
}

const set = new Set([100, 200])
for (const item of set) {
    console.log(item) // 100 200 
}

const map = new Map()
map.set('foo', '123')
map.set('baz', '321')
for (const item of map) {
    console.log(item) // ['foo', '123'] ['baz', '321']
}
```
##### ps：arr.some()循环中能通过返回true，arr.every()返回false来终止循环，但forEach()无法终止
##### for...of无法循环遍历普通对象数据类型，ES中能够表示有结构的数据类型越来越多，为了提供统一的遍历方式，提出了iterable接口，iterable接口是for...of的前提
+ 所有能被for...of实现的数据类型内部都能实现iterable接口(内部必须挂载iterable方法)
+ iterable方法返回一个next方法，通过不断调用next方法可以实现对数据类型的遍历
```javascript
const arr = ['foo', 'bar', 'baz']

const iterator = arr[Symbol.iterator]()

console.log(iterator.next()) // {value: "foo", done: false}
console.log(iterator.next()) // {value: "bar", done: false}
console.log(iterator.next()) // {value: "baz", done: false}
console.log(iterator.next()) // {value: undefined, done: true}
```
### 实现可迭代接口
```javascript
// 可迭代接口 iterable 需要有返回迭代器的方法
const obj = { 
    store: ['foo', 'baz', 'bar'],

    [Symbol.iterator]: function(){
        // 迭代器接口 iterator 需要有迭代的next()方法
        let index = 0
        const self = this

        return {
            next: function() {
                // 迭代结果接口 iterationResult
                const result = {
                    // 当前迭代的位置
                    value: self.store[index],
                    // 是否迭代结束
                    done: index >= self.store.length
                }
                index ++
                return result
            }
        }
    }
}

for (const item of obj) {
    console.log(item) // 'foo' 'baz' 'bar'
}
```
### 迭代器模式
##### 对外提供统一遍历接口，让外部不需要关心内部的数据结构
```javascript
// a.js =============
const todos = {
    lefe: ['吃饭', '睡觉', '打豆豆'],
    learn: ['语', '数', '英'],
    work: ['喝茶'],

    // 为外部提供统一的遍历接口
    each: function (callback){
        const all = [...this.lefe, ...this.learn, ...this.work]
        for (const item of all) {
            callback(item)
        }
    },

    [Symbol.iterator]: function () {
        const all = [...this.lefe, ...this.learn, ...this.work]
        let index = 0
        
        return {
            next: function () {
                return {
                    value: all[index],
                    done: index++ >= all.length
                }
            }
        }
    }
}

// b.js ================
// 不再关心内部的数据结构是否发生了变化
todos.each(function (item) {
    console.log(item) // 吃饭 睡觉 打豆豆...
})

for (const item of todos) {
    console.log(item) // 吃饭 睡觉 打豆豆...
}
```
### 生成器函数
##### 减少在复杂的异步代码中回调嵌套过深的问题，进而提供更好的异步编程解决方案
+ 在普通函数名前加 * 会变成生成器函数
+ 生成器函数调用并不会马上执行，而是返回一个新的对象，内部包含next()函数，在调用对象的next()方法是才会执行函数
+ next()方法执行后会返回一个对象，解构与迭代器的next()返回值相同，value中包含函数中的返回值
```javascript
function * foo () {
    console.log('zxd')
    return 100
}

const result = foo()
console.log(result) // foo {<suspended>} 包含next()方法
console.log(result.next()) // 'zxd' {value: 100, done: true}
```
+ 生成器函数会配合yield作为返回值，yield可多次使用，生成器函数会返回一个生成器对象，调用next()函数体才会开始执行，遇到yield函数体会暂停，yield的返回值会作为next()的返回值，再次调用则会从上次暂停的位置继续执行，直到函数体结束
```javascript
function * foo () {
    console.log('1')
    yield 1
    console.log('2')
    yield 2
    console.log('3')
    yield 3
}

const result = foo()
console.log(result.next()) // '1' {value: 1, done: false}
console.log(result.next()) // '2' {value: 2, done: false}
console.log(result.next()) // '3' {value: 3, done: false}
console.log(result.next()) // {value: undefined, done: true}
```
### 生成器应用
##### 发号器
```javascript
function * createIdMaker () {
    let id = 1
    // 死循环保证代码能被一直调用
    while (true) {
        yield id++
    }
}

const idMaker = createIdMaker()

console.log(idMaker.next().value) // 1
console.log(idMaker.next().value) // 2
console.log(idMaker.next().value) // 3
```
##### 以生成器编码迭代器更为方便
```javascript
const todos = {
    lefe: ['吃饭', '睡觉', '打豆豆'],
    learn: ['语', '数', '英'],
    work: ['喝茶'],

    [Symbol.iterator]: function * () {
        const all = [...this.lefe, ...this.learn, ...this.work]
        for (const item of all) {
            yield item
        }
    }
}

for (const item of todos) {
    console.log(item) // 吃饭 睡觉 打豆豆...
}
```
### ES Modules
##### 语言层面的模块化标准，在模块化开发中课程详细介绍
### ES2016
##### ES2016相比ES2015只是一个小版本，新增了两个功能：
+ 新增数组函数 includes(),查找数组中是否存在某个值，还能在数组中查找NaN
```javascript
const arr = ['foo', 123, NaN]

console.log(arr.includes('foo')) // true
console.log(arr.includes(123))   // true
console.log(arr.includes(NaN))   // true
```
+ 新增指数运算符,方便密集型数学运算有帮助
```javascript
// 旧方法：使用Math.pow计算
console.log(Math.pow(2,10)) // 1024

// ES2016新增方法
console.log(2 ** 10) // 1024
```
### ES2017 2017.6
##### ES2017相比ES2015也是一个小版本，新增以下功能：
+ 新增Object.values()方法，与Object.keys()类型，Object.keys()返回对象所有键组成的数组，Object.values()返回对象中所有的值组成的数组
```javascript
const obj = {
    foo: 123,
    bar: 456,
    baz: 789
}

console.log(Object.keys(obj))   // ["foo", "bar", "baz"]
console.log(Object.values(obj)) // [123, 456, 789]
```
+ 新增Object.entries()以数组的形式返回键值对,将对象转换后可再使用for...of进行处理，也方便了将对象转换成Map类型
```javascript
const obj = {
    foo: 123,
    bar: 456,
    baz: 789
}

console.log(Object.entries(obj)) // [["foo", 123], ["bar", 456], ["baz", 789]]

for (const [key, value] of Object.entries(obj)) {
    console.log(key, value) // foo 123 bar 456 baz 789
}

console.log(new Map(Object.entries(obj))) // Map(3) {"foo" => 123, "bar" => 456, "baz" => 789}
```
+ 新增Object.getOwnPropertyDescriptors(),获取属性中对象的完整描述信息
```javascript
const p1 = {
    bar: 'bar',
    baz: 'baz',
    get add () {
        return this.bar + ' ' + this.baz
    }
}

console.log(p1.add) // bar baz

const p2 = Object.assign({}, p1)
p2.bar = 'foo'
console.log(p2.add) // bar baz 字符串不变，是因为在复制时把add只当做普通的属性进行复制

// 获取属性中对象的完整描述信息
const descriptors = Object.getOwnPropertyDescriptors(p1)
// 创建一个新对象并添加属性的描述信息
const p3 = Object.defineProperties({}, descriptors)
p3.bar = 'foo'
console.log(p3.add) // foo baz
```
+ 新增两个字符串填充方法：String.prototype.padStart / String.prototype.padEnd，用给定的字符串去填充目标字符串的开始或结束为止，保证数据的可读性
```javascript
const codes = {
    html: 6,
    css: 80,
    javascript: 200
}

for (const [name, value] of Object.entries(codes)) {
    // name 用-字符串填充结尾  value 用0字符串填充开头 因为value是数字所以需要先转换
    console.log(`${name.padEnd(12,'-')}|${value.toString().padStart(5,'0')}`)
    // html--------|00006
    // css---------|00080
    // javascript--|00200
}
```
+ 允许在函数的参数位置的最后一位添加尾逗号，方便调整数据的位置及增删数据
```javascript
const arr = {
    100,
    200,
    300,
}
```
+ Async / Await 解决异步编程中函数嵌套过深的问题，本质上是使用Promise的语法糖，重点在异步编程模块中详细介绍

