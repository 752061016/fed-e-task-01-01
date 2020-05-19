# TypeScript
#### 解决JavaScript类型系统的问题，大大提高代码的可靠程度
### 内容概要
+ 强类型与弱类型
+ 静态类型与动态类型
+ JavaScript自有类型系统的问题
+ Flow静态类型检查方案
+ TypeScript语言规范与基本应用
## 类型系统
+ 强类型与弱类型 (类型安全)
+ 静态类型与动态类型 (类型检查)
#### 类型安全 强类型vs弱类型
+ 强类型概念：语言层面限制函数的实参类型必须与形参类型相同，例如在函数中定义形参为某一特定类型，则调用该函数时不能给该参数传入特定类型外的数据
+ 弱类型在语言层面并不会限制实参的类型，可以传入任意类型的数据
+ 强类型语言中不允许任意的隐式类型转换，而弱类型语言则允许任意的数据隐式类型转换
+ JavaScript中所有报出的类型错误都是代码层面在运行时通过逻辑判断手动抛出的，并不是语法层面上的限制
+ 变量类型允许随时改变的特点不是强弱类型的差异，Python是强类型语言，但变量的类型也能改变
```javascript
console.log('100' - 50) // 50
console.log(Math.floor('foo')) // NaN
console.log(true) // 1
console.log([1, 2, 3].split(',')) // 报错
```
#### 类型检查 静态类型与动态类型
+ 静态类型语言：一个变量在声明时它的类型就是明确的，而且声明过后无法更改
+ 动态类型语言：在运行阶段才能明确变量类型，而且变量的类型也可以随时改变，换而言之动态类型语言中的变量没有类型，变量中存放的值是由类型的
```javascript
var foo = 'foo'
foo = 100
console.log(foo) // 100
```
### JavaScript 类型系统特征
##### 弱类型 且 动态类型
##### JavaScript语言是非常灵活多变的，但缺点是缺失了类型系统的可靠性
##### 为什么JavaScript不是强类型/静态类型的语言：
+ 最初的JavaScript应用简单，类型系统的限制会显得多余
+ JavaScript是一门脚本语言，是不需要编译就能在环境运行的语言，就算设置成静态类型语言也没有意义，因为静态类型语言需要在编译环节进行检查
##### 随着前端的规模越来越大，JavaScript代码也会越来越复杂，开发周期越来越长，使得JavaScript灵活多变的特性变成短板
### 弱类型的问题
+ 只有在代码运行阶段才能发现代码的异常
```javascript
const obj = {}

setTimeout( () => {
    obj.foo() // 代码被运行时才报错
}, 1000)
```
+ 类型不明确会造成函数功能改变
```javascript
function add (a, b) {
    return a + b
}

console.log(add(100, 100)) // 200
console.log(add(100, '100')) // '100100'
```
+ 对对象索引器的错误用法
```javascript
const obj = {}
obj['true'] = 100
console.log(obj[true]) // 100
```
### 强类型的优势
+ 错误更早暴露，可以在编码阶段提前处理可能出现的类型异常
+ 代码更加智能，编码更加准确，在编码阶段提示错误
+ 重构更牢靠
+ 减少了代码层面的不必要的类型判断，在函数中不需要先判断类型再开始执行
## Flow
##### JavaScript的静态类型检查器，由Facebook推出
##### 在JavaScript代码中通过添加类型注解的方式来标记每个变量和参数的类型，Flow会根据注解来检查是否存在类型错误，从而实现对类型异常的检查
```javascript
// 类型注解
function add (a: number, b: number) {
    return
}

console.log(add(1, 1))   // 编程正常
console.log(add(1, '1')) // 编程异常
```
+ 代码完成后可通过Babel将所有的代码注解清除，所以对代码没有影响
+ 且Flow不要求对每个变量进行注解
### Flow快速上手
+ Flow是以npm模块的方式启动的，在控制台安装Flow检查模块：npm add flow-bin
+ 在需要flow编译的js文件开头标志 // @flow 注释标记用来表示该文件需要flow编译
+ 为文件成员添加类型注释
+ 代码完成后控制台输出flow进行编译，若运行失败则需要初始化flow：控制台输出flow init
```JavaScript
// @flow

function sum (a: number, b: number) {
    return a + b
}

sum(100, 200)
sum(100, '200') // 在flow编译时会提示错误
```
### Flow编译
##### 因为flow类型注解的方式并不是JavaScript语法，在运行时会发生错误，flow只是在编码阶段为程序找出问题的，但在实际的运行时没有必要，需要在运行前移除类型注解
##### 使用官方的flow-remove-types模块移除注解
+ 控制台使用npm add flow-remove-types 添加模块
+ 使用注解移除模块：flow-remove-types src -d dist 将src文件夹下的代码注解移除后再添加到dist文件夹中，这个文件是能直接执行
+ 可以防止删除第三方模块的注解
```JavaScript
//      

function sum (a        , b        ) {
    return a + b
}

sum(100, 200)
sum(100, '200')
```
##### 使用Babel配合插件
+ 添加babel核心模块：npm add @babel/core
+ 添加babel的cli工具：npm add @babel/cli 可以在命令行上直接使用babel命令
+ 添加babel转换flow类型注解插件：npm add @babel/preset-flow
+ 同时安装：npm add @babel/core @babel/cli @babel/preset-flow
+ 添加babel的配置文件 .babelrc ==> flow init
```JavaScript
{
    "presets": ["@babel/preset-flow"]
}
```
+ 控制台执行：babel src -d dist 将src之中的文件编译完后添加到dist文件夹中
### Flow开发工具插件
##### 每次需要在控制台中运行命令才能发现类型问题，影响开发效率，在开发时显露问题能提高效率，vscode插件 Flow Language Support
##### 能在代码编写阶段提示错误类型信息
##### https://flow.org/en/docs/editors/ 显示对所有编辑器支持的情况
### 类型推断
##### Flow不仅能使用类型注解的方式标记类型，还能根据代码的使用情况自动推断出类型
```javascript
// @flow

function sum (a) {
    return a * a
}

sum('200') // 未定义参数类型也被提醒错误
```
### 类型注解
+ 虽然不用为所有的成员添加类型注解，但添加类型注解能更加明确地限制类型，对后期的代码理解与维护更有帮助，尽可能地使用类型注解
+ 不仅能在变量和函数的参数上添加类型注解，也可为函数的返回值添加类型注解
+ 为函数注解了返回值但函数并没有返回值，实际上是返回了undefined，此时也会报错，对于没有返回值的函数应该注解为void
```javascript
// @flow

let num: number = 100
num = '100' // 提示类型错误

function add (a): number {
    return a
}

add(1)   // 1 返回正常
add('1') // 提示类型错误

function del1 (a): number {
    // 没有返回值  提示类型错误
}
function del2 (a): void {
    // 没有返回值  但不会提示错误
}
```
### 原始类型
+ JavaScript中的原始数据类型：string number boolean null void symbol
```javascript
// @flow

const a: string = 'a'
const b: number = 1 // Infinity 无穷大 NaN
const c: boolean = true // false
const d: null = null
const e: void = undefined
const f: symbol = Symbol()
```
+ Flow也支持对有结构的类型做注解（对象或数组）
### 数组类型
```javascript
// @flow

// 两种方式都能表示元素为number的数组
const arr1:Array<number> = [1, 2, 3]
const arr2:number[] = [1, 2, 3]

// 定义规定长度且规定类型的数组,叫 元组
const arr3:[string, number] = ['1', 1]
```
### 对象类型
```javascript
// @flow

// 定义对象内的元素名及类型
const obj1: { foo: string, bar: number } = {foo: 'foo', bar: 1}

// 可选属性：定义对象内不确定是否有无的元素，在定义的元素名后加?，则这个对象没有这个参数也不会报错
const obj2: { foo?: string, bar: number } = {bar: 1}

// 对象可以通过字面量方式添加元素，可以定义成员的元素类型，但没有数量要求
// 定义了对象的键名及值都为string类型
const obj3: { [string]: string } = {}
obj3.key1 = 'string'
obj3.key2 = 3 // 值类型错误
obj3[1] = 'string' // 键类型错误
```
### 函数类型
##### 一般是对函数的参数和返回值进行类型约束
```javascript
// @flow

// 当函数作为参数传入函数的回调时，可使用类似箭头函数签名的方式对回调函数的参数及返回值进行定义
function foo (cb: (string, number) => void) {
    cb('string', 100)
}

foo(function (str, num) {
    //str => string
    // num => number
})
```
### 特殊类型
+ 字面量类型，为了限制变量为某一个值，只要不是这个值都会报错
+ 一般不会单独使用，而是配合联合的用法去组合几个特定的值
+ 可以用type去声明一个自定义的类型，重复使用一种类型
+ 可能存在的类型，表示该值也可以为null或undefined，用法：在类型前加?
```javascript
// @flow

let a: 'foo' = 'foo'
a = 'baz' // 提示类型错误

const type: 'success' | 'warning' | 'danger' = 'success' // 只能是这三个值中的一个

const b:string | number = 1 // 只能是这两种类型之一

type StringOrNumber = string | number
const c: StringOrNumber = 'string' // 跟b的类型定义一样

const d: ?StringOrNumber = null // 可以为null或undefined，相当于StringOrNumber | null | void
```
### Mixed & Any
+ Mixed类型表示可以为任何类型的值，强类型，可以编写类型判断添加
```javascript
// @flow

function Mixed (value: mixed) {
    value.substr(1) // 编译时报错
    if (typeof value === 'string') value.substr(1)
}

passMixed('string') // 不会报错
```
+ Any类型表示可以为任何类型的值，弱类型，兼容老代码
```javascript
// @flow

function Any (value: any) {
    value.substr(1) 
    value = value
}

Any('str')
Any(100) // 编译时不会报错，执行时报错
```
### Flow小结
+ 目的：方便日后理解第三方源码解读，对于不了解的类型可以去官方查询手册
+ Flow对所有类型的描述文档：https://flow.org/en/docs/types/
+ 第三方的类型手册：hhtps://www.saltycrane.com/cheat-sheets/flow-type/latest/
### Flow 运行环境API  内置对象
+ 运行环境提供的API也有类型限制，如浏览器中的DOM和BOM，node中的Node API
```javascript
// @flow

// 需要传入一个字符串，字符串会报错，返回一个HTMLElement类型或null
const element: HTMLElement | null = document.getElementById('app')
```
+ JavaScript自身标准库：https://github.com/facebook/flow/blob/master/lib/core.js
+ JavaScript在不同环境下的API声明
  + https://github.com/facebook/flow/blob/master/lib/dom.js
  + https://github.com/facebook/flow/blob/master/lib/bom.js
  + https://github.com/facebook/flow/blob/master/lib/cssom.js
  + https://github.com/facebook/flow/blob/master/lib/node.js

