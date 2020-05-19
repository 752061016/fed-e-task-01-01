// 类型声明
// 在Typescript中引入第三方模块，但这个模块中不包含对应的类型声明模块
// 可以尝试安装对应的类型声明模块，这个模块一般都叫@types/模块名
// 如果没有对应的类型声明模块
// 则可以使用 declare function 函数名 (参数名: 类型): 类型 来自定义模块类型

import { camelCase } from 'lodash' //  引入模块但没定义函数内类型

// 使用 declare function 函数名 (参数名: 类型): 类型来自定义模块类型
declare function camelCase (input: string): string

const res = camelCase('hello typed')






















export {} // 确保跟其它示例没有成员冲突
