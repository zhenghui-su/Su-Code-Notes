## **理解ES**
* 全称: ECMAScript
* js语言的规范
* 我们用的js是它的实现
* js的组成
  * ECMAScript(js基础)
  * 扩展-->浏览器端
    * BOM
    * DOM
      * 类型的结构:
        * Node
          * Document
            * XMLDocument
            * HTMLDocument
          * Element
          * Attribute
          * Text
      * 对象的结构(dom对象树)
        * document
          * html element
            * head element
            * body element
              * p element
              * div element
  * 扩展-->服务器端
    * Node.js
      
## ES5
* **严格模式**
  * 运行模式: 正常(混杂)模式与严格模式
  * 应用上严格式: 'use strict';
  * 作用: 
    * 使得Javascript在更严格的条件下运行
    * 消除Javascript语法的一些不合理、不严谨之处，减少一些怪异行为
    * 消除代码运行的一些不安全之处，保证代码运行的安全
    * 需要记住的几个变化
      * 声明定义变量必须用var
      * 禁止函数中的this关键字指向全局对象
      * 创建eval作用域, 更安全
      
* **JSON对象**
  * 作用: 用于在json对象/数组与js对象/数组相互转换
  * JSON.stringify(obj/arr)
      js对象(数组)转换为json对象(数组)
  * JSON.parse(json)
      json对象(数组)转换为js对象(数组)
      
* Object扩展
  * Object.create(prototype[, descriptors]) : 创建一个新的对象
    * 以指定对象为原型创建新的对象
    * 指定新的属性, 并对属性进行描述
      * value : 指定值
      * writable : 标识当前属性值是否是可修改的, 默认为true
      * **get方法** : 用来得到当前属性值的回调函数
      * **set方法** : 用来监视当前属性值变化的回调函数
  * Object.defineProperties(object, descriptors) : 为指定对象定义扩展多个属性
  
* Array扩展
  * Array.prototype.indexOf(value) : 得到值在数组中的第一个下标
  * Array.prototype.lastIndexOf(value) : 得到值在数组中的最后一个下标
  * **Array.prototype.forEach(function(item, index){}) : 遍历数组**
  * **Array.prototype.map(function(item, index){}) : 遍历数组返回一个新的数组**
  * **Array.prototype.filter(function(item, index){}) : 遍历过滤出一个子数组**
  * **编程的2种方式**
    * 声明式: 做什么(计算) ---填空题 ---本质是对命令式的包装
    * 命令式: 做什么(计算)+怎么做(流程) ---问答题
* **Function扩展**
  * Function.prototype.bind(obj)
      * 将函数内的this绑定为obj, 并将函数返回
  * 面试题: 区别bind()与call()和apply()?
      * fn.bind(obj) : 指定函数中的this, 并返回函数
      * fn.call(obj) : 指定函数中的this,并调用函数
  
## ES6
### **常用语法**
* 2个新的关键字
  * let/const
  * 块作用域
  * 没有变量提升
  * 不能重复定义
  * 值不可变
  
* 变量的解构赋值
  * 将包含多个数据的对象(数组)一次赋值给多个变量
  * 数据源: 对象/数组
  * 目标: {a, b}/[a, b]

* 模板字符串
  * 作用: 简化字符串的拼接
  * 模板字符串必须用``
  * 变化的部分使用${xxx}定义
 
* 简化的对象写法
  ```
     let name = 'Tom';
     let age = 12;
     let person = {
         name,
         age,
         setName (name) {
             this.name = name;
         }
     };
  ```
  
* 箭头函数
  * 用来定义匿名函数
  * 基本语法:
    * 没有参数: () => console.log('xxxx')
    * 一个参数: i => i+2
    * 大于一个参数: (i,j) => i+j
    * 函数体不用大括号: 默认返回结果
    * 函数体如果有多个语句, 需要用{}包围
  * 使用场景: 多用来定义回调函数
  
* 形参的默认值
  * 定义形参时指定其默认的值

* 点点点运算符
  * rest(可变)参数
    * 通过形参左侧的...来表达, 取代arguments的使用
  * 扩展运算符(...)
    * 可以分解出数组或对象中的数据
    
* class类
  * 用 class 定义一类
  * 用 constructor() 定义构造方法(相当于构造函数)
  * 一般方法: xxx () {}
  * 用extends来定义子类
  * 用super()来调用父类的构造方法
  * 方法重写: 将从父类中继承来的方法重新实现一遍
  * js中没有方法重载(方法名相同, 但参数不同)的语法

* Promise
  * 解决`回调地狱`(回调函数的层层嵌套, 编码是不断向右扩展, 阅读性很差)
  * 能以同步编码的方式实现异步调用
  * 在es6之前原生的js中是没这种实现的, 一些第三方框架(jQuery)实现了promise
  * promise对象的3个状态
    * pending: 初始化状态--->新建实例对象
    * fullfilled: 成功状态--->resolve(data)
    * rejected: 失败状态--->reject(error)
  * ES6中定义实现API: 
    ```
    // 1. 创建promise对象
    var promise = new Promise(function(resolve, reject){ 
      // 做异步的操作 
      if(成功) { // 调用成功的回调
        resolve(result); 
      } else { // 调用失败的回调
        reject(errorMsg); 
      } 
    }) 
    // 2. 调用promise对象的then()
    promise.then(
      result => console.log(result), 
      errorMsg => alert(errorMsg)
    )
    ```
    
### 其它语法
* 字符串扩展
  * contains(str) : 判断是否包含指定的字符串
  * startsWith(str) : 判断是否以指定字符串开头
  * endsWith(str) : 判断是否以指定字符串结尾
  * repeat(count) : 重复指定次数
         
* 对象扩展
  * Object.assign(target, source1, source2..) : 将源对象的属性复制到目标对象上    assign(obj, ...sources)
  * Object.is(v1, v2) : 判断2个数据是否完全相等
  * __proto__属性 : 隐式原型属性
     
* 数组扩展
  * Array.from(v) : 将伪数组对象或可遍历对象转换为真数组
  * Array.of(v1, v2, v3) : 将一系列值转换成数组
  * find(function(value, index, arr){return true}) : 找出第一个满足条件返回true的元素
  * findIndex(function(value, index, arr){return true}) : 找出第一个满足条件返回true的元素下标
    
* set/Map容器结构
  * 容器: 能保存多个数据的对象, 同时必须具备操作内部数据的方法
  * 任意对象都可以作为容器使用, 但有的对象不太适合作为容器使用(如函数)
  * Set的特点: 保存多个value, value是不重复 ====>数组元素去重
  * Map的特点: 保存多个key--value, key是不重复, value是可以重复的
  * API
    * Set()/Set(arr) //arr是一维数组
    * add(value)
    * delete(value)
    * clear();
    * has(value)
    * size
    * 
    * Map()/Map(arr) //arr是二维数组
    * set(key, value)
    * delete(key)
    * clear()
    * has(key)
    * size
    
* for--of循环
  * 可以遍历任何容器
  * 数组
  * 对象
  * 伪/类对象
  * 字符串
  * 可迭代的对象
  
## ES7
* 指数运算符: **
* Array.prototype.includes(value) : 判断数组中是否包含指定value
  
  
* **区别方法的2种称谓**
  * 静态(工具)方法
    * Fun.xxx = function(){}
  * 实例方法
    * 所有实例对象 : Fun.prototype.xxx = function(){} //xxx针对Fun的所有实例对象
    * 某个实例对象 : obj.xxx = function(){} //xxx只是针对fun对象