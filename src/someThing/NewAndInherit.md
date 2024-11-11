# 创建与继承

## 关键字 New

JavaScript 的继承，是基于一等公民函数及其原型链的，所以 JavaScript 的继承，也有区别与其他语言
而 new 关键字作为继承的一种实现，它的实现原理也值得我们去探究
:::tips
为什么说 new 是继承的一种实现，你可以将它看成是创建了一个空对象去继承你想要 new 的目标对象
:::
而正如我所说，JavaScript 的继承，是基于一等公民函数及其原型链的
所以我们继承`(或者说New)`的目标也很简单

- 创建一个空对象继承目标函数的原型链
- 还是上述创建的空对象，用于继承目标函数本身的属性
- 继承完毕后，返回这个对象

话不多说，实现代码如下

```js
const TheNew = (target, ...args){
    // 创建一个空对象，继承构造函数的原型链
    let obj = Object.create(target.prototype);
    // 使用Call函数，让空对象继承构造函数的实例属性
    let result = target.call(obj, ...args);
    // new函数必须返回一个对象，但有时候构造函数的执行结果并不是返回一个对象，因此要判断一下
    return instanceof Object ? result : obj;
}

// 使用示例
function Car(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
}

var myCar = TheNew(Car, 'Toyota', 'Corolla', 2005);
console.log(myCar.make);  // 输出：'Toyota'
```

## 关于JavaScript继承

其实经过上述的对New关键字的拆解

我们要了解JavaScript继承就能简单很多

如果说new关键字的本质，是新增了一个空对象去继承目标构造函数的实例属性和原型链

那么JavaScript继承，也不过是新建了一个不是空的对象去继承目标构造函数的实例属性和原型链而已

JavaScript的继承实现有很多`(如下所列)`

- 原型链继承：这是最简单的继承方式，基于原型链的查找机制来实现继承。子类的原型对象是父类的一个实例

- 借用构造函数继承：在子类构造函数中通过调用父类构造函数的方式实现继承，可以实现多个实例之间的属性隔离，但是不能继承原型上的属性和方法

- 组合继承：组合使用原型链和借用构造函数的方式，能够继承父类的属性和方法，同时保持实例之间的属性隔离

- 原型式继承：通过创建一个临时的构造函数来包含一个对象，然后返回这个构造函数的一个新实例，从而实现通过原型继承和复制属性的目标对象

- 寄生式继承：创建一个仅用于封装继承过程的函数，该函数在内部会以某种方式来增强对象，然后返回这个对象

- 寄生组合式继承：集原型链继承和借用构造函数继承之长，是 JavaScript 中最理想的继承方式

但以上所列的那么多种方式，我都不想全部展开讨论，目前只讨论最后一种，也是最优的一种方案，同时它也是我们class关键字的本质

## 寄生式组合继承

寄生组合式继承是引用类型最理想的继承范式

其代码实现如下

```js
function inheritPrototype(subType, superType) {
    var prototype = Object.create(superType.prototype); // 创建对象
    prototype.constructor = subType;                    // 增强对象
    subType.prototype = prototype;                      // 指定对象
}

function SuperType(name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}

SuperType.prototype.sayName = function() {
    console.log(this.name);
};

function SubType(name, age) {
    SuperType.call(this, name); // 第二次调用 SuperType()
    this.age = age;
}

inheritPrototype(SubType, SuperType);

SubType.prototype.sayAge = function() {
    console.log(this.age);
};

var instance = new SubType('Nicholas', 29);
instance.sayName(); // "Nicholas"
instance.sayAge();  // 29
```