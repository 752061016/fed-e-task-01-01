// 枚举（Enum）

export {} // 确保跟其它示例没有成员冲突

// js用对象模拟枚举
const PostStatus1 = {
  Draft: 0,
  Unpublished: 1,
  Published: 2
}

// ts
// 标准的数字枚举
enum PostStatus2 {
  Draft = 0,
  Unpublished = 1,
  Published = 2
}

// 数字枚举，枚举值自动基于前一个值自增
enum PostStatus3 {
  Draft = 6,
  Unpublished, // => 7
  Published // => 8
}

// 字符串枚举 字符串无法递增，必须每个值都有初始化的值
enum PostStatus4 {
  Draft = 'aaa',
  Unpublished = 'bbb',
  Published = 'ccc'
}

// 常量枚举，不会侵入编译结果
const enum PostStatus5 {
  Draft,
  Unpublished,
  Published
}

const post = {
  title: 'Hello TypeScript',
  content: 'TypeScript is a typed superset of JavaScript.',
  status: PostStatus5.Draft // 3 // 1 // 0
}

// PostStatus[0] // => Draft