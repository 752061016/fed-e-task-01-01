# fed-e-task-01-01
![Pandao editor.md](./image/01.jpg "Pandao editor.md")
### 10
在a[6]()运行前for循环就执行完毕了，但因为在for中定义的是全局变量，所以所有的方法都是打印同一个变量i，在循环结束后变为10，所以不管数组内哪个元素打印的都是10

![Pandao editor.md](./image/02.jpg "Pandao editor.md")
### 报错 未初始化
if的{}内算块级作用域，在内部使用let块级作用域定义了 tmp ，块级作用域不会变量提升，所以在访问时还未定义

![Pandao editor.md](./image/03.jpg "Pandao editor.md")
```javascript
var arr = [12, 34, 32, 89, 4]
console.log(Math.min(...arr))
```
![Pandao editor.md](./image/04.jpg "Pandao editor.md")
##### var 全局作用域，会变量提升，定义的值和类型都可以被修改，块内部定义的变量能被外部访问
##### let 块级作用域，不会变量提升，定义的值和类型都可以被修改，块内部定义的变量不能被外部访问
##### const 块级作用域，不会变量提升，不允许声明过后又重新指向一个新的内存地址，但能修改属性成员，块内部定义的变量不能被外部访问
![Pandao editor.md](./image/05.jpg "Pandao editor.md")
### 20
因为fn的调用者是obj，所以fn内部的this指向为obj，fn内部调用setTimeout(),但因为使用的是箭头函数，this的指向不会发生改变，所以还是this还是指向obj，打印obj.a，输出20
![Pandao editor.md](./image/06.jpg "Pandao editor.md")
![Pandao editor.md](./image/07.jpg "Pandao editor.md")
![Pandao editor.md](./image/08.jpg "Pandao editor.md")
![Pandao editor.md](./image/09.jpg "Pandao editor.md")
![Pandao editor.md](./image/10.jpg "Pandao editor.md")
![Pandao editor.md](./image/11.jpg "Pandao editor.md")
