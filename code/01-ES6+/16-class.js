// class 关键词

// 在Class之前使用构造函数配合原型对象来创建实例对象

// function Person (name) {
//   this.name = name
// }

// Person.prototype.say = function () {
//   console.log(this.name)
// }

class Person {
  constructor (name) {
    this.name = name
  }

  say () {
    console.log(this.name) 
  }
}

const p = new Person('tom')
p.say() // tom
