// 类（Class）

export {} // 确保跟其它示例没有成员冲突

class Person {
  // Typescript中参数的类型必须要初始化或类型注解，否则会报错
  name: string // = 'init name'
  age: number
  
  constructor (name: string, age: number) {
    this.name = name
    this.age = age
  }

  sayHi (msg: string): void {
    console.log(`I am ${this.name}, ${msg}`)
  }
}