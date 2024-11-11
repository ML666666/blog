什么是代理模式
或者换个问题
代理指的究竟是什么
在现实生活中寻找具体比喻用
我们会发现明星和明星经纪人就很符合这种关系，明星就是被代理的对象，经纪人就是明星的代理
经纪人会拦截所有对明星的请求，如商演，唱歌，跳舞，演戏等等
然后根据对方的报价，或者这次演出所能创造的价值，为明星量身定制接下来的一系列行程，以达到利益最大化的目的

结合现实的具体例子，我们在程序或编码的世界中会发现
明星可能指的是一个计算量大，开销昂贵的函数，或是一个复杂的对象，或是一个牵扯到许多变化的状态

而代理，指的就是针对目标对象实行操作(如函数的调用，状态的更改)前的一道拦截
就像我们的经纪人会为明星推掉一些价值不高的演出一样
我们对被代理的目标对象发起一个请求，该请求也会被代理拦截
这个请求可能会被过滤，可能会被执行，也可能会被转发

理论说的太多，那么代理模式的引入，究竟解决了什么问题呢？
或者说代理模式的优点是什么呢？
我想，我们在详细讨论前，可以创造性的粗略列举一下，代理(或者说拦截)这个操作究竟能做些什么，也许，列举完毕后，你就会惊讶的发现，身边已经有如此多的“代理模式”的优秀应用

场景 1: 路由拦截，我们在访问某个页面时，可能校验登录状态，但是我们不想将这个校验的操作，在每一个需要登录后才能访问的页面上都实现一遍，因此，我们需要一个保护代理，拦截所有对特定页面的访问，校验通过后才让其访问，具体的优秀实现就是 Vue-router 的路由守卫。
场景 2：结果缓存，假设有一个计算量极大的纯函数，相同的输入，有相同的输出，这时候可以实现一个缓存代理，根据输入为 key，输出为 value 将计算结果缓存起来，第二次再调用该纯函数前，代理会先根据输入，在缓存中查找已有的计算结果，如果查询有结果，即返回结果，无结果，再通知函数实行计算，缓存代理的应用十分广泛，可以极大的减少复杂函数的运算消耗。
场景 3：资源懒加载，当我们真正要用到目标资源时，再通知其代理去加载目标资源，应用同样广泛，场景的图片懒加载，资源懒加载等等都是虚拟代理的具体实现。

代理模式的应用场景其实还有很多，但以上三个场景，提及到了三种代理模式的变式，分别是保护代理，缓存代理，虚拟代理，都是我们前端日常开发接触最多的代理模式，也是我们接下来重点讨论研究的对象

## 保护代理

保护代理的主要目标是限制对真实对象的直接访问，提供更加严格的控制和保护。通过在客户端与真实对象之间引入一个代理，可以实现对访问的监控、验证或限制。这样可以确保对受保护对象的操作是有限制和合法的，提高系统的安全性和稳定性。

应用一: 登录拦截
保护代理可用于控制对敏感数据或资源的访问权限

最常见的就是登录拦截了，如果没有保护代理，登录拦截的实现如下
```javascript
const renderPageOne = ({ isLogin }) => {
  if (!isLogin) {
    history.push({ name: "login" });
    return;
  }
  return <div>Login success</div>;
};
```

其实这就是一段很通俗易懂的代码，我相信很多同学都能看懂他的意思
但是这段简单的代码有几个很大的问题
问题一: 违反了单一职责原则 renderPageOne 承担了 登录拦截 和 渲染页面的职责
问题二：违反了开闭原则，如果以后登录页换了地址或者判断登录状态的条件变化，我们就需要去修改 renderPageOne 里登录拦截相关的代码
问题三：如果需要登录拦截的页面只有 renderPageOne 一个，那问题一，问题二都不是问题，但如果需要登录拦截的页面有五十个，那就会产生大量相同的样板代码，需求更改时，就要修改五十处代码

那要解决以上三个问题，做到讲一段逻辑复用五十次，我们就需要将这段变化的代码抽离出来，在以别的方式耦合到页面渲染这部分逻辑上
这时候，我们就需要引用到保护代理

```javascript
const proxyLoginStatus = (
  targetRender,
  loginHandleLogic,
  redirectPage = login
) => {
  if (!loginHandleLogic()) {
    return redirectPage;
  }
  return targetRender;
};

const routeConfig = [
  {
    path: "/home",
    component: Home,
    requireLogin: true,
  },
  {
    path: "/main",
    component: main,
    requireLogin: true,
  },
  {
    path: "/login",
    component: login,
  },
];

const App = () => {
  const isLogin = useLoginStatus();
  const loginHandleLogic = () => isLogin;
  return routeConfig.map((i) => proxyLoginStatus(<Route {...i} />, loginHandleLogic));
};
```
proxyLoginStatus在这里就是充当了保护代理的角色
其实代码都很简单，也许很多同学都见过，甚至都写过类似的代码，非常通俗

