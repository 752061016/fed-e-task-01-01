// Proxy 对象

const person = {
  name: 'zce',
  age: 20
}

const personProxy = new Proxy(person, {
  // 监视属性读取
  get (target, property) {
    // 若是有该属性则返回，若无则返回'default'
    return property in target ? target[property] : 'default'
    // console.log(target, property)
    // return 100
  },
  // 监视属性设置
  set (target, property, value) {
    // 设置条件，age属性只能改成数字值
    if (property === 'age') {
      if (!Number.isInteger(value)) {
        throw new TypeError(`${value} is not an int`)
      }
    }

    target[property] = value // 修改对应的值
    // console.log(target, property, value)
  }
})

personProxy.age = 100

personProxy.gender = true

console.log(personProxy.name) // zce
console.log(personProxy.xxx)  // defult

// Proxy 对比 Object.defineProperty()

// 优势1：Proxy 可以监视读写以外的操作

const person = {
  name: 'zce',
  age: 20
}

const personProxy = new Proxy(person, {
  // 监听删除操作
  deleteProperty (target, property) {
    console.log('delete', property)
    delete target[property]
  }
})

delete personProxy.age 
console.log(person) // {name: "zce"}

// 优势2：Proxy 可以很方便的监视数组操作

const list = []

const listProxy = new Proxy(list, {
  set (target, property, value) {
    console.log('set', property, value)
    target[property] = value
    return true // 表示设置成功
  }
})

// 数组中增删时会一同改变数组的长度
listProxy.push(100) // set 0 100 set length 1
listProxy.push(100) // set 1 100

// 优势3：Proxy 不需要侵入对象 Object.defineProperty()需要遍历地为每个成员添加方法

const person = {}

Object.defineProperty(person, 'name', {
  get () {
    console.log('name 被访问')
    return person._name
  },
  set (value) {
    console.log('name 被设置')
    person._name = value
  }
})
Object.defineProperty(person, 'age', {
  get () {
    console.log('age 被访问')
    return person._age
  },
  set (value) {
    console.log('age 被设置')
    person._age = value
  }
})

person.name = 'jack' // name 被设置

console.log(person.name) // name 被访问 , jack

// Proxy 方式更为合理
const person2 = {
  name: 'zce',
  age: 20
}

const personProxy = new Proxy(person2, {
  get (target, property) {
    console.log('get', property)
    return target[property]
  },
  set (target, property, value) {
    console.log('set', property, value)
    target[property] = value
  }
})

personProxy.name = 'jack' // set name jack

console.log(personProxy.name) // get name , jack