## TypeScript 
#### JavaScript 的超集/扩展集 (superset) 前端领域中的第二语言
##### TypeScript包括JavaScript、更强大的类型系统和对es6+的支持，最后再编译成能在环境中直接运行的JavaScript语言
##### 在一些比较陈旧的环境中对新特性都会有一些兼容性的问题，Typescript会转换这些新特性，使得可以立刻使用这些新特性，即便不使用类型系统，使用Typescript来使用新特性也是很好的选择
##### 与babel转换新特性类型，Typescript最低能编译到es3版本，兼容性很好，且任何一种JavaScript运行环境都支持编译后的文件
##### 功能更加强大，生态更加健全、完善
##### 缺点：
+ 语言本身多了很多概念：泛型、接口等，提高学习成本
+ 项目初期会增加一些成本
### TypeScript 快速上手
+ 安装Typescript:npm add typescript,文件以.ts结尾
+ 编译转换： tsc 文件名
```Typescript
// 01.ts 编译前
var hello = function (name: string) {
   console.log(`Hello, ${name}`) 
}
hello('tom')
// 01.js 编译后
var hello = function (name) {
    console.log("Hello, " + name);
};
hello('tom');
```
### 配置文件
+ 控制台输出：tsc --init 会生成ts的配置文件
  + target 属性表示编译后的JavaScript版本
  + module 以什么样的方式进行模块化
  + rootDir 源代码的路径
  + outDir 编译之后的保存路径
  + sourceMap 文件映射，在调节编译后的js代码时，源代码也会发生改变
  + strict 是否开启严格检查选项
  + lib 指定声明类型库
