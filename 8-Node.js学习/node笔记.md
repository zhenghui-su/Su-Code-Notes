# node笔记

## 1-梦开始的地方

### 概述

1. nodejs 并不是`JavaScript`应用，也不是编程语言，因为编程语言使用的`JavaScript`,Nodejs是 `JavaScript`的运行时环境。

![image-20231024220958851](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20231024220958851.png)

2. Nodejs是构建在V8引擎之上的，V8引擎是由C/C++编写的，因此我们的JavaSCript代码需要由C/C++转化后再执行。
3. NodeJs 使用异步 I/O 和事件驱动的设计理念，可以高效地处理大量并发请求，提供了非阻塞式 I/O 接口和事件循环机制，使得开发人员可以编写高性能、可扩展的应用程序,异步I/O最终都是由`libuv` 事件循环库去实现的。
4. NodeJs 使用npm 作为包管理工具类似于python的pip，或者是java的Maven，目前npm拥有上百万个模块。 [www.npmjs.com/](https://www.npmjs.com/)
5. nodejs适合干一些IO密集型应用，不适合CPU密集型应用，nodejsIO依靠libuv有很强的处理能力，而CPU因为nodejs单线程原因，容易造成CPU占用率高，如果非要做CPU密集型应用，可以使用C++插件编写 或者nodejs提供的`cluster`。(CPU密集型指的是图像的处理 或者音频处理需要大量数据结构 + 算法)

### Nodejs大致架构图

![image-20231024221150372](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20231024221150372.png)

### Nodejs 应用场景

以下展示并不是所有东西都是nodejs编写而是运行环境可以配合nodejs或者依靠nodejs运行。

##### 前端

+ Vue 
+ Angular
+ React 
+ nuxtjs 
+ nextjs

##### 后端

+ serverLess

+ web应用：epxress、Nestjs、koa    (编写后端)

+ RPC 服务：gRPC(跨语言通信)

+ 爬虫：Puppeteer(自动化UI测试)、cheerio

+ BFF层、网关层

+ 及时性应用socket.io

##### 桌面端

+ electron

+ tauri

+ NWjs

##### 移动端

+ weex

+ ionic

+ hybrid

+ React Native

##### 基建端

+ webpack、vite、rollup、gulp

+ less、scss、postCss

+ babel、swc

+ inquire、command 、shelljs

##### 嵌入式

+ Ruff js

##### 单元测试

+ jest、vitest、e2e

##### CICD

+ Jenkins、docker、Husky、miniprogram-ci

##### 反向代理

+ http-proxy、Any-proxy

### 安装Nodejs

进入官网[https://www.nodejs.com.cn/](https://www.nodejs.com.cn/)

可以点击下载其他版本，Windows可以下载`.msi`文件，安装非常简单，且会自动帮你自动配置环境变量，建议直接一直next下去安装即可

如何检查是否安装成功呢？在Windows打开cmd，输入以下三个，会输出版本号

```bash
node -v
npm -v
npx -v
```

## 2-npm和package.json

### npm

`npm`（全称 Node Package Manager）是 Node.js 的包管理工具，它是一个基于命令行的工具，用于帮助开发者在自己的项目中安装、升级、移除和管理依赖项。

> [官网地址](https://www.npmjs.com/)

- 类似于 `PHP` 的工具：`Composer`。它是 PHP 的包管理器，可以用于下载、安装和管理 PHP 的依赖项，类似于 npm。
- 类似于 `Java` 的工具：`Maven`。它是 Java 的构建工具和项目管理工具，可以自动化构建、测试和部署 Java 应用程序，类似于 npm 和 webpack 的功能。
- 类似于 `Python` 的工具：`pip`。它是 Python 的包管理器，可以用于安装和管理 Python 的依赖项，类似于 npm。
- 类似于 `Rust` 的工具：`Cargo`。它是 Rust 的包管理器和构建工具，可以用于下载、编译和管理 Rust 的依赖项，类似于 npm 和 Maven 的功能。

### npm 命令

1. **`npm init`**：初始化一个新的 npm 项目，创建 package.json 文件。

2. **`npm install`**：安装一个包或一组包，并且会在当前目录存放一个node_modules。

   > npm install 安装模块的时候一般是扁平化安装的，但是有时候出现嵌套的情况是因为版本不同 
   >
   > A 依赖 C 1.0	B 依赖 C 1.0	D 依赖 C 2.0,
   >
   > 此时C 1.0就会被放到A B的node_moduels, C 2.0 会被放入D模块下面的node_moduels

3. **`npm install <package-name>`**：安装指定的包。

   > 简写npm i，通过在包后`@版本号`来安装指定版本

4. **`npm install <package-name> --save`**：安装指定的包，并将其添加到 package.json 文件中的**依赖列表**中。(如`Vue`，是生产环境所需要的依赖)

5. **`npm install <package-name> --save-dev`**：安装指定的包，并将其添加到 package.json 文件中的**开发依赖列表**中。(如`webpack`，是开发环境所需要的依赖)

6. **`npm install -g <package-name>`**：全局安装指定的包。

7. `npm update <package-name>`：更新指定的包。

8. `npm uninstall <package-name>`：卸载指定的包。

9. **`npm run <script-name>`**：执行 package.json 文件中定义的脚本命令。

10. `npm search <keyword>`：搜索 npm 库中包含指定关键字的包。

11. `npm info <package-name>`：查看指定包的详细信息。

12. `npm list`：列出当前项目中安装的所有包。

13. `npm outdated`：列出当前项目中需要更新的包。

14. `npm audit`：检查当前项目中的依赖项是否存在安全漏洞。

15. `npm publish`：发布自己开发的包到 npm 库中。

16. `npm login`：登录到 npm 账户。

17. `npm logout`：注销当前 npm 账户。

18. `npm link`: 将本地模块链接到全局的 `node_modules` 目录下

19. **`npm config list` **用于列出所有的 npm 配置信息。执行该命令可以查看当前系统和用户级别的所有 npm 配置信息，以及当前项目的配置信息（如果在项目目录下执行该命令）

20. **`npm get registry`** 用于获取当前 npm 配置中的 registry 配置项的值。registry 配置项用于指定 npm 包的下载地址，如果未指定，则默认使用 npm 官方的包注册表地址

21. **`npm set registry` `npm config set registry <registry-url>`** 命令，将 registry 配置项的值修改为指定的 `<registry-url>` 地址

### Package json

执行`npm init`便可以初始化一个`package.json`文件

1. `name`：项目名称，必须是唯一的字符串，通常采用小写字母和连字符的组合。

2. `version`：项目版本号，通常采用语义化版本号规范。

   > version是三段式版本号一般是1.0.0 大版本号、次版本号 、修订号
   >
   > + 大版本号一般是有重大变化才会升级
   > + 次版本号一般是增加功能进行升级
   > + 修订号一般是修改bug进行升级

3. `description`：项目描述。

4. `main`：项目的主入口文件路径，通常是一个 JavaScript 文件。

5. `keywords`：项目的关键字列表，方便他人搜索和发现该项目。

6. `author`：项目作者的信息，包括姓名、邮箱、网址等。

7. `license`：项目的许可证类型，可以是自定义的许可证类型或者常见的开源许可证（如 MIT、Apache 等）。

8. `dependencies`：项目所依赖的包的列表，这些包会在项目运行时自动安装。

9. `devDependencies`：项目开发过程中所需要的包的列表，这些包不会随项目一起发布，而是只在开发时使用。

10. `peerDependencies`：项目的**同级依赖**，即项目所需要的模块被其他模块所依赖。

    > 一般是给编写插件的人员使用的，如在`devDependencies`有一个自己的插件`vite-plugin-chen`，但它不能凭空运行，需要依赖`vite`环境，这时就需要添加`"vite":"^2.0.0"`

11. `scripts`：定义了一些脚本命令，比如启动项目、运行测试等。

12. `repository`：项目代码仓库的信息，包括类型、网址等。

13. `bugs`：项目的 bug 报告地址。

14. `homepage`：项目的官方网站地址或者文档地址。

## 3-npm install 原理

### 执行npm install的时候发生了什么

​		首先安装的依赖都会存放在**根目录**的`node_modules`,默认采用**扁平化**的方式安装，并且排序规则`.bin`第一个然后`@系列`，再然后按照**首字母排序abcd**等

​		使用的算法是**广度优先遍历**，在遍历依赖树时，npm会首先处理项目根目录下的依赖，然后逐层处理每个依赖包的依赖，直到所有依赖都被处理完毕。

​		在处理每个依赖时，npm会检查该依赖的**版本号**是否符合依赖树中其他依赖的版本要求，如果不符合，则会尝试安装适合的版本

![image-20231026215719361](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20231026215719361.png)

### 扁平化

**扁平化理想状态如下**

![image-20231026215959785](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20231026215959785.png)

**安装某个二级模块时，若发现第一层级有相同名称，相同版本的模块，便直接复用那个模块**

因为A模块下的C模块被安装到了第一级，这使得B模块能够复用处在同一级下；且名称，版本，均相同的C模块

**非理性状态如下**

![image-20231026215920712](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20231026215920712.png)

因为B和A所要求的依赖模块不同，（B下要求是v2.0的C，A下要求是v1.0的C ）

所以B不能像2中那样复用A下的C v1.0模块 

所以如果这种情况还是会出现**模块冗余**的情况，他就会给B继续搞一层`node_modules`，就是非扁平化了。

### npm install后续的流程

<img src="https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20231026220043535.png" alt="image-20231026220043535"  />

通过图片可以很清楚的了解后续的流程

npmrc的配置可以参考下面

```sh
registry=http://registry.npmjs.org/
# 定义npm的registry，即npm的包下载源

proxy=http://proxy.example.com:8080/
# 定义npm的代理服务器，用于访问网络

https-proxy=http://proxy.example.com:8080/
# 定义npm的https代理服务器，用于访问网络

strict-ssl=true
# 是否在SSL证书验证错误时退出

cafile=/path/to/cafile.pem
# 定义自定义CA证书文件的路径

user-agent=npm/{npm-version} node/{node-version} {platform}
# 自定义请求头中的User-Agent

save=true
# 安装包时是否自动保存到package.json的dependencies中

save-dev=true
# 安装包时是否自动保存到package.json的devDependencies中

save-exact=true
# 安装包时是否精确保存版本号

engine-strict=true
# 是否在安装时检查依赖的node和npm版本是否符合要求

scripts-prepend-node-path=true
# 是否在运行脚本时自动将node的路径添加到PATH环境变量中
```

### package-lock.json的作用

很多朋友只知道这个东西可以**锁定版本记录即依赖树详细信息**

- `version` 该参数指定了当前包的版本号
- `resolved` 该参数指定了当前包的下载地址
- `integrity` 用于验证包的完整性
- `dev` 该参数指定了当前包是一个开发依赖包
- `bin` 该参数指定了当前包中可执行文件的路径和名称
- `engines` 该参数指定了当前包所依赖的Node.js版本范围

知识点来了，`package-lock.json` 帮我们做了缓存，他会通过 `name + version + integrity` 信息生成一个唯一的**key**，这个**key**能找到对应的`index-v5 `下的缓存记录 也就是`npm cache `文件夹下的

> 可以通过命令`npm config list`输出的cache来找到缓存的路径

![image-20231026221158218](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20231026221158218.png)

如果发现有缓存记录，就会找到**tar包**的**hash值**，然后将对应的二进制文件解压到`node_modeules`

![image-20231026221258551](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20231026221258551.png)

## 4-npm run 原理

### npm run xxx 发生了什么

按照下面的例子`npm run dev`举例过程中发生了什么

![image-20231026222300913](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20231026222300913.png)

读取`package json`的`scripts`对应的脚本命令`dev:vite`,vite是个可执行脚本，他的查找规则是：

- 先从当前项目的`node_modules/.bin`去查找可执行命令`vite`

- 如果没找到就去全局的`node_modules`去找可执行命令`vite`

  > 全局的可以通过`npm config list`输出的prefix找到路径

- 如果还没找到就去环境变量查找
- 再找不到就进行报错

如果成功找到会发现有三个文件

![image-20231026222324037](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20231026222324037.png)

> 因为nodejs 是跨平台的所以可执行命令兼容各个平台

- `.sh`文件是给Linux、Unix、Macos 使用
- `.cmd`给Windows的cmd使用
- `.ps1`给Windows的powerShell 使用

### npm 生命周期

没想到吧npm执行命令也有**生命周期**！

创建了3个文件`index.js`、`post.js`、`prev.js`，内容是`console.log(文件名字)`

> 注意：nodejs的 console api 是自己实现的，与浏览器的 console api 不同

在`package.json`的`scripts`书写如下代码

```json
"predev": "node prev.js",
"dev": "node index.js",
"postdev": "node post.js"
```

执行`npm run dev`命令的时候`predev`会自动执行 他的生命周期是在`dev`之前执行，然后执行`dev`命令，再然后执行`postdev`，也就是`dev`之后执行

运用场景：例如`npm run build`可以在打包之后删除dist目录等等

post例如你编写完一个工具发布npm，那就可以在之后写一个cli脚本顺便帮你推送到git等等

> 谁用到了如上的场景
>
> 例如vue-cli [github.com/vuejs/vue-c…](https://github.com/vuejs/vue-cli/blob/dev/package.json)

![image-20231026222441396](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20231026222441396.png)

## 5-npx

### npx是什么

`npx`是一个命令行工具，它是`npm` 5.2.0版本中新增的功能。它**允许**用户在**不安装全局包**的情况下，**运行已安装**在**本地项目**中的**包**或者**远程仓库**中的**包**。

`npx`的作用是在命令行中运行node包中的可执行文件，而无需全局安装这些包

这可以使开发人员更轻松地管理包的**依赖关系**，并且可以避免**全局污染**的问题。

它还可以帮助开发人员在项目中使用不同版本的包，而不会出现**版本冲突**的问题。

**`npx` 的优势**

1. 避免**全局安装**：`npx`允许你执行`npm package`，而不需要你先全局安装它。
2. 总是使用**最新版本**：如果你没有在本地安装相应的`npm package`，`npx`会从`npm`的`package`仓库中下载并使用最新版。
3. 执行任意`npm`包：`npx`不仅可以执行在`package.json`的`scripts`部分定义的命令，还可以执行任何`npm package`。
4. 执行GitHub gist：`npx`甚至可以执行**GitHub gist**或者其他公开的**JavaScript**文件。

### npm 和 npx 区别

`npx`侧重于**执行**命令的，执行某个模块命令。虽然会自动安装模块，但是重在执行某个命令

`npm`侧重于**安装**或者**卸载**某个模块的。重在安装，并不具备执行某个模块的功能。

### 示例1

[create-react-app.bootcss.com/docs/gettin…](https://create-react-app.bootcss.com/docs/getting-started)

![image-20231026223913749](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20231026223913749.png)

例如创建一个react项目 在之前需要安装到全局

```bash
npm install -g create-react-app
```

然后执行 `create-react-app my-app`这样的话会有两个问题

- 首先需要全局安装这个包占用磁盘空间
- 并且如果需要更新还得执行更新命令

如果使用`npx`命令就不会有上面的问题了

### 示例2

查看全局安装的包

```bash
npm ls -g
```

![image-20231026224039727](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20231026224039727.png)

> 我全局并没有安装`vite`

当前项目安装`vite`

```bash
npm i vite -D
```

安装完成之后发现无法执行运行`vite`命令

![image-20231026224203612](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20231026224203612.png)

这时候就可以使用`npx vite` 了

![image-20231026224229655](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20231026224229655.png)

`npx`的运行规则和`npm`是一样的

本地目录查找`.bin`看有没有 如果没有就去全局的node_moduels 查找

如果还没有就去下载这个包，然后运行命令，然后删除这个包

## 6-发布npm包

### 发布npm的包的好处是什么

- 方便团队或者跨团队**共享代码**，使用npm包就可以方便的管理，并且还可以进行**版本控制**
- 做**开源造轮子必备技术**，否则你做完的**轮子**如何让别人使用，难道是U盘拷贝？
- 面试很经常问到
- 增加**个人IP**让更多的人知道你的技术能力和贡献

### 发布前准备工作

```bash
npm adduser
```

首先先检查一下是否是npm源然后创建一个npm账号

![image-20231026230219108](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20231026230219108.png)

> 创建完成之后使用npm login 登录账号

![image-20231026230242389](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20231026230242389.png)

登录完成之后使用`npm publish` 发布npm包

![image-20231026230308317](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20231026230308317.png)

发布成功，如果出现403说明**包名**被占用了

## 7-搭建npm私服

### 构建npm私服

构建私服有什么收益吗？

- 可以**离线使用**，你可以将**npm私服**部署到**内网集群**，这样离线也可以访问私有的包。
- 提高包的**安全性**，使用私有的npm仓库可以更好的管理你的包，避免在使用公共的npm包的时候出现**漏洞**。
- 提高包的**下载速度**，使用私有 npm 仓库，你可以将经常使用的 npm 包缓存到本地，从而显著提高包的下载速度，减少依赖包的下载时间。这对于团队内部开发和持续集成、部署等场景非常有用

### 如何搭建npm 私服

[verdaccio.org/zh-CN/](https://verdaccio.org/zh-cn/)

Verdaccio 是可以帮我们快速构建npm私服的一个工具

```bash
npm install verdaccio -g
```

使用方式非常简单，直接运行命令`verdaccio`即可

> 可以通过`verdaccio --help`查看配置

![image-20231027003334766](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20231027003334766.png)

然后访问4873默认端口即可

![image-20231027003540676](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20231027003540676.png)

如果不是中文，点击设置切换为中文简体即可

![image-20231027003617194](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20231027003617194.png)

### 基本命令

```sh
#创建账号
npm adduser --registry http://localhost:4873/
# 账号 密码 邮箱

# 发布npm
npm publish --registry http://localhost:4873/

#指定开启端口 默认 4873
verdaccio --listen 9999

# 指定安装源
npm install --registry http://localhost:4873

# 从本地仓库删除包
npm unpublish <package-name> --registry http://localhost:4873
```

其他配置文件项

[verdaccio.org/zh-CN/docs/…](https://verdaccio.org/zh-cn/docs/configuration/)

## 8-模块化(cjs、esm、源码)

Nodejs 模块化规范遵循两套：`CommonJS`规范和`ESM`规范

### CommonJS 规范

注意：需要通过`npm init -y`生成`package.json`，在该文件中添加或修改一个属性`"type":"commonjs"`，如下图

![image-20231027143926376](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20231027143926376.png)

引入模块（require）支持五种格式

+ 支持引入自己编写的模块 ./ ../ 等

+ 支持引入第三方模块`express` `md5` `koa` 等

+ 支持引入内置模块例如 `http` `os` `fs` `child_process` 等`nodejs`内置模块

  > 高版本nodejs引入需要这样写`node:模块名`，低版本直接写模块名即可

+ 支持引入`addon.node` 等C++扩展模块 `.node`文件

+ 支持引入`json`文件

```js
const myModule = require('./myModule.js');  // 导入自己编写的模块
const fs = require('node:fs');  // 导入内置模块
const express = require('express');  // 导入node_modules目录的第三方模块
const nodeModule = require('./myModule.node');  // 导入C++扩展模块
const data = require('./data.json') // 导入json文件
```

导出模块`exports` 和 `module.exports`

```js
module.exports = {
  hello: function() {
    console.log('Hello, world!');
  }
};
```

如果不想导出对象，可以直接导出值

```js
module.exports = 123
```

### ESM模块规范

引入模块 `import` 必须写在头部

> 注意使用ESM模块的时候需要打开package.json 设置`"type":"module"`

```js
import fs from 'node:fs'
```

> 如果要引入json文件需要特殊处理 需要增加断言并且指定类型json，node低版本不支持

```js
import data from './data.json' assert { type: "json" };
console.log(data);
```

可以加载模块的不同导出

```js
export default {
    test: 'test',
}
export const name = 'xm'
```

加载，并可以起别名

```js
import obj,{name as xm} from './test.js'
let name = '123'
console.log(obj,xm,name)
```

加载模块的整体对象

```js
import * as all from 'xxx.js'
```

动态导入模块

import静态加载不支持掺杂在逻辑中，如果想动态加载请使用import函数模式

```js
if(true){
    import('./test.js').then()
}
```

模块导出

- 导出一个默认对象`export default`，default只能有一个不可重复

```js
export default {
    name: 'test',
}
```

- 导出变量

```js
export const a = 1
```

### Cjs 和 ESM 的区别

1. `Cjs`是基于运行时的同步加载，`ESM`是基于编译时的异步加载

2. `Cjs`是可以修改值的，`ESM`值并且不可修改（可读的）

3. `Cjs`不可以Tree shaking，`ESM`支持Tree shaking

   > Tree shaking是一个用于在打包过程中去除未使用代码（dead code）的技术，它可以有效地减小最终生成的JavaScript文件的大小。

4. `Cjs`中顶层的`this`指向这个模块本身，而ES6中顶层`this`指向`undefined`

### nodejs部分源码解析

可以去官网下载源代码

##### .json文件如何处理

> 文件在`modules`目录下的`cjs`下的`loader.js`

使用**fs**读取json文件读取完成之后是个字符串，然后**JSON.parse**变成对象返回

```js
Module._extensions['.json'] = function(module, filename) {
  const content = fs.readFileSync(filename, 'utf8');

  if (policy?.manifest) {
    const moduleURL = pathToFileURL(filename);
    policy.manifest.assertIntegrity(moduleURL, content);
  }

  try {
    setOwnProperty(module, 'exports', JSONParse(stripBOM(content)));
  } catch (err) {
    err.message = filename + ': ' + err.message;
    throw err;
  }
};
```

##### .node文件如何处理

发现是通过process.dlopen 方法处理.node文件

```js
Module._extensions['.node'] = function(module, filename) {
  if (policy?.manifest) {
    const content = fs.readFileSync(filename);
    const moduleURL = pathToFileURL(filename);
    policy.manifest.assertIntegrity(moduleURL, content);
  }
  // Be aware this doesn't use `content`
  return process.dlopen(module, path.toNamespacedPath(filename));
};
```

##### .js文件如何处理

```js
Module._extensions['.js'] = function(module, filename) {
  // If already analyzed the source, then it will be cached.
  //首先尝试从cjsParseCache中获取已经解析过的模块源代码，如果已经缓存，则直接使用缓存中的源代码
  const cached = cjsParseCache.get(module);
  let content;
  if (cached?.source) {
    content = cached.source; //有缓存就直接用
    cached.source = undefined;
  } else {
    content = fs.readFileSync(filename, 'utf8'); //否则从文件系统读取源代码
  }
  //是不是.js结尾的文件
  if (StringPrototypeEndsWith(filename, '.js')) {
    //读取package.json文件
    const pkg = readPackageScope(filename);
    // Function require shouldn't be used in ES modules.
    //如果package.json文件中有type字段，并且type字段的值为module，并且你使用了require 
    //则抛出一个错误，提示不能在ES模块中使用require函数
    if (pkg?.data?.type === 'module') {
      const parent = moduleParentCache.get(module);
      const parentPath = parent?.filename;
      const packageJsonPath = path.resolve(pkg.path, 'package.json');
      const usesEsm = hasEsmSyntax(content);
      const err = new ERR_REQUIRE_ESM(filename, usesEsm, parentPath,
                                      packageJsonPath);
      // Attempt to reconstruct the parent require frame.
      //如果抛出了错误，它还会尝试重构父模块的 require 调用堆栈
      //，以提供更详细的错误信息。它会读取父模块的源代码，并根据错误的行号和列号，
      //在源代码中找到相应位置的代码行，并将其作为错误信息的一部分展示出来。
      if (Module._cache[parentPath]) {
        let parentSource;
        try {
          parentSource = fs.readFileSync(parentPath, 'utf8');
        } catch {
          // Continue regardless of error.
        }
        if (parentSource) {
          const errLine = StringPrototypeSplit(
            StringPrototypeSlice(err.stack, StringPrototypeIndexOf(
              err.stack, '    at ')), '\n', 1)[0];
          const { 1: line, 2: col } =
              RegExpPrototypeExec(/(\d+):(\d+)\)/, errLine) || [];
          if (line && col) {
            const srcLine = StringPrototypeSplit(parentSource, '\n')[line - 1];
            const frame = `${parentPath}:${line}\n${srcLine}\n${
              StringPrototypeRepeat(' ', col - 1)}^\n`;
            setArrowMessage(err, frame);
          }
        }
      }
      throw err;
    }
  }
  module._compile(content, filename);
};
```

如果**缓存**过这个模块就直接从缓存中读取，如果没有缓存就从**fs**读取文件

判断如果是`cjs`但是`type`为`module`就报错，并且从**父模块**读取详细的**行号**进行报错，如果没问题就调用 **compile**

```js
Module.prototype._compile = function(content, filename) {
  let moduleURL;
  let redirects;
  const manifest = policy?.manifest;
  if (manifest) {
    moduleURL = pathToFileURL(filename);
    //函数将模块文件名转换为URL格式
    redirects = manifest.getDependencyMapper(moduleURL);
    //redirects是一个URL映射表，用于处理模块依赖关系
    manifest.assertIntegrity(moduleURL, content); 
    //manifest则是一个安全策略对象，用于检测模块的完整性和安全性
  }
  /**
   * @filename {string}  文件名
   * @content {string}   文件内容
   */
  const compiledWrapper = wrapSafe(filename, content, this);

  let inspectorWrapper = null;
  if (getOptionValue('--inspect-brk') && process._eval == null) {
    if (!resolvedArgv) {
      // We enter the repl if we're not given a filename argument.
      if (process.argv[1]) {
        try {
          resolvedArgv = Module._resolveFilename(process.argv[1], null, false);
        } catch {
          // We only expect this codepath to be reached in the case of a
          // preloaded module (it will fail earlier with the main entry)
          assert(ArrayIsArray(getOptionValue('--require')));
        }
      } else {
        resolvedArgv = 'repl';
      }
    }

    // Set breakpoint on module start
    if (resolvedArgv && !hasPausedEntry && filename === resolvedArgv) {
      hasPausedEntry = true;
      inspectorWrapper = internalBinding('inspector').callAndPauseOnStart;
    }
  }
  const dirname = path.dirname(filename);
  const require = makeRequireFunction(this, redirects);
  let result;
  const exports = this.exports;
  const thisValue = exports;
  const module = this;
  if (requireDepth === 0) statCache = new SafeMap();
  if (inspectorWrapper) {
    result = inspectorWrapper(compiledWrapper, thisValue, exports,
                              require, module, filename, dirname);
  } else {
    result = ReflectApply(compiledWrapper, thisValue,
                          [exports, require, module, filename, dirname]);
  }
  hasLoadedAnyUserCJSModule = true;
  if (requireDepth === 0) statCache = null;
  return result;
};
```

首先，它检查是否存在安全策略对象 `policy.manifest`，如果存在，表示有安全策略限制需要处理 将函数将模块文件名转换为URL格式，`redirects`是一个URL映射表，用于处理模块依赖关系，`manifest`则是一个**安全策略对象**，用于检测模块的完整性和安全性，然后调用`wrapSafe`

```js
function wrapSafe(filename, content, cjsModuleInstance) {
  if (patched) {
    const wrapper = Module.wrap(content);
    //支持esm的模块 
    //import { a } from './a.js'; 类似于eval
    //import()函数模式动态加载模块
    const script = new Script(wrapper, {
      filename,
      lineOffset: 0,
      importModuleDynamically: async (specifier, _, importAssertions) => {
        const loader = asyncESM.esmLoader;
        return loader.import(specifier, normalizeReferrerURL(filename),importAssertions);
      },
    });

    // Cache the source map for the module if present.
    if (script.sourceMapURL) {
      maybeCacheSourceMap(filename, content, this, false, undefined, script.sourceMapURL);
    }
    //返回一个可执行的全局上下文函数
    return script.runInThisContext({
      displayErrors: true,
    });
  }
```

`wrapSafe`调用了`wrap`方法

```js
let wrap = function(script) {
  return Module.wrapper[0] + script + Module.wrapper[1];
};
//(function (exports, require, module, __filename, __dirname) {
 //const xm = 18
//\n});
const wrapper = [
  '(function (exports, require, module, __filename, __dirname) { ',
  '\n})',
];
```

`wrap`方法，发现就是把我们的代码**包装**到一个函数里面

```js
//(function (exports, require, module, __filename, __dirname) {
//const xm = 18 我们的代码
//\n});
```

然后继续看`wrapSafe`函数，发现把返回的字符串即**包装**之后的代码放入**nodejs虚拟机**里面`Script`，看有没有动态import去加载，最后返回执行后的结果

然后继续看**_compile**，获取到`wrapSafe`返回的函数，通过`Reflect.apply`调用因为要填充五个参数`[exports, require, module, filename, dirname]`,最后返回执行完的结果

## 9-全局变量 & 全局API

### 全局变量

如何在`nodejs`定义全局变量呢？

在`nodejs`中使用`global`定义全局变量，新建文件`index.js`

```js
global.name = '全局变量'
require('./child.js')
```

创建文件`child.js`，运行会输出`全局变量`

```js
console.log(global.name)
```

> 注意require引入child文件需要在定义变量后，否则会访问到undefined

在浏览器中我们定义的全局变量都在`window`，`nodejs`在`global`，不同的环境还需要**判断**，于是在ECMAScript 2020 出现了一个**`globalThis`**全局变量，在`nodejs`环境自动切换`global`，浏览器环境自动切换`window`，非常方便

```js
globalThis.name = '全局变量' // 上面换为这个还是能读到
```

### 关于其他全局API

> nodejs中没有DOM和BOM，除了这些API，其他的ECMAscriptAPI基本都能用

例如下面，这些API 都是可以正常用的

```js
setTimeout、setInterval、Promise、Math、console、Date、fetch(node v18) 等...
```

### nodejs内置全局API

#### __dirname

它表示当前模块的所在`目录`的绝对路径

```js
console.log(__dirname)
```

#### __filename

它表示当前模块`文件`的绝对路径，包括文件名和文件扩展名

```js
console.log(__filename)
```

#### require module

```js
const fs = require('node:fs')
```

引入模块和模块导出上一章已经详细讲过了

#### process

1. `process.argv`: 这是一个包含**命令行参数**的数组。第一个元素是Node.js的执行路径，第二个元素是当前执行的JavaScript文件的路径，之后的元素是传递给脚本的命令行参数
2. `process.env`: 这是一个包含**当前环境变量**的对象。您可以通过`process.env`访问并操作**环境变量**
3. `process.cwd()`: 这个方法返回**当前工作目录**的路径
4. `process.on(event, listener)`: 用于**注册事件监听器**。您可以使用`process.on`监听诸如`exit`、`uncaughtException`等事件，并在事件发生时执行相应的回调函数
5. `process.exit([code])`: 用于**退出**当前的Node.js进程。您可以提供一个可选的退出码作为参数
6. `process.pid`: 这个属性返回当前进程的**PID**（进程ID）

这些只是`process`对象的一些常用属性和方法，还有其他许多属性和方法可用于监控进程、设置信号处理、发送IPC消息等

需要注意的是，`process`对象是一个**全局对象**，可以在任何模块中直接访问，无需导入或定义

#### Buffer

1. 创建 `Buffer` 实例：
   - `Buffer.alloc(size[, fill[, encoding]])`: 创建一个指定大小的新的`Buffer`实例，初始内容为零。`fill`参数可用于**填充缓冲区**，`encoding`参数指定填充的**字符编码**
   - `Buffer.from(array)`: 创建一个包含**给定数组**的`Buffer`实例
   - `Buffer.from(string[, encoding])`: 创建一个包含**给定字符串**的`Buffer`实例
2. 读取和写入数据：
   - `buffer[index]`: 通过**索引**读取或写入`Buffer`实例中的**特定字节**
   - `buffer.length`: 获取`Buffer`实例的**字节长度**
   - `buffer.toString([encoding[, start[, end]]])`: 将`Buffer`实例转换为**字符串**
3. 转换数据：
   - `buffer.toJSON()`: 将`Buffer`实例转换为**JSON对象**
   - `buffer.slice([start[, end]])`: 返回一个新的`Buffer`实例，其中包含原始`Buffer`实例的部分内容
4. 其他方法：
   - `Buffer.isBuffer(obj)`: **检查**一个对象是否是`Buffer`实例
   - `Buffer.concat(list[, totalLength])`: 将一组`Buffer`实例或字节数组**连接起来**形成一个新的`Buffer`实例

请注意，从**Node.js 6.0**版本开始，`Buffer`构造函数的使用已被弃用，推荐使用`Buffer.alloc()`、`Buffer.from()`等方法来创建`Buffer`实例

`Buffer`类在处理文件、网络通信、加密和解密等操作中非常有用，尤其是在需要处理二进制数据时

## 10-CSR  SSR  SEO

### 概述

在上一章的时候我们说过在node环境中无法操作DOM 和 BOM，但是如果非要操作DOM 和 BOM 也是可以的我们需要使用第三方库帮助我们`jsdom`

```sh
npm i jsdom
```

`jsdom` 是一个模拟浏览器环境的库，可以在 Node.js 中使用 DOM API

#### 简单案例

```js
const fs = require('node:fs')
const { JSDOM } = require('jsdom')

const dom = new JSDOM(`<!DOCTYPE html><div id='app'></div>`)

const document = dom.window.document

const window = dom.window
// fetch node 18版本之后才有
fetch('https://api.thecatapi.com/v1/images/search?limit=10&page=1').then(res => res.json()).then(data => {
    const app = document.getElementById('app')
    data.forEach(item=>{
       const img =  document.createElement('img')
       img.src = item.url
       img.style.width = '200px'
       img.style.height = '200px'
       app.appendChild(img)
    })
    fs.writeFileSync('./index.html', dom.serialize())
})
```

运行完该脚本会在执行目录下生成html文件，里面内容都是渲染好的

![image-20231027155719992](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20231027155719992.png)

### CSR SSR

我们上面的操作属于**SSR **`(Server-Side Rendering)`**服务端渲染**请求数据和拼装都在**服务端**完成

而我们的`Vue`，`React`等框架(这里不谈nuxtjs,nextjs)，是在**客户端**完成渲染拼接的属于**CSR**`(Client-Side Rendering)`**客户端渲染**

CSR 和 SSR 区别

1. 页面加载方式：
   - CSR：在 CSR 中，**服务器**返回一个初始的 **HTML** 页面，然后浏览器**下载并执行 JavaScript 文件**，JavaScript 负责动态生成并更新页面内容。这意味着初始页面加载时，内容较少，页面结构和样式可能存在一定的**延迟**。
   - SSR：在 SSR 中，服务器在**返回**给浏览器之前，会**预先**在**服务器端**生成完整的 HTML 页面，包含了初始的页面内容。浏览器接收到的是**已经渲染**好的 HTML 页面，因此初始加载的**速度较快**。
2. 内容生成和渲染：
   - CSR：在 CSR 中，页面的内容生成和渲染是由**客户端**的 JavaScript 脚本负责的。当数据变化时，JavaScript 会**重新生成并更新 DOM**，从而实现内容的动态变化。这种方式使得前端开发更加灵活，可以创建**复杂**的交互和动画效果。
   - SSR：在 SSR 中，**服务器**在渲染页面时会执行应用程序的代码，并生成最终的 HTML 页面。这意味着页面的初始内容是由服务器生成的，对于一些**静态**或**少变**的内容，可以提供更好的**首次加载性能**。
3. 用户交互和体验：
   - CSR：在 CSR 中，一旦初始页面加载完成，后续的用户交互通常是通过 AJAX 或 WebSocket 与服务器进行数据交互，然后通过 JavaScript 更新页面内容。这种方式可以提供更快的页面切换和响应速度，但对于**搜索引擎爬虫**和 **SEO**（搜索引擎优化）来说，可能需要一些额外的处理。
   - SSR：在 SSR 中，由于页面的初始内容是由服务器生成的，因此用户交互可以直接在服务器上执行，然后服务器返回更新后的页面。这样可以提供更好的**首次加载性能**和对**搜索引擎**友好的内容。

### SEO

SEO `（Search Engine Optimization）`**搜索引擎**优化

CSR应用对SEO并不是很友好

> 因为在首次加载的时候获取HTML 信息较少 搜索引擎爬虫可能无法获取完整的页面内容

如下的一个网页源代码	网址：[https://iviewui.com/view-ui-plus/guide/introduce](https://iviewui.com/view-ui-plus/guide/introduce)

![image-20231027161037567](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20231027161037567.png)

而SSR就不一样了 由于 SSR 在服务器端预先生成完整的 HTML 页面，搜索引擎爬虫可以直接获取到完整的页面内容。这有助于搜索引擎正确理解和评估页面的内容

下面是掘金，通过`nuxt.js`服务端渲染  网址：[https://juejin.cn/](https://juejin.cn/)

![image-20231027161156404](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20231027161156404.png)

说了这么多，哪些网站适合做CSR，哪些适合做SSR

CSR 应用：ToB型，例如后台管理系统、大屏可视化，都可以采用CSR渲染，不需要很高的SEO支持

SSR 应用：内容密集型应用ToC型，例如 新闻网站、博客网站、电子商务、门户网站，需要SEO支持

## 11-Path Windows 和 posix

> path模块在不同的操作系统是有差异的(windows | posix)

`windows`大家肯定熟悉，`posix`可能大家没听说过

**posix（Portable Operating System Interface of UNIX）**

`posix`表示**可移植操作系统接口**，也就是定义了一套**标准**

遵守这套标准的操作系统有(unix、linux、macOs、windows wsl)

为什么要定义这套标准？比如在Linux系统启动一个进程需要调用`fork`函数，在Windows启动一个进程需要调用`creatprocess`函数

这样就有问题，比如我在Linux写好了代码，需要移植到Windows发现函数不统一，`posix`标准的出现就是为了解决这个问题

Windows 并没有完全遵循 POSIX 标准，Windows 在设计上采用了不同于 POSIX 的路径表示方法

> 在 Windows 系统中，路径使用反斜杠（`\`）作为路径分隔符。这与 POSIX 系统使用的正斜杠（`/`）是不同的。这是 Windows 系统的历史原因所致，早期的 Windows 操作系统采用了不同的设计选择。

### Windows posix 差异

`path.basename()` 方法返回的是给定路径中的最后一部分

在posix处理Windows路径，会发现结果返回的并不对，应该返回 `myfile.html`

```js
path.basename('C:\temp\myfile.html');
// 返回: 'C:\temp\myfile.html'
```

如果要在`posix`系统处理Windows的路径，需要调用对应**操作系统**的方法，应该修改为

```js
path.win32.basename('C:\temp\myfile.html');
```

这样就能返回 `myfile.html`

### path.dirname

这个API和`basename`正好互补

```js
path.dirname('/aaaa/bbbb/cccc/index.html')
```

`dirname` API 返回 `/aaaa/bbbb/cccc` **除了**最后一个路径的**前面路径**。

`basename` API 返回 **最后一个路径** index.html

### path.extname

这个API 用来返回**扩展名**，例如`/bbb/ccc/file.txt` 返回就是`.txt`

```js
path.extname('/aaaa/bbbb/cccc/index.html.ccc.ddd.aaa')
//.aaa
```

> 如果有多个` .` 返回最后一个，如果没有扩展名，返回空

### path.join

这个API 主要是用来**拼接路径**的

```js
path.join('/foo','/cxk','/ikun')
// /foo/cxk/ikun
```

> 可以支持 .. ./ ../操作符

```js
path.join('/foo','/cxk','/ikun','../')
// /foo/cxk/
```

### path.resolve

用于将**相对路径解析**并且**返回绝对路径**

如果传入了**多个**绝对路径 它将返回**最右边**的绝对路径

```js
path.resolve('/aaa','/bbb','/ccc')
//   /ccc
```

传入绝对路径 + 相对路径

```js
path.resolve(__dirname,'./index.js')
//  /User/xiaoman/DeskTop/node/index.js
```

如果只传入相对路径

```js
path.resolve('./index.js')
// 返回工作目录 + index.js
```

### path.parse和path.format

`path.format` 和 `path.parse` 正好互补

**parse**用于解析文件路径

它接受一个**路径**字符串作为输入，并返回一个包含路径各个组成部分的**对象**

```js
path.parse('/home/user/dir/file.txt')
//返回如下
{
  root: '/',
  dir: '/home/user/dir',
  base: 'file.txt',
  ext: '.txt',
  name: 'file'
}
```

- `root`：路径的根目录，即 `/`
- `dir`：文件所在的目录，即 `/home/user/documents`
- `base`：文件名，即 `file.txt`
- `ext`：文件扩展名，即 `.txt`
- `name`：文件名去除扩展名，即 `file`

**format** 正好相反，把**对象**转回**字符串**

```js
path.format({
    root: '/',
    dir: '/home/user/documents',
    base: 'file.txt',
    ext: '.txt',
    name: 'file'
 })
 // /home/user/dir/file.txt
```

### path.sep

根据操作系统返回的值是不一样的

Windows返回是`\`		posix返回的是`/`

```js
console.log(path.sep)
```

## 12-OS

Nodejs os 模块可以跟操作系统进行交互

```js
var os = require("node:os")
```

### 常用的API

| 序号 |        API        | 作用                                                         |
| :--: | :---------------: | :----------------------------------------------------------- |
|  1   |   **os.type()**   | 它在 Linux 上返回 `'Linux'`，在 macOS 上返回 `'Darwin'`，在 Windows 上返回 `'Windows_NT'` |
|  2   | **os.platform()** | 返回标识为其编译 Node.js 二进制文件的**操作系统**平台的字符串。 该值在编译时设置。 可能的值为 `'aix'`、`'darwin'`、`'freebsd'`、`'linux'`、`'openbsd'`、`'sunos'`、以及 `'win32'`等 |
|  3   | **os.release()**  | 返回操作系统的版本例如`10.xxxx`代表 win10                    |
|  4   | **os.homedir()**  | 返回用户目录 例如`c:\user\su`，底层原理就是 windows下的`echo %USERPROFILE% `，posix系统下的`$HOME` |
|  5   |   **os.arch()**   | 返回cpu的架构  可能的值为 `'arm'`、`'arm64'`、`'ia32'`、`'mips'`、`'mipsel'`、`'ppc'`、`'ppc64'`、`'s390'`、`'s390x'`、以及 `'x64'` |
|  6   | **os.version()**  | 返回版本，如`Windows 10 Pro`                                 |

>  windows在cmd下输入`echo %USERPROFILE%`就会输出用户的目录

### 获取CPU的线程以及详细信息

```js
const os = require('node:os')
console.log(os.cpus())
console.log(os.cpus().length) // 读取CPU的线程，和电脑配置相同
```

输出如下的信息

```js
[
  {
    model: 'Intel(R) Core(TM) i7 CPU         860  @ 2.80GHz', // 表示CPU型号
    speed: 2926,// 表示CPU运行时一个时钟的速度
    times: {// 表示时间使用对象
      user: 252020,// 表示用户所使用程序的时间
      nice: 0,// 表示优先级低的用户的程序所使用的时间
      sys: 30340,// 表示系统内核所使用的时间
      idle: 1070356870,// 表示空闲的时间
      irq: 0,// 硬件被中断所使用的时间
    },
  },
  {
    model: 'Intel(R) Core(TM) i7 CPU         860  @ 2.80GHz',
    speed: 2926,
    times: {
      user: 306960,
      nice: 0,
      sys: 26980,
      idle: 1071569080,
      irq: 0,
    },
  },
  {
    model: 'Intel(R) Core(TM) i7 CPU         860  @ 2.80GHz',
    speed: 2926,
    times: {
      user: 248450,
      nice: 0,
      sys: 21750,
      idle: 1070919370,
      irq: 0,
    },
  },
  {
    model: 'Intel(R) Core(TM) i7 CPU         860  @ 2.80GHz',
    speed: 2926,
    times: {
      user: 256880,
      nice: 0,
      sys: 19430,
      idle: 1070905480,
      irq: 20,
    },
  },
] 
//.........
```

- `model`: 表示CPU的型号信息，其中 "Intel(R) Core(TM) i7 CPU 860 @ 2.80GHz" 是一种具体的型号描述
- `speed`: 表示CPU的时钟速度，以MHz或GHz为单位。在这种情况下，速度为 2926 MHz 或 2.926 GHz
- `times`: 是一个包含CPU使用时间的对象，其中包含以下属性：
  - `user`: 表示CPU被用户程序使用的时间（以毫秒为单位）
  - `nice`: 表示CPU被优先级较低的用户程序使用的时间（以毫秒为单位）
  - `sys`: 表示CPU被系统内核使用的时间（以毫秒为单位）
  - `idle`: 表示CPU处于空闲状态的时间（以毫秒为单位）
  - `irq`: 表示CPU被硬件中断处理程序使用的时间（以毫秒为单位）

例如我的电脑是六核十二线程就会获取到12个线程

![image.png](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/686623febf9a48e3b39ac66751d9bd43~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

### 获取网络信息

```js
const os = require('node:os')
console.log(os.networkInterfaces())
```

```js
{
  lo: [
    {
      address: '127.0.0.1',
      netmask: '255.0.0.0',
      family: 'IPv4',
      mac: '00:00:00:00:00:00',
      internal: true,
      cidr: '127.0.0.1/8'
    },
    {
      address: '::1',
      netmask: 'ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff',
      family: 'IPv6',
      mac: '00:00:00:00:00:00',
      scopeid: 0,
      internal: true,
      cidr: '::1/128'
    }
  ],
  eth0: [
    {
      address: '192.168.1.108',
      netmask: '255.255.255.0',
      family: 'IPv4',
      mac: '01:02:03:0a:0b:0c',
      internal: false,
      cidr: '192.168.1.108/24'
    },
    {
      address: 'fe80::a00:27ff:fe4e:66a1',
      netmask: 'ffff:ffff:ffff:ffff::',
      family: 'IPv6',
      mac: '01:02:03:0a:0b:0c',
      scopeid: 1,
      internal: false,
      cidr: 'fe80::a00:27ff:fe4e:66a1/64'
    }
  ]
} 
```

- `address`: 表示本地回环接口的IP地址，这里是 `'127.0.0.1'`
- `netmask`: 表示本地回环接口的子网掩码，这里是 `'255.0.0.0'`
- `family`: 表示地址族（address family），这里是 `'IPv4'`，表示IPv4地址
- `mac`: 表示本地回环接口的MAC地址，这里是 `'00:00:00:00:00:00'`。请注意，本地回环接口通常不涉及硬件，因此MAC地址通常为全零
- `internal`: 表示本地回环接口是否是内部接口，这里是 `true`，表示它是一个内部接口
- `cidr`: 表示本地回环接口的CIDR表示法，即网络地址和子网掩码的组合，这里是 `'127.0.0.1/8'`，表示整个 `127.0.0.0` 网络

### 案例

知道这些信息有什么用？

非常经典的例子 webpack vite 大家应该都用过 他们有一个配置项可以打开浏览器 `open:true` 我们来简单复刻一下

```js
const { exec } = require('child_process');
const os = require('os');

function openBrowser(url) {
  if (os.platform() === 'darwin') {  // macOS
    exec(`open ${url}`); //执行shell脚本
  } else if (os.platform() === 'win32') {  // Windows
    exec(`start ${url}`); //执行shell脚本
  } else {  // Linux, Unix-like
    exec(`xdg-open ${url}`); //执行shell脚本
  }
}

// Example usage
openBrowser('https://www.juejin.cn'); // 终端运行会打开掘金
```

## 13-process进程

`process` 是Nodejs操作当前进程和控制当前进程的API，并且是挂载到globalThis下面的全局API

### API 介绍

#### process.arch

`process.arch`返回操作系统 CPU 架构 跟我们之前讲的`os.arch` 一样 

值：`'arm'`、`'arm64'`、`'ia32'`、`'mips'`、`'mipsel'`、`'ppc'`、`'ppc64'`、`'s390'`、`'s390x'`、以及 `'x64'`

#### process.argv

`process.argv`获取执行进程后面的参数，返回是一个数组

后面我们讲到命令行交互工具的时候会很有用，各种cli脚手架也是使用这种方式接受配置参数例如`webpack`

![image-20240110102534763](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240110102534763.png)

#### process.cwd()

`process.cwd()`返回当前的工作目录

> ESM模式下，`__dirname`无法使用，这个是代替`__dirname`使用的

例如在 `E:\I Want to\大前端学习\大前端\8-Node.js学习\process>` 执行的脚本就返回这个目录

![image-20240110102915290](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240110102915290.png)

#### process.memoryUsage

`process.memoryUsage`用于获取当前进程的内存使用情况

该方法返回一个对象，其中包含了各种内存使用指标，如 rss（Resident Set Size，常驻集大小）、heapTotal（堆区总大小）、heapUsed（已用堆大小）和 external（外部内存使用量）等

```js
{
    rss: 30932992, // 常驻集大小 这是进程当前占用的物理内存量，不包括共享内存和页面缓存。它反映了进程实际占用的物理内存大小
    heapTotal: 6438912, //堆区总大小 这是 V8 引擎为 JavaScript 对象分配的内存量。它包括了已用和未用的堆内存
    heapUsed: 5678624,  //已用堆大小
    external: 423221, //外部内存使用量 这部分内存不是由 Node.js 进程直接分配的，而是由其他 C/C++ 对象或系统分配的
    arrayBuffers: 17606 //是用于处理二进制数据的对象类型，它使用了 JavaScript 中的 ArrayBuffer 接口。这个属性显示了当前进程中 ArrayBuffers 的数量
  }
```

#### process.exit()

调用 `process.exit()` 将强制进程退出，即使仍有未完全完成的异步操作挂起

下面例子5不会被打印出来 因为在2秒钟的时候就被退出了

```js
setTimeout(() => {
    console.log('5秒');
}, 5000);

setTimeout(() => {
    process.exit();
}, 2000)

process.on('exit', () => {
    console.log('进程退出了')
})
```

![image-20240110103223591](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240110103223591.png)

它还可以监听对应的方法

```js
process.on('exit',()=>{
    console.log('进程退出了')
})
```

#### process.kill

`process.kill`与`exit`类似，`kill`用来杀死一个进程，接受一个参数进程id可以通过`process.pid`获取

```js
process.kill(process.pid)
```

#### process.env

`process.env`用于读取**操作系统所有的环境变量**，也可以修改和查询环境变量

>  注意：修改并不会真正影响操作系统的变量，而是只在当前线程生效，线程结束便释放

![image-20240110103536994](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240110103536994.png)

### 环境变量场景

区分开发环境 和 生产环境

```sh
npm install cross-env
```

`cross-env`能跨平台设置和使用环境变量，不论是在Windows系统还是POSIX系统。同时，它提供了一个设置环境变量的脚本，使得您可以在脚本中以unix方式设置环境变量，然后在Windows上也能兼容运行

如下，在package中设置`cross-env NODE_ENV=dev`

![image-20240110103811538](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240110103811538.png)

`cross-env`原理:

+ 如果是windows，就调用SET 设置环境变量
+ 如果是posix，就调用export 设置环境变量

```sh
set NODE_ENV=production  #windows
export NODE_ENV=production #posix
```

## 14-child_process 子进程 核心API

子进程是Nodejs核心API，如果你会shell命令，他会有非常大的帮助，或者你喜欢编写前端工程化工具之类的，他也有很大的用处，以及处理CPU密集型应用。

### 创建子进程

Nodejs创建子进程共有`7个`API Sync同步API 不加是异步API

1. `exec`   执行命令(异步执行)
2. `execSync` 执行命令(同步执行)
3. `execFile`   执行可执行文件(异步执行)
4. `execFileSync` 执行可执行文件(同步执行)
5. `spawn`  执行命令(异步执行)
6. `spawnSync` 执行命令(同步执行)
7. `fork`   创建node子进程

### API示例

#### exec方法

`exec`适合执行较小的shell命令，有字节上限：200kb

```sh
child_process.exec(command, [options], callback)
```

`exec`获取nodejs 版本号

```js
 exec('node -v',(err,stdout,stderr)=>{
    if(err){
        return  err
    }
    console.log(stdout.toString())
 })
```

`options`配置项

1. cwd <string> 子进程的当前工作目录。
2. env <Object> 环境变量键值对。
3. encoding <string> 默认为 'utf8'。
4. shell <string> 用于执行命令的 shell。 在 UNIX 上默认为 '/bin/sh'，在 Windows 上默认为process.env.ComSpec。 详见 Shell Requirements 与 Default Windows Shell。
5. timeout <number> 默认为 0。
6. maxBuffer <number> stdout 或 stderr 允许的最大字节数。 默认为 200*1024。 如果超过限制，则子进程会被终止。 查看警告： maxBuffer and Unicode。
7. killSignal <string> | <integer> 默认为 'SIGTERM'。
8. uid <number> 设置该进程的用户标识。（详见 setuid(2)）
9. gid <number> 设置该进程的组标识。（详见 setgid(2)）

#### execSync方法

获取node版本号 如果要执行单次`shell`命令，`execSync`方便一些，`options`同上

```js
const nodeVersion  = execSync('node -v')
console.log(nodeVersion.toString("utf-8"))
```

打开谷歌浏览器 使用exec可以打开一些软件例如 wx 谷歌 qq音乐等 以下会打开百度并且进入`无痕模式`

```js
execSync("start chrome http://www.baidu.com --incognito")
```

#### execFile方法

`execFile`适合执行**可执行文件**，例如执行一个node脚本，或者shell文件

windows可以编写cmd脚本，posix可以编写sh脚本

> 简单示例

新建文件`bat.cmd`写入以下代码。

创建一个文件夹mkdir，进入目录，写入一个文件test.js，最后执行。

```cmd
echo '开始'

mkdir test 

cd ./test

echo console.log("test1232131") >test.js

echo '结束'

node test.js
```

使用`execFile`执行这个

```js
execFile(path.resolve(process.cwd(),'./bat.cmd'),null,(err,stdout)=>{
    console.log(stdout.toString())
})
```

![image-20240110104931849](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240110104931849.png)

#### spawn方法(异步用的多)

`spawn`用于执行一些实时获取的信息，因为spawn返回的是流边执行边返回

`exec`是返回一个完整的buffer，buffer的大小是**200k**，如果**超出**会报错，而`spawn`是无上限的。

```js
//                       命令      参数  options配置和上面一样
const {stdout} = spawn('netstat',['-an'],{})

//返回的数据用data事件接受
stdout.on('data',(steram)=>{
    console.log(steram.toString())
})
stdout.on('close',(msg)=>{
    console.log('结束了')
})
```

![image-20240110105244066](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240110105244066.png)

> exec -> execFile -> spawn
>
> exec是底层通过execFile实现，execFile底层通过spawn实现

#### fork

场景适合大量的计算，或者容易阻塞主进程操作的一些代码，就适合开发fork

新建`index.js`文件，写入以下

```js
const {fork} = require('child_process')

const testProcess = fork('./test.js')

testProcess.send('我是主进程')

testProcess.on("message",(data)=>{
    console.log('我是主进程接受消息111：',data)
})
```

新建`test.js`文件，写入以下

```js
process.on('message',(data)=>{
    console.log('子进程接受消息：',data)
})

process.send('我是子进程')
```

> send 发送信息 ，message接收消息，可以相互发送接收。

fork底层使用的是IPC通道进行通讯的，IPC基于libuv实现

根据不同操作系统调用不同的API

![image-20231027195659901](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20231027195659901.png)

## 15-FFmpeg

FFmpeg 是一个开源的跨平台多媒体处理工具，可以用于处理音频、视频和多媒体流。它提供了一组强大的命令行工具和库，可以进行视频转码、视频剪辑、音频提取、音视频合并、流媒体传输等操作。

### FFmpeg 的主要功能和特性：

1. 格式转换：FFmpeg 可以将一个媒体文件从一种格式转换为另一种格式，支持几乎所有常见的音频和视频格式，包括 MP4、AVI、MKV、MOV、FLV、MP3、AAC 等。
2. 视频处理：FFmpeg 可以进行视频编码、解码、裁剪、旋转、缩放、调整帧率、添加水印等操作。你可以使用它来调整视频的分辨率、剪辑和拼接视频片段，以及对视频进行各种效果处理。
3. 音频处理：FFmpeg 可以进行音频编码、解码、剪辑、混音、音量调节等操作。你可以用它来提取音频轨道、剪辑和拼接音频片段，以及对音频进行降噪、均衡器等处理。
4. 流媒体传输：FFmpeg 支持将音视频流实时传输到网络上，可以用于实时流媒体服务、直播和视频会议等应用场景。
5. 视频处理效率高：FFmpeg 是一个高效的工具，针对处理大型视频文件和高分辨率视频进行了优化，可以在保持良好质量的同时提供较快的处理速度。
6. 跨平台支持：FFmpeg 可以在多个操作系统上运行，包括 Windows、MacOS、Linux 等，同时支持多种硬件加速技术，如 NVIDIA CUDA 和 Intel Quick Sync Video。

### 安装FFmpeg

[官方网址](https://ffmpeg.p2hp.com/download.html)，选择对应的操作系统下载即可，Windows点击第一个，找到`release builds`下载zip包

![image-20231027201345633](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20231027201345633.png)

下载完成配置一下环境变量就ok了，输入 `ffmpeg -version` 不报错即可

![image-20231027203240100](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20231027203240100.png)

### 子进程配合ffmpeg

常用的五个功能如下，更多的可以查看官网

#### **转换格式**

简单的demo 视频转gif ，`-i` 表示输入的意思

```js
const {execSync} = require('child_process')
execSync(`ffmpeg -i test.mp4 test.gif`,{stdio:'inherit'})
```

![image-20231027203755592](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20231027203755592.png)

 #### 视频裁剪 + 控制大小**

`-ss`起始时间	`-to`结束事件

> ss写在 -i的前面可能会导致精度问题，因为视频还没解析就跳转到了相关位置，但是解析速度快

> ss写在 -i后面精度没问题，但是解析速度会变慢

```js
const {execSync} = require('child_process')

execSync(`ffmpeg -ss 10 -to 20 -i test.mp4  test3.mp4`,{stdio:'inherit'})
```

如下，该视频只有十秒被我们截取出来了

1![image-20231027204459239](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20231027204459239.png)

#### **提取视频的音频**

```js
const {execSync} = require('child_process')
execSync(`ffmpeg -i test.mp4 test.mp3`,{stdio:'inherit'})
```

如下，音频已经被我们提取出来了

![image-20231027204440891](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20231027204440891.png)

#### **添加水印**

`-vf `就是`video filter`

`drawtext`添加文字、`fontsize`大小、`xy`垂直水平方向、`fontcolor`颜色、`text`水印文案 

>  以上内容`全部小写`

```js
const {execSync} = require('child_process')

execSync(`ffmpeg -i test.mp4 -vf drawtext=text="Su":fontsize=30:fontcolor=white:x=10:y=10 test2.mp4`,{stdio:'inherit'})
```

可以发现水印已经添加上了

![image-20231027204542720](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20231027204542720.png)

#### **去掉水印**

`w h`宽高，`xy` 垂直水平坐标，`delogo`使用的过滤参数删除水印

宽高就是通过上面的水印大小，我们上面大小为30，有两个字符，所以w为60，h即30，x和y与上面一致

```js
const {execSync} = require('child_process')

execSync(`ffmpeg -i  test2.mp4 -vf delogo=w=60:h=30:x=10:y=10 test3.mp4`,{stdio:'inherit'})
```

可以发现水印已经去除了

![image-20231027205058567](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20231027205058567.png)

## 16-events 事件触发器

### EventEmitter

Node.js 核心 API 都是采用**异步事件驱动架构**

简单来说就是通过有效的方法来监听事件状态的变化，并在变化的时候做出相应的动作。

```js
fs.mkdir('/tmp/a/apple', { recursive: true }, (err) => {
  if (err) throw err;
});
process.on('xxx',()=>{

})
```

举个例子，你去一家餐厅吃饭，这个餐厅就是一个`调度中心`，然后你去点饭，可以理解注册了一个事件`emit`,然后我们等候服务员的喊号，喊到我们的时候就去取餐，这就是监听了这个事件`on`

### 事件模型

Nodejs事件模型采用了，**`发布订阅设计模式`**

![image-20231027215124525](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20231027215124525.png)

当一个发布者有新消息时，就将这个消息发布到调度中心。调度中心就会将这个消息通知给所有订阅者。这就实现了发布者和订阅者之间的解耦，发布者和订阅者不再直接依赖于彼此，他们可以独立地扩展自己

### 代码案例

新建一个文件，输入如下代码，

```js
const EventEmitter = require('events');

const event = new EventEmitter()
//监听test事件
event.on('test',(data)=>{
    console.log(data)
})

event.emit('test','susususu') //派发事件
```

监听消息数量默认是10个，下面的代码超出了10个但只会输出10个

```js
const EventEmitter = require('events');

const event = new EventEmitter()

event.on('test', (data) => {
    console.log(data)
})
event.on('test', (data) => {
    console.log(data)
})
event.on('test', (data) => {
    console.log(data)
})
event.on('test', (data) => {
    console.log(data)
})
event.on('test', (data) => {
    console.log(data)
})
event.on('test', (data) => {
    console.log(data)
})
event.on('test', (data) => {
    console.log(data)
})
event.on('test', (data) => {
    console.log(data)
})
event.on('test', (data) => {
    console.log(data)
})

event.on('test', (data) => {
    console.log(data)
})
event.on('test',(data)=>{
    console.log(data)
})
event.on('test',(data)=>{
    console.log(data)
})

event.emit('test', 'susususu')
```

如何解除限制？调用 `setMaxListeners` 传入数量

```js
event.setMaxListeners(20)
console.log(event.getMaxListeners()) // 获取，输出20
```

只想**监听一次**，使用`once`监听，即使`emit`派发多次也只触发一次

```js
const EventEmitter = require('events');

const event = new EventEmitter()
event.setMaxListeners(20)
event.once('test', (data) => {
    console.log(data)
})

event.emit('test', 'susususu1')
event.emit('test', 'susususu2')
```

如何取消侦听？使用`off`

```js
const EventEmitter = require('events');

const event = new EventEmitter()

const fn = (msg) => {
   console.log(msg)
}
event.on('test', fn)
event.off('test', fn)

event.emit('test', 'susususu1')
event.emit('test', 'susususu2')
```

### 使用地方

**`process`**的底层用到了`events`的模块

![image-20231027215433241](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20231027215433241.png)

打开nodejs 源码，搜索 `setupProcessObject` 这个函数

![image-20231028003637462](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20231028003637462.png)

1. 它首先引入`event`模块
2. 获取`process`的**原型对象**
3. 将`evnet`的**原型对象**设置给了`process`的**原型对象**并且重新绑定上下文
4. 将`process`挂载到`globalThis`，所以我们可以全局访问这个API

> 我们给`fn`的原型上添加了一个属性`test`，我们如何读到原型上的属性呢？如下
>
> 通过`Object.getPrototypeOf()`方法就可以访问，上面的源码就用到了

```js
let fn = function() { }
fn.prototype.test = 111
let a = new fn()
console.log(Object.getPrototypeOf(a)) // 输出 { test: 111 }
```

> 我们如何把`b`原型上的属性嫁接到`a`原型呢？通过`Object.setPrototypeOf()`方法

```js
let fn = function() { }
let fn2 = function() { }
fn.prototype.test = 111
fn2.prototype.test = 666
let a = new fn()
let b = new fn2()
Object.setPrototypeOf(a,b)
console.log(a.test) // 输出 666
```

## 17-util

util是Node.js内部提供的很多实用或工具类型的API，用来方便我们快速开发，下面介绍一些常用的API

### util.promisify

Node.js 大部分的API都是遵循回调函数的模式去编写的

参考上面的第14章子进程其中的`exec`，如下，查看node版本

```js
import { exec } from 'node:child_process';
exec('node -v',(err, stdout)=>{
    if(err){
        return err;
    }
    console.log(stdout);
});
```

这就是常规的写法

我们使用`util.promisify`，可以将回调函数改为Promise风格，Promisfiy接收`original`(一个函数体)，如下

```js
import { exec } from 'node:child_process';
import util from 'node:util';

const execPromise = util.promisify(exec);
// 如果返回多个参数 res 是一个对象，如果返回一个参数就直接返回
execPromise('node -v').then(res=>{
    console.log('res--',res);
}).catch(err=>{
    console.log('err--',err);
})
```

#### promisify如何实现

+ 第一步：promisify是返回一个新的函数，因此如下

```js
const promiseify = () => {
    return () => {
        
    }
}
```

+ 第二步：promiseify接收一个函数，并且需要在返回的函数中接收真正的参数，然后返回一个Promise，如下

```js
const promiseify = (original) => {
   return (...args) => {
     return new Promise((resolve,reject)=>{
        
     })
  }
}
```

+ 调用真正的函数，将参数透传给`original`，如果失败就reject，成功就返回resolve，有多个的话返回一个对象

```js
const promiseify = (original) => {
    return (...args) => {
        return new Promise((resolve, reject) => {
            original(...args, (err, ...values) => {
                if (err) {
                    return reject(err)
                }
                if (values && values.length > 1) {
                    let obj = {}
                    console.log(values)
                    for (let key in values) {
                        obj[key] = values[key]
                    }
                    resolve(obj)
                } else {
                    resolve(values[0])
                }
            })
        })
    }
}
```

这样我们可以**大致**实现该工具

注意：该实现是拿不到values的key的，因为Node.js内部没有开放`kCustomPromisifyArgsSymbol`这个Symbol给我们

因此输出的结果是`{ '0': 'v18.16.0\n', '1': '' }`

而正常的结果应该是`{ stdout: 'v18.16.0\n', stderr: '' }`

### util.callbackify

这个和上面的API正好相反，是将Promise类型的API变为回调函数

如下使用

```js
import util from 'node:util';

const fn = (type) => {
    if(type == 1){
        return Promise.resolve('test');
    }
    return Promise.reject('error');
}


const callback = util.callbackify(fn);

callback(1222,(err,val)=>{
    console.log(err,val);
})
```

#### 剖析callbackify

如下，考虑到多个参数情况，回调函数肯定是在最后一个，通过pop方法将其取出

```js
const callbackify = (fn) => {
    return (...args) => {
        let callback = args.pop()
        fn(...args).then(res => {
            callback(null, res)
        }).catch(err => {
            callback(err)
        })
    }
}
```

### util.format

函数如下

```js
util.format(format, [args])
```

其中第一个format参数，语法和C语言基本一致，如下

+ `%s`:(`String`)将用于转换除 `BigInt`、`Object` 和 `-0` 之外的所有值

>  `BigInt` 值将用 `n` 表示，没有用户定义的 `toString` 函数的对象使用具有选项 `{ depth: 0, colors: false, compact: 3 }` 的 `util.inspect()` 进行检查。

+ `%d`:(`Numer`)将用于转换除 `BigInt` 和 `Symbol` 之外的所有值
+ `%i`:(`parseInt(value, 10)`)用于除 `BigInt` 和 `Symbol` 之外的所有值
+ `%f`:(`parseFloat(value)`)用于除 `Symbol` 之外的所有值
+ `%j`:(`JSON`) 如果参数包含循环引用，则替换为字符串 `'[Circular]'`

+ `%o`:(`Object`)具有通用 JavaScript 对象格式的对象的字符串表示形式。 类似于具有选项 `{ showHidden: true, showProxy: true }` 的 `util.inspect()`。 这将显示完整的对象，包括不可枚举的属性和代理

+ `%O`: (`Object`). 具有通用 JavaScript 对象格式的对象的字符串表示形式。 类似于没有选项的 `util.inspect()`。 这将显示完整的对象，但不包括不可枚举的属性和代理

+ `%c`: (`CSS`). 此说明符被忽略，将跳过任何传入的 CSS

+ `%%`: 单个百分号 (`'%'`)。 这不消费参数

下面是例子，格式化一个字符串

```js
import util from 'node:util';
const result = util.format('%s------%s %s/%s', 'su', 'zhenghui', 'hui', 'chen');
console.log(result);
```

结果如下：

![image-20231124150745619](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20231124150745619.png)

 如果不传入格式化的参数，就会按照空格分开

```js
import util from 'node:util';
const result = util.format(1,2,3)
console.log(result);
```

结果如下：

![image-20231124150858831](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20231124150858831.png)

## 18-pngquant

### 什么是pngquant?

`pngquant` 是一个用于压缩 PNG 图像文件的工具。它可以显著减小 PNG 文件的大小，同时保持图像质量和透明度。

通过减小文件大小，可以提高网页加载速度，并节省存储空间。`pngquant` 提供命令行接口和库，可轻松集成到各种应用程序和脚本中。

[前往pngquant官网下载](http://pngquant.com/)

> 下载完配置一下环境变量，终端输入`pngquant --version`输出版本号即成功

### 原理是什么

pngquant 使用修改过的 Median Cut 量化算法以及其他技术来实现压缩 PNG 图像的目的。它的工作原理如下：

1. 首先，pngquant 构建一个直方图，用于统计图像中的颜色分布情况。
2. 接下来，它选择盒子来代表一组颜色。与传统的 Median Cut 算法不同，pngquant 选择的盒子是为了最小化盒子中颜色与中位数的差异。
3. pngquant 使用感知模型给予图像中噪声较大的区域较少的权重，以建立更准确的直方图。
4. 为了进一步改善颜色，pngquant 使用类似梯度下降的过程对直方图进行调整。它多次重复 Median Cut 算法，并在较少出现的颜色上增加权重。
5. 最后，为了生成最佳的调色板，pngquant 使用 Voronoi 迭代（K-means）对颜色进行校正，以确保局部最优。
6. 在重新映射颜色时，pngquant 只在多个相邻像素量化为相同颜色且不是边缘的区域应用误差扩散。这样可以避免在视觉质量较高且不需要抖动的区域添加噪声。

通过这些步骤，pngquant 能够在保持图像质量的同时，将 PNG 图像的文件大小减小到最低限度。

### Median Cut 量化算法

假设我们有一张 8x8 像素的彩色图像，每个像素由红色、绿色和蓝色通道组成，每个通道的值范围是 0 到 255。

1. 初始化：我们将图像中的每个像素视为一个颜色点，并将它们放入一个初始的颜色桶。

2. 选择划分桶：在初始的颜色桶中选择一个具有最大范围的颜色通道，假设我们选择红色通道。

3. 划分颜色：对于选定的红色通道，将颜色桶中的颜色按照红色通道的值进行排序，并找到中间位置的颜色值作为划分点。假设划分点的红色值为 120。

   划分前的颜色桶：

   - 颜色1: (100, 50, 200)
   - 颜色2: (150, 30, 100)
   - 颜色3: (80, 120, 50)
   - 颜色4: (200, 180, 160)

   划分后的颜色桶：

   - 子桶1:

     + 颜色1: (100, 50, 200)

     - 颜色3: (80, 120, 50)

   - 子桶2:

     - 颜色2: (150, 30, 100)
     - 颜色4: (200, 180, 160)

4. 重复划分：我们继续选择颜色范围最大的通道，假设我们选择子桶1中的绿色通道。

   划分前的颜色桶（子桶1）：

   - 颜色1: (100, 50, 200)
   - 颜色3: (80, 120, 50)

   划分后的颜色桶（子桶1）：

   - 子桶1.1:
     - 颜色3: (80, 120, 50)
   - 子桶1.2:
     - 颜色1: (100, 50, 200)

   子桶2中只有两个颜色，不需要再进行划分。

5. 颜色映射：将原始图像中的每个像素颜色映射到最接近的颜色桶中的颜色。

   假设原始图像中的一个像素为 (110, 70, 180)，我们将它映射到颜色1: (100, 50, 200)

   大概的公式为 `sqrt((110-100)^2 + (70-50)^2 + (180-200)^2) ≈ 31.62`

   通过 Median Cut 算法，我们将原始图像中的颜色数目从 64 个（8x8 像素）减少到 4 个颜色桶，从而实现了图像的量化

### Nodejs 中调用 pngquant

同样可以使用`exec`命令来调用，73kb的图片压缩完之后为22kb

```js
import { exec } from 'child_process'
exec('pngquant 73kb.png --output test.png')
```

`--quality`参数表示图片质量，值范围0-100，值越大，图片体积越大，但图片质量越好

```js
import { exec } from 'child_process'
exec('pngquant 73kb.png --quality=82 --output test.png')
```

+ `--speed=1`：最慢的速度，产生最高质量的输出图像

+ `--speed=10`：最快的速度，但可能导致输出图像质量降低

  > 取值范围1-10，值越小越慢，但质量高，值越大越快，但质量一般

```js
import { exec } from 'child_process'
exec('pngquant 73kb.png --speed=1 --quality=82 --output test.png')
```

## 19-fs上

### 概述

在 Node.js 中，`fs` 模块是文件系统模块（File System module）的缩写，它提供了与文件系统进行交互的各种功能。通过 `fs` 模块，你可以执行诸如读取文件、写入文件、更改文件权限、创建目录等操作，`fs`模块是`Node.js 核心API之一`。

### fs多种策略

如下代码

```js
import fs from 'node:fs';
import fs2 from 'node:fs/promises';
//读取文件
fs2.readFile('./index.txt').then(result => {
    console.log(result.toString());
});
fs.readFile('./index.txt', (err, data) => {
    if (err) {
        return err;
    }
    console.log(data.toString());
});
let txt = fs.readFileSync('./index.txt');
console.log(txt.toString());
```

1. fs支持同步和异步两种模式 ，增加了`Sync` fs 就会采用同步的方式运行代码，会阻塞下面的代码，不加Sync就是异步的模式不会阻塞。

2. fs新增了promise版本，只需要在引入包后面增加/promises即可，fs便可支持promise回调。

3. fs返回的是一个buffer二进制数据 每两个十六进制数字表示一个字节

buffer如下:

```js
<Buffer 31 e3 80 81 e9 82 a3 e4 b8 80 e5 b9 b4 e5 86 b3 e8 b5 9b ef bc 8c e6 98 af 53 53 47 e5 af b9 e6 88 98 53 4b 54 ef bc 8c e6 9c 80 e7 bb 88 e6 af 94 e5 ... 635 more bytes>
```

### 常用API 介绍

#### 读取文件 `readFile`

第一个参数 读取的路径， 第二个参数是个配置项

配置项第一个是encoding，支持各种编码 utf-8之类的

配置项第二个是flag，它的配置就很多了，如下

- `'a'`: 打开文件进行追加。 如果文件不存在，则创建该文件。

- `'ax'`: 类似于 `'a'` 但如果路径存在则失败。

- `'a+'`: 打开文件进行读取和追加。 如果文件不存在，则创建该文件。

- `'ax+'`: 类似于 `'a+'` 但如果路径存在则失败。

- `'as'`: 以同步模式打开文件进行追加。 如果文件不存在，则创建该文件。

- `'as+'`: 以同步模式打开文件进行读取和追加。 如果文件不存在，则创建该文件。

- `'r'`: 打开文件进行读取。 如果文件不存在，则会发生异常。

- `'r+'`: 打开文件进行读写。 如果文件不存在，则会发生异常。

- `'rs+'`: 以同步模式打开文件进行读写。 指示操作系统绕过本地文件系统缓存。

  这主要用于在 NFS 挂载上打开文件，因为它允许跳过可能过时的本地缓存。 它对 I/O 性能有非常实际的影响，因此除非需要，否则不建议使用此标志。

  这不会将 `fs.open()` 或 `fsPromises.open()` 变成同步阻塞调用。 如果需要同步操作，应该使用类似 `fs.openSync()` 的东西。

- `'w'`: 打开文件进行写入。 创建（如果它不存在）或截断（如果它存在）该文件。

- `'wx'`: 类似于 `'w'` 但如果路径存在则失败。

- `'w+'`: 打开文件进行读写。 创建（如果它不存在）或截断（如果它存在）该文件。

- `'wx+'`: 类似于 `'w+'` 但如果路径存在则失败。

示例代码：

```js
import fs2 from 'node:fs/promises'

fs2.readFile('./index.txt',{
    encoding:"utf8",
    flag:"",
}).then(result => {
    console.log(result.toString())
})
```

#### 使用可读流读取

使用场景:适合读取`大文件`

```js
const readStream = fs.createReadStream('./index.txt',{
    encoding:"utf8"
})

readStream.on('data',(chunk)=>{
    console.log(chunk)
})

readStream.on('end',()=>{
    console.log('close')
})
```

#### 创建文件夹

如果开启 recursive 可以递归创建多个文件夹

```js
fs.mkdir('path/test/ccc', { recursive: true },(err)=>{

})
```

#### 删除文件夹

如果开启recursive 递归删除全部文件夹

```js
fs.rm('path', { recursive: true },(err)=>{

})
```

#### 重命名文件

第一个参数原始名称 第二个参数新的名称

```js
fs.renameSync('./test.txt','./test2.txt')
```

#### 监听文件的变化

返回监听的事件如`change`,和监听的内容`filename`

```js
fs.watch('./test2.txt',(event,filename)=>{   
    console.log(event,filename)
})
```

### 源码解析

[github源码地址](https://github.com/libuv/libuv)

目录：src/unix/fs.c

fs的源码是通过 `C++` 层的 `FSReqCallback` 这个类 对`libuv` 的`uv_fs_t` 的一个封装，其实也就是将我们fs 的参数透传给 `libuv` 层

![](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20231128162647804.png)

mkdir 举例

```c
// 创建目录的异步操作函数，通过uv_fs_mkdir函数调用
// 参数：
// - loop: 事件循环对象，用于处理异步操作
// - req: 文件系统请求对象，用于保存操作的状态和结果
// - path: 要创建的目录的路径
// - mode: 目录的权限模式 777 421
// - cb: 操作完成后的回调函数
int uv_fs_mkdir(uv_loop_t* loop,
                uv_fs_t* req,
                const char* path,
                int mode,
                uv_fs_cb cb) {
  INIT(MKDIR);
  PATH;
  req->mode = mode;
  if (cb != NULL)
    if (uv__iou_fs_mkdir(loop, req))
      return 0;
  POST;
}
```

### 注意事项

```js
const fs = require('node:fs')

fs.readFile('./index.txt', {
    encoding: 'utf-8',
    flag: 'r'
}, (err, dataStr) => {
    if (err) throw err
    console.log('fs')
})

setImmediate(() => {
    console.log('setImmediate')
})
```

为什么先走setImmediate 呢，而不是fs呢?

Node.js 读取文件的时候是使用libuv进行调度的，而setImmediate是由V8进行调度的

文件读取完成后 libuv 才会将 fs的结果 推入V8的队列

## 20-fs下

### 概述

在 Node.js 中，`fs` 模块是文件系统模块（File System module）的缩写，它提供了与文件系统进行交互的各种功能。通过 `fs` 模块，你可以执行诸如读取文件、写入文件、更改文件权限、创建目录等操作，`Node.js 核心API之一`。

### API

#### 写入内容

```js
const fs = require('node:fs')

fs.writeFileSync('index.txt', 'java之父\n余胜军')
```

1. 第一个参数写入的文件

2. 第二个参数写入的内容

3. 第三个是options可选项 encoding编码 mode权限 flag如下

   + `'a'`: 打开文件进行追加。 如果文件不存在，则创建该文件。

   + `'ax'`: 类似于 `'a'` 但如果路径存在则失败。

   + `'a+'`: 打开文件进行读取和追加。 如果文件不存在，则创建该文件。

   + `'ax+'`: 类似于 `'a+'` 但如果路径存在则失败。

   + `'as'`: 以同步模式打开文件进行追加。 如果文件不存在，则创建该文件。

   + `'as+'`: 以同步模式打开文件进行读取和追加。 如果文件不存在，则创建该文件。

   + `'r'`: 打开文件进行读取。 如果文件不存在，则会发生异常。

   + `'r+'`: 打开文件进行读写。 如果文件不存在，则会发生异常。

   + `'rs+'`: 以同步模式打开文件进行读写。 指示操作系统绕过本地文件系统缓存。

     > 这主要用于在 NFS 挂载上打开文件，因为它允许跳过可能过时的本地缓存。 它对 I/O 性能有非常实际的影响，因此除非需要，否则不建议使用此标志。
     >
     > 这不会将 `fs.open()` 或 `fsPromises.open()` 变成同步阻塞调用。 如果需要同步操作，应该使用类似 
     >
     > `fs.openSync()` 的东西。

   + `'w'`: 打开文件进行写入。 创建（如果它不存在）或截断（如果它存在）该文件。
   + `'wx'`: 类似于 `'w'` 但如果路径存在则失败。
   + `'w+'`: 打开文件进行读写。 创建（如果它不存在）或截断（如果它存在）该文件。
   + `'wx+'`: 类似于 `'w+'` 但如果路径存在则失败。

#### 追加内容

第一种方式 设置flag为a可以追加

```js
fs.writeFileSync('index.txt', '\nvue之父\n鱿鱼须',{
    flag: 'a'
})
```

查看内容

```tex
java之父
余胜军
vue之父
鱿鱼须
```

第二种方式

```js
const fs = require('node:fs')

fs.appendFileSync('index.txt', '\njava创始人\n马士兵')
```

使用`appendFileSync`也可以追加内容

### 可写流

```js
const fs = require('node:fs')

let verse = [
    '待到秋来九月八',
    '我花开后百花杀',
    '冲天香阵透长安',
    '满城尽带黄金甲'
]

let writeStream = fs.createWriteStream('index.txt')

verse.forEach(item => {
    writeStream.write(item + '\n')
})

writeStream.end()

writeStream.on('finish',()=>{
    console.log('写入完成')
})
```

我们可以创建一个可写流 打开一个通道，可以一直写入数据，用于处理大量的数据写入，写入完成之后调用end 关闭可写流，监听finish 事件 写入完成

### 硬链接 和 软连接

```js
fs.linkSync('./index.txt', './index2.txt') //硬链接

fs.symlinkSync('./index.txt', './index3.txt' ,"file") //软连接
```

硬链接的作用和用途如下：

1. 文件共享：硬链接允许多个文件名指向同一个文件，这样可以在不同的位置使用不同的文件名引用相同的内容。这样的共享文件可以节省存储空间，并且在多个位置对文件的修改会反映在所有引用文件上。
2. 文件备份：通过创建硬链接，可以在不复制文件的情况下创建文件的备份。如果原始文件发生更改，备份文件也会自动更新。这样可以节省磁盘空间，并确保备份文件与原始文件保持同步。
3. 文件重命名：通过创建硬链接，可以为文件创建一个新的文件名，而无需复制或移动文件。这对于需要更改文件名但保持相同内容和属性的场景非常有用。

软链接的一些特点和用途如下：

1. 软链接可以创建指向文件或目录的引用。这使得你可以在不复制或移动文件的情况下引用它们，并在不同位置使用不同的文件名访问相同的内容。
2. 软链接可以用于创建快捷方式或别名，使得你可以通过一个简短或易记的路径来访问复杂或深层次的目录结构。
3. 软链接可以用于解决文件或目录的位置变化问题。如果目标文件或目录被移动或重命名，只需更新软链接的目标路径即可，而不需要修改引用该文件或目录的其他代码。

## 21-crypto

crypto模块的目的是为了提供通用的`加密和哈希算法`。用纯JavaScript代码实现这些功能不是不可能，但速度会非常慢。nodejs用C/C++实现这些算法后，通过crypto这个模块暴露为JavaScript接口，这样用起来方便，运行速度也快。

密码学是计算机科学中的一个重要领域，它涉及到加密、解密、哈希函数和数字签名等技术。Node.js是一个流行的服务器端JavaScript运行环境，它提供了强大的密码学模块，使开发人员能够轻松地在其应用程序中实现各种密码学功能。本文将介绍密码学的基本概念，并探讨Node.js中常用的密码学API。

### 对称加密

​	对称加密是一种简单而快速的加密方式，它使用**相同的密钥**（称为对称密钥）来进行加密和解密。这意味着发送者和接收者在加密和解密过程中都使用相同的密钥。对称加密算法的加密速度很快，适合对大量数据进行加密和解密操作。然而，对称密钥的安全性是一个挑战，因为需要确保发送者和接收者都安全地共享密钥，否则有风险被未授权的人获取密钥并解密数据，crypto使用对称加密如下

```js
const crypto = require('node:crypto');

// 生成一个随机的 16 字节的初始化向量 (IV)
const iv = Buffer.from(crypto.randomBytes(16));

// 生成一个随机的 32 字节的密钥
const key = crypto.randomBytes(32);

// 创建加密实例，使用 AES-256-CBC 算法，提供密钥和初始化向量
const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);

// 对输入数据进行加密，并输出加密结果的十六进制表示
cipher.update("susu", "utf-8", "hex");
const result = cipher.final("hex");

// 解密
const de = crypto.createDecipheriv("aes-256-cbc", key, iv);
de.update(result, "hex");
const decrypted = de.final("utf-8");

console.log("Decrypted:", decrypted);
```

### 非对称加密

​	非对称加密使用一对密钥，分别是**公钥**和**私钥**。发送者使用接收者的公钥进行加密，而接收者使用自己的私钥进行解密。公钥可以自由分享给任何人，而私钥必须保密。非对称加密算法提供了更高的安全性，因为即使公钥泄露，只有持有私钥的接收者才能解密数据。然而，非对称加密算法的加密速度相对较慢，不适合加密大量数据。因此，在实际应用中，通常使用非对称加密来交换对称密钥，然后使用对称加密算法来加密实际的数据。

```js
const crypto = require('node:crypto')
// 生成 RSA 密钥对
const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
});

// 要加密的数据
const text = 'susu';

// 使用公钥进行加密
const encrypted = crypto.publicEncrypt(publicKey, Buffer.from(text, 'utf-8'));

// 使用私钥进行解密
const decrypted = crypto.privateDecrypt(privateKey, encrypted);

console.log(decrypted.toString());
```

### 哈希函数

哈希函数具有以下特点：

1. 固定长度输出：不论输入数据的大小，哈希函数的输出长度是固定的。例如，常见的哈希函数如 MD5 和 SHA-256 生成的哈希值长度分别为 128 位和 256 位。
2. 不可逆性：哈希函数是单向的，意味着从哈希值推导出原始输入数据是非常困难的，几乎不可能。即使输入数据发生微小的变化，其哈希值也会完全不同。
3. 唯一性：哈希函数应该具有较低的碰撞概率，即不同的输入数据生成相同的哈希值的可能性应该非常小。这有助于确保哈希值能够唯一地标识输入数据。

使用场景:

1. 我们可以避免密码明文传输 使用md5加密或者sha256

2. 验证文件完整性，读取文件内容生成md5 如果前端上传的md5和后端的读取文件内部的md5匹配说明文件是完整的

```js

const crypto = require('node:crypto');

// 要计算哈希的数据
let text = '123456';

// 创建哈希对象，并使用 MD5 算法
const hash = crypto.createHash('md5');

// 更新哈希对象的数据
hash.update(text);

// 计算哈希值，并以十六进制字符串形式输出
const hashValue = hash.digest('hex');

console.log('Text:', text);
console.log('Hash:', hashValue);
```

## 22-脚手架

### 编写自己的脚手架

什么是脚手架呢？如`vue-cli`、`Create React App`、`Angular CLI`，这一系列帮我们创建模板的工具

编写自己的脚手架是指创建一个**定制化**的工具，用于快速生成项目的基础结构和代码文件，以及提供一些常用的命令和功能。通过编写自己的脚手架，可以定义项目的目录结构、文件模板，管理项目的依赖项，生成代码片段，以及提供命令行接口等功能

+ 项目结构：脚手架定义了项目的目录结构，包括源代码、配置文件、静态资源等。

+ 文件模板：脚手架提供了一些预定义的文件模板，如HTML模板、样式表、配置文件等，以加快开发者创建新文件的速度。

+ 命令行接口：脚手架通常提供一个命令行接口，通过输入命令和参数，开发者可以执行各种任务，如创建新项目、生成代码文件、运行测试等。

+ 依赖管理：脚手架可以帮助开发者管理项目的依赖项，自动安装和配置所需的库和工具。

+ 代码生成：脚手架可以生成常见的代码结构，如组件、模块、路由等，以提高开发效率。

+ 配置管理：脚手架可以提供一些默认的配置选项，并允许开发者根据需要进行自定义配置

![image-20231219160322031](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20231219160322031.png)

### 工具介绍

我们来学习一下所需要用到的第三方库，通过`npm init`生成初始的package，然后`npm i`下载下面的库

+ **`commander`**

> Commander 是一个用于**构建命令行工具**的 npm 库。它提供了一种简单而直观的方式来创建命令行接口，并处理命令行参数和选项。使用 Commander，你可以轻松定义命令、子命令、选项和帮助信息。它还可以处理命令行的交互，使用户能够与你的命令行工具进行交互

- **`inquirer`**

> Inquirer 是一个强大的**命令行交互工具**，用于与用户进行交互和收集信息。它提供了各种丰富的交互式提示（如输入框、选择列表、确认框等），可以帮助你构建灵活的命令行界面。通过 Inquirer，你可以向用户提出问题，获取用户的输入，并根据用户的回答采取相应的操作。

- **`ora`**

> Ora 是一个用于在**命令行界面显示加载动画**的 npm 库。它可以帮助你在执行耗时的任务时提供一个友好的加载状态提示。Ora 提供了一系列自定义的加载动画，如旋转器、进度条等，你可以根据需要选择合适的加载动画效果，并在任务执行期间显示对应的加载状态。

- **`download-git-repo`**

> Download-git-repo 是一个用于**下载 Git 仓库的 npm 库**。它提供了一个简单的接口，可以方便地从远程 Git 仓库中下载项目代码。你可以指定要下载的仓库和目标目录，并可选择指定分支或标签。Download-git-repo 支持从各种 Git 托管平台（如 GitHub、GitLab、Bitbucket 等）下载代码。

### 编写代码

#### index.js

第一行要写 `#!/usr/bin/env node`

这是一个 特殊的注释 用于告诉操作系统用node解释器去执行这个文件，而不是显式地调用 `node` 命令

```js
#!/usr/bin/env node
import { program } from 'commander'
import inquirer from 'inquirer'
import fs from 'node:fs'
import { checkPath, downloadTemp } from './utils.js'
let json = fs.readFileSync('./package.json', 'utf-8')
json = JSON.parse(json)

program.version(json.version) //创建版本号
//添加create 命令 和 别名ctr 以及描述 以及 执行完成之后的动作
program.command('create <project>').alias('ctr').description('create a new project').action((project) => {
    //命令行交互工具
    inquirer.prompt([
        {
            type: 'input',
            name: 'projectName',
            message: 'project name',
            default: project
        },
        {
            type: 'confirm',
            name: 'isTs',
            message: '是否支持typeScript',
        }
    ]).then((answers) => {
        if (checkPath(answers.projectName)) {
            console.log('文件已存在')
            return
        }

        if (answers.isTs) {
            downloadTemp('ts', answers.projectName)
        } else {
            downloadTemp('js', answers.projectName)
        }
    })
})

program.parse(process.argv)
```

#### utils.js

```js
import fs from 'node:fs'
import download from 'download-git-repo'
import ora from 'ora'
const spinner = ora('下载中...')
//验证路径
export const checkPath = (path) => {
    return fs.existsSync(path)
}

//下载
export const downloadTemp = (branch,project) => {
    spinner.start()
    return new Promise((resolve,reject)=>{
        download(`direct:https://gitee.com/chinafaker/vue-template.git#${branch}`, project , { clone: true, }, function (err) {
            if (err) {
                reject(err)
                console.log(err)
            }
            resolve()
            spinner.succeed('下载完成')
        })
    })
   
}
```

#### package.json

加入如下的配置

```json
"type": "module", //使用import需要设置这个,写入package记得去注释
"bin": {
  "test-cli": "src/index.js"
}
```

配置完成之后 需要执行`npm link`，用于生成软连接挂载到全局，便可以全局执行vue-cli 这个命令

![image-20231219162059321](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20231219162059321.png)

然后执行命令：

![image-20231219210802350](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20231219210802350.png)

生成如下：
		                         ![image-20231219210742294](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20231219210742294.png)

## 23-Markdown 转 html

什么是 Markdown ?

> Markdown 是一种轻量级标记语言，它允许人们使用易读易写的纯文本格式编写文档。

而Markdown转html是一种非常常见的需求，常用于博客等地方

### 所用库

**EJS**：一款强大的JavaScript模板引擎，它可以帮助我们在HTML中嵌入动态内容。使用EJS，您可以轻松地将Markdown转换为美观的HTML页面。

**Marked**：一个流行的Markdown解析器和编译器，它可以将Markdown语法转换为HTML标记。Marked是一个功能强大且易于使用的库，它为您提供了丰富的选项和扩展功能，以满足各种转换需求。

**BrowserSync**：一个强大的开发工具，它可以帮助您实时预览和同步您的网页更改。当您对Markdown文件进行编辑并将其转换为HTML时，BrowserSync可以自动刷新您的浏览器，使您能够即时查看转换后的结果。

### EJS语法

#### 1. 纯脚本语言

`<% code %>`
里面可以写任意的 js，用于流程控制，无任何输出。如下面：会执行弹框

```ejs
<% alert('hello world') %>
```

#### 2. 输出经过 HTML 转义的内容

`<%= value %>` 可以是变量
`<%= a ? b : c %>` 也可以是表达式
`<%= a + b %>`
 即变量如果包含 '<'、'>'、'&'等HTML字符，会被转义成字符实体，像`< > &`
 因此用`<%=`，最好保证里面内容不要有HTML字符

```ejs
const text = '<p>你好你好</p>'
<h2><%= text %></h2>// 输出 &lt;p&gt;你好你好&lt;/p&gt; 插入 <h2> 标签中
```

#### 3. 输出非转义的内容(原始内容)

`<%- 富文本数据 %>` 通常用于输出富文本，即 HTML内容
上面说到`<%=`会转义HTML字符，那如果我们就是想输出一段HTML怎么办呢？
`<%-`不会解析HTML标签，也不会将字符转义后输出。像下例，就会直接把 `<p>我来啦</p>` 插入标签中  

  ```ejs
  const content = '<p>标签</p>'
  <h2><%- content %></h2>
  ```

#### 4. 引入其他模版

`<%- include('***文件路径') %>`
将相对于模板路径中的模板片段包含进来。
用`<%- include`指令而不是`<% include`，为的是避免对输出的 HTML 代码做转义处理。

```ejs
// 当前模版路径：./views/tmp.ejs
// 引入模版路径：./views/user/show.ejs
<ul>
  <% users.forEach(function(user){ %>
    <%- include('user/show', {user: user}); %>
  <% }); %>
</ul>
```

#### 5. 条件判断

```ejs
<% if (condition1) { %>
  ... 
<% } %>

<% if (condition1) { %>
  ... 
<% } else if (condition2) { %>
  ... 
<% } %>

// 举例
<% if (a && b) { %>
  <p>可以直接放 html 内容</p>
<% } %>

<% if (a && b) { %>
  <% console.log('也可以嵌套任意ejs模版语句') %>
<% } %>
```

#### 6. 循环

```ejs
<% for(var i = 0; i < target.length; i++){ %>
  <%= i %> <%= target[i] %>
<% } %>

<% for(var i in jsArr) { %>
  <script type="text/javascript" src="<%= jsArr[i] %>" ref="preload"></script>
<% } %>

// 推荐
<% for(var css of cssArr) { %>
  <link rel="stylesheet" href="<%= css %>" />
<% } %>
```

### 编写

#### template.ejs

初始化模板 到时候会转换成html代码

```ejs
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><%= title %></title>
    <link rel="stylesheet" href="./index.css">
</head>
<body>
    <%- content %>
</body>
</html>
```

#### marked

+ 编写一个简单的Markdown文档

```markdown
 ### 标题
 - test
```

+ 将md 转换成html

```js
const marked = require('marked')
marked.parse(readme.toString()) //调用parse即可
```

#### browserSync

创建browser 并且开启一个服务 设置根目录和 index.html 文件

```js
const browserSync = require('browser-sync')
const openBrowser =  () => {
    const browser = browserSync.create()
    browser.init({
        server: {
            baseDir: './',
            index: 'index.html',
        }
    })
    return browser
}    
```

#### index.css

html代码有了 但是没有通用的markdown的通用css

```css
/* Markdown通用样式 */

/* 设置全局字体样式 */
body {
    font-family: Arial, sans-serif;
    font-size: 16px;
    line-height: 1.6;
    color: #333;
  }
  
  /* 设置标题样式 */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 1.3em;
    margin-bottom: 0.6em;
    font-weight: bold;
  }
  
  h1 {
    font-size: 2.2em;
  }
  
  h2 {
    font-size: 1.8em;
  }
  
  h3 {
    font-size: 1.6em;
  }
  
  h4 {
    font-size: 1.4em;
  }
  
  h5 {
    font-size: 1.2em;
  }
  
  h6 {
    font-size: 1em;
  }
  
  /* 设置段落样式 */
  p {
    margin-bottom: 1.3em;
  }
  
  /* 设置链接样式 */
  a {
    color: #337ab7;
    text-decoration: none;
  }
  
  a:hover {
    text-decoration: underline;
  }
  
  /* 设置列表样式 */
  ul,
  ol {
    margin-top: 0;
    margin-bottom: 1.3em;
    padding-left: 2em;
  }
  
  /* 设置代码块样式 */
  pre {
    background-color: #f7f7f7;
    padding: 1em;
    border-radius: 4px;
    overflow: auto;
  }
  
  code {
    font-family: Consolas, Monaco, Courier, monospace;
    font-size: 0.9em;
    background-color: #f7f7f7;
    padding: 0.2em 0.4em;
    border-radius: 4px;
  }
  
  /* 设置引用样式 */
  blockquote {
    margin: 0;
    padding-left: 1em;
    border-left: 4px solid #ddd;
    color: #777;
  }
  
  /* 设置表格样式 */
  table {
    border-collapse: collapse;
    width: 100%;
    margin-bottom: 1.3em;
  }
  
  table th,
  table td {
    padding: 0.5em;
    border: 1px solid #ccc;
  }
  
  /* 添加一些额外的样式，如图片居中显示 */
  img {
    display: block;
    margin: 0 auto;
    max-width: 100%;
    height: auto;
  }
  
  /* 设置代码行号样式 */
  pre code .line-numbers {
    display: inline-block;
    width: 2em;
    padding-right: 1em;
    color: #999;
    text-align: right;
    user-select: none;
    pointer-events: none;
    border-right: 1px solid #ddd;
    margin-right: 0.5em;
  }
  
  /* 设置代码行样式 */
  pre code .line {
    display: block;
    padding-left: 1.5em;
  }
  
  /* 设置代码高亮样式 */
  pre code .line.highlighted {
    background-color: #f7f7f7;
  }
  
  /* 添加一些响应式样式，适应移动设备 */
  @media only screen and (max-width: 768px) {
    body {
      font-size: 14px;
      line-height: 1.5;
    }
    
    h1 {
      font-size: 1.8em;
    }
    
    h2 {
      font-size: 1.5em;
    }
    
    h3 {
      font-size: 1.3em;
    }
    
    h4 {
      font-size: 1.1em;
    }
    
    h5 {
      font-size: 1em;
    }
    
    h6 {
      font-size: 0.9em;
    }
    
    table {
      font-size: 14px;
    }
  }    
