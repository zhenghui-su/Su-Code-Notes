## Promise
[toc]

#### 一. Promise是什么？

> Promise 是异步编程的一种解决方案，比传统的解决方案回调函数,  更合理和更强大。ES6 将其写进了语言标准，统一了用法，原生提供了Promise对象 。

- 指定回调函数方式更灵活易懂。

- 解决异步 **回调地狱** 的问题。

##### 1. 回调地狱

- 当一个回调函数嵌套一个回调函数的时候，就会出现一个嵌套结构，当嵌套的多了就会出现回调地狱的情况

- 比如我们发送三个 ajax 请求

  - 第一个正常发送
  - 第二个请求需要第一个请求的结果中的某一个值作为参数
  - 第三个请求需要第二个请求的结果中的某一个值作为参数

  ```javascript
  ajax({
    url: '我是第一个请求',
    success (res) {
      // 现在发送第二个请求
      ajax({
        url: '我是第二个请求'，
        data: { a: res.a, b: res.b },
        success (res2) {
          // 进行第三个请求
          ajax({
            url: '我是第三个请求',
            data: { a: res2.a, b: res2.b },
    				success (res3) { 
              console.log(res3) 
            }
          })
        }
      })
    }
  })
  ```

- **回调地狱，其实就是回调函数嵌套过多导致的**

