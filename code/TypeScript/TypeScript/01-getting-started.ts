// 可以完全按照 JavaScript 标准语法编写代码 最后会编译成js文件

const hello = (name: any) =>  {
  console.log(`Hello, ${name}`)
}

hello('TypeScript') // Hello, TypeScript

// 编译后
const hello = function (name) {
  console.log("Hello, " + name);
}

hello('TypeScript')