```

### 完整代码

```js
const ejs = require('ejs'); // 导入ejs库，用于渲染模板
const fs = require('node:fs'); // 导入fs模块，用于文件系统操作
const marked = require('marked'); // 导入marked库，用于将Markdown转换为HTML
const readme = fs.readFileSync('README.md'); // 读取README.md文件的内容
const browserSync = require('browser-sync'); // 导入browser-sync库，用于实时预览和同步浏览器
const openBrowser =  () => {
    const browser = browserSync.create()
    browser.init({
        server: {
            baseDir: './',
            index: 'index.html',
        }
    })
    return browser
}
ejs.renderFile('template.ejs', {
    content: marked.parse(readme.toString()),
    title:'markdown to html'
},(err,data)=>{
    if(err){
        console.log(err)
    }
    let writeStream = fs.createWriteStream('index.html')
    writeStream.write(data)
    writeStream.close()
    writeStream.on('finish',()=>{
        openBrowser()
    })
})     
```

目录如下：index.js即完整的转换代码
![image-20231220161823013](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20231220161823013.png)

编写后，终端输入`node index.js`运行，自动弹出网页，效果如下

![image-20231220161923121](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20231220161923121.png)

## 24-zlib

在 Node.js 中，`zlib` 模块提供了对数据压缩和解压缩的功能，以便在应用程序中减少数据的传输大小和提高性能。该模块支持多种压缩算法，包括 Deflate、Gzip 和 Raw Deflate。

`zlib` 模块的主要作用如下：

1. 数据压缩：使用 `zlib` 模块可以将数据以无损压缩算法（如 Deflate、Gzip）进行压缩，减少数据的大小。这在网络传输和磁盘存储中特别有用，可以节省带宽和存储空间。
2. 数据解压缩：`zlib` 模块还提供了对压缩数据的解压缩功能，可以还原压缩前的原始数据。
3. 流压缩：`zlib` 模块支持使用流（`Stream`）的方式进行数据的压缩和解压缩。这种方式使得可以对大型文件或网络数据流进行逐步处理，而不需要将整个数据加载到内存中。
4. 压缩格式支持：`zlib` 模块支持多种常见的压缩格式，如 Gzip 和 Deflate。这些格式在各种应用场景中广泛使用，例如 HTTP 响应的内容编码、文件压缩和解压缩等。

使用 `zlib` 模块进行数据压缩和解压缩可以帮助优化应用程序的性能和资源利用。通过减小数据的大小，可以减少网络传输的时间和带宽消耗，同时减少磁盘上的存储空间。此外，`zlib` 模块还提供了丰富的选项和方法，使得开发者可以根据具体需求进行灵活的压缩和解压缩操作。

### 代码案例

压缩一个txt文件**gzip** 原大小`index.txt(439kb)` 压缩完`index.txt.gz(4b)`

```js
// 引入所需的模块
const zlib = require('zlib'); // zlib 模块提供数据压缩和解压缩功能
const fs = require('node:fs'); // 引入 Node.js 的 fs 模块用于文件操作