+ 只有直接运行tsc才会使用配置文件中的内容，单单只编译一个文件是不会使用配置文件中的内容
### 原始类型
```Typescript
const a: string = 'string'
const b: number = 100 // NaN Infinity
const c: boolean = true // false 严格模式下该值不能为空(null)，非严格模式则可以(配置文件中的strict)
const d: void = undefined // 严格模式下只能是undefined，非严格模式可以为null
const e: null = null
const f: undefined = undefined
// 因为Symbol是ES2015新增的内置类型，如果转换成es5版本则找不到Symbol的定义，
// 所以定义Symbol必须将版本调到es2015及以上，或者配置lib中指明ES2015类型库，还必须加上DOM，因为两者并不是放在同个类型库中
const g: symbol = Symbol() 
```
### 中文错误信息
##### Typescript中还能抛出中文的错误消息，控制台输出：tsc --locale zh-CN
##### 中文编码提醒 vscode设置搜索typescript locale 选择语言zh-CN
### 作用域问题
##### 默认文件中的成员会作为全局成员,多个文件中有相同成员就会出现冲突：
```Typescript
// a.ts
const a: number = 1
//b.ts
const a: string = 'str'
```
##### 解决方法：
+ 使用函数自调用提供独立作用域
```Typescript
(function () {
    const a: number = 1
})()
```
+ 使用模块,在当前文件使用 export，也就是把当前文件变成一个模块,模块有单独的作用域
```Typescript
const a: number = 1
export {}
```
### Object类型
##### Typescript中的Object类型不单指对象类型，而是泛指所有的非原始类型--对象、数组、函数
```Typescript
export {} // 确保跟其它示例没有成员冲突

const a: object = function () {} // [] // {}

// 对象类型可以这么写，但更专业的方法是使用接口
const obj:{ foo: string, bar: number} = { foo: 'foo', bar: 1}
```
### 数组形式
与Flow方式类似
```Typescript
export {} // 确保跟其它示例没有成员冲突

// 定义数组内的元素必须是number类型
const arr1: Array<number> = [1, 2, 3]
const arr2: number[] = [1, 2, 3]
```
##### 强类型的便利
```Typescript
// 示例 在js中需要判断args中每个参数是否为number类型

// 如果是 JS，需要判断是不是每个成员都是数字
// 使用 TS，类型有保障，不用添加类型判断
function sum (...args: number[]) {
  return args.reduce((prev, current) => prev + current, 0)
}

sum(1, 2, 3) // => 6
sum(1, 2, 3, '4') // => error
```
### 元组类型 Tuple Types
##### 在Typescript中可以使用数组字面量的方式来定义元组类型，一般用于函数中多次返回同一类型的数据
```Typescript
export {} // 确保跟其它示例没有成员冲突

const tuple: [number, string] = [1, '1'] // 类型顺序不对或元素数量不对都会报错

// 也能使用数组解构的形式访问
const [age, name] = tuple

// 从函数多次返回相同类型的值
const entries: [string, number][] = Object.entries({
  foo: 123,
  bar: 456
})

const [key, value] = entries[0]
// key => foo, value => 123
```
### 枚举类型
+ 枚举类型特点：
  + 给一组数值取更好理解的名字
  + 枚举类型只会出现几个固定的值，不会出去超出预期的可能性
