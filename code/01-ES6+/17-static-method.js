// static 方法
// 静态方法：ES2015中新增添加静态成员的static关键词，调用静态方法：类.方法名()
class Person {
  constructor (name) {
    this.name = name
  }

  say () {
    console.log(this.name)
  }

  static create (name) {
    return new Person(name)
  }
}

const tom = Person.create('tom') // 相当于new Person('tom')
// 静态方法是挂载到类型上的
// 在静态方法内部的this是不会去指向某个实例对象，而是当前的类型，也就是当前Person类
tom.say() // tom