// 创建可读流和可写流
const readStream = fs.createReadStream('index.txt'); // 创建可读流，读取名为 index.txt 的文件
const writeStream = fs.createWriteStream('index.txt.gz'); // 创建可写流，将压缩后的数据写入 index.txt.gz 文件

// 使用管道将可读流中的数据通过 Gzip 压缩，再通过管道传输到可写流中进行写入
readStream.pipe(zlib.createGzip()).pipe(writeStream)
```

解压 **gzip**

```js
const readStream = fs.createReadStream('index.txt.gz')
const writeStream = fs.createWriteStream('index2.txt')
readStream.pipe(zlib.createGunzip()).pipe(writeStream)
```

无损压缩 `deflate` 使用 createDeflate方法

```js
const readStream = fs.createReadStream('index.txt'); // 创建可读流，读取名为 index.txt 的文件
const writeStream = fs.createWriteStream('index.txt.deflate'); // 创建可写流，将压缩后的数据写入 index.txt.deflate 文件
readStream.pipe(zlib.createDeflate()).pipe(writeStream);
```

解压 **deflate**

```js
const readStream = fs.createReadStream('index.txt.deflate')
const writeStream = fs.createWriteStream('index3.txt')
readStream.pipe(zlib.createInflate()).pipe(writeStream)
```

### gzip 和 deflate 区别

1. 压缩算法：Gzip 使用的是 Deflate 压缩算法，该算法结合了 LZ77 算法和哈夫曼编码。LZ77 算法用于数据的重复字符串的替换和引用，而哈夫曼编码用于进一步压缩数据。
2. 压缩效率：Gzip 压缩通常具有更高的压缩率，因为它使用了哈夫曼编码来进一步压缩数据。哈夫曼编码根据字符的出现频率，将较常见的字符用较短的编码表示，从而减小数据的大小。
3. 压缩速度：相比于仅使用 Deflate 的方式，Gzip 压缩需要更多的计算和处理时间，因为它还要进行哈夫曼编码的步骤。因此，在压缩速度方面，Deflate 可能比 Gzip 更快。
4. 应用场景：Gzip 压缩常用于文件压缩、网络传输和 HTTP 响应的内容编码。它广泛应用于 Web 服务器和浏览器之间的数据传输，以减小文件大小和提高网络传输效率。

### http请求压缩

**deflate** 压缩前`(8.2kb)` -> 压缩后`(236b)`

```js
const zlib = require('zlib'); 
const http = require('node:http'); 
const server = http.createServer((req,res)=>{
    const txt = 'susu'.repeat(1000);

    //res.setHeader('Content-Encoding','gzip')
    res.setHeader('Content-Encoding','deflate')
    res.setHeader('Content-type','text/plan;charset=utf-8')
   
    const result = zlib.deflateSync(txt);
    res.end(result)
})