+ JavaScript中并没有枚举这种数据结构，一般都是使用一个对象去模拟实现枚举
```javascript
// js 用对象的方式模拟枚举
const PostStatus = {
    Draft: 0,
    Unpublished: 1,
    Published: 2
}

const post = {
    status: PostStatus.Draft
}
```
+ Typescript中使用enum来定义一个枚举类型，使用等号为枚举类型赋值
  + 若枚举中没有赋值，则默认从0开始递增
  + 若只有第一个值被赋值，则后面的值递增
  + 若枚举中的值是字符串，因为字符串是无法增加的，所以需要给每个元素初始化一个值

```Typescript
// ts 
export {} // 确保跟其它示例没有成员冲突

enum PostStatus {
    Draft, // 0
    Unpublished, // 1
    Published // 2
}

const post = {
    status: PostStatus.Draft
}
```
+ 枚举类型会入侵到代码，简而言之会影响代码编译后的结果
  + 因为Typescript在编译后会被删除类型检查，但枚举类型不会被删除，会生成一个键值对的对象
  + 生成的键值对可以用键去获取值也可以用值去获取键
```Typescript
export {} // 确保跟其它示例没有成员冲突

// ts 编译前
enum PostStatus {
    Draft
}

// 编译后
var PostStatus;
(function (PostStatus) {
    PostStatus[PostStatus["Draft"] = 0] = "Draft"
})(PostStatus || (PostStatus = {}));

console.log(PostStatus[0])     // Draft
console.log(PostStatus['Draft']) // 0
```
+ 如果代码中不需要使用索引器的方式访问枚举的值或键，建议使用常量枚举
  + 在enum前加const会变成常量枚举
  + 编译后枚举会被删除，且获取枚举的值也会变成常量加注释
