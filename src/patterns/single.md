# 单例模式

::: tip
很多事情，你只需要做一次，很多东西，拥有一个也足够了<br/>
多出来的事物，对我们来说，或者只是负担，是消耗，是冗余，是混乱..<br/>
生活哲学是如此，在编程的世界里也同样是如此..<br/>
所以..单例模式应运而生~
:::

## 单例的简单实现

所谓单例，指的当然是独一无二的实例<br/>
就是说，无论我实例化一个类多少万千次，最终返回的结果都应该是第一次实例化时的第一个实例<br/>
将这个概念从理论化为实现也简单<br/>
我们将第一次实例化时，产出的实例用一个常量存起来，待到第二次或者以后无数次实例化的时候，我们就可以直接将常量里面的实例直接返回出去<br/>
因此，往后每次实例化，其实在根本上都只是返回第一次实例的对象，也不会再有实例化的过程，和新的实例产出<br/>
真正做到了在空间和时间上节流<br/>
原理简单粗暴，请看下面的例子

```javascript
function singleClass(name, age) {
  this.name = name；
  this.age = age；
}；
singleClass.instance = null；
singleClass.getInstance = function (name, age) {
  if (!singleClass.instance) {
    singleClass.instance = new singleClass(name, age)；
    return singleClass.instance；
  }；
  return singleClass.instance；
}；

const a = singleClass.getInstance('s', 12)；
const b = singleClass.getInstance('w', 14)；
console.log(a === b)；
console.log(b)； // singleClass {name: 's', age: 12}
```

你会发现 a 和 b 是相等的，我们的目的已经达到了<br/>
可是上面这一段程序并不完美，可以说是问题多多..

#### 问题如下:

1. 使用成本很高，我必须要了解它的源码后才能知道要如何使用它，否则我根本不知道它是一个单例模式<br/>
2. 其次，我们还要通过 getInstance 方法去实例化才能实现单例的效果，但一些不明所以的用户也许并不知道有 getInstance 的存在，当他们选择直接用 new 关键字去实例化 singleClass 时，就会出现很多不稳定的因素，导致出现我们难以查明的"bug"<br/>

所以，综合上面的需求，我们需要去创建一个更"透明"的能实现单例模式需求的类

## "透明"的单例

"透明"的这个形容词，是曾探老师提出来的，也许对各位来讲还是太过抽象~<br/>
所谓"透明"，就是让被装饰过的函数，看起来或者是用起来...和被修饰前的函数别无大致，就像是穿上了一件透明的衣服一般<br/>
上面的例子就不够透明，singleClass 类，需要通过调用 getInstance 方法才能实现单例功能<br/>
我们希望把这个不好的地方给优化掉，直接使用 new singleClass() 即可实现单例功能<br/>

```javascript
const singleClass = (function () {
  let instance = null;
  function targetClass(name, age) {
    if (instance) {
      return instance;
    }
    this.name = name;
    this.age = age;
    instance = this;
    return instance;
  }
  return targetClass;
})();
const a = new singleClass('s', 12);
const b = new singleClass('w', 14);
console.log(a); // targetClass {name: 's', age: 12}
console.log(b); // targetClass {name: 's', age: 12} 返回了第一次实例化的对象
console.log(a === b); // true
```
可以看到，通过闭包去缓存已创建的实例，并返回创建实例的函数，能够让我们在实现单例功能的同时，也保证了函数的透明化<br/>
但目前这个程序依然不完美<br/>
因为创建实例和实现单例这两个功能紧紧的耦合在一个只执行函数里<br/>
假设以后需求有变化，我们需要在另外一个业务场景里，创建很多个不是"单例"的实例<br/>
我们就不得不将同一段创造实例的逻辑再在别的地方再拷贝一次<br/>
所以，将"创造实例的逻辑"和"创建单例的逻辑"解耦是大势所趋，势在必得<br/>

## 通过代理实现"单例"
其实观察上面两段代码<br/>
我们会发现，创建单例的核心逻辑无非就是:<br/>
```javascript
  // ...
  if(instance) {
    return instance;
  }
  return instance = xxx;
  // ...
```
那么，是否就可以，将"创建单例的逻辑"编写成一个代理类呢?<br/>
话不多说,直接上代码:
```javascript
function singleClass(name, age) {
  this.name = name;
  this.age = age;
};
const proxySingleClass = (function(){
    let instance = null;
    return function(name, age){
        if(instance) {
            return instance;
        }
        return instance = new singleClass(name, age);
    }
})()

const a = proxySingleClass('s', 12); // targetClass {name: 's', age: 12}
const b = proxySingleClass('w', 14); // targetClass {name: 's', age: 12} 返回了第一次实例化的对象
console.log(a === b); // true

const c = new singleClass('s', 15); // targetClass {name: 's', age: 15}
```
可以看到，singleClass函数已经被解耦出来，可独立出来为其他业务场景服务<br/>
目前看来，一切都好，但依然还有很多改进的空间<br/>
因为"创建单例的逻辑"在这种模式下，依然还和singleClass耦合着(只为singleClass服务着)<br/>
而我们业务上可能有无数个需要创建单例的场景<br/>
有没有可能将"创建单例的逻辑"也解耦出来为其他场景服务呢

## 通用的"单例"代理(重点)
其实聪明的同学也许已经发现，我们只需要将下面这个个常量改成变量即可...
```javascript
/**
 * @see singleClass 就是这个常量
 **/
return instance = new singleClass(name, age);
```
改动如下，直接上代码吧:
```javascript
const proxySingleClass = function (fn) {
  let instance = null;
  return function () {
    if (instance) {
      return instance;
    }
    return (instance = fn.apply(this, arguments));
  };
};

function singleClass(name, age) {
  this.name = name;
  this.age = age;
}

const toGetSingleClass = proxySingleClass((name, age) => new singleClass(name, age));

const a = toGetSingleClass('w', 12);
const b = toGetSingleClass('s', 14);
console.log(a === b); // true

const c = new singleClass('s', 15); // targetClass {name: 's', age: 15}
```
我们会发现 proxySingleClass 和 new singleClass 两个功能已经完全解耦了出来<br/>
proxySingleClass可以为其他任何需要创建单例的场景服务<br/>
完全满足了"通用的需求"

## 单例场景的应用场景

其实应该是有很多地方的，比较一个大而整的程序，应该是会有很多独一无二的模块，或者说有可以很多业务都复用同一个模块的场景<br/>
但我一时之间也都说不上来，可能我也应用的有点少吧<br/>
但经过一番头脑风暴后，还是列出了如下大致的应用场景:

1. 其实关注我们日常用到的JavaScript语言，你会发现JavaScript里的window和document就是独一无二的单例，它们身上挂着无数多的方法，那么如果我们以后有一个公共的方法库，它对于全局也应该是独一无二的单例，虽然单例化的行为，在我们export的时候，JavaScript内置的方法就能帮我们处理。
2. 我们所有应用到的状态管理器(如:redux,vuex)，我们存取数据，其实都是在向同一个状态管理实例发送请求
3. 和redux，vuex同理，我们日常用到的很多JavaScript的api对象，如localStorage也是一个单例
4. 借鉴localStorage，我们项目中很多公共api也应该是单例，如请求队列Api(就是存放请求的一个队列，发出请求时放入队列，请求完成时推出队列，如遇到特殊情况像是断网，请求token过期，我们可以在修复异常状态后，根据现有的请求队列，按顺序重新发出请求)
5. 如很多全局应该是唯一的业务模块，像是的购物车模块，登录模块等等