server.listen(3000)
```

**gizp** 压缩前`(8.2kb)` ->压缩后`(245b) `

```js
const zlib = require('zlib'); 
const http = require('node:http'); 
const server = http.createServer((req,res)=>{
    const txt = 'susu'.repeat(1000);

    res.setHeader('Content-Encoding','gzip')
    //res.setHeader('Content-Encoding','deflate')
    res.setHeader('Content-type','text/plan;charset=utf-8')
   
    const result = zlib.gzipSync(txt);
    res.end(result)
})

server.listen(3000)
```

## 25-http

`http` 模块是 Node.js 中用于创建和处理 HTTP 服务器和客户端的核心模块。它使得构建基于 HTTP 协议的应用程序变得更加简单和灵活。

1. 创建 Web 服务器：你可以使用 `http` 模块创建一个 HTTP 服务器，用于提供 Web 应用程序或网站。通过监听特定的端口，服务器可以接收客户端的请求，并生成响应。你可以处理不同的路由、请求方法和参数，实现自定义的业务逻辑。
2. 构建 RESTful API：`http` 模块使得构建 RESTful API 变得简单。你可以使用 HTTP 请求方法（如 GET、POST、PUT、DELETE 等）和路径来定义 API 的不同端点。通过解析请求参数、验证身份和权限，以及生成相应的 JSON 或其他数据格式，你可以构建强大的 API 服务。
3. 代理服务器：`http` 模块还可以用于创建代理服务器，用于转发客户端的请求到其他服务器。代理服务器可以用于负载均衡、缓存、安全过滤或跨域请求等场景。通过在代理服务器上添加逻辑，你可以对请求和响应进行修改、记录或过滤。
4. 文件服务器：`http` 模块可以用于创建一个简单的文件服务器，用于提供静态文件（如 HTML、CSS、JavaScript、图像等）。通过读取文件并将其作为响应发送给客户端，你可以轻松地构建一个基本的文件服务器。

### 创建http服务器

 ```js
 const http = require('node:http');
 const url = require('node:url');
 
 http.createServer((req, res) => {
 
 }).listen(98, () => {
     console.log('Server is running on port 98');
 })
 ```

前端中最常用的请求就是 `GET` 和 `POST`，那么nodejs如何区分这两个请求呢

```js
http.createServer((req, res) => {
    //通过method 就可以了
    if (req.method === 'POST') {

    } else if (req.method === 'GET') {

    }

}).listen(98, () => {
    console.log('server is running on port 98')
})
```

一个完整的代码

```js
const http = require('node:http'); // 引入 http 模块
const url = require('node:url'); // 引入 url 模块

