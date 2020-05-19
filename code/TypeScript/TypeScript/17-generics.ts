// 泛型 
// 在函数声明时不指定类型，在函数调用时再指定类型
// 目的：极大程度的复用代码

export {} // 确保跟其它示例没有成员冲突

function create<T> (lenth: number, value: T): T[] {
  const arr = Array<T>(length).fill(value)
  return arr
}
const arr1 = create(3,1)     // [1, 1, 1]
const arr2 = create(2,'num') // ['num', 'num']