```Typescript
export {} // 确保跟其它示例没有成员冲突

// ts 常量枚举 编译前
const enum PostStatus {
    Draft
}

const post = {
    status: PostStatus.Draft
}

// 编译后
var post = {
    status: 0 /* Draft */
};
```
### 函数类型
##### 一般是对函数的输入(参数)输出(返回值)进行类型限制
##### 函数声明的方式
+ 函数声明后，参数的类型与数量都应保持一致，无法随意地传递参数
  + 在参数名后加?则这个参数变为可选参数,且可选参数要在参数列表的最后
```Typescript
export {} // 确保跟其它示例没有成员冲突

function fn (a: number, b: string, c?: boolean): string {
    return b
}

fn(0, '0')
fn(100, '100', false)
fn(200, 200) // 报错
fn(300) // 报错
```
+ 使用函数表达式，因为函数最终放入变量，所以这个变量也是有类型的，该变量的类型定义可以用类似箭头函数的方法为其定义
```Typescript
export {} // 确保跟其它示例没有成员冲突

const fn: (a: number, b: string) => string = function (a: number, b: string): string {
    return b
}
```
### 任意类型
因为JavaScript语言本身是弱类型语言，其很多内置的API支持传入任意类型的参数，所以可以定义Any类型表示任意类型
##### 因为Any类型在编译时不会有任意的类型检查，在编译时不会发现类型错误信息，存在类型安全问题，所以轻易地不要使用这种类型
```Typescript
export {} // 确保跟其它示例没有成员冲突

function stringify (value: any) {
    return JSON.stringify(value)
}
let foo: any = 'foo'
foo.bar() // 编译时正常，运行时出错
```
### 隐式类型推断
+ 在Typescript中如果没有明确类型注解标记变量的类型，则会根据变量的使用情况去推断这个变量的类型
+ 若无法推断出类型则会标记为any类型
+ 建议还是为每个变量标记类型，便于后期代码理解
```Typescript
export {} // 确保跟其它示例没有成员冲突

let foo = 'foo' // 此时已经被隐式推断为string类型
foo = 100 // 类型改变会报错

let bar // 定义了变量但未赋值，无法推断类型则会被标记为any
bar = 100   // 正常
bar = 'bar' // 正常
```
### 类型断言
将一个函数的返回值赋给变量，变量会隐式推断这个值的类型或者是undefined，若开发者明确知道这个返回值的类型则可以为变量断言
+ 可以用as或<>的方式断言
+ 类型断言并不是类型转换，断言只是在编译过程的状态，编译过后就不会存在
```Typescript
export {} // 确保跟其它示例没有成员冲突

const arr = [100, 200, 300, 400, 500]
const res = arr.find(i => i>200)
const sum = res + 100 // 报错 res可能不存在

const num1 = res as number // 推荐用法
const num2 = <number>res   // JSX 下不能使用，标签冲突
```
### 接口
用来约束对象的结构，要使用这个接口就要遵从这个接口的规定
+ 定义接口可以不用写分号;
+ 只是在编译时为类型做检查的，在编译后会被删除
+ 可选成员可在成员后添加?
+ 只读成员可在成员前添加readonly，该成员被初始化后就无法被修改
+ 动态成员添加到接口上时需要用 [name:type]: type 的方式，创建对象后可添加对象成员
```Typescript
export {} // 确保跟其它示例没有成员冲突

interface PostType {
    title: string
    num: number
    age?: number
    readonly text: string
}

const post: PostType = {
    title: 'title',
    num: 25,
    text: 'a JavaScript code'
}
post.text = 'TypeScript' // 报错 可读属性无法修改

interface CacheType {
    [key: string]: number
}

const cache: CacheType = {}

cache.num = 12
cache.age = 25
```
### 类
##### 描述一类具体对象的抽象成员
+ ES6以前通过函数+原型模拟实现类，ES6开始JavaScript有了专门的class
+ Typescript增强了class的相关语法
  + Typescript中参数的类型必须要初始化或类型注解，否则会报错
  + 也能使用函数注解
