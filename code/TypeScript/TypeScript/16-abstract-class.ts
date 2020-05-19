// 抽线类

export {} // 确保跟其它示例没有成员冲突

// abstract将类定义为抽象类，定义在class前
abstract class Animal {
  eat (food: string): void {
    console.log(`直接吃: ${food}`)
  }
  // abstract要求子类中必须带有这个属性
  abstract run (distance: number): void 
}

class Dog extends Animal {
  run(distance: number): void {
    console.log('四脚爬行', distance)
  }

}

const dog = new Dog()
dog.run(100)   // 四脚爬行 100
dog.cat('狗粮') // 直接吃：狗粮