什么是策略模式
我们为了实现一个目的，也许会根据自己条件的变化，去动态的选择不一样的实现方式
打个比方，我想去北京旅游，同样是为了去北京，钱多的时候，我可能选择坐飞机，钱少的时候我可能选择做火车
财富自由，时间充足的时候，我会选择踩单车，慢慢的踩过去，边踩边慢慢感受一路上的人文风景

再打个比方，为员工发年终奖，多劳多得嘛，产出高，绩效就高
绩效A的，年终奖也许是月薪*4
绩效B的，年终奖也许是月薪*3
绩效C的，年终奖也许是月薪*2
也许再根据各种的绩效等级发放一下大大小小的奖励

你会看到，都是非常日常的例子
为了去北京，基于钱的多少，我们会选择不一样的出行方式
为了去发年终奖，基于绩效的等级，我们会选择不一样的结算方式
目的一致，条件动态，实现方式也同样动态

这个时候，我们也许就需要用到策略模式

所谓策略模式，就是将一系列为了解决同一问题的不同解决方法，集合起来管理，当我们的条件变化时，能更好的根据当前的条件去，触发对应的解决方法

::: tip
理论说的太多，且看起来让人望而却步，但策略模式在JavaScript中也许是最简单的设计模式，没有之一，简单到几乎所有人都在不知不觉中使用过它
:::

现在让我们用寻常的代码来实现上面的"发奖金"的例子

```javascript
const getBonus = (level,salary) => {
    if(level === 'a'){
        return salary * 4
    }
    if(level === 'b'){
        return salary * 3
    }
    if(level === 'c'){
        return salary * 2
    }
}
console.log(getBonus('a', 100)); // 400
```

可以看到，代码已完全切合需求
但~问题还是多多的

问题一: if else 分支太多，目前逻辑简单确实没有优化的必要，但以后随着业务的发展，可能会有十个或者二十个分支，每个分支可能会有三十或者五十行代码，届时getBonus函数可能会变得十分臃肿难以维护与阅读

问题二: 弹性差，如果我现在新增一个绩效等级"D"，我必须直接改变getBonus函数里的内部实现，这违法了开发-封闭原则

问题三: 如果其他地方需要用到绩效Level==='a'时的计算逻辑，那它只能将对应的代码复制过去，这样做，逻辑的通用性就会下降，维护成本会提高许多，以后如果level—a的绩效计算逻辑改变，我们就需要改变两个以上的地方，其潜在风险可想而知，一旦我们漏改了一个，bug就来了

所以现在，我们可以用策略模式，解决上面一部分的问题

回顾一下 策略模式的定义

所谓策略模式，就是将一系列为了解决同一问题的不同解决方法，集合起来管理，当我们的条件变化时，能更好的根据当前的条件去，触发对应的解决方法

所以我们有了以下的这个对象
```javascript
const bonusComputerMap = {
    'a': salary => salary*4,
    'b': salary => salary*3,
    'c': salary => salary*2,
}
```
接下来关于问题一和问题二的解决就可以说是水到渠成了
```javascript
const bonusComputerMap = {
    'a': salary => salary*4,
    'b': salary => salary*3,
    'c': salary => salary*2,
    'd': salary => salary*1, // 可以方便的加上d绩效的计算方案
}
const getBonus = (level,salary) => bonusComputerMap[level](salary);
```
可以看到，应用了策略模式之后，if-else语言被消除了，代码简洁度，易读性，可维护性大大整强，新增方案也不再需要修改getBonus函数的内部实现，一切都变得更加完美
这就是策略模式在JavaScript里的基本实现，虽然是很常见简单的代码
但是其设计思想非常有内涵，解决的问题也并不肤浅
从大而远的视角出发，一个健壮的系统，或程序的设计，必然是绕不过这个小小的简单的"策略模式"~
所以请认真的去理解它的存在意义，并实际地应用好它

最后~关于问题三的解决方案，其实并不在本章节的讨论范围之中，但是解决起来也很简单~
```javascript
export const bonusComputerA = salary => salary*4; // 在你想用的地方引入它
export const bonusComputerB = salary => salary*3; // 在你想用的地方引入它
export const bonusComputerC = salary => salary*2; // 在你想用的地方引入它
export const bonusComputerD = salary => salary*1; // 在你想用的地方引入它
const bonusComputerMap = {
    'a': bonusComputerA,
    'b': bonusComputerB,
    'c': bonusComputerC,
    'd': bonusComputerD, // 可以方便的加上d绩效的计算方案
}
const getBonus = (level,salary) => bonusComputerMap[level](salary);
```
解决了~
或许..这就是所谓的函数式编程吧..