```Typescript
export {} // 确保跟其它示例没有成员冲突

class Perpon {
    name: string 
    age: number = 10

    constructor (name: string, age: number) {
        this.name = name // 若未声明则会报错
        this.age = age
    }

    sayHi (msg: string): void {
        console.log(msg + this.name)
    }
}
```
### 类的访问修饰符
+ public：公有成员，都能使用，默认所有成员都是公有成员，建议加上
+ private：私有成员，只能内部使用，如果constructor方法被定义成私有成员，则不能在外部使用new方法创建，但是能用static方法添加
+ protected: 保护成员，只能子类使用
+ static：静态方法，只能用类名.方法名调用，且方法内部的this指向这个类
+ readonly: 只读属性，无法被修改，若是已有访问修饰符则readonly要跟在修饰符后面
```Typescript
export {} // 确保跟其它示例没有成员冲突

class Person {
    public name: string // 公有成员  默认都是
    private age: number = 10 // 私有成员  只能内部使用
    protected  gender: boolean // 保护成员 只能子类使用 
    readonly reading: boolean // 只读成员 无法修改

    constructor (name: string, age: number) {
        this.name = name // 若未声明则会报错
        this.age = age
        this.gender = true
        this.reading = true
    }

    sayHi (): void {
        console.log(this.age)
    }
}

const tom = new Person('tom', 20)
console.log(tom.name) // tom
console.log(tom.age) // 报错
console.log(tom.sayHi()) // 20
console.log(tom.gender) // 报错

class Students extends Person {
    constructor (name: string, age: number) {
        super(name,age) // 创建父类实例
        console.log(this.gender) // true
        this.reading = false // 报错 只读属性无法修改
    }
    static create(name: string, age: number) {
        return new Students(name, age)
    }
}
// 使用静态方法创建子类
const jerry = Students.create('jerry', 15) // true
```
### 类与接口
+ 不同的类之间可能实现了相同的接口
+ 将类拆分，使类实现了多个接口
+ class使用implements来添加接口，若有多个接口则用逗号隔开
```Typescript
export {} // 确保跟其它示例没有成员冲突

// 将类拆分，使类实现了多个接口
// class使用implements来添加接口，若有多个接口则用逗号隔开
interface Eat {
  eat (food: string): void
}

interface Run {
  run (distance: number): void
}

class Person implements Eat, Run {
  eat (food: string): void {
    console.log(`用筷子: ${food}`)
  }

  run (distance: number) {
    console.log(`直立行走: ${distance}`)
  }
}

class Animal implements Eat, Run {
  eat (food: string): void {
    console.log(`直接咬: ${food}`)
  }

  run (distance: number) {
    console.log(`爬行: ${distance}`)
  }
}
```
### 抽象类
##### 泛指各类中都拥有的成员部分
+ 使用abstract将类定义为抽象类，定义在class前
+ 该类无法被new创建，只能被子类继承
+ 抽象类内部也能使用abstract定义抽象方法，该方法必须在子类中有定义，否则会报错
```Typescript
export {} // 确保跟其它示例没有成员冲突

// abstract将类定义为抽象类，定义在class前
abstract class Animal {
  eat (food: string): void {
    console.log(`直接吃: ${food}`)
  }
  // abstract要求子类中必须带有这个属性
  abstract run (distance: number): void 
}

class Dog extends Animal {
  run(distance: number): void {
    console.log('四脚爬行', distance)
  }

}

const dog = new Dog()
dog.run(100)   // 四脚爬行 100
dog.cat('狗粮') // 直接吃：狗粮
```
### 泛型 Generics
##### 在函数声明时不指定类型，在函数调用时再指定类型，目的：极大程度的复用代码
##### 在定义时不能明确的类型变为参数在函数调用时传入
```Typescript
export {} // 确保跟其它示例没有成员冲突

function create<T> (lenth: number, value: T): T[] {
    const arr = Array<T>(length).fill(value)
    return arr
}
const arr1 = create(3,1)     // [1, 1, 1]
const arr2 = create(2,'num') // ['num', 'num']
```
### 类型声明
+ 在Typescript中引入第三方模块，但这个模块中不包含对应的类型声明模块，可以尝试安装对应的类型声明模块，这个模块一般都叫@types/模块名
+ 如果没有对应的类型声明模块，则可以使用 declare function 函数名 (参数名: 类型): 类型 来自定义模块类型
```Typescript
export {} // 确保跟其它示例没有成员冲突

import { camelCase } from 'lodash' //  引入模块但没定义函数内类型

// 使用 declare function 函数名 (参数名: 类型): 类型来自定义模块类型
declare function camelCase (input: string): string

const res = camelCase('hello typed')
```