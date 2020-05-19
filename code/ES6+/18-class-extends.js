// extends 继承
// ES2015之前大多使用原型方法来实现继承，ES2015则使用extends来实现继承，更方便，更清晰

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
    super(name) // super始终指向父类，调用super()就是调用父类的构造函数
    this.number = number
  }

  hello () {
    super.say() // 调用父类成员
    console.log(this.number)
  }
}

const s = new Student('jack', '100')
s.hello() // jack 100
