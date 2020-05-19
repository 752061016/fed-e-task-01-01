// 类与接口

export {} // 确保跟其它示例没有成员冲突

// 将类拆分，使类实现了多个接口
// class使用implements来添加接口，若有多个接口则用逗号隔开
interface Eat {
  eat (food: string): void
}

interface Run {
  run (distance: number): void
}

class Person implements Eat, Run {
  eat (food: string): void {
    console.log(`用筷子: ${food}`)
  }

  run (distance: number) {
    console.log(`直立行走: ${distance}`)
  }
}

class Animal implements Eat, Run {
  eat (food: string): void {
    console.log(`直接咬: ${food}`)
  }

  run (distance: number) {
    console.log(`爬行: ${distance}`)
  }
}
