// 函数类型 一般是对函数的输入(参数)输出(返回值)进行类型限制

export {} // 确保跟其它示例没有成员冲突

function func1 (a: number, b: number = 10, ...rest: number[]): string {
  return 'func1'
}

func1(100, 200)

func1(100) // ==> func1(100,10)

func1(100, 200, 300)

// 使用函数表达式，因为函数最终放入变量，所以这个变量也是有类型的，该变量的类型定义可以用类似箭头函数的方法为其定义
const func2: (a: number, b: number) => string = function (a: number, b: number): string {
  return 'func2'
}
