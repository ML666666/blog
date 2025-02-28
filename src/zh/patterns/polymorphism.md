# 什么是多态思想

::: tip 前言
作为一名前端，要理解这些面向对象的概念真的十分不容易，简直是呼吸困难，甚至在刚接触的时候，常常怀疑人生，觉得是否真的需要学习这些知识，现在回想当初，深刻的了解到无知带来的短视和盲目是多么的可怕。<br/>
一句话总结：多态思想对于前端开发或者 Javascript 开发意义非凡，虽然目前为止你还没有接触过它，或者来说它对于你还是太隐晦难懂，但也请耐下心来，好好去感受它的思想。
:::

## 什么是多态/多态的概念

**多态：按字面意思，它指的是一个对象，但它可能有多种形态，但这些形态都是“同一类型”的，所以我们向这个对象，发出一个命令，它就可能有多种反馈**<br/>
怎么样才算是<b>“同一类型”</b>呢？<br/>
在 Java 中<b>“同一类型”</b>，指的是继承了相同抽象类的子类，如<br/>

```java
Class Duck extend Animal...
Class Pig extend Animal...
```

那么此时，<b>Class Duck</b>和<b>Class Pig</b>就是<b>“同一类型”</b>的，他们拥有同一个父类，如果父类有一个 sound 方法，那么 Duck/Pig 同样需要实现一个 sound 方法，虽然这个 sound 方法的具体实现并不一定一致。<br/>
但是在 JavaScript 中，并没有类或者说抽象类这一个说法~<br/>
那我们要如何表明两个不同名字的 对象 是<b>“同一类型”</b>呢。

这个时候，我们就要引入一个新的概念：<b>“鸭子”类型</b>

### “鸭子”类型

在静态类型里，我们判断一个类是不是“鸭子”，我们只需要判断它是否继承于“鸭子”的抽象类，这个类定义了鸭子的应该有的行为。<br/>
对于一个动态类型来说，如何才能判断一只"鸭子"是一只鸭子呢，我知道你们有很多答案，但其实很多时候，答案并没有这么复杂。<br/>
请看例子：

```javascript
//我是鸭子
let duck = funtion(){
    this.fly = funtion(){ console.log('i can fly')};
    this.sound = funtion(){ console.log('嘎嘎嘎')};
};
//我是猪
let pig = funtion(){
    this.eat = funtion(){ console.log('i can eat too')};
    this.fly = funtion(){ console.log('i can fly too')};
    this.sound = funtion(){ console.log('哞~')};
};
```

可以看到，鸭子身上有 sound/fly 方法，猪身上有 eat/sound/fly 方法。<br/>
那么"猪"算不算是一只鸭子呢？<br/>
答案是，算的，猪仔拥有鸭子的一切，能游泳，能飞翔，那么在动态语言类型系统(指 JavaScript)看来，它就是一种“鸭子”，pig 和 duck 在这里是就是<b>“同一类型”</b>。<br/>

---

ok~ 了解完如何去区分判断两个对象是否<b>“同一类型”</b>后，我接着回顾一下多态的简单定义。<br/>

<div class='custom-container tip'>多态：按字面意思，它指的是一个对象，但它可能有多种形态，但这些形态都是“同一类型”的，所以我们向这个对象，发出一个命令，它就可能有多种反馈**</div><br/>
请看例子：

```javascript
function MakeSound(animal: Animal) {
  animal.sound()
}
MakeSound(duck) //嘎嘎嘎
MakeSound(pig) //哞~
```
animal对象，在这里指的就是多态定义里的 可能有多种形态，但这些形态都是“同一类型”的 对象，它可能是duck，又或者是pig，也或者是其他生物。<br/>

我们会发现，就函数内部来看，MakeSound 向 animal 对象发出一个命令，然后得到的是完全截然不同的结果，这其实就已经蕴涵了多态的思想了。<br/>

## 多态的使用/实现

老实说，如果有人看到这篇文章的话，目前为止，他应该是和我当年一样的感觉。<br/>
就是一脸懵逼..<br/>
就这种简单逻辑需要写这么多东西吗？<br/>
这究竟是什么玩意，就这？？<br/>
它的存在究竟解决了什么问题？？<br/>
它存在的意义就是侮辱我的智商吗？<br/>
我直接把桌子掀了，并重新把代码写了一遍~<br/>

