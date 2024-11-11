# iterator

iterator 指的就是迭代器,听着挺高大上，但确实最为人尽皆知的事物，用大白话来说其本质就是“循环”
循环相信大家都很熟悉，人生嘛，无非就是循环和判断，在程序世界中也是如此，所以的复杂逻辑，都无一不是由大量的循环和判断组成
那既然是大量存在的，又十分重要的东西，我们也必须认真重视起来不是吗
因此，迭代器模式便营运而生
::所谓迭代器模式，就是指是对外提供了一种统一的接口让我们去访问数据结构里的每一项，而又不用向我们暴露其循环细节的设计模式
最直观的好处，就是让我们少写很多for循环，少声明很多临时的变量

假设我们现在有一个需求，需要将一个int类型数组里面大于5的数字都打印出来
下面我们用正常的for循环实现这个需求
```javascript
let target = [1,2,3,4,5,6,7,8,9,10];
for(let i = 0; i < target.length; i++){
    if(arr[i]>5){
        console.log(arr[i]);
    }
}
```
这段代码很常见，但是它有几个不舒服的地方
1.产生了一个变量i
2.需要写很多样板代码(for循环)
3.代码很硬，每次需求改变都需要改变for循环内部的代码，违反开闭原则

那么解决这几个痛点，就成了我们迭代器的目标
临时变量多，我们就隐藏它
样板代码多，我们就不写它
不想需求每次改变都改动for循环内部代码，我们就把业务逻辑独立出来写在外面
以下就是简单迭代器的代码实现
```javascript
let target = [1,2,3,4,5,6,7,8,9,10];

const each = (arr,handle) => {
    for(let i = 0; i < arr.length; i++){
        handle(arr[i],i);
    }
};

each(target, (i)=>{
    if(i>5){
        console.log(i);
    }
});
```
所谓设计模式，就是将变化的部分和不变的部分分离
上述编写的each，虽然十分简单，但是它将需要需要经常编写的for循环样板代码，当作为不变的部分，隐藏在each函数内部
把变化的部分，做为函数的第二个参数传入给each内部处理
而且还统一的为handle函数提供了正在遍历的项和其索引，供用户自定义处理

当然，在JavaScript中，迭代器作为一个十分常用的迭代器，已经是天然集成了的东西
我想，看到这里的同学，也用不少人已经使用过它
```javascript
Array.prototype.forEach
```
```javascript
// 用法也十分简单
let target = [1,2,3,4,5,6,7,8,9,10];
target.forEach( (i)=>{
    if(i>5){
        console.log(i);
    }
});
```

## 内部迭代器

其实迭代器也分内外
那么什么是内部迭代器呢？
它的“内”体现在哪里呢
我们上述编写的each函数和原生自带的forEach函数就属于内部迭代器
它将循环的所有细节封装在内部，不对外披露相关的细节
一经实现，就会自动执行循环，过程不收控制
用汽车所谓例子去比喻，内部迭代器就像自动波，你只管踩油门，剩下的交给命运吧

## 外部迭代器

本章节的难点，虽然都是迭代器，但使用方式和应用场景都和内部迭代器千差万别
如果内部迭代器，是自动波
那么外部迭代器就是手动挡了
外部迭代器的循环的进程，需要用户主动去推进
既然能主动，那必然能掌控
既然能掌控，那必然是用一个“把柄”在用户手中
外部迭代器就对外提供了一个把柄给予用户，让用户自行决定什么时候去开始下一轮循环

下面是具体代码实现
```javascript
const ExternalIterator = function(array) {
    let currentIndex = 0;

    return {
        next: function () {
            return currentIndex < array.length
                ? { value: array[currentIndex++], done: false}
                : { done: true }
        },
        hasNext: function () {
            return currentIndex < array.length;
        },
        jumpToNext: function () {
            if (index >= 0 && index < array.length) {
                currentIndex = index;
            }
        }
    }
}

// 使用外部迭代器遍历数组
const array = [1, 2, 3, 4, 5];
const iterator = ExternalIterator(array);

// 用法一
while (iterator.hasNext()) {
  const element = iterator.next().value;
  console.log(element);
}

// 用法二
const iterator2 = ExternalIterator(array);
// 手动控制迭代过程
console.log(iterator2.next().value); // 1
console.log(iterator2.next().value); // 2
console.log(iterator2.next().value); // 3
console.log(iterator2.next().value); // 4
console.log(iterator2.next().value); // 5

// 跳转到指定索引继续遍历
iterator2.jumpToIndex(2);
console.log(iterator2.next().value); // 3
```

通过上述的例子，我们可以看到两者的差异
内部迭代器，对外隐藏了其内部的迭代细节
而外部迭代器，例:上述我们自己编写的ExternalIterator
对外暴露了如next，hasNext，jumpToNext等自定义的方法，给予用户去主动把控整个迭代过程
如果我们想，我们甚至可以自定义编写一个reverseIteration，让数组重后到前，去进行一个倒序迭代
因此，相较之下，外部迭代器更加灵活，也可以更好的去处理一些更复杂的应用场景

::需要注意的是，外部迭代器相对于内部迭代器的代码实现和使用会更加复杂。因此，在实际开发中，要权衡使用外部迭代器的复杂性和所带来的优势，确保选择的迭代方式符合实际需求。












