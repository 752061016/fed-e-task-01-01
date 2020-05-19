// 任意类型（弱类型）

export {} // 确保跟其它示例没有成员冲突

function stringify (value: any) {
  return JSON.stringify(value)
}

stringify('string')

stringify(100)

stringify(true)

let foo: any = 'string'

foo = 100

foo.bar() // 运行时出错

// 因为Any类型在编译时不会有任意的类型检查，
// 在编译时不会发现类型错误信息，存在类型安全问题，所以轻易地不要使用这种类型