![image-20230925000005621](https://gitee.com/dont-sleep-in-the-morning/pictures/raw/master/image-20230925000005621.png)

当代码成为这个结构以后，已经没有维护的可能了



#### 二. Promise使用

- 语法：

  ```javascript
  new Promise(function (resolve, reject) {
    // resolve 表示成功的回调
    // reject 表示失败的回调
  }).then(function (res) {
    // 成功的函数
  }).catch(function (err) {
    // 失败的函数
  })
  ```



#### 三. Promise 对象的状态

Promise 对象通过自身的状态，来控制异步操作。Promise 实例具有三种状态。

 ```
异步操作未完成（pending）
异步操作成功（fulfilled）
异步操作失败（rejected）
 ```

这三种的状态的变化途径只有两种。

 ```
从“未完成”到“成功”
从“未完成”到“失败”
 ```

一旦状态发生变化，就凝固了，不会再有新的状态变化。这也是 Promise 这个名字的由来，它的英语意思是“承诺”，一旦承诺成效，就不得再改变了。这也意味着，Promise 实例的状态变化只可能发生一次。

因此，Promise 的最终结果只有两种。

 ```
异步操作成功，Promise 实例传回一个值（value），状态变为fulfilled。
异步操作失败，Promise 实例抛出一个错误（error），状态变为rejected。
 ```

![image-20230925000017544](https://gitee.com/dont-sleep-in-the-morning/pictures/raw/master/image-20230925000017544.png)

#### 四.Promise对象方法

> Promise 是一个对象，也是一个构造函数。

##### 1.Promise.resolve

将现有对象转为 Promise 对象

```javascript
Promise.resolve('kerwin')
// 等价于
new Promise(resolve => resolve('kerwin'))
```

##### 2.Promise.reject

`Promise.reject(reason)`方法也会返回一个新的 Promise 实例，该实例的状态为`rejected`。

```javascript
const p = Promise.reject('error');
// 等同于
const p = new Promise((resolve, reject) => reject('error'))
```

##### 3.Promise.all

`Promise.all()`方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。

```javascript
const p = Promise.all([p1, p2, p3]);
```

p的状态由p1,p2,p3 决定，分成两种情况。

（1）只有`p1`、`p2`、`p3`的状态都变成`fulfilled`，`p`的状态才会变成`fulfilled`，此时`p1`、`p2`、`p3`的返回值组成一个数组，传递给`p`的回调函数。

（2）只要`p1`、`p2`、`p3`之中有一个被`rejected`，`p`的状态就变成`rejected`，此时第一个被`reject`的实例的返回值，会传递给`p`的回调函数。

##### 4.Promise.race

`Promise.race()`方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。

```javascript
const p = Promise.race([p1, p2, p3]);
```

上面代码中，只要`p1`、`p2`、`p3`之中有一个实例率先改变状态，`p`的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给`p`的回调函数。

##### 5.Promise.allSettled

`Promise.allSettled()`方法，用来确定一组异步操作是否都结束了（不管成功或失败）。所以，它的名字叫做”Settled“，包含了”fulfilled“和”rejected“两种情况。

```js
const promises = [ ajax('/200接口'), ajax('/401接口') ];

Promise.allSettled(promises).then(results=>{
    // 过滤出成功的请求
    results.filter(item =>item.status === 'fulfilled');
    过滤出失败的请求
    results.filter(item=> item.status === 'rejected');
})

```

##### 6.Promise.any

只要参数实例有一个变成`fulfilled`状态，包装实例就会变成`fulfilled`状态；如果所有参数实例都变成`rejected`状态，包装实例就会变成`rejected`状态。

> `Promise.any()`跟`Promise.race()`方法很像，只有一点不同，就是`Promise.any()`不会因为某个 Promise 变成`rejected`状态而结束，必须等到所有参数 Promise 变成`rejected`状态才会结束。

#### 五.手写Promise

```js
/**
 * 手写Promise
 * @param {*} executor - 执行器，用于执行成功和失败回调函数
 * @author suzhenghui
 */
function SuPromise(executor) {
    // 初始状态为pending
    this.status = "pending";
    // 初始状态为undefined
    this.result = undefined;
    // 初始化回调函数数组
    this.cb = []
    // 保存this的引用
    var _this = this;

    // 定义resolve函数
    function resolve(res) {
        // 如果状态不是pending，则返回
        if (_this.status !== "pending") return;
        // 改变状态为fulfilled
        _this.status = "fulfilled"
        // 改变结果
        _this.result = res;

        // 遍历回调函数数组，执行成功回调函数
        _this.cb.forEach(item => {
            item.successCallBack && item.successCallBack(_this.result)
        });
    }
    // 定义reject函数
    function reject(rej) {
        // 如果状态不是pending，则返回
        if (_this.status !== "pending") return;
        // 改变状态为rejected
        _this.status = "rejected"
        // 改变结果
        _this.result = rej;
        // 遍历回调函数数组，执行失败回调函数
        _this.cb.forEach(item => {
            item.failCallBack && item.failCallBack(_this.result)
        });
    }
    // 执行executor函数
    executor(resolve, reject)
}

// 定义then函数，用于添加成功回调函数
SuPromise.prototype.then = function (successCallBack, failCallBack) {

    // 如果没有传入成功回调函数，则默认返回原值
    if (!successCallBack) {
        successCallBack = value => value;
    }
    // 如果没有传入失败回调函数，则默认返回错误对象
    if (!failCallBack) {
        failCallBack = error => error;
    }
    // 返回一个新的SuPromise实例
    return new SuPromise((resolve, reject) => {
        // 如果状态为fulfilled，则执行成功回调函数
        if (this.status === "fulfilled") {
            const result = successCallBack && successCallBack(this.result)
            // 判断result是否是Promise
            resolveIsPromise(result, resolve, reject);
        }
        // 如果状态为rejected，则执行失败回调函数
        if (this.status === "rejected") {
            const result = failCallBack && failCallBack(this.result)
            // 判断result是否是Promise
            rejectIsPromise(result, resolve, reject);
        }
        // 如果状态为pending，则收集回调函数
        if (this.status === "pending") {
            //收集回调
            this.cb.push({
                successCallBack: () => {
                    const result = successCallBack(this.result)
                    // 判断result是否是Promise
                    resolveIsPromise(result, resolve, reject);
                },
                failCallBack: () => {
                    const result = failCallBack(this.result)
                    // 判断result是否是Promise
                    rejectIsPromise(result, resolve, reject);
                }
            })
        }
    })
}

// 定义catch函数，用于添加失败回调函数
SuPromise.prototype.catch = function (failCallBack) {
    // 返回一个新的SuPromise实例，并传入失败回调函数
    return this.then(undefined, failCallBack);
}

// 封装函数 判断result是否是Promise
function resolveIsPromise(result, resolve, reject) {
    if (result instanceof SuPromise) {
        result.then(res => {
            resolve(res);
        }, rej => {
            reject(rej);
        })
    } else {
        resolve(result);
    }
}
function rejectIsPromise(result, resolve, reject) {
    if (result instanceof SuPromise) {
        result.then(res => {
            resolve(res);
        }, rej => {
            reject(rej);
        })
    } else {
        reject(result);
    }
}
```

#### 六.Async与Await

##### 1.Async

async 函数，使得异步操作变得更加方便。

- 更好的语义。
- 返回值是 Promise。

```js
async function test(){
	
}
test()
```



##### 2.Await

`await`命令后面是一个 Promise 对象，返回该对象的结果。如果不是 Promise 对象，就直接返回对应的值。

```js
async function test(){
    var res1 =  await ajax("http://localhost:3000/news1")
    var res2 =  await ajax("http://localhost:3000/news2")
    return res2
}

test().then(res=>{
	console.log("返回结果",res)
}).catch(err=>{
	console.log("err",err)
})
```



##### 3.错误处理

```js
try{
    var res1 =  await ajax("http://localhost:3000/news1")
    var res2 =  await ajax("http://localhost:3000/news2")
}catch(err){
	console.log("err",err)
}
```