// 创建 HTTP 服务器，并传入回调函数用于处理请求和生成响应
http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true); // 解析请求的 URL，获取路径和查询参数

  if (req.method === 'POST') { // 检查请求方法是否为 POST
    if (pathname === '/post') { // 检查路径是否为 '/post'
      let data = '';
      req.on('data', (chunk) => {
        data += chunk; // 获取 POST 请求的数据
        console.log(data);
      });
      req.on('end', () => {
        res.setHeader('Content-Type', 'application/json'); // 设置响应头的 Content-Type 为 'application/json'
        res.statusCode = 200; // 设置响应状态码为 200
        res.end(data); // 将获取到的数据作为响应体返回
      });
    } else {
      res.setHeader('Content-Type', 'application/json'); // 设置响应头的 Content-Type 为 'application/json'
      res.statusCode = 404; // 设置响应状态码为 404
      res.end('Not Found'); // 返回 'Not Found' 作为响应体
    }
  } else if (req.method === 'GET') { // 检查请求方法是否为 GET
    if (pathname === '/get') { // 检查路径是否为 '/get'
      console.log(query.a); // 打印查询参数中的键名为 'a' 的值
      res.end('get success'); // 返回 'get success' 作为响应体
    }
  }
}).listen(98, () => {
  console.log('server is running on port 98'); // 打印服务器启动的信息
});
```

### 如何调试

VSCode有一个非常方便的插件，如下

![image-20231222102920698](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20231222102920698.png)

安装完成之后编写简易的代码就可以直接发送请求了，编写具体如下

[POST | GET | PUT] [URL] [http版本]

[请求头]

[传递的数据]

```http
# POST http://localhost:98/post/xxx HTTP/1.1

# Content-Type: application/json

# {
#     "name":"苏su"
# }


GET http://localhost:98/get?a=1&b=2 HTTP/1.1
```

在运行http后，在http文件中右键，然后点击send request即可发送

![image-20231222103334803](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20231222103334803.png)

我们在上面打印的是a的值，所以控制台输出了1

![image-20231222103451261](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20231222103451261.png)

## 26-反向代理

### 什么是反向代理?

反向代理（Reverse Proxy）是一种网络通信模式，它充当服务器和客户端之间的中介，将客户端的请求转发到一个或多个后端服务器，并将后端服务器的响应返回给客户端。

1. 负载均衡：反向代理可以根据预先定义的算法将请求分发到多个后端服务器，以实现负载均衡。这样可以避免某个后端服务器过载，提高整体性能和可用性。
2. 高可用性：通过反向代理，可以将请求转发到多个后端服务器，以提供冗余和故障转移。如果一个后端服务器出现故障，代理服务器可以将请求转发到其他可用的服务器，从而实现高可用性。
3. 缓存和性能优化：反向代理可以缓存静态资源或经常访问的动态内容，以减轻后端服务器的负载并提高响应速度。它还可以通过压缩、合并和优化资源等技术来优化网络性能。
4. 安全性：反向代理可以作为防火墙，保护后端服务器免受恶意请求和攻击。它可以过滤恶意请求、检测和阻止攻击，并提供安全认证和访问控制。
5. 域名和路径重写：反向代理可以根据特定的规则重写请求的域名和路径，以实现 URL 路由和重定向。这对于系统架构的灵活性和可维护性非常有用。

![image-20231222115125847](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20231222115125847.png)

### 代码实现

> 所用到的库：`http-proxy-middleware`，下载

```sh
npm install http-proxy-middleware
```

**根目录自定义配置文件**

`su.config.js`

配置proxy代理

```js
module.exports = {
    server:{
        proxy:{
        //代理的路径
            '/api': {
                target: 'http://localhost:3000', //转发的地址
                changeOrigin: true, //是否有跨域
            }
        }
    }
}
```

index.js 实现层

```js
const http = require('node:http');
const fs = require('node:fs')
const url = require('node:url')
const html = fs.readFileSync('./index.html') //给html文件起个服务
const {createProxyMiddleware} = require('http-proxy-middleware')
const config = require('./su.config.js')
const server = http.createServer((req, res) => {
    const {pathname} = url.parse(req.url)
    const proxyList = Object.keys(config.server.proxy) //获取代理的路径
    if(proxyList.includes(pathname)){ //如果请求的路径在里面匹配到 就进行代理
        const proxy = createProxyMiddleware(config.server.proxy[pathname]) //代理
        proxy(req,res)
        return
    }
    console.log(proxyList)
    res.writeHead(200, {
        'Content-Type': 'text/html'
    })
    res.end(html) //返回html

})

server.listen(80) //监听端口
```

test.js 因为我们从80端口转发到3000端口

```js
const http = require('node:http')
const url = require('node:url')

http.createServer((req, res) => {
 
    const {pathname} = url.parse(req.url)

    if(pathname === '/api'){
        res.end('success proxy')
    }
    
}).listen(3000)
```

index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    
</head>
<body>
    <script>
          fetch('/api').then(res=>res.text()).then(res=>{
            console.log(res);
          })
    </script>
</body>
</html>
```

这样就从80代理到了3000端口 并且无跨域

![image-20231222133755900](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20231222133755900.png)

## 27-动静分离

### 什么是动静分离？

动静分离是一种在Web服务器架构中常用的优化技术，旨在提高网站的性能和可伸缩性。它基于一个简单的原则：将动态生成的内容（如动态网页、API请求）与静态资源（如HTML、CSS、JavaScript、图像文件）分开处理和分发。

通过将动态内容和静态资源存储在不同的服务器或服务上，并使用不同的处理机制，可以提高网站的处理效率和响应速度。这种分离的好处包括：

1. **性能优化**：将静态资源与动态内容分离可以提高网站的加载速度。由于静态资源往往是不变的，可以使用缓存机制将其存储在CDN（内容分发网络）或浏览器缓存中，从而减少网络请求和数据传输的开销。
2. **负载均衡**：通过将动态请求分发到不同的服务器或服务上，可以平衡服务器的负载，提高整个系统的可伸缩性和容错性。
3. **安全性**：将动态请求与静态资源分开处理可以提高系统的安全性。静态资源通常是公开可访问的，而动态请求可能涉及敏感数据或需要特定的身份验证和授权。通过将静态资源与动态内容分离，可以更好地管理访问控制和安全策略。

实现动静分离的方法

- 使用反向代理服务器（如Nginx、Apache）将静态请求和动态请求转发到不同的后端服务器或服务。
- 将静态资源部署到CDN上，通过CDN分发静态资源，减轻源服务器的负载。
- 使用专门的静态文件服务器（如Amazon S3、Google Cloud Storage）存储和提供静态资源，而将动态请求交给应用服务器处理。

### 代码编写

下面是一个使用Node.js编写的示例代码，演示了如何处理动静分离的请求：

```js
import http from 'node:http' // 导入http模块
import fs from 'node:fs' // 导入文件系统模块
import path from 'node:path' // 导入路径处理模块
import mime from 'mime' // 导入mime模块

const server = http.createServer((req, res) => {
    const { url, method } = req

    // 处理静态资源
    if (method === 'GET' && url.startsWith('/static')) {
        const filePath = path.join(process.cwd(), url) // 获取文件路径
        const mimeType = mime.getType(filePath) // 获取文件的MIME类型
        console.log(mimeType) // 打印MIME类型

        fs.readFile(filePath, (err, data) => { // 读取文件内容
            if (err) {
                res.writeHead(404, {
                    "Content-Type": "text/plain" // 设置响应头为纯文本类型
                })
                res.end('not found') // 返回404 Not Found
            } else {
                res.writeHead(200, {
                    "Content-Type": mimeType, // 设置响应头为对应的MIME类型
                    "Cache-Control": "public, max-age=3600" // 设置缓存控制头
                })
                res.end(data) // 返回文件内容
            }
        })
    }

    // 处理动态资源
    if ((method === 'GET' || method === 'POST') && url.startsWith('/api')) {
        // ...处理动态资源的逻辑
    }
})

server.listen(80) // 监听端口80
```

> 因为每个文件所对应的mime类型都不一样，如果手写的话有很多，不过强大的nodejs社区提供了mime库，可以帮我们通过后缀直接分析出 所对应的mime类型，然后我们通过强缓存让浏览器缓存静态资源

### 常见的mime库

- 文本文件
  - text/plain：纯文本文件
  - text/html：HTML 文件
  - text/css：CSS 样式表文件
  - text/javascript：JavaScript 文件
  - application/json：JSON 数据
- 图像文件
  - image/jpeg：JPEG 图像
  - image/png：PNG 图像
  - image/gif：GIF 图像
  - image/svg+xml：SVG 图像
- 音频文件
  - audio/mpeg：MPEG 音频
  - audio/wav：WAV 音频
  - audio/midi：MIDI 音频
- 视频文件
  - video/mp4：MP4 视频
  - video/mpeg：MPEG 视频
  - video/quicktime：QuickTime 视频
- 应用程序文件
  - application/pdf：PDF 文件
  - application/zip：ZIP 压缩文件
  - application/x-www-form-urlencoded：表单提交数据
  - multipart/form-data：多部分表单数据

## 28-邮件服务

### 邮件作用

邮件服务在我们工作中邮件服务充当着一个重要的角色

+ 任务分配与跟踪：邮件服务可以用于分配任务、指派工作和跟踪项目进展。通过邮件，可以发送任务清单、工作说明和进度更新，确保团队成员了解其责任和任务要求，并监控工作的完成情况。

+ 错误报告和故障排除：当程序出现错误或异常时，程序员可以通过邮件将错误报告发送给团队成员或相关方。这样可以帮助团队了解问题的性质、复现步骤和相关环境，从而更好地进行故障排除和修复。邮件中可以提供详细的错误消息、堆栈跟踪和其他相关信息，以便其他团队成员能够更好地理解问题并提供解决方案。

+ 自动化构建和持续集成：在持续集成和自动化构建过程中，邮件服务可以用于通知团队成员构建状态、单元测试结果和代码覆盖率等信息。如果构建失败或出现警告，系统可以自动发送邮件通知相关人员，以便及时采取相应措施。（企业很常用）

### 代码编写

需要用到的库

```sh
npm install js-yaml
npm install nodemailer
```

我们邮件的账号（密码| 授权码）不可能明文写到代码里面一般存放在yaml文件或者环境变量里面

> js-yaml 解析yaml文件，如下

```yaml
pass: 授权码 | 密码
user: xxxxx@qq.com 邮箱账号
```

```js
import nodemailder from 'nodemailer'
import yaml from 'js-yaml'
import fs from 'node:fs'
import http from 'node:http'
import url from 'node:url'
const mailConfig = yaml.load(fs.readFileSync('./mail.yaml', 'utf8'))
const transPort = nodemailder.createTransport({
    service: "qq",
    port: 587,
    host: 'smtp.qq.com',
    secure: true,
    auth: {
        pass: mailConfig.pass,
        user: mailConfig.user
    }
})


http.createServer((req, res) => {
    const { pathname } = url.parse(req.url)
    if (req.method === 'POST' && pathname == '/send/mail') {
        let mailInfo = ''
        req.on('data', (chunk) => {
            mailInfo += chunk.toString()
        })
        req.on('end', () => {
            const body = JSON.parse(mailInfo)
            transPort.sendMail({
                to: body.to,
                from: mailConfig.user,
                subject: body.subject,
                text: body.text
            })
            res.end('ok')
        })
    }
}).listen(3000)
```

