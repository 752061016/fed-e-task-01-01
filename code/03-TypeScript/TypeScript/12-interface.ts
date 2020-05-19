// 接口

export {} // 确保跟其它示例没有成员冲突


interface Post {
  title: string
  content: string
}

// 参数必须带有title和content属性
function printPost (post: Post) {
  console.log(post.title)
  console.log(post.content)
}

printPost({
  title: 'Hello TypeScript',
  content: 'A javascript superset'
})



// 可选成员、只读成员、动态成员

interface Post {
  title: string
  content: string
  subtitle?: string // 可选成员
  readonly summary: string // 只读成员，无法修改
}

const hello: Post = {
  title: 'Hello TypeScript',
  content: 'A javascript superset',
  summary: 'A javascript'
}

// hello.summary = 'other'

// ----------------------------------

interface Cache {
  [prop: string]: string // 动态成员
}

const cache: Cache = {}

// 随意添加
cache.foo = 'value1'
cache.bar = 'value2'