```javascript
funtion MakeSound(type){
    if(type === 'Duck'){
        console.log('嘎嘎嘎');
    }
    if(type === 'Pig'){
        console.log('哞~');
    }
};

MakeSound('Duck'); // 嘎嘎嘎
MakeSound('Pig'); // 哞~
```

看到没有，代码简洁易懂，逻辑清晰，一个方法就搞定，猪能发出猪叫声，鸭也能发出鸭叫声<br/>
多态？<br/>
什么玩意啊..<br/>
先别着急，情况总是多变的，我们这个时候需求有更改，我们希望听到更多的动物的声音，我们希望在<b class="heightLight">A 页面</b>里调用 MakeSound('man')时，可以发出 yes 的声音<br/>
那很简单，我们只需要稍加修改 MakeSound 的内部实现

```javascript
funtion MakeSound(type){
    if(type === 'Duck'){
        console.log('嘎嘎嘎');
    }
    if(type === 'Pig'){
        console.log('哞~');
    }
    if(type === 'man'){
        console.log('yes~');
    }
};
MakeSound('man'); // yes~
```

需求顺利解决，完成任务！<br/>
慢着！！天有不测之风云啊~<br/>
这个时候，需求又有变，产品希望在<b class="heightLight">B 页面</b>里调用<b class='heightLightContent'>MakeSound(<b class="heightLight">'man'</b>)</b>时，能发出<b class="heightLight">"No~"。</b>的声音.. <br/>
你觉得很崩溃..我相信很多人也都崩溃过.. <br/>
这个时候，为了赶着下班，我想很多人都会这样写...

```javascript
funtion MakeSound(type, page = 'A'){
    if(type === 'Duck'){
        console.log('嘎嘎嘎');
    }
    if(type === 'Pig'){
        console.log('哞~');
    }
    if(type === 'man'){
        if(page === 'A'){
            console.log('yes~');
            return;
        }
        console.log('no~');
    }
};
MakeSound('man','B'); // no~
```

问题毫无疑问又解决了，你也可以顺利准时下班..<br/>
但是，这时候，你也隐隐的发现了有些不对劲的地方。<br/>
随着业务的整多，<b class='heightLightContent'>MakeSound</b>函数会愈发的庞大，且难以维护，各种 if 条件分支语句错综复杂，层层嵌套，而且改动的不好，还可能会影响其他用到这个方法的地方，已至于出现 bug...<br/>
目前看来，一座屎山已具雏形，我有十足的把握，再经手几人，产品再改几次需求，业务再迭代一会。<br/>
它毫无疑问就能成为一座合格的足够熏死所有人的屎山...<br/>

---

于是乎~你开始思考，如何才能做的更好，你发现<b class='heightLightContent'>MakeSound</b>的功能不再单一，所有发出声音的逻辑都耦合在一个地方，哪怕我只需要在 A 页面发出<b class="heightLight">"Yes~"，</b>我也要去维护其他动物发声的逻辑。<br/>
这个时候，多态的概念在你脑海中浮现..<br/>

### 使用多态思维去重构

让我们回顾一下代码...

```javascript
if (type === 'Duck') {
  console.log('嘎嘎嘎') //发出特定声音
}
if (type === 'Pig') {
  console.log('哞~') //发出具体声音
}
if (type === 'man') {
  console.log('yes~') //发出特定声音
}
```

你会发现，每一个 if 语句，它的功能都是发出特定的声音，如果我们把他们转换成特定的类的话，那么结合我们上面所诠释的“鸭子”类型。<br/>
这些特定的类，就是“同一类型”对象...<br/>
如下图:

```javascript
let Duck = {
    sound:()=>console.log('嘎嘎嘎'); //发出特定声音
}
let Pig = {
    sound:()=>console.log('哞~'); //发出特定声音
}
let Man = {
    sound:()=>console.log('yes~'); //发出特定声音
}
```

**多态：按字面意思，它指的是一个对象，但它可能有多种形态，但这些形态都是“同一类型”的，所以我们向这个对象，发出一个命令，它就可能有多种反馈**<br/>
这个时候，我们按上面的意思去改造一下<b class='heightLightContent'>MakeSound</b>方法，我在这个方法里面要写入一个对象，<b class='heightLightContent'>但它可能有多种形态，但这些形态都是“同一类型”的</b><br/>
所以它可能是 Pig/Duck/Man 或者是任意有 sound 方法的对象。<br/>
然后我向这个对象发出一个<b class='heightLightContent'>sound</b>指令。
这里我用 ts 表达一下:

```typescript
interface Animal{
    sound:()=>void
}
let Duck:Animal = {
    sound:()=>console.log('嘎嘎嘎'); //发出特定声音
}
let Pig:Animal = {
    sound:()=>console.log('哞~'); //发出特定声音
}
let Man:Animal = {
    sound:()=>console.log('yes~'); //发出特定声音
}
function MakeSound(animal:Animal){
    animal.sound();
};

MakeSound(Duck); //嘎嘎嘎
MakeSound(Pig); //哞~
MakeSound(Man); //yes~
```
emm~重构完成后，你发现自己写的代码和上面那段自己一开始并不了解的代码“十分相似”..<br/>
你也似乎能理解到它的用心良苦..<br/>
毕竟功能同样可以实现，主函数也干净整洁了许多，感觉并不会成为屎山了~<br/>
但也许还有很多同学在疑惑，我们为什么不直接调用具体的对象的 sound 方法呢？<br/>
上面的例子只是一个用于举例的简单例子，实际开发中，MakeSound 可能有庞大的业务逻辑...<br/>
animal.sound()只是他逻辑里的一部分...

```typescript
function MakeSound(animal: Animal) {
  /**
   * 假设这里有庞大的逻辑
   * 如~调接口
   * 如~计算
   **/
  animal.sound()
  /**
   * 假设这里有庞大的逻辑
   * 如~调接口
   * 如~计算
   **/
}
```

执行 animal.sound()的前后也可能有巨多的逻辑...

### 多态的意义/多态解决了什么问题

代码写到这里，我相信很多同学都能看出来多态解决了什么问题~<br/>
对比重构前后的代码，我们会发现:<br/>

#### 1.让主函数职责更清晰

对比重构前后的代码我们可以看到:<br/>
主函数里的 if 语句都被消除了，逻辑更清晰，我们只负责发出 sound 的指令，并不需要理会，谁要发出声音，会发出了什么声音。<br/>
这种改进更符合 五大设计原则 里的单一职责原则。

#### 2.能大量减少对主函数的修改

主函数里，发出"声音"的逻辑被解耦了，由独立具体的类负责，我们想发出不同的“声音”，不再需要修改主函数里内部的实现，只需要，新增或修改外部的 animal 类，这样做风险/成本/影响更小，更符合 五大设计原则 里的开闭原则。<br/>
对比重构前后的代码<br/>
回顾需求，我们需要在 B 页面里，让 man 发出"no~"的声音:

```javascript
funtion MakeSound(type, page = 'A'){
    if(type === 'Duck'){
        console.log('嘎嘎嘎');
    }
    if(type === 'Pig'){
        console.log('哞~');
    }
    if(type === 'man'){
        if(page === 'A'){
            console.log('yes~');
            return;
        }
        console.log('no~'); //我们需要修改主函数MakeSound里的代码，增加许多判断和入参或逻辑
    }
};
MakeSound('man','B'); // no~
```

基于多态思想重构后，我们只需要:

```typescript
// B页面
let Man = {
    sound:()=>console.log('no~'); //发出特定声音
}
function MakeSound(animal){
    animal.sound();
};
MakeSound(Man); //no~
```

不需要新增参数，不需新增 if 语句，不用对主函数进行一个修改，对内封闭，对外开放，符合思想，十分完美。

#### 3.多态思想更抽象的意义(重要)

其实在学习一种思想的时候，不应该去死记其在具体业务上的具体实现，而是要去思考，它背后的思想和目的。<br/>
而多态思想的最终目的，是将变化的部分和不变的部分，区分开来。<br/>
像上面的例子，MakeSound 要让目标发出声音，这个部分是不变的，但是什么目标要发出什么声音，这个部分，可以说它的变化是无穷无尽的，难度说要在 MakeSound 里面加无穷多个 if 语句吗？所以我们要把这一块变化的部分区分出去。<br/>
<b>将变化的部分和不变的部分，区分开来</b>，是多态思想的最终目的。<br/>
也是我们接下来要学习的大部分设计模式的目的。<br/>
更是我们所有设计模式的重要指导思想。<br/>