................................................................

应用二：控制对敏感数据的访问

保护代理常见应用场景，就是控制对敏感数据的访问
如果有同学参与过一下大型的银行系统或电商系统的开发，你们会发现有些敏感数据，并不是每个人都有访问或修改权限的
也是对于同一段数据或状态，管理员可以直接更改，运营人员则只能纯粹的读取
在这里我们可以拿一个账号状态管理的需求，作为举例

在很多后台管理系统中，管理员可以更改账号的使用状态，简单点说，就是可以让其激活，也可以让其废弃
而运营人员则没有这个权限去更改账号的使用状态
实现方式有很多，es5和es6均有原生的api提供
```javascript
const level = getLevel();

const userInfo = {
  name:'jack',
  email: 'jack@QQ.com',
  active: true
}

const proxyEs5 = (target, key, option) => Object.defineProperty(target, key, option); // es5方式

const newUserWithEs5 = proxyEs5(userInfo, 'active', { writable: level==='admin' ? true : false });

const proxyEs6 = (target, option) => new Proxy(target, option); // es6方式

const newUserWithEs6 = proxyEs6(userInfo, {
   get: function(target, name) {
    return target[name];
   }
   set: function(target, name, value) {
    if(name === 'active' && level === 'admin'){
      target[name] = value;
      return true;
    }
    throw new Error('you have no power to change');
    return false;
   }
});  

```

应用三: 防御性拷贝/写时复制代理
防御性拷贝用于防止对目标对象的以为更改，当需要将当前对象传递给别的地方使用时，可以动态的为其创造副本，并在副本上进行操作，以避免对目标对象不必要的修改，从而导致其他引用到本体对象的地方出现难以追溯的bug，在我看来，这也是数据不可变的具体应用之一。

```javascript
// 原始对象
const originalObj = {
  foo: 'hello',
  bar: 'world'
};
// 写时复制代理
const copyOnWriteProxy = new Proxy(originalObj, {
  get(target, prop) {
    return target[prop];
  },
  set(target, prop, value) {
    // 在修改前先创建副本  
    const copy = { ...target };
    copy[prop] = value;
    target = copy; // 更新目标为副本
    return true; // 返回 true 表示设置成功
  }
});

// 示例操作
console.log(copyOnWriteProxy.foo); // 输出：hello

copyOnWriteProxy.bar = 'universe'; // 修改代理对象的属性

console.log(copyOnWriteProxy.foo); // 输出：hello，仍然未变
console.log(copyOnWriteProxy.bar); // 输出：universe，修改成功

console.log(originalObj.foo); // 输出：hello，原始对象未受影响
console.log(originalObj.bar); // 输出：world，原始对象未受影响
```
ps: 创建副本的途径用很多，三点运算符在这里只能起到一个浅拷贝的作用，可按实际需求选择拷贝途径
## 缓存代理 
日常业务中，也许会遇到一些消耗很大的纯函数，他们内部也想涉及复杂的算法，如排序，如查找，如计算等等
但既然是纯函数，相同的输入必然会有相同的输出，所以当我们要处理相同的输入时，我们会希望将第一次运算的结果存放起来，当遇到第二次同样的输入时，将缓存的结果直接返回，从而避免了复杂计算，和不必要的消耗。
这个时候，我们就需要引入缓存代理去解决类似的业务问题。

```javascript
const cacheProxy = (fn)=>{
  const caches = {};
  return (...args) =>{
    if(caches[args]){
      return caches[args];
    }
    return caches[args] = fn(...args);
  }
}

const count = (a,b) => {
  console.log('count + '+a*b);
  return a*b;
}

const countAfterCacheProxy = cacheProxy(count);

const final = countAfterCacheProxy(1,2); // count + 2

const final2 = countAfterCacheProxy(1,2); // 第二次则不会执行函数，而是读取对应的缓存

console.log(final === final2); // true
```
虽然缓存代理十分强大，而已应用场景十分广阔，但是我们在使用时还需多加注意，因为其本质上只是用时间去换取空间
如果过度滥用，将什么东西都存储在内存中，可能会导致大量的内存泄漏，得不偿失。

