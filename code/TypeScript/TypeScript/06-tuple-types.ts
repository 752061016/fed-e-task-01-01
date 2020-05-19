// 元组（Tuple）

export {} // 确保跟其它示例没有成员冲突

const tuple: [number, string] = [18, 'zce']

// const age = tuple[0]
// const name = tuple[1]

// 数组解构
const [age, name] = tuple // 18 zce


// 从函数多次返回相同类型的值
const entries: [string, number][] = Object.entries({
  foo: 123,
  bar: 456
})

const [key, value] = entries[0]
// key => foo, value => 123