nodemailder.createTransport 创建邮件服务这里用qq举例，[QQ邮件服务文档](https://wx.mail.qq.com/list/readtemplate?name=app_intro.html#/agreement/authorizationCode)

### POP3/SMTP 设置方法

**用户名/帐户：**  你的QQ邮箱完整的地址

**密码：**  生成的**授权码**

**电子邮件地址：**  你的QQ邮箱的完整邮件地址

**接收邮件服务器：**  pop.qq.com，使用SSL，端口号995

**发送邮件服务器：**  smtp.qq.com，使用SSL，端口号465或587

授权码生成如下，在上面网址的地方

![image-20240108154723434](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240108154723434.png)

![image-20240108154750575](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240108154750575.png)

授权码管理可以查询授权码登录情况

![image-20240108154827772](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240108154827772.png)

测试发送，还是使用之前的插件，编写一个http文件，然后右键发送，发现成功

```http
POST http://localhost:3000/send/mail HTTP/1.1
Content-Type: application/json

{
    "to":"343196323@qq.com",
    "subject":"标题",
    "text":"我想你了，xxxxxx"
}
```

![image-20240108155032609](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240108155032609.png)

## 29-express

### express介绍

Express是一个流行的Node.js Web应用程序框架，用于构建灵活且可扩展的Web应用程序和API。它是基于Node.js的HTTP模块而创建的，简化了处理HTTP请求、响应和中间件的过程。

1. 简洁而灵活：Express提供了简单而直观的API，使得构建Web应用程序变得简单快捷。它提供了一组灵活的路由和中间件机制，使开发人员可以根据需求定制和组织应用程序的行为。
2. 路由和中间件：Express使用路由和中间件来处理HTTP请求和响应。开发人员可以定义路由规则，将特定的URL路径映射到相应的处理函数。同时，中间件允许开发人员在请求到达路由处理函数之前或之后执行逻辑，例如身份验证、日志记录和错误处理。
3. 路由模块化：Express支持将路由模块化，使得应用程序可以根据不同的功能或模块进行分组。这样可以提高代码的组织性和可维护性，使得多人协作开发更加便捷。
4. 视图引擎支持：Express可以与各种模板引擎集成，例如EJS、Pug（以前称为Jade）、Handlebars等。这使得开发人员可以方便地生成动态的HTML页面，并将数据动态渲染到模板中。
5. 中间件生态系统：Express有一个庞大的中间件生态系统，开发人员可以使用各种中间件来扩展和增强应用程序的功能，例如身份验证、会话管理、日志记录、静态文件服务等。

### 编码

+ 启动一个http服务

```js
import express from 'express';

const app = express() //express 是个函数

app.listen(3000, () => console.log('Listening on port 3000'))
```

+ 编写get/post接口

```js
app.get('/', (req, res) => {
    res.send('get')
})

app.post('/create', (req, res) => {
    res.send('post')
})
```

+ 接收前端的参数

```js
app.use(express.json()) //如果前端使用的是post并且传递json 需要注册此中间件 不然是undefined

app.get('/', (req, res) => {
    console.log(req.query) //get 用query
    res.send('get')
})

app.post('/create', (req, res) => {
    console.log(req.body) //post用body
    res.send('post')
})

//如果是动态参数用 params
app.get('/:id', (req, res) => {
    console.log(req.params)
    res.send('get id')
})
```

### 模块化

> 我们正常开发的时候肯定不会把代码写到一个模块里面，Express允许将路由处理程序拆分为多个模块，每个模块负责处理特定的路由。通过将路由处理程序拆分为模块，可以使代码逻辑更清晰，易于维护和扩展

结构大部分如下

```tex
src
 --user.js
 --list.js
app.js
```

src/user.js

```js
import express from 'express'

const router = express.Router() //路由模块

router.post('/login', (req, res) => {
    res.send('login')
})

router.post('/register', (req, res) => {
    res.send('register')
})

export default router
```

app.js

```js
import express from 'express';
import User from './src/user.js'
const app = express()
app.use(express.json())
app.use('/user', User)
app.get('/', (req, res) => {
    console.log(req.query)
    res.send('get')
})

app.get('/:id', (req, res) => {
    console.log(req.params)
    res.send('get id')
})

app.post('/create', (req, res) => {
    console.log(req.body)
    res.send('post')
})

app.listen(3000, () => console.log('Listening on port 3000'))
```

### 中间件

中间件是一个关键概念。中间件是处理HTTP请求和响应的函数，它位于请求和最终路由处理函数之间，可以对请求和响应进行修改、执行额外的逻辑或者执行其他任务。

中间件函数接收三个参数：`req`（请求对象）、`res`（响应对象）和`next`（下一个中间件函数）。通过调用`next()`方法，中间件可以将控制权传递给下一个中间件函数。如果中间件不调用`next()`方法，请求将被中止，不会继续传递给下一个中间件或路由处理函数

+ 实现一个日志中间件

```sh
npm install log4js
```

log4js是一个用于Node.js应用程序的流行的日志记录库，它提供了灵活且可配置的日志记录功能。log4js允许你在应用程序中记录不同级别的日志消息，并可以将日志消息输出到多个目标，如控制台、文件、数据库等

express\middleware\logger.js

```js
import log4js from 'log4js';

// 配置 log4js
log4js.configure({
  appenders: {
    out: {
      type: 'stdout', // 输出到控制台
      layout: {
        type: 'colored' // 使用带颜色的布局
      }
    },
    file: {
      type: 'file', // 输出到文件
      filename: './logs/server.log', // 指定日志文件路径和名称
    }
  },
  categories: {
    default: {
      appenders: ['out', 'file'], // 使用 out 和 file 输出器
      level: 'debug' // 设置日志级别为 debug
    }
  }
});

// 获取 logger
const logger = log4js.getLogger('default');

// 日志中间件
const loggerMiddleware = (req, res, next) => {
  logger.debug(`${req.method} ${req.url}`); // 记录请求方法和URL
  next();
};

export default loggerMiddleware;
```

app.js

```js
import express from 'express';
import User from './src/user.js'
import loggerMiddleware from './middleware/logger.js';
const app = express()
app.use(loggerMiddleware)
```

## 30-防盗链

防盗链（Hotlinking）是指在网页或其他网络资源中，通过直接链接到其他网站上的图片、视频或其他媒体文件，从而显示在自己的网页上。这种行为通常会给被链接的网站带来额外的带宽消耗和资源浪费，而且可能侵犯了原始网站的版权。

为了防止盗链，网站管理员可以采取一些措施：

1. 通过HTTP引用检查：网站可以检查HTTP请求的来源，如果来源网址与合法的来源不匹配，就拒绝提供资源。这可以通过服务器配置文件或特定的脚本实现。
2. 使用Referrer检查：网站可以检查HTTP请求中的Referrer字段，该字段指示了请求资源的来源页面。如果Referrer字段不符合预期，就拒绝提供资源。这种方法可以在服务器配置文件或脚本中实现。
3. 使用访问控制列表（ACL）：网站管理员可以配置服务器的访问控制列表，只允许特定的域名或IP地址访问资源，其他来源的请求将被拒绝。
4. 使用防盗链插件或脚本：一些网站平台和内容管理系统提供了专门的插件或脚本来防止盗链。这些工具可以根据需要配置，阻止来自未经授权的网站的盗链请求。
5. 使用水印技术：在图片或视频上添加水印可以帮助识别盗链行为，并提醒用户资源的来源。

### 编码

+ 第一步需要初始化静态资源目录 `express.static`

```js
import express from 'express'

const app = express()
        //自定义前缀   初始化目录
app.use('/assets',express.static('static'))

app.listen(3000,()=>{
    console.log('listening on port 3000')
})
```

![image-20240109142530510](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240109142530510.png)

![image-20240109142453346](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240109142453346.png)

### 增加防盗链

防盗链一般主要就是验证`host` 或者 `referer`

```js
import express from 'express';

const app = express();

const whitelist = ['localhost'];

// 防止热链中间件
const preventHotLinking = (req, res, next) => {
  const referer = req.get('referer'); // 获取请求头部中的 referer 字段
  if (referer) {
    const { hostname } = new URL(referer); // 从 referer 中解析主机名
    if (!whitelist.includes(hostname)) { // 检查主机名是否在白名单中
      res.status(403).send('Forbidden'); // 如果不在白名单中，返回 403 Forbidden
      return;
    }
  }
  next(); // 如果在白名单中，继续处理下一个中间件或路由
};

app.use(preventHotLinking); // 应用防止热链中间件
app.use('/assets', express.static('static')); // 处理静态资源请求

app.listen(3000, () => {
  console.log('Listening on port 3000'); // 启动服务器，监听端口3000
});
```

127.0.0.1无权限

![image-20240109143649275](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240109143649275.png)

localhost有权限

![image-20240109143717927](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240109143717927.png)

## 31-响应头和请求头

### 响应头

HTTP响应头（HTTP response headers）是在HTTP响应中发送的元数据信息，用于描述响应的特性、内容和行为。它们以键值对的形式出现，每个键值对由一个标头字段（header field）和一个相应的值组成。

例如以下示例

```http
Access-Control-Allow-Origin:*
Cache-Control:public, max-age=0, must-revalidate
Content-Type:text/html; charset=utf-8
Server:nginx
Date:Mon, 08 Jan 2024 18:32:47 GMT
```

### 响应头和跨域之间的关系

+ cors

​	跨域资源共享（Cross-Origin Resource Sharing，CORS）是一种机制，用于在浏览器中实现跨域请求访问资源的权限控制。当一个网页通过 XMLHttpRequest 或 Fetch API 发起跨域请求时，浏览器会根据同源策略（Same-Origin Policy）进行限制。同源策略要求请求的源（`协议、域名和端口`）必须与资源的源相同，否则请求会被浏览器拒绝。

+ 发送请求

```js
fetch('http://localhost:3000/info').then(res=>{
    return res.json()
}).then(res=>{
    console.log(res)
})
```

+ express编写一个get接口

```javascript
import express from 'express'
const app = express()
app.get('/info', (req, res) => {
    res.json({
        code: 200
    })
})
app.listen(3000, () => {
    console.log('http://localhost:3000')
})
```

发现是有报错的 根据同源策略我们看到`协议一样，域名一样，但是端口不一致`，端口也无法一致，会有冲突，否则就是前后端不分离的项目，前后端代码放在一起，只用一个端口，不过我们是分离的没法这么做。

![image-20240118152523846](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240118152523846.png)

这个时候就需要后端支持跨域资源请求放行

```js
Access-Control-Allow-Origin: * | Origin
```

增加以下`响应头` 允许localhost 5500 访问

```js
app.use('*',(req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','http://localhost:5500') //允许localhost 5500 访问
    next()
})
```

结果返回

![image-20240118152803918](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240118152803918.png)

### 请求头

默认情况下cors仅支持客户端向服务器发送如下九个请求头

> tips 没有application/json

1. Accept：指定客户端能够处理的内容类型。
2. Accept-Language：指定客户端偏好的自然语言。
3. Content-Language：指定请求或响应实体的自然语言。
4. Content-Type：指定请求或响应实体的媒体类型。
5. DNT (Do Not Track)：指示客户端不希望被跟踪。
6. Origin：指示请求的源（协议、域名和端口）。
7. User-Agent：包含发起请求的用户代理的信息。
8. Referer：指示当前请求的源 URL。
9. **Content-type**: application/x-www-form-urlencoded | multipart/form-data |  text/plain

如果客户端需要支持额外的请求那么我们需要在客户端支持

```js
'Access-Control-Allow-Headers','Content-Type' //支持application/json
```

### 请求方法支持

我们服务端默认只支持 GET POST HEAD OPTIONS 请求

例如我们遵循restFul风格，要支持`PATCH` 或者其他请求

+ 增加patch

```js
app.patch('/info', (req, res) => {
    res.json({
        code: 200
    })
})
```

+ 发送patch

```js
fetch('http://localhost:3000/info',{
   method:'PATCH',
}).then(res=>{
    return res.json()
}).then(res=>{
    console.log(res)
})
```

+ 发现报错说patch不在我们的methods里面

![image-20240118153557914](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240118153557914.png)

+ 修改如下

```js
'Access-Control-Allow-Methods','POST,GET,OPTIONS,DELETE,PATCH'
```

![image-20240118153722801](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240118153722801.png)

### 预检请求 OPTIONS

现在很多地方都在使用预检请求，如下

![image-20240118153854869](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240118153854869.png)

预检请求的主要目的是确保跨域请求的安全性 它需要满足一定条件才会触发

1. 自定义请求方法：当使用非简单请求方法（Simple Request Methods）时，例如 PUT、DELETE、CONNECT、OPTIONS、TRACE、PATCH 等，浏览器会发送预检请求。
2. 自定义请求头部字段：当请求包含自定义的头部字段时，浏览器会发送预检请求。自定义头部字段是指不属于简单请求头部字段列表的字段，例如 Content-Type 为 application/json、Authorization 等。
3. 带凭证的请求：当请求需要在跨域环境下发送和接收凭证（例如包含 cookies、HTTP 认证等凭证信息）时，浏览器会发送预检请求。

- 尝试发送预检请求

```js
fetch('http://localhost:3000/info',{
    method:'POST',
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify({name:'xmzs'})
}).then(res=>{
    return res.json()
}).then(res=>{
    console.log(res)
})
```

+ express编写

```js
app.post('/info', (req, res) => {
    res.json({
        code: 200
    })
})
```

会发现报错了

![image-20240118154106387](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240118154106387.png)

阅读就知道因为 `application/json` 不属于cors 范畴需要手动支持

```js
'Access-Control-Allow-Headers','Content-Type'
```

![image-20240118154154901](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240118154154901.png)

输出code 200，成功

![image-20240118154304578](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240118154304578.png)

### 自定义响应头

在我们做需求的时候肯定会碰到后端自定义响应头

```js
app.get('/info', (req, res) => {
    res.set('su', '1')
    res.json({
        code: 200
    })
})
```

![image-20240118160334258](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240118160334258.png)

前端如何读取呢？

```js
 fetch('http://localhost:3000/info').then(res=>{
    const headers = res.headers 
    console.log(headers.get('su')) //读取自定义响应头
    return res.json()
}).then(res=>{
    console.log(res)
})
```

发现是null 这是因为后端没有抛出该响应头，所以后端需要增加抛出的一个字段

```js
app.get('/info', (req, res) => {
    res.set('su', '1')
    res.setHeader('Access-Control-Expose-Headers', 'su')
    res.json({
        code: 200
    })
})
```

![image-20240118160437165](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240118160437165.png)

### SSE技术

Server-Sent Events（SSE）是一种在客户端和服务器之间实现单向事件流的机制，允许服务器主动向客户端发送事件数据。在 SSE 中，可以使用自定义事件（Custom Events）来发送具有特定类型的事件数据。

> webSocket属于全双工通讯，也就是前端可以给后端实时发送，后端也可以给前端实时发送，SSE属于单工通讯，后端可以给前端实时发送

- express 增加该响应头`text/event-stream`就变成了sse event 事件名称 data 发送的数据

```js
app.get('/sse',(req,res)=>{
    res.setHeader('Content-Type', 'text/event-stream')
    res.status(200)
    setInterval(() => {
        res.write('event: test\n')
        res.write('data: ' + new Date().getTime() + '\n\n')
    }, 1000)
})
```

前端接受

```js
const sse = new EventSource('http://localhost:3000/sse')
sse.addEventListener('test', (event) => {
    console.log(event.data)
})
```

![image-20240118160629020](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240118160629020.png)

## 32-数据库

MySQL是一种开源的`关系型数据库`管理系统（RDBMS），它是最受欢迎的数据库系统之一。MySQL广泛用于Web应用程序和其他需要可靠数据存储的应用程序中。

以下是MySQL数据库的一些重要特点和概念：

1. 数据库：MySQL是一个数据库管理系统，用于创建和管理数据库。数据库是一个组织结构，用于存储和管理数据。
2. 表：数据库中的数据被组织成表的形式。表由行和列组成，行表示记录，列表示字段。
3. SQL：MySQL使用结构化查询语言（SQL）进行数据库操作。SQL是一种用于定义、操作和查询数据库的语言。
4. 数据类型：MySQL支持各种数据类型，例如整数、浮点数、字符串、日期和时间等。每个列都有自己的数据类型。
5. 索引：MySQL允许创建索引以加快数据检索速度。索引是对表中一列或多列的值进行排序的数据结构。
6. 主键：主键是表中的唯一标识符。它用于确保表中的每个记录都有唯一的标识。
7. 外键：外键用于建立表与表之间的关联。它定义了一个表中的列与另一个表中的列之间的关系。
8. 触发器：触发器是一种在数据库中定义的操作，它会在特定事件发生时自动执行。例如，当向表中插入新记录时，可以触发一个触发器来执行其他操作。
9. 存储过程：存储过程是一组预编译的SQL语句，可以在数据库中进行重复使用。它可以接受参数并返回结果。
10. 备份和恢复：MySQL提供了备份和恢复数据库的工具和命令，以确保数据的安全性和可靠性。

什么是关系型数据库？

​	在关系型数据库中，数据以结构化的方式存储，其中每个表格由一组列（字段）和一组行（记录）组成。每个列定义了数据的类型和属性，而每个行则表示一个特定的数据实例。表格之间的关系通过使用主键和外键进行建立。主键是唯一标识表格中每个行的列，而外键是指向其他表格主键的列，用于建立表格之间的关联关系。

### 安装流程

官网：[www.mysql.com/](https://www.mysql.com/)

![image-20240217150827590](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240217150827590.png)

滚动到下面

![image-20240217150955579](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240217150955579.png)

![image-20240217151011839](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240217151011839.png)

![image-20240217151037351](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240217151037351.png)

![image-20240217151058453](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240217151058453.png)

下载后打开，默认端口3306

![image-20240217153859481](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240217153859481.png)

设置密码

![image-20240217153923083](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240217153923083.png)

添加mysql服务 把名字记住`(MySQL83)`

![image-20240217154013795](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240217154013795.png)

继续往下走就行了

![image-20240217154045329](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240217154045329.png)

安装完成之后检查Mysql服务是否开启 services.msc，键盘`win + r`弹出输入检查

![image-20240217151313874](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240217151313874.png)

为什么让大家记住那个名字 MySQL83 因为就是服务的名字 出问题可以检查一下服务

![image-20240217151439392](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240217151439392.png)

然后配置环境变量，找到你安装MySQL的地方，找到bin目录，复制地址

![image-20240217154245913](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240217154245913.png)

添加进来即可

![image-20240217154206543](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240217154206543.png)

测试Mysql，打开cmd，输入如下，然后输入密码

```sh
mysql -u root -p
```

进来即代表成功

![image-20240217154332438](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240217154332438.png)

可视化工具安装

打开VScode

选择扩展 搜索 database 然后安装 `Database Client`

![image-20240217154453997](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240217154453997.png)

点击左侧，然后创建连接，输入你刚刚创建的密码，点击连接

![image-20240217154639696](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240217154639696.png)

左边出现连接，且头部为√代表成功，保存即可

![image-20240217154759035](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240217154759035.png)

新建库，点击左侧新建，出现sql代码，记得增加数据库名称

![image-20240217155135540](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240217155135540.png)

右键，点击执行sql

![image-20240217155205180](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240217155205180.png)

成功

![image-20240217155253523](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240217155253523.png)

我们也可以cmd自己查看，进入mysql，输入`show databases;`

![image-20240217155335001](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240217155335001.png)

新建表，右键执行sql即可

![image-20240217155537053](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240217155537053.png)

插入数据

![image-20240217155658883](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240217155658883.png)

也可以点击右边的橙色，更方便输入

![image-20240217155822002](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240217155822002.png)

![image-20240217160034477](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240217160034477.png)

## 33-SQL语句

SQL（Structured Query Language）是一种用于管理关系型数据库系统的语言。它是一种标准化语言，用于执行各种数据库操作，包括数据查询、插入、更新和删除等。

### 数据库的操作

+ 创建数据库

```sql
create database 库名
```

如果进行重复的创建就会失败，不允许重复创建

![image-20240217160544866](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240217160544866.png)

为了避免这个问题 可以添加`if not exists`

```sql
create database if not exists `susu`
```

![image-20240217160713437](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240217160713437.png)

如果数据库不存在就创建，存在就什么都不做，我宁愿不做，也不愿犯错。

添加字符集`utf-8`，这样后面数据库中可以添加中文数据

```sql
create database `susu`
    default character set = 'utf8mb4';
```

### 数据表

+ 创建表

```sql
CREATE TABLE `user` (
   id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
   name varchar(100) COMMENT '名字',
   age int COMMENT '年龄',
   address varchar(255) COMMENT '地址',
   create_time timestamp DEFAULT CURRENT_TIMESTAMP  COMMENT '创建时间'
) COMMENT '用户表'
```

解析如下

create table 表名字 (

1. `id`字段名称   `int`数据类型代表数字类型   `NOT NULL`(不能为空)  `AUTO_INCREMENT`(id自增) `PRIMARY KEY`(id为主键)
2. `name`(字段名称) `varchar(100)`字符串类型100字符 `COMMENT`(注释)
3. `age`(字段名称) `int`数据类型代表数字类型  `COMMENT`(注释)
4. `create_time`(字段名称) `timestamp`(时间戳) `DEFAULT CURRENT_TIMESTAMP`(自动填充创建时间)

)

![image-20240217160945097](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240217160945097.png)

+ 修改表名

```sql
ALTER TABLE `user` RENAME `user2`;
```

![image-20240217161111594](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240217161111594.png)

+ 增加列

```sql
ALTER TABLE `user` Add COLUMN `hobby` VARCHAR(200) ;
```

![image-20240217161202667](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240217161202667.png)

+ 删除列

```sql
ALTER TABLE `user` DROP COLUMN `hobby`;
```

![image-20240217161234880](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240217161234880.png)

+ 编辑列

```sql
ALTER TABLE `user` MODIFY COLUMN `age` VARCHAR(255) NULL COMMENT '年龄2';
```

![image-20240217161329503](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240217161329503.png)

## 34-查询

目前为止我们已经学到数据库的基本操作，以及库和表的基本语句，不过对于Mysql来说最常用的还是增删改查的语句

### 查询

> 查询是使用频率最高的语句

#### 查询单个列

```sql
SELECT `name` FROM `user`;
```

#### 查询多个列，逗号隔开即可

```sql
SELECT `name`,`id` FROM `user`;
```

![image-20240217162432260](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240217162432260.png)

#### 查询所有列 *

```sql
SELECT *  FROM `user`;
```

![image-20240217162539586](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240217162539586.png)

#### 列的别名 `as`

```sql
SELECT `name` as `user_name`,`id` as `user_id` FROM `user`;
```

![image-20240217162633698](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240217162633698.png)

#### 排序

ORDER BY [字段名称] `desc`降序(从大到小) `asc` 升序(从小到大)

```sql
SELECT *  FROM `user` ORDER BY id DESC;
```

![image-20240217162720734](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240217162720734.png)

#### 限制查询结果

limit [开始行] [限制条数]

>使用limit的时候是从0开始的跟数组一样

```sql
SELECT *  FROM `user` LIMIT 1,3
```

![image-20240217163007753](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240217163007753.png)

#### 条件查询

我们需要把`搜索条件`放在`WHERE`子句中 例如查询name字段所对应的值 小苏 完全匹配

```sql
SELECT *  FROM `user` WHERE name = "小苏";
```

![image-20240217163122123](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240217163122123.png)

#### 多个条件联合查询

比如说 我想查询 name 叫 小苏的，并且年龄是20岁以下的

![image-20240217163235068](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240217163235068.png)

+ and 操作符

在给定多个搜索条件的时候，我们有时需要某条记录只在符合所有搜索条件的时候进行查询，这种情况我们可以使用`and`操作符来连接多个搜索条件

```sql
SELECT * FROM `user` WHERE name = '小苏' AND age <= 20;
```

![image-20240217163421595](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240217163421595.png)

+ or 操作符

在给定多个搜索条件的时候，我们有时需要某条记录在符合某一个搜索条件的时候就将其加入结果集中，这种情况我们可以使用`OR`操作符来连接多个搜索条件

```sql
SELECT * FROM `user` WHERE name = '小苏' OR age <= 20;
```

![image-20240217163454264](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240217163454264.png)

#### 模糊查询

在MySQL中，"LIKE"操作符用于模糊匹配字符串。而百分号（%）是用作通配符，表示任意字符（包括零个字符或多个字符）的占位符。

当你在使用"LIKE"操作符时，可以在模式（pattern）中使用百分号来匹配一个或多个字符。下面是一些使用百分号的示例：

- "苏%"：匹配以"满"开头的字符串，后面可以是任意字符。
- "%苏"：匹配以"满"结尾的字符串，前面可以是任意字符。
- "%苏%"：匹配包含"满"的任意位置的字符串，前后可以是任意字符。

```sql
SELECT * FROM `user` WHERE name LIKE '%苏%';
```

![image-20240217163553857](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240217163553857.png)

## 35-增删改

上节学习了查询，这节学习增删改

### 新增

在这个语句中，我们明确了插入的顺序，第一个字段对应name，第二个hobby，第三个age，values里面的值是与之对应的

```sql
INSERT INTO user(`name`,`hobby`,`age`) VALUES('susu','basketball',18)
```

![image-20240217164041289](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240217164041289.png)

插入null值

在设计表结构的时候，我们允许 name age hobby 为null，所以我们也可以插入null值

```sql
INSERT INTO user(`name`,`hobby`,`age`) VALUES(NULL,NULL,NULL)
```

![image-20240217164123781](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240217164123781.png)

插入多条数据 逗号隔开即可

```sql
INSERT INTO user(`name`,`hobby`,`age`) VALUES(NULL,NULL,NULL),('susu1','basketball',18)
```

![image-20240217164211640](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240217164211640.png)

### 删除

删除id为10的记录

```sql
DELETE FROM `user` WHERE id = 10; 
```

![image-20240217164320553](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240217164320553.png)

批量删除

```sql
DELETE FROM `user` WHERE id IN (8,9);
```

![image-20240217164414019](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240217164414019.png)

### 更改

更新的字段使用 = 赋值, where确定更新的条例

```sql
UPDATE `user` SET name='苏苏',age=30,hobby='篮球' WHERE id = 7;
```

![image-20240217164600054](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240217164600054.png)

## 36-表达式和函数

### 表达式

MySQL表达式是一种在MySQL数据库中使用的计算式或逻辑式。它们可用于查询、更新和过滤数据，以及进行条件判断和计算。

1. 算术表达式：可以执行基本的数学运算，例如加法、减法、乘法和除法。例如：`SELECT col1 + col2 AS sum FROM table_name;`
2. 字符串表达式：可以对字符串进行操作，例如连接、截取和替换。例如：`SELECT CONCAT(first_name, ' ', last_name) AS full_name FROM table_name;`
3. 逻辑表达式：用于执行条件判断，返回布尔值（TRUE或FALSE）。例如：`SELECT * FROM table_name WHERE age > 18 AND gender = 'Male';`
4. 条件表达式：用于根据条件返回不同的结果。例如：`SELECT CASE WHEN age < 18 THEN 'Minor' ELSE 'Adult' END AS age_group FROM table_name;`
5. 聚合函数表达式：用于计算数据集的聚合值，例如求和、平均值、最大值和最小值。例如：`SELECT AVG(salary) AS average_salary FROM table_name;`
6. 时间和日期表达式：用于处理时间和日期数据，例如提取年份、月份或计算日期差值。例如：`SELECT YEAR(date_column) AS year FROM table_name;`

例如查询的时候增加数值100

```sql
SELECT age + 100 FROM `user`;
```

![image-20240227160812476](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240227160812476.png)

如果要换一个列名可以用as

```sql
SELECT age + 100 as age FROM `user`;
```

![image-20240227160941849](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240227160941849.png)

### 函数

MySQL提供了大量的内置函数，用于在查询和操作数据时进行计算、转换和处理。以下是一些常用的MySQL函数分类及其示例：

1. 字符串函数：
   - `CONCAT(str1, str2, ...)`：将多个字符串连接起来。
   - `SUBSTRING(str, start, length)`：从字符串中提取子字符串。
   - `UPPER(str)`：将字符串转换为大写。
   - `LOWER(str)`：将字符串转换为小写。
   - `LENGTH(str)`：返回字符串的长度。
2. 数值函数：
   - `ABS(x)`：返回x的绝对值。
   - `ROUND(x, d)`：将x四舍五入为d位小数。
   - `CEILING(x)`：返回不小于x的最小整数。
   - `FLOOR(x)`：返回不大于x的最大整数。
   - `RAND()`：返回一个随机数。
3. 日期和时间函数：
   - `NOW()`：返回当前日期和时间。
   - `CURDATE()`：返回当前日期。
   - `CURTIME()`：返回当前时间。
   - `DATE_FORMAT(date, format)`：将日期格式化为指定的格式。
   - `DATEDIFF(date1, date2)`：计算两个日期之间的天数差。
4. 条件函数：
   - `IF(condition, value_if_true, value_if_false)`：根据条件返回不同的值。
   - `CASE WHEN condition1 THEN result1 WHEN condition2 THEN result2 ELSE result END`：根据条件返回不同的结果。
5. 聚合函数：
   - `COUNT(expr)`：计算满足条件的行数。
   - `SUM(expr)`：计算表达式的总和。
   - `AVG(expr)`：计算表达式的平均值。
   - `MAX(expr)`：返回表达式的最大值。
   - `MIN(expr)`：返回表达式的最小值。

- 返回随机数

![image-20240227161050150](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240227161050150.png)

- 求和

![image-20240227161124766](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240227161124766.png)

- 字符串拼接

![image-20240227161211518](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240227161211518.png)

- 获取总数

![image-20240227161237057](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240227161237057.png)

## 37-子查询和连表

### 子查询

子查询（Subquery），也被称为嵌套查询（Nested Query），是指在一个查询语句中嵌套使用另一个完整的查询语句。子查询可以被视为一个查询的结果集，它可以作为外层查询的一部分，用于进一步筛选、计算或操作数据。

子查询通常出现在主查询的WHERE子句、FROM子句、HAVING子句或SELECT子句中，以提供更复杂的查询逻辑。子查询可以根据主查询的结果动态生成结果集，用于过滤和匹配数据，或者作为函数的参数使用。

子查询可以返回单个值、一列值、一行值或者一个结果集，具体取决于子查询的语法和用法。根据子查询返回的结果类型，可以将其与主查询的其他表达式进行比较、连接或使用作为条件进行过滤。

我们之前的案例都是在一张表去查询，现实中不会把所有东西都放在一张表，会进行分表，甚至还会分库分表，读写分离等等。

### 案例通过名字查询photo表

photo表数据

![image-20240227170811450](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240227170811450.png)

user表数据

![image-20240227170831039](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240227170831039.png)

关联关系为 `user表的id` 关联 `photo表的user_id`

但是我们现在需要通过名字查询出photo表的数据 但是photo表没有存名字怎么弄`子查询`

我们的思路就是通过名字查询user表的id，然后通过user表的id去查询photo的user_id就完成了

```sql
SELECT * FROM `photo` WHERE `user_id` = (SELECT id FROM `user` WHERE name = '小苏')
```

![image-20240227170946924](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240227170946924.png)

### 连表

Mysql的连表分为内连接，外连接，交叉连接

1. 对于`内连接`的两个表，驱动表中的记录在被驱动表中找不到匹配的记录，该记录不会加入到最后的结果集，我们上边提到的连接都是所谓的`内连接`。
2. 对于`外连接`的两个表，驱动表中的记录即使在被驱动表中没有匹配的记录，也仍然需要加入到结果集。
3. `交叉连接`是指在两张或多张表之间没有任何连接条件的连接。简单来说，`交叉连接`可以让你查询所有可能的组合。

#### 内连接

```sql
SELECT * FROM `user`, `photo` WHERE `user`.`id` = `photo`.`user_id`
```

![image-20240227171050976](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240227171050976.png)

#### 外连接

##### 左连接

语法规则 LEFT JOIN [连接的表] ON [连接的条件]

并且以第一个表作为`驱动表` 被驱动表如果没有值则补充null

```sql
SELECT * FROM `user` LEFT JOIN `table` ON `user`.`id` = `table`.`user_id`
```

![image-20240227171156876](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240227171156876.png)

##### 右连接

语法规则 RIGHT JOIN [连接的表] ON [连接的条件]

并且以第二个表作为`驱动表` 被驱动表如果没有值则忽略

```sql
SELECT * FROM `user` RIGHT JOIN `table` ON `user`.`id` = `table`.`user_id`
```

![image-20240227171240550](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240227171240550.png)

## 38-mysql2

在之前的篇章中，已经学习完成`mysql`的基本知识，那么现在开始，我们需要把`mysql`和`express`,`nodejs`连接起来。

### 安装依赖

在终端输入如下代码，安装依赖

```sh
npm install mysql2 express js-yaml
```

1. mysql2 用来连接mysql和编写sq语句
2. express 用来提供接口 增删改差
3. js-yaml 用来编写配置文件

### 编写代码

db.config.yaml

```yaml
db:
   host: localhost #主机
   port: 3306 #端口
   user: root #账号
   password: '123456' #密码 一定要字符串
   database: xiaoman # 库
```

index.js

```javascript
import mysql2 from 'mysql2/promise';
import fs from 'node:fs';
import jsyaml from 'js-yaml';
import express from 'express';

// 读取yaml为字符串
const yaml = fs.readFileSync('./db.config.yaml', 'utf8');
// 将其解析成对象
const config = jsyaml.load(yaml);

const sql = await mysql2.createConnection({
  ...config.db
})

const app = express();
app.use(express.json());
// 查询接口 全部数据
app.get('/', async (req, res) => {
  const [data] = await sql.query('SELECT * FROM user');
  res.send(data)
})
// 单个查询
app.get('/user/:id', async (req, res) => {
  const [row] = await sql.query('SELECT * FROM user WHERE id = ?', [req.params.id])
  res.send(row)
})
// 新增接口
app.post('/create', async (req, res) => {
  const { name, age, address, hobby } = req.body;
  await sql.query('INSERT INTO user (name, age, address, hobby) VALUES (?, ?, ?, ?)', [name, age, address, hobby])
  res.send({ ok: 1 })
})
// 编辑接口
app.post('/update', async (req, res) => {
  const { name, age, address, hobby, id } = req.body
  await sql.query(`update user set name = ?,age = ?,address= ?,hobby = ? where id = ?`, [name, age, address, hobby, id])
  res.send({ ok: 1 })
})
//删除
app.post('/delete', async (req, res) => {
  await sql.query(`delete from user where id = ?`, [req.body.id])
  res.send({ ok: 1 })
})
const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
```

index.http，方便测试接口

```http
# 查询全部
GET http://localhost:3000/ HTTP/1.1
```

```http
# 单个查询
GET http://localhost:3000/user/2 HTTP/1.1
```

```http
# 添加数据
POST http://localhost:3000/create HTTP/1.1
Content-Type: application/json

{
    "name":"张三",
    "age":18,
    "address":"北京市",
    "hobby": "篮球"
}
```

```http
# 更新数据
POST http://localhost:3000/update HTTP/1.1
Content-Type: application/json

{
    "name":"法外狂徒",
    "age":20,
    "address":"上海市",
    "hobby": "rap",
    "id":11
}
```

```http
# 删除
POST http://localhost:3000/delete HTTP/1.1
Content-Type: application/json

{
    "id":11
}
```

## 39-ORM( Knex + express )

### Knex

[Knex](https://knexjs.org/guide/query-builder.html#withrecursive)是一个基于JavaScript的`查询生成器`，它允许你使用JavaScript代码来生成和执行SQL查询语句。它提供了一种简单和直观的方式来与关系型数据库进行交互，而无需直接编写SQL语句。你可以使用Knex定义表结构、执行查询、插入、更新和删除数据等操作。

#### Knex的安装和设置

> Knex支持多种数据库 如pg、sqlite3、mysql2、oracledb、tedious

```sh
# 安装knex
npm install knex --save

# 安装你用的数据库
npm install pg
npm install pg-native
npm install sqlite3
npm install better-sqlite3
npm install mysql
npm install mysql2
npm install oracledb
npm install tedious
```

连接数据库

```javascript
import fs from 'node:fs';
import jsyaml from 'js-yaml';
import knex from 'knex';

// 读取yaml为字符串
const yaml = fs.readFileSync('./db.config.yaml', 'utf8');
// 将其解析成对象
const config = jsyaml.load(yaml);

const db = knex({
  client: 'mysql2',
  connection: config.db
})
```

### 定义表结构

```javascript
// knex所有代码直接编写是没有效果的,必须then后才会有效果
db.schema.createTableIfNotExists('list', table => {
  table.increments('id') // id 主键 自增
  table.integer('age') // age 整数
  table.string('name') // name 字符串
  table.string('hobby') // hobby 字符串
  table.timestamps(true, true) // 创建时间 更新时间
}).then(() => {
  console.log('创建成功')
})
```

### 实现增删改差

新增接口

```javascript
//新增接口
app.post('/create', async (req, res) => {
    const { name, age, hobby } = req.body
    const detail = await db('list').insert({ name, age, hobby })
    res.send({
        code: 200,
        data: detail
    })
})
```

删除接口

```javascript
//编辑接口
app.post('/update', async (req, res) => {
    const { name, age, hobby, id } = req.body
    const info = await db('list').update({ name, age, hobby }).where({ id })
    res.json({
        code: 200,
        data: info
    })
})
```

删除接口

```javascript
//删除接口
app.post('/delete', async (req, res) => {
  const info = await db('list').delete().where({ id: req.body.id })
  res.json({
      code: 200,
      data: info
  })
})
```

查询接口

```javascript
//查询接口 全部
app.get('/', async (req, res) => {
  const data = await db('list').select().orderBy('id', 'desc')
  const total = await db('list').count('* as total') // 重命名一下
  // 上面的数据格式如 [{ total: 1 }]
  res.json({
      code: 200,
      data,
      total: total[0].total,
  })
})
//单个查询 params
app.get('/user/:id', async (req, res) => {
  const row = await db('list').select().where({ id: req.params.id })
  res.json({
      code: 200,
      data: row
  })
})
```

### 高级玩法

反编译为SQL语句，用SQL语句调用

```javascript
// 编译出SQL语句用来调试
db('list').select().toSQL().sql
// 用SQL语句调用
db.raw("select * from user").then((data) => {
    console.log(data)
})
```

连表

```javascript
const table = await db('user').select().leftJoin('table', 'user.id', 'table.user_id')
```

排序

```javascript
// 倒序排序查询
const data = await db('user').select().orderBy('id', 'desc')
```

### 事务

你可以使用事务来确保一组数据库操作的原子性，即要么全部成功提交，要么全部回滚

例如A给B转钱，需要两条语句，如果A语句成功了，B语句因为一些场景失败了，那这钱就丢了，所以事务就是为了解决这个问题，要么都成功，要么都回滚，保证金钱不会丢失。

```javascript
//伪代码
db.transaction(async (trx) => {
    try {
        // A 减100块
        await trx('list').update({money: -100}).where({ id: 1 })
        // B 加100块
        await trx('list').update({money: +100}).where({ id: 2 })
        await trx.commit() //提交事务
    }
    catch (err) {
        await trx.rollback() //回滚事务
    }
}).then(() => {
    console.log('成功')
}).catch(() => {
    console.log('失败')
})
```

## 40-ORM( Prisma + express )

### 什么是 prisma?

Prisma 是一个现代化的数据库工具套件，用于简化和改进应用程序与数据库之间的交互。它提供了一个类型安全的查询构建器和一个强大的 ORM（对象关系映射）层，使开发人员能够以声明性的方式操作数据库。

Prisma 支持多种主流数据库，包括 PostgreSQL、MySQL 和 SQLite，它通过生成标准的数据库模型来与这些数据库进行交互。使用 Prisma，开发人员可以定义数据库模型并生成类型安全的查询构建器，这些构建器提供了一套直观的方法来创建、更新、删除和查询数据库中的数据。

Prisma 的主要特点包括：

1. 类型安全的查询构建器：Prisma 使用强类型语言（如 TypeScript）生成查询构建器，从而提供了在编译时捕获错误和类型检查的能力。这有助于减少错误，并提供更好的开发人员体验。
2. 强大的 ORM 层：Prisma 提供了一个功能强大的 ORM 层，使开发人员能够以面向对象的方式操作数据库。它自动生成了数据库模型的 CRUD（创建、读取、更新、删除）方法，简化了与数据库的交互。
3. 数据库迁移：Prisma 提供了数据库迁移工具，可帮助开发人员管理数据库模式的变更。它可以自动创建和应用迁移脚本，使数据库的演进过程更加简单和可控。
4. 性能优化：Prisma 使用先进的查询引擎和数据加载技术，以提高数据库访问的性能。它支持高级查询功能，如关联查询和聚合查询，并自动优化查询以提供最佳的性能

### 安装使用

1. 安装 Prisma CLI：
   - 使用 npm 安装：运行 `npm install -g prisma`。
   - 使用 yarn 安装：运行 `yarn global add prisma`。
2. 初始化项目
   - 使用`prisma init --datasource-provider mysql`

此时就会创建生成基本目录

![image-20240229211014781](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240229211014781.png)

3. 连接mysql

- 修改.env文件 `[DATABASE_URL="mysql://账号:密码@主机:端口/库名"]`
- 例子 `DATABASE_URL="mysql://root:123456@localhost:3306/su"`

### 创建表

prisma/schema.prisma

> 没有高亮可以去扩展搜索prisma下载，在右下角语言关联prisma即可

```javascript
// 文章表
model Post {
  id       Int     @id @default(autoincrement()) //id 整数 自增
  title    String  //title字符串类型
  publish  Boolean @default(false) //发布 布尔值默认false
  author   User   @relation(fields: [authorId], references: [id]) //作者 关联用户表 关联关系 authorId 关联user表的id
  authorId Int
}
// 用户表 一个用户可以发多个文章 一对多的关系
model User {
  id    Int    @id @default(autoincrement())
  name  String
  email String @unique //唯一
  posts Post[] // 一对多的关系
}
```

执行命令 创建表

```sh
prisma migrate dev
```

![image-20240229212256739](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240229212256739.png)

### 实现增删改查

```typescript
import express from 'express'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const app = express()
const port: number = 3000

app.use(express.json())

//关联查找
app.get('/', async (req, res) => {
    const data = await prisma.user.findMany({
        include: {
            posts: true
        }
    })
    res.send(data)
})
//单个查找
app.get('/user/:id', async (req, res) => {
   const row =  await prisma.user.findMany({
        where: {
            id: Number(req.params.id)
        }
    })
    res.send(row)
})
//新增
app.post('/create', async (req, res) => {
    const { name, email } = req.body
    const data = await prisma.user.create({
        data: {
            name,
            email,
            posts: {
                create: {
                    title: '标题',
                    publish: true
                },
            }
        }
    })
    res.send(data)
})

//更新
app.post('/update', async (req, res) => {
    const { id, name, email } = req.body
    const data = await prisma.user.update({
        where: {
            id: Number(id)
        },
        data: {
            name,
            email
        }
    })
    res.send(data)
})

//删除
app.post('/delete', async (req, res) => {
    const { id } = req.body
    await prisma.post.deleteMany({
        where: {
            authorId: Number(id)
        }
    })
    const data = await prisma.user.delete({
        where: {
            id: Number(id),
        },
    })
    res.send(data)
})


app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
```

测试http，仅参考

```http
# 新增
POST http://localhost:3000/create HTTP/1.1
Content-type: application/json

{
    "name": "susu",
    "email": "12345679@qq.com"
}
```

```http
# 查询全部
GET http://localhost:3000/ HTTP/1.1
```

```http
# 单个查询
GET http://localhost:3000/user/1 HTTP/1.1
```

```http
# 更新
POST http://localhost:3000/update HTTP/1.1
Content-type: application/json

{
    "id": 1,
    "name": "susu1",
    "email": "12345679s@qq.com"
}
```

```http
# 删除
POST http://localhost:3000/delete HTTP/1.1
Content-type: application/json

{
    "id": 1
}
```

> 注意删除这里：因为post表中有关联我们的user表数据即post表有外键在user表，如果只是用delete方法或者在数据库中删除都会发现不成功，所以我们需要级联删除，和它相关的都删除了才能删除它本身

## 41-项目架构( MVC + loC + 装饰器 )

到现在为止，我们学习了，express框架，编写接口，mysql数据库读写数据，knex,prisma ORM框架，现在是时候把这些组合到一起，并且实现一个类似于`Nestjs`或者java的`SpringBoot`的架构真正的去开发我们的nodejs项目

### MVC

MVC（Model-View-Controller）是一种常用的软件架构模式，用于设计和组织应用程序的代码。它将应用程序分为三个主要组件：模型（Model）、视图（View）和控制器（Controller），各自负责不同的职责。

1. 模型（Model）：模型表示应用程序的数据和业务逻辑。它负责处理数据的存储、检索、验证和更新等操作。模型通常包含与数据库、文件系统或外部服务进行交互的代码。
2. 视图（View）：视图负责将模型的数据以可视化的形式呈现给用户。它负责用户界面的展示，包括各种图形元素、页面布局和用户交互组件等。视图通常是根据模型的状态来动态生成和更新的。
3. 控制器（Controller）：控制器充当模型和视图之间的中间人，负责协调两者之间的交互。它接收用户输入（例如按钮点击、表单提交等），并根据输入更新模型的状态或调用相应的模型方法。控制器还可以根据模型的变化来更新视图的显示。

MVC 的主要目标是将应用程序的逻辑、数据和界面分离，以提高代码的可维护性、可扩展性和可重用性。通过将不同的职责分配给不同的组件，MVC 提供了一种清晰的结构，使开发人员能够更好地管理和修改应用程序的各个部分。

### IoC控制反转和DI依赖注入

控制反转（Inversion of Control，IoC）和依赖注入（Dependency Injection，DI）是软件开发中常用的设计模式和技术，用于解耦和管理组件之间的依赖关系。虽然它们经常一起使用，但它们是不同的概念。

1. 控制反转（IoC）是一种设计原则，它将组件的控制权从组件自身转移到外部容器。传统上，组件负责自己的创建和管理，而控制反转则将这个责任转给了一个外部的容器或框架。容器负责创建组件实例并管理它们的生命周期，组件只需声明自己所需的依赖关系，并通过容器获取这些依赖。这种反转的控制权使得组件更加松耦合、可测试和可维护。
2. 依赖注入（DI）是实现控制反转的一种具体技术。它通过将组件的依赖关系从组件内部移动到外部容器来实现松耦合。组件不再负责创建或管理它所依赖的其他组件，而是通过构造函数、属性或方法参数等方式将依赖关系注入到组件中。依赖注入可以通过构造函数注入（Constructor Injection）、属性注入（Property Injection）或方法注入（Method Injection）等方式实现。

### 安装依赖

1. `inversify` + `reflect-metadata` 实现依赖注入 [官网](https://doc.inversify.cloud/zh_cn/installation)
2. 接口编写`express` [官网](https://www.expressjs.com.cn/)
3. 连接工具 `inversify-express-utils` [文档](https://www.npmjs.com/package/inversify-express-utils)
4. orm框架 `prisma` [官网](https://www.prisma.io/)
5. dto `class-validator` + `class-transformer` [文档](https://www.npmjs.com/package/class-validator)

### 项目架构

新建一个文件夹

通过 `prisma init --datasource-provider mysql` 构建prisma项目 上一章讲过了

目录结构

- /src
  - /user
    - /controller.ts
    - /service.ts
    - /user.dto.ts
  - /post
    - /controller.ts
    - /service.ts
    - /post.dto.ts
  - /db
    - /index.ts
  - /prisma
    - /schema.prisma
- main.ts
- .env
- tsconfig.json
- package.json
- README.md

### 代码编写

main.ts

```typescript
import 'reflect-metadata'
import { InversifyExpressServer } from 'inversify-express-utils'
import { Container } from 'inversify'
import { UserController } from './src/user/controller'
import { UserService } from './src/user/service'
import express from 'express'
import { PrismaClient } from '@prisma/client'
import { PrismaDB } from './src/db'
const container = new Container() //Ioc搞个容器
/**
 * prisma依赖注入
 */
 //注入工厂封装db
container.bind<PrismaClient>('PrismaClient').toFactory(()=>{
    return () => {
        return new PrismaClient()
    }
})
container.bind(PrismaDB).toSelf()
/**
 * user模块
 */
container.bind(UserService).to(UserService) //添加到容器
container.bind(UserController).to(UserController) //添加到容器
/**
 * post模块
 */
const server = new InversifyExpressServer(container) //返回server
//中间件编写在这儿
server.setConfig(app => {
    app.use(express.json()) //接受json
})
const app = server.build() //app就是express

app.listen(3000, () => {
    console.log('http://localhost:3000')
})
```

src/user/controller.ts

```typescript
import { controller, httpGet as GetMapping, httpPost as PostMapping } from 'inversify-express-utils'
import { inject } from 'inversify'
import { UserService } from './service'
import type { Request, Response } from 'express'
@controller('/user') //路由
export class UserController {

    constructor(
        @inject(UserService) private readonly userService: UserService, //依赖注入
    ) { }

    @GetMapping('/index') //get请求
    public async getIndex(req: Request, res: Response) {
        console.log(req?.user.id)
        const info = await this.userService.getUserInfo()
        res.send(info)
    }

    @PostMapping('/create') //post请求
    public async createUser(req: Request, res: Response) {
        const user = await this.userService.createUser(req.body)
        res.send(user)
    }
}
```

src/user/service.ts

```typescript
import { injectable, inject } from 'inversify'
import { UserDto } from './user.dto'
import { plainToClass } from 'class-transformer' //dto验证
import { validate } from 'class-validator' //dto验证
import { PrismaDB } from '../db'
@injectable()
export class UserService {

    constructor(
        @inject(PrismaDB) private readonly PrismaDB: PrismaDB //依赖注入
    ) { }

    public async getUserInfo() {
        return await this.PrismaDB.prisma.user.findMany()
    }

    public async createUser(data: UserDto) {
        const user = plainToClass(UserDto, data)
        const errors = await validate(user)
        const dto = []
        if (errors.length) {
            errors.forEach(error => {
                Object.keys(error.constraints).forEach(key => {
                    dto.push({
                        [error.property]: error.constraints[key]
                    })
                })
            })
            return dto
        } else {
            const userInfo =  await this.PrismaDB.prisma.user.create({ data: user })
            return userInfo
        }
    }
}
```

src/user/user.dto.ts

```typescript
import { IsNotEmpty, IsEmail } from 'class-validator'
import { Transform } from 'class-transformer'
export class UserDto {
    @IsNotEmpty({ message: '用户名必填' })
    @Transform(user => user.value.trim())
    name: string

    @IsNotEmpty({ message: '邮箱必填' })
    @IsEmail({},{message: '邮箱格式不正确'})
    @Transform(user => user.value.trim())
    email: string
}
```

src/db/index.ts

```typescript
import { injectable, inject } from 'inversify'
import { PrismaClient } from '@prisma/client'

@injectable()
export class PrismaDB {
    prisma: PrismaClient
    constructor(@inject('PrismaClient') PrismaClient: () => PrismaClient) {
       this.prisma = PrismaClient()
    }
}
```

tsconig.json

支持装饰器和反射 打开一下 严格模式关闭

```json
"experimentalDecorators": true,               
"emitDecoratorMetadata": true,    
"strict": false,  
```

## 42-项目架构( JWT鉴权 )

### 什么是jwt?

JWT（JSON Web Token）是一种开放的标准（RFC 7519），用于在网络应用间传递信息的一种方式。它是一种基于JSON的安全令牌，用于在客户端和服务器之间传输信息。 [jwt.io/](https://jwt.io/)

JWT由三部分组成，它们通过点（.）进行分隔：

1. Header（头部）：包含了令牌的类型和使用的加密算法等信息。通常采用Base64编码表示。
2. Payload（负载）：包含了身份验证和授权等信息，如用户ID、角色、权限等。也可以自定义其他相关信息。同样采用Base64编码表示。
3. Signature（签名）：使用指定的密钥对头部和负载进行签名，以确保令牌的完整性和真实性。

JWT的工作流程如下：

1. 用户通过提供有效的凭证（例如用户名和密码）进行身份验证。
2. 服务器验证凭证，并生成一个JWT作为响应。JWT包含了用户的身份信息和其他必要的数据。
3. 服务器将JWT发送给客户端。
4. 客户端在后续的请求中，将JWT放入请求的头部或其他适当的位置。
5. 服务器在接收到请求时，验证JWT的签名以确保其完整性和真实性。如果验证通过，服务器使用JWT中的信息进行授权和身份验证。

### 用到的依赖

1. `passport` passport是一个流行的用于身份验证和授权的Node.js库
2. `passport-jwt` Passport-JWT是Passport库的一个插件，用于支持使用JSON Web Token (JWT) 进行身份验证和授权
3. `jsonwebtoken` 生成token的库

### 代码编写

沿用上一章的代码 在src下增加jwt目录 

src/jwt/index.ts

```typescript
import { injectable } from 'inversify'
import jsonwebtoken from 'jsonwebtoken'
import passport from 'passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
@injectable()
export class JWT {
    private secret = 'xiaoman$%^&*()asdsd'
    private jwtOptions = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: this.secret
    }
    constructor() {
        this.strategy()
    }

    /**
     * 初始化jwt
     */
    public strategy() {
        const strategy = new Strategy(this.jwtOptions, (payload, done) => {
            done(null, payload)
        })
        passport.use(strategy)
    }

    /**
     * 
     * @returns 中间件
     */
    public middleware() {
        return passport.authenticate('jwt', { session: false })
    }

    /**
     * 创建token
     * @param data Object
     */
    public createToken(data: object) {
        //有效期为7天
        return jsonwebtoken.sign(data, this.secret, { expiresIn: '7d' })
    }

    /**
     * 
     * @returns 集成到express
     */
    public init() {
        return passport.initialize()
    }
}
```

main.ts

```typescript
import 'reflect-metadata'
import { InversifyExpressServer } from 'inversify-express-utils'
import { Container } from 'inversify'
import { User } from './src/user/controller'
import { UserService } from './src/user/services'
import express from 'express'
import { PrismaClient } from '@prisma/client'
import { PrismaDB } from './src/db'
import { JWT } from './src/jwt'
const container = new Container()
/**
 * user模块
 */
container.bind(User).to(User)
container.bind(UserService).to(UserService)
/**
 *  封装PrismaClient
 */
container.bind<PrismaClient>('PrismaClient').toFactory(() => {
    return () => {
        return new PrismaClient()
    }
})
container.bind(PrismaDB).to(PrismaDB)
/**
 * jwt模块
 */
container.bind(JWT).to(JWT) //主要代码

const server = new InversifyExpressServer(container)
server.setConfig((app) => {
    app.use(express.json())
    app.use(container.get(JWT).init()) //主要代码
})
const app = server.build()

app.listen(3000, () => {
    console.log('Listening on port 3000')
})
```

src/user/controller.ts

```typescript
import { controller, httpGet as GetMapping, httpPost as PostMapping } from 'inversify-express-utils'
import { UserService } from './services'
import { inject } from 'inversify'
import type { Request, Response } from 'express'
import { JWT } from '../jwt'
const {middleware}  = new JWT()
@controller('/user')
export class User {
    constructor(@inject(UserService) private readonly UserService: UserService) {

    }
    @GetMapping('/index',middleware()) //使用中间件,不携带token无法调用该接口会显示401
    public async getIndex(req: Request, res: Response) {
        let result = await this.UserService.getList()
        res.send(result)
    }

    @PostMapping('/create')
    public async createUser(req: Request, res: Response) {
        let result = await this.UserService.createUser(req.body)
        res.send(result)
    }
}
```

src/user/services.ts

```typescript
import { injectable, inject } from 'inversify'
import { PrismaDB } from '../db'
import { UserDto } from './user.dto'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import { JWT } from '../jwt'
@injectable()
export class UserService {
    constructor(
        @inject(PrismaDB) private readonly PrismaDB: PrismaDB,
        @inject(JWT) private readonly jwt: JWT //依赖注入
    ) {

    }
    public async getList() {
        return await this.PrismaDB.prisma.user.findMany()
    }

    public async createUser(user: UserDto) {
        let userDto = plainToClass(UserDto, user)
        const errors = await validate(userDto)
        if (errors.length) {
            return errors
        } else {
            const result = await this.PrismaDB.prisma.user.create({
                data: user
            })
            return {
                ...result,
                token: this.jwt.createToken(result) //生成token
            }
        }

    }
}
```

jwt接口验证，哪个接口需要token验证就往哪儿加就可以了，http可自行编写

![image-20240302180623320](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240302180623320.png)

## 43-Redis( 介绍与安装 )

![image-20240303182925830](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240303182925830.png)

Redis（Remote Dictionary Server）是一个开源的内存数据结构存储系统，它提供了一个高效的键值存储解决方案，并支持多种数据结构，如字符串（Strings）、哈希（Hashes）、列表（Lists）、集合（Sets）和有序集合（Sorted Sets）等。它被广泛应用于缓存、消息队列、实时统计等场景。

以下是一些关键特性和用途介绍：

1. 内存存储：Redis主要将数据存储在内存中，因此具有快速的读写性能。它可以持久化数据到磁盘，以便在重新启动后恢复数据。
2. 多种数据结构：Redis不仅仅是一个简单的键值存储，它支持多种数据结构，如字符串、哈希、列表、集合和有序集合。这些数据结构使得Redis能够更灵活地存储和操作数据。
3. 发布/订阅：Redis支持发布/订阅模式，允许多个客户端订阅一个或多个频道，以接收实时发布的消息。这使得Redis可以用作实时消息系统。
4. 事务支持：Redis支持事务，可以将多个命令打包成一个原子操作执行，确保这些命令要么全部执行成功，要么全部失败。
5. 持久化：Redis提供了两种持久化数据的方式：RDB（Redis Database）和AOF（Append Only File）。RDB是将数据以快照形式保存到磁盘，而AOF是将每个写操作追加到文件中。这些机制可以确保数据在意外宕机或重启后的持久性。
6. 高可用性：Redis支持主从复制和Sentinel哨兵机制。通过主从复制，可以创建多个Redis实例的副本，以提高读取性能和容错能力。Sentinel是一个用于监控和自动故障转移的系统，它可以在主节点宕机时自动将从节点提升为主节点。
7. 缓存：由于Redis具有快速的读写性能和灵活的数据结构，它被广泛用作缓存层。它可以将常用的数据存储在内存中，以加快数据访问速度，减轻后端数据库的负载。
8. 实时统计：Redis的计数器和有序集合等数据结构使其非常适合实时统计场景。它可以存储和更新计数器，并对有序集合进行排名和范围查询，用于统计和排行榜功能

### redis安装

#### windows安装

1. 安装包形式

+ 可以找人要安装包，建议b站搜索小满zs加vx群要，把解压后的路径添加到环境变量

![image-20240303183112332](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240303183112332.png)

- 添加到windows服务(cmd管理员模式进入到该文件夹下)

```sh
redis-server.exe --service-install redis.conf --loglevel verbose
```

+ 可以win+r输入`services.msc`，找到Redis查看是否启动，并设置为自动

![image-20240303183344632](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240303183344632.png)

2. wsl安装

   + [官方文档](https://redis.io/docs/install/install-redis/install-redis-on-windows/)
   + cmd管理员模式 执行 `wsl --update` 升级wsl版本 `wsl --set-default-version 2` 设置wsl版本2
   + 搜索栏搜索功能，打开如下的虚拟机平台
   + ![image-20240303183811673](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240303183811673.png)
   
   + 打开Microsoft Store 搜索 wsl 安装一个乌班图
   
   + ![image-20240303183947829](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240303183947829.png)
   + 接着跟着官网执行以下命令即可
   
   + ![image-20240303184246145](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240303184246145.png)
#### Mac,Linux 安装

Mac：`brew install redis` 启动redis `redis-server` 连接redis `redis-cli`

Linux：`wget https://download.redis.io/redis-stable.tar.gz`

+ 编译源文件

  ```sh
  tar -xzvf redis-stable.tar.gz
  cd redis-stable
  make
  make install
  ```

+ 启动redis

  ```sh
  redis-server
  ```

> Redis可视化也可通过之前的连接mysql的`Database Client`工具来连接Redis

## 44-Redis( 基本使用 )

上一章配置完环境变量后在cmd输入`redis-cli`即可运行下面命令，可以通过工具查看是否运行成功操作

### 字符串的操作

```sql
SET key value [NX|XX] [EX seconds] [PX milliseconds] [GET]
```

+ `key`：要设置的键名。

+ `value`：要设置的值。

+ `NX`：可选参数，表示只在键不存在时才设置值。

+ `XX`：可选参数，表示只在键已经存在时才设置值。

+ `EX seconds`：可选参数，将键的过期时间设置为指定的秒数。

+ `PX milliseconds`：可选参数，将键的过期时间设置为指定的毫秒数。

+ `GET`：可选参数，返回键的旧值。

1. 设置键名为 "name" 的值为 "chenchen"：

```sql
SET name "chenchen"
```

2. 设置键名为 "counter" 的值为 10，并设置过期时间为 60 秒：

```sql
SET counter 10 EX 60
```

3. 只在键名为 "status" 不存在时，设置其值为 "active"：

```sql
SET status "active" NX
```

4. 只在键名为 "score" 已经存在时，将其值增加 5：

```sql
SET score 5 XX
```

5. 设置键名为 "message" 的值为 "Hello"，并返回旧的值：

```sql
SET message "Hello" GET
```

6. 删除键名为 "name" 的键：

```sql
DEL name
```

7. 批量删除多个键名：

```sql
DEL key1 key2 key3
```

8. 删除不存在的键名，不会报错，返回删除的键数量为 0：

```sql
DEL non_existing_key
```

### 集合的操作

集合（Set）是一种无序且不重复的数据结构，用于存储一组独立的元素。集合中的元素之间没有明确的顺序关系，每个元素在集合中只能出现一次。

1. 添加成员到集合：

   ```sh
   SADD fruits "apple"
   SADD fruits "banana"
   SADD fruits "orange"
   ```

2. 获取集合中的所有成员：

   ```sh
   SMEMBERS fruits
   ```

   输出结果：

   ```sh
   1) "apple"
   2) "banana"
   3) "orange"
   ```

3. 检查成员是否存在于集合中：

   ```sh
   SISMEMBER fruits "apple"
   ```

   输出结果：

   ```bash
   (integer) 1
   ```

4. 从集合中移除成员：

   ```sh
   SREM fruits "banana"
   ```

   输出结果：

   ```sh
   (integer) 1
   ```

5. 获取集合中的成员数量：

   ```sh
   SCARD fruits
   ```

   输出结果：

   ```bash
   (integer) 2
   ```

6. 获取随机成员：

   ```sh
   SRANDMEMBER fruits
   ```

   输出结果：

   ```sh
   "apple"
   ```

7. 求多个集合的并集：

   ```sh
   SUNION fruits vegetables
   ```

   输出结果：

   ```sh
   1) "apple"
   2) "orange"
   3) "tomato"
   4) "carrot"
   ```

8. 求多个集合的交集：

   ```sh
   SINTER fruits vegetables
   ```

   输出结果：

   ```sh
   "apple"
   ```

9. 求多个集合的差集：

   ```sh
   SDIFF fruits vegetables
   ```

   输出结果：

   ```sh
   "orange"
   ```

### 哈希表操作

哈希表（Hash）是一种数据结构，也称为字典、关联数组或映射，用于存储键值对集合。在哈希表中，键和值都是存储的数据项，并通过哈希函数将键映射到特定的存储位置，从而实现快速的数据访问和查找。

1. 设置哈希表中的字段值：

   ```sh
   HSET obj name "John"
   HSET obj age 25
   HSET obj email "john@example.com"
   ```

2. 获取哈希表中的字段值：

   ```sh
   HGET obj name
   ```

   输出结果：

   ```sh
   "John"
   ```

3. 一次设置多个字段的值：

   ```sh
   HMSET obj name "John" age 25 email "john@example.com"
   ```

4. 获取多个字段的值：

   ```sql
   HMGET obj name age email
   ```

   输出结果：

   ```sh
   1) "John"
   2) "25"
   3) "john@example.com"
   ```

5. 获取哈希表中所有字段和值：

   ```sql
   HGETALL obj
   ```

   输出结果：

   ```sh
   1) "name"
   2) "John"
   3) "age"
   4) "25"
   5) "email"
   6) "john@example.com"
   ```

6. 删除哈希表中的字段：

   ```sql
   HDEL obj age email
   ```

   输出结果：

   ```bash
   (integer) 2
   ```

7. 检查哈希表中是否存在指定字段：

   ```sql
   HEXISTS obj name
   ```

   输出结果：

   ```bash
   (integer) 1
   ```

8. 获取哈希表中所有的字段：

   ```sql
   HKEYS obj
   ```

   输出结果：

   ```sh
   1) "name"
   ```

9. 获取哈希表中所有的值：

   ```sql
   HVALS obj
   ```

   输出结果：

   ```sh
   1) "John"
   ```

10. 获取哈希表中字段的数量：

    ```sql
    HLEN obj
    ```

    输出结果：

    ```bash
    (integer) 1
    ```

### 列表的操作

列表（List）是一种有序、可变且可重复的数据结构。在许多编程语言和数据存储系统中，列表是一种常见的数据结构类型，用于存储一组元素

1. 添加元素：

```sql
RPUSH key element1 element2 element3  // 将元素从右侧插入列表
LPUSH key element1 element2 element3  // 将元素从左侧插入列表
```

> - `LPUSH key element1 element2 ...`：将一个或多个元素从列表的左侧插入，即将元素依次插入列表的`头部`。如果列表不存在，则在执行操作前会自动创建一个新的列表。
> - `RPUSH key element1 element2 ...`：将一个或多个元素从列表的右侧插入，即将元素依次插入列表的`尾部`。如果列表不存在，则在执行操作前会自动创建一个新的列表。

1. 获取元素：

```sql
LINDEX key index  // 获取列表中指定索引位置的元素
LRANGE key start stop  // 获取列表中指定范围内的元素
```

1. 修改元素：

```sql
LSET key index newValue  // 修改列表中指定索引位置的元素的值
```

1. 删除元素：

```sql
LPOP key  // 从列表的左侧移除并返回第一个元素
RPOP key  // 从列表的右侧移除并返回最后一个元素
LREM key count value  // 从列表中删除指定数量的指定值元素
```

1. 获取列表长度：

```sql
LLEN key  // 获取列表的长度
```

## 45-Redis( 发布订阅 + 事务 )

### 发布订阅

发布-订阅是一种消息传递模式，其中消息发布者（发布者）将消息发送到频道（channel），而订阅者（订阅者）可以订阅一个或多个频道以接收消息。这种模式允许消息的解耦，发布者和订阅者之间可以独立操作，不需要直接交互。

在Redis中，发布-订阅模式通过以下命令进行操作：

1. **PUBLISH**命令：用于将消息发布到指定的频道。语法为：`PUBLISH channel message`。例如，PUBLISH news "Hello, world!" 将消息"Hello, world!"发布到名为"news"的频道。
2. **SUBSCRIBE**命令：用于订阅一个或多个频道。语法为：`SUBSCRIBE channel [channel ...]`。例如，SUBSCRIBE news sports 订阅了名为"news"和"sports"的频道。
3. **UNSUBSCRIBE**命令：用于取消订阅一个或多个频道。语法为：`UNSUBSCRIBE [channel [channel ...]]`。例如，UNSUBSCRIBE news 取消订阅名为"news"的频道。
4. **PSUBSCRIBE**命令：用于模式订阅一个或多个匹配的频道。语法为：`PSUBSCRIBE pattern [pattern ...]`。其中，pattern可以包含通配符。例如，`PSUBSCRIBE news.` 订阅了以"news."开头的所有频道。
5. **PUNSUBSCRIBE命令**：用于取消模式订阅一个或多个匹配的频道。语法为：`PUNSUBSCRIBE [pattern [pattern ...]]`。例如，`PUNSUBSCRIBE news.` 取消订阅以"news."开头的所有频道。

> 可以开两个cmd，一个做发布一个做订阅

![image-20240307161554462](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240307161554462.png)

### 事务

Redis支持事务（Transaction），它允许用户将多个命令打包在一起作为一个单元进行执行。事务提供了一种原子性操作的机制，要么所有的命令都执行成功，要么所有的命令都不执行。

Redis的事务使用MULTI、EXEC、WATCH和DISCARD等命令来管理。

1. MULTI命令：用于开启一个事务。在执行MULTI命令后，Redis会将接下来的命令都添加到事务队列中，而不是立即执行。
2. EXEC命令：用于执行事务中的所有命令。当执行EXEC命令时，Redis会按照事务队列中的顺序执行所有的命令。执行结果以数组的形式返回给客户端。
3. WATCH命令：用于对一个或多个键进行监视。如果在事务执行之前，被监视的键被修改了，事务将被中断，不会执行。
4. DISCARD命令：用于取消事务。当执行DISCARD命令时，所有在事务队列中的命令都会被清空，事务被取消。

使用事务的基本流程如下：

1. 使用MULTI命令开启一个事务。
2. 将需要执行的命令添加到事务队列中。
3. 如果需要，使用WATCH命令监视键。
4. 执行EXEC命令执行事务。Redis会按照队列中的顺序执行命令，并返回执行结果。
5. 根据返回结果判断事务执行是否成功。

事务中的命令在执行之前不会立即执行，而是在执行EXEC命令时才会被执行。这意味着事务期间的命令并不会阻塞其他客户端的操作，也不会中断其他客户端对键的读写操作。

需要注意的是，`Redis的事务不支持回滚操作`。如果在事务执行期间发生错误，事务会继续执行，而不会回滚已执行的命令。因此，在使用Redis事务时，需要保证事务中的命令是幂等的，即多次执行命令的结果和一次执行的结果相同

```sh
# 连接Redis
redis-cli

# 开启事务
MULTI

# 添加命令到事务队列
SET key1 chenchen
GET key2

# 执行事务
EXEC
```

![image-20240307184808560](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240307184808560.png)

## 46-Redis( 持久化RDB AOF )

### redis持久化

Redis提供两种持久化方式：

1. RDB（Redis Database）持久化：RDB是一种快照的形式，它会将内存中的数据定期保存到磁盘上。可以通过配置Redis服务器，设置自动触发RDB快照的条件，比如在指定的时间间隔内，或者在指定的写操作次数达到一定阈值时进行快照保存。RDB持久化生成的快照文件是一个二进制文件，包含了Redis数据的完整状态。在恢复数据时，可以通过加载快照文件将数据重新加载到内存中。
2. AOF（Append-Only File）持久化：AOF持久化记录了Redis服务器执行的所有写操作命令，在文件中以追加的方式保存。当Redis需要重启时，可以重新执行AOF文件中保存的命令，以重新构建数据集。相比于RDB持久化，AOF持久化提供了更好的数据恢复保证，因为它记录了每个写操作，而不是快照的形式。然而，AOF文件相对于RDB文件更大，恢复数据的速度可能会比较慢。

### RDB使用

打开redis配置文件

![image-20240307191041743](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240307191041743.png)

找到save

![image-20240307191118723](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240307191118723.png)

他提供了三个案例

1. 3600秒内也就是一小时进行一次改动就会触发快照
2. 300秒内也就是5分钟，进行100次修改就会进行快照
3. 60秒内一万次修改就会进行快照

具体场景需要根据你的用户量，以及负载情况自己定义.

![image-20240307191134609](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240307191134609.png)

其次就是可以通过命令行手动触发快照

![image-20240307191217801](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240307191217801.png)

### AOF使用

将 `appendonly` 配置项的值设置为 `yes`：默认情况下，该配置项的值为 `no`，表示未启用AOF持久化。将其值修改为 `yes`，以启用AOF持久化。

![image-20240307191244697](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240307191244697.png)

## 47-Redis( 主从复制 )

Redis主从复制是一种数据复制和同步机制，其中一个Redis服务器（称为主服务器）将其数据复制到一个或多个其他Redis服务器（称为从服务器）。主从复制提供了数据冗余备份、读写分离和故障恢复等功能。

![image-20240307201015471](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20240307201015471.png)

以下是Redis主从复制的一般工作流程：

1. 配置主服务器：在主服务器上，你需要在配置文件中启用主从复制并指定从服务器的IP地址和端口号。你可以使用`replicaof`配置选项或`slaveof`配置选项来指定从服务器。
2. 连接从服务器：从服务器连接到主服务器并发送复制请求。从服务器通过发送`SYNC`命令请求进行全量复制或通过发送`PSYNC`命令请求进行部分复制（增量复制）。
3. 全量复制（SYNC）：如果从服务器是第一次连接或无法执行部分复制，主服务器将执行全量复制。在全量复制期间，主服务器将快照文件（RDB文件）发送给从服务器，从服务器将接收并加载该文件以完全复制主服务器的数据。
4. 部分复制（PSYNC）：如果从服务器已经执行过全量复制并建立了复制断点，主服务器将执行部分复制。在部分复制期间，主服务器将发送增量复制流（replication stream）给从服务器，从服务器将接收并应用该流以保持与主服务器的同步。
5. 复制持久化：从服务器接收到数据后，会将其保存在本地磁盘上，以便在重启后仍然保持数据的一致性。
6. 同步延迟：从服务器的复制是异步的，因此存在复制延迟。延迟取决于网络延迟、主服务器的负载和从服务器的性能等因素。
7. 读写分离：一旦建立了主从复制关系，从服务器可以接收读操作。这使得可以将读流量从主服务器分散到从服务器上，从而减轻主服务器的负载。
8. 故障恢复：如果主服务器发生故障，可以将一个从服务器提升为新的主服务器，以继续提供服务。当主服务器恢复时，它可以作为从服务器连接到新的主服务器，继续进行数据复制。

### 修改配置文件

在根目录下面新建一个 redis-6378.conf 配置文件 作为redis`从服务器`,默认的配置文件6379作为`主服务器`

redis-6378.conf 文件配置，配置文件名字随便取

```sh
bind 127.0.0.1 #ip地址
port 6378 #端口号
daemonize yes #守护线程静默运行
replicaof 127.0.0.1 6379 #指定主服务器
```

启动从服务器

```sh
redis-server ./redis-6378.conf # 指定配置文件
```

打开从服务器cli

```sh
redis-cli -p 6378
```

启动主服务器

```sh
redis-cli # 直接启动默认就是主服务器的配置文件
```

主服务器写入一个值

```sh
set master 2
```

从服务器直接同步过来这个值 就可以直接获取到

> 注意从服务器是不允许写入的操作

## 48-Redis(  ioredis )

ioredis 是一个强大且流行的 Node.js 库，用于与 Redis 进行交互。Redis 是一个开源的内存数据结构存储系统。ioredis 提供了一个简单高效的 API，供 Node.js 应用程序与 Redis 服务器进行通信。

以下是 ioredis 的一些主要特点：

1. 高性能：ioredis 设计为快速高效。它支持管道操作，可以在一次往返中发送多个 Redis 命令，从而减少网络延迟。它还支持连接池，并且可以在连接丢失时自动重新连接到 Redis 服务器。
2. Promises 和 async/await 支持：ioredis 使用 promises，并支持 async/await 语法，使得编写异步代码和处理 Redis 命令更加可读。
3. 集群和 sentinel 支持：ioredis 内置支持 Redis 集群和 Redis Sentinel，这是 Redis 的高级功能，用于分布式设置和高可用性。它提供了直观的 API，用于处理 Redis 集群和故障转移场景。
4. Lua 脚本：ioredis 允许你使用 `eval` 和 `evalsha` 命令在 Redis 服务器上执行 Lua 脚本。这个功能使得你可以在服务器端执行复杂操作，减少客户端与服务器之间的往返次数。
5. 发布/订阅和阻塞命令：ioredis 支持 Redis 的发布/订阅机制，允许你创建实时消息系统和事件驱动架构。它还提供了对 `BRPOP` 和 `BLPOP` 等阻塞命令的支持，允许你等待项目被推送到列表中并原子地弹出它们。
6. 流和管道：ioredis 支持 Redis 的流数据类型，允许你消费和生成数据流。它还提供了一种方便的方式将多个命令进行管道化，减少与服务器之间的往返次数。

### 使用方法

安装

```sh
npm i ioredis
```

连接redis

```js
import Ioredis from 'ioredis'

const ioredis = new Ioredis({
    host: '127.0.0.1', //ip
    port: 6379, //端口
})
```

1. 字符串

```js
//存储字符串并且设置过期时间
ioredis.setex('key', 10, 'value') 
//普通存储
ioredis.set('key', 'value')
//读取
ioredis.get('key')
```

2. 集合

```js
// 添加元素到集合
redis.sadd('myset', 'element1', 'element2', 'element3');

// 从集合中移除元素
redis.srem('myset', 'element2');

// 检查元素是否存在于集合中
redis.sismember('myset', 'element1').then((result) => {
  console.log('Is member:', result); // true
});

// 获取集合中的所有元素
redis.smembers('myset').then((members) => {
  console.log('Members:', members);
});
```

3. 哈希

```js
// 设置哈希字段的值
redis.hset('myhash', 'field1', 'value1');
redis.hset('myhash', 'field2', 'value2');

// 获取哈希字段的值
redis.hget('myhash', 'field1').then((value) => {
  console.log('Value:', value); // "value1"
});

// 删除哈希字段
redis.hdel('myhash', 'field2');

// 获取整个哈希对象
redis.hgetall('myhash').then((hash) => {
  console.log('Hash:', hash); // { field1: 'value1' }
});
```

4. 队列

```js
// 在队列的头部添加元素
redis.lpush('myqueue', 'element1');
redis.lpush('myqueue', 'element2');

// 获取队列中所有元素
redis.lrange('myqueue', 0, -1).then((elements) => {
  console.log('Queue elements:', elements);
});
//获取长度
redis.llen('myqueue').then((length) => {
  console.log('Queue length:', length);
});
```

### 发布订阅

```js
// 引入 ioredis 库
import Ioredis from 'ioredis';

// 创建与 Redis 服务器的连接
const ioredis = new Ioredis({
  host: '127.0.0.1',
  port: 6379,
});

// 创建另一个 Redis 连接实例
const redis2 = new Ioredis();

// 订阅频道 'channel'
ioredis.subscribe('channel');

// 监听消息事件
ioredis.on('message', (channel, message) => {
  console.log(`Received a message from channel ${channel}: ${message}`);
});

// 发布消息到频道 'channel'
redis2.publish('channel', 'hello world');
```

## 49-lua( 安装-介绍 )