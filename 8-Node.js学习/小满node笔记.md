# 小满node笔记

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

## 11-Path Windows & posix

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

![image-20231027191228993](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20231027191228993.png)

#### process.cwd()

`process.cwd()`返回当前的工作目录

> ESM模式下，`__dirname`无法使用，这个是代替`__dirname`使用的

例如在 `F:\project\node>` 执行的脚本就返回这个目录

![image-20231027191059831](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20231027191059831.png)

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

![image-20231027191940126](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20231027191940126.png)

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

![image-20231027192143184](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20231027192143184.png)

### 环境变量场景

区分开发环境 和 生产环境

```sh
npm install cross-env
```

`cross-env`能跨平台设置和使用环境变量，不论是在Windows系统还是POSIX系统。同时，它提供了一个设置环境变量的脚本，使得您可以在脚本中以unix方式设置环境变量，然后在Windows上也能兼容运行

如下，在package中设置`cross-env NODE_ENV=dev`

![image-20231027192352096](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20231027192352096.png)

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

![image-20231027195332172](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20231027195332172.png)

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

![image-20231027195540243](https://chen-1320883525.cos.ap-chengdu.myqcloud.com/img/image-20231027195540243.png)

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