## 虚拟代理
虚拟代理通过创建一个虚拟的对象来控制对实际对象的访问。虚拟对象可以充当实际对象的替身，可以在访问实际对象前后做一些自定义的操作。
其实按照这个定义，缓存代理，保护代理也是虚拟代理的一种，甚至可以说虚拟代理泛指所有的代理类型，指向的就是代理模式本身。
而在这里单独拎出来要讲的场景，也只是虚拟代理中比较常用的场景之一，并不能涵盖所有的场景。

1.图片预加载
当遇到一些大型图片时，由于网络不佳，图片占位的地方往往是一片空白，这个时候我们需要为其放置一张菊花图去提醒用户，图片尚未加载，以确保用户的基本体验，待目标图片加载完毕后，再将目标图片替换上。
在这种场景下，我们就需要引入虚拟代理，为加载图片这个操作，动态的耦合上一个“放置菊花图”的功能
以下例子,参考了曾探老师书中的代码
```javascript
var loadImage = (targetNode) => {
  var img = document.createElement('img');
  targetNode.appendChild(img);
  return {
    setImage: (src) => {
      img.src = src;
    }
  }
}

// 未加虚拟代理前,可能会出行空白图片的情况
loadImage(document.body).setImage('http://mock.jpg');

var proxyImage = (LoadImageFn) = (targetNode) => {
  var img = document.createElement('img');
  var targetLoadImageFn = LoadImageFn(document.body);
  // 当img.src = src这行代码执行后
  // img.onload回调会执行
  // 当img.onload回调执行完毕后,证明目标图片已经加载完毕
  img.onload = () => {
    // 然后再将加载完毕的目标图片替换回loading.gif上
    targetLoadImageFn.setImage(this.src);
  };

  return {
    setImage: (src) => { 
      // 先让目标图片加载一张loading图片
      targetLoadImageFn.setImage('loading.gif');
      // 让虚拟代理去加载真实的目标图片
      img.src = src;
    };
  }
};

// 使用proxy代理动态为其添加loading图片
const loadImageAfterProxy = proxyImage(loadImage);

// 代理后的函数使用方法和代理前的一致
// 符合里氏替换原则
loadImageAfterProxy(document.body).setImage('http://mock.jpg');
```
2. 图片懒加载
以上的图片预加载是主动型的,适合用户或开发者主动为网页添加图片的场景.
但大部分时候, 我们希望用一个更自动一点的处理方式, 去处理页面上已用的大型图片,也就是我们常用的图片懒加载.
以下是具体的代码实现
```JavaScript
// 定义图片的代理对象
const ImageProxy = function(imageUrl) {
  this.imageUrl = imageUrl;
  this.image = null;
};

ImageProxy.prototype.displayImage = function() {
  if (!this.image) {
    // 如果图片对象为空，则创建一个新的图片对象
    this.image = new Image();
    this.image.src = this.imageUrl;
    this.image.onload = () => {
      this.showImage();
    };
  } else {
    // 如果图片对象已存在，则直接显示图片
    this.showImage();
  }
};

ImageProxy.prototype.showImage = function() {
  const imgElement = document.createElement('img');
  imgElement.src = this.image.src;
  document.body.appendChild(imgElement);
};

const initLazyLoadFn = (function() {
  // 获取所有需要懒加载的图片元素
  const lazyImages = Array.from(document.querySelectorAll('.lazy-image'));

  // 创建图片代理对象并实现懒加载
  const imageProxies = lazyImages.map((lazyImage) => {
    const imageUrl = lazyImage.getAttribute('data-src');
    const imageProxy = new ImageProxy(imageUrl);

    // 监听滚动事件，判断图片是否进入视口范围内
    window.addEventListener('scroll', () => {
      const rect = lazyImage.getBoundingClientRect();
      if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
        imageProxy.displayImage();
        // 图片加载后移除滚动事件监听，避免重复显示
        window.removeEventListener('scroll');
      }
    });

    return imageProxy;
  });
})();
```
以上，就是代理模式的大概介绍
当然，我们在学习代理模式时，不需要拘泥于以上几种具体应用
再次强调，所谓的代理，不过是对目标访问/使用的前后的一道拦截
如果你需要为目标访问/使用前或目标访问/使用后,去动态的添加一些逻辑上的判断，或控制对目标的输入和输出。
我想，代理模式无疑是最好的选择

最后还要总结一下
回顾以上的例子，目标对象被代理后，对外的接口都应该是和被代理前是一致的，这种约束也符合里氏替换原则，别小看这个约束，当我们需求发生更该变动时，需要涉及移除或新增对目标的代理，你会发现，对整个大的系统来说，成本都是几乎可以少的忽略不计的。
因为他们对外的接口都是一致的。