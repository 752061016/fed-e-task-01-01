// 强类型的优势

// 1. 强类型代码错误更早暴露,可以在编码阶段提前处理可能出现的类型异常

// 2. 强类型代码更智能，编码更准确，在编码阶段提示错误

function render (element) { // 若参数没有这两个属性则会报错
  element.className = 'container'
  element.innerHtml = 'hello world'
}


// 3. 重构更可靠

const util = {
  aaa: () => {
    console.log('util func')
  }
}


// 4. 减少了代码层面的不必要的类型判断，在函数中不需要先判断类型再开始执行

function sum (a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new TypeError('arguments must be a number')
  }

  return a + b
}
