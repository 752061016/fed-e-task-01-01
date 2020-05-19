export {} // 确保跟其它示例没有成员冲突

class Person {
    public name: string // 公有成员  默认都是
    private age: number = 10 // 私有成员  只能内部使用
    protected  gender: boolean // 保护成员 只能子类使用 
    readonly reading: boolean // 只读成员 无法修改

    constructor (name: string, age: number) {
        this.name = name // 若未声明则会报错
        this.age = age
        this.gender = true
        this.reading = true
    }

    sayHi (): void {
        console.log(this.age)
    }
}

const tom = new Person('tom', 20)
console.log(tom.name) // tom
console.log(tom.age) // 报错
console.log(tom.sayHi()) // 20
console.log(tom.gender) // 报错

class Students extends Person {
    constructor (name: string, age: number) {
        super(name,age) // 创建父类实例
        console.log(this.gender) // 继承后能使用父类保护成员
        this.reading = false // 报错 只读属性无法修改
    }
    static create(name: string, age: number) {
        return new Students(name, age)
    }
}
// 使用静态方法创建子类
const jerry = Students.create('jerry', 15) // true