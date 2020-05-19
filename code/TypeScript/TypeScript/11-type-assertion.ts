// 类型断言

export {} // 确保跟其它示例没有成员冲突

// 假定这个 nums 来自一个明确的接口
const nums = [110, 120, 119, 112]

const res = nums.find(i => i > 0)

// const square = res * res // 报错 res可能不存在

const num1 = res as number // 类型断言为number类型

const num2 = <number>res // JSX 下不能使用