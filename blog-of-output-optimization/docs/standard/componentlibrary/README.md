# 组件库开发/使用/更新规范

## 一个组件库要有三个基本要求
**1. 要有一个属于自己的设计规范，设计风格要统一**<br/>
**2. 每个组件都应该要有足够强大的可扩展性，就是我们常说的可定制化程度要高**<br/>
**3. 每个组件应该有其对应的需求文档**
   
## 设计风格
### 正如一个程序有许多变量，一个设计也有许多变量
例如:外边距，内边距,圆角，字体大小，字体颜色，字体样式，字体行高，背景颜色等等..<br/>
所有的这些变量，在一个组件库里，都应该常量化，也就是我们常说的标准化<br/>
什么场景下应该用多少内边距，什么场景下应该用多大的fontSize和什么样的fontColor都应该统一<br/>
我们应该基于所有的这些"变量"的排列组合，来去生成一个丰富的，大而统一的组件库<br/>
反映到前端功能具体实现上，我们只需要使用市面上各种热门的CSS预处理语言，如Less，Scss等等<br/>
就能满足样式变量常量化的需求<br/>
我们可以新建一个less文件，如global.less，去声明所有常量，如下所示:
```less
//global.less
@primary-click: #d9800b;
@primary-color: #ffa21a;
@primary-hover: #ffba42;
@primary-special-1: #ffce6b;
@primary-disabled: #ffdf94;
@primary-special-2: #ffedbd;
@primary-light: #fff9e6;

.t1() {
    font-size: 12px;
    line-height: 20px;
}
.t2() {
    font-size: 14px;
    line-height: 22px;
}
```
然后再各个具体的组件库里自行使用和组合, 如下所示:
```less
//index.less
.k-upload-tips{
    margin-top: 8px;
    margin-bottom: 4px;
    color: @text-assist;
    .t1();
}
```
常量化的好处不言而喻，当我们需要改变某一个规范，如将普通文本的line-height/font-size重新规范为22px/14px<br/>
我们只需要修改global.less里的对应的常量，便可作用于全局

### 业务设计的统一
上面所说的是组件库设计的统一，那么业务设计指的是什么意思呢<br/>
业务，指的当然就是所有我们实际的业务模块了，说白了就是要上线的产品<br/>
这里其实很多人会混淆，业务的设计为什么要统一呢？<br/>
确实，业务的设计并不应该被组件的设计所绑架，大部分的业务场景都应该是按市场需求/甲方需求去定制，所以我们会要求所有组件都有足够多的可定制化空间，去满足要面对的各种各样复杂的需求与环境<br/>
当然这是后话了<br/>
这里讨论的业务，指的是**面向内部**的业务系统，或者说是一个超大型的业务系统<br/>
很多公司想发展自己的组件库，无非就是想让其优先服务于其内部的所有系统，减少一些重复的轮子，让所有系统都有一个统一的标准，有一个开箱即用的组件库，从而大大的减少内部系统的开发成本<br/>
再然后才是服务于其他外部的系统<br/>
最有说服力的例子就是大名鼎鼎的ant组件库<br/>
它创建的初衷，就是为了服务阿里数以万计的后台管理系统，这些阿里的内部系统也是它优先主要服务的对象之一<br/>
之后才是开源，主动去接受社会的毒打，鞭策，以此去成长自己，再反哺去更好的服务自身的系统<br/>

::: tip PS
在我看来，这也是开源的意义，既造福了社会，也成就了自我，双赢
:::

所以，针对这些组件库优先服务的主要对象，它们本身的设计也应该按照组件库的标准去统一，这样才可以大量的减少开发成本/维护成本，当然了这样也算是属于组件库的使用范畴了<br/>
因此在正常情况下，假设我们有A/B两个系统，那么的两个系统内的所有按钮的设计，无特别需求的情况下，应当是要和组件库的按钮的设计一致才行，其他业务组件同理

## 定制化能力/可扩展性
### 为什么需要定制化能力/可扩展性

如果一个组件，只能解决一个业务场景，那显然，这个组件是不合格的<br/>
如果我们要求所有项目都用一个没有任何扩展性的组件库，那显然，这是在**自断双臂**，**饮鸠止渴**<br/>
正常在设计统一的情况来说，并不需要对组件有过分的扩展，因为业务设计和组件设计是一致，我们能达到开箱即用的效果<br/>
但假设我们有A/B/C/D四个系统，都引用了组件库的组件按钮，组件按钮的背景颜色是蓝色<br/>
而这个时候D系统的某个业务场景要求按钮背景一定是白色的<br/>
那这个时候我们有两个选择<br/>

::: tip instance 
**1. 在该情况下，放弃使用该组件库的按钮，自己写一个**<br/>
**2. 更新组件库，将组件库的按钮的背景色都改成白色**
:::

1. #### 选择一
当然可以解决问题，但如果这个时候不是按钮组件发生冲突，而是一个很复杂的组件发生冲突，如Table组件<br/>
这个时候你要重写的成本就非常的高，而且我们只是想换一种背景色，其他功能还是需要复用组件库里的table，重写的难度也非常高

2. #### 选择二

毫无疑问也可以解决问题，但成本更加高昂，因为它会影响到所有引用到它的业务<br/>
在者，组件库更新有自己的频率，业务组件实现需求不能依赖或者等待组件库的更新，说白了组件库不会为了实现某个业务功能而刻意去发一版

**因此，我们只能选择第三种方案，那就是让按钮组件提供一个可以自定义替换背景颜色的api接口**<br/>










