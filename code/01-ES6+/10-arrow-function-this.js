// 箭头函数与 this
// 箭头函数不会改变 this 指向
const person = {
  name: 'tom',
  sayHi1: function () {
    console.log(this.name)
  },
  sayHi2: () => {
    console.log(this.name)
  },
  sayHiAsync: function () {
    console.log(this.name)
    setTimeout(() => {
      console.log(this.name)
    }, 1000)
  }
}
person.sayHi1()  // tom
person.sayHi2()  // ''
person.sayHiAsync() //tom tom
