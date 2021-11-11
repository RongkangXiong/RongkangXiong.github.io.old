---
title: First Blog-制作个人博客
date: 2021-11-09 23:02:32
tags: [Hexo,个人博客, 网站, Github]
feature: true
categories: [个人博客]
---
自己购买域名和服务器，搭建博客的成本比较高，光是搭建和维护，就对大多数人来说，没有这样的精力和时间。
直接在github平台上托管我们的博客，就可以安心写作，而不需要定期维护。

# Hexo简介

Hexo是一款基于Node.js的静态博客框架，依赖少，易于安装使用，可以方便生成静态网页托管在GitHub或者Coding上。

# HEXO搭建步骤

1. 安装[git](https://git-scm.com/download/win)
2. 安装[Node.js](https://nodejs.org/en/download/)，选择LTS版本就行
3. 安装Hexo
4. Github建立个人仓库
5. 生成SSH添加到GitHub
6. 将Hexo部署到GitHub
7. 设置个人域名
8. 发布文章

<!--more-->
# 安装hexo

### Windows检查安装是否成功

```git
node -v
npm -v
```

前面git和nodejs安装好后，就可以安装hexo了，你可以先创建一个文件夹blog，然后cd到这个文件夹下(或者在这个文件夹下直接右键git bash打开)

### 开始安装Hexo

输入命令

```git
npm install -g hexo-cli
```

你会发现出现

```git

changed 57 packages in 6s

1 package is looking for funding
  run `npm fund` for details

```

这不是报错，只是开发者寻求捐赠支持
翻译：1个包正在寻找资金，运行<font color='red'> npm fund</font>了解详细信息

### 初始化Hexo

```git
hexo init myblog
```

#### 当下载很慢的时候可以更换源

- 淘宝npm镜像

    ```git
    npm install -g cnpm --registry=https://registry.npmmirror.com
    ```

- 阿里源

    ```git
    npm install -g cnpm --registry=https://registry.npm.taobao.orgnpm config set registry https://registry.npm.taobao.org
    npm config list
    ```

- 输入代码检查换源是否成功过

    ```git
    npm config list
    ```

然后

```git
cd myblog //进入这个myblog文件夹
npm install
hexo g
```

新建完成后，指定文件夹目录下有：

- node_modules: 依赖包
- public: 存放生成的页面
- scaffolds：生成文章的一些模板
- source：用来存放你的文章
- themes：主题
- **_config.yml: 博客的配置文件**

继续输入

```git
hexo g
hexo server
```

打开hexo的服务，在浏览器输入[localhost:4000](localhost:4000)就可以在本地看到你生成的博客

### 修改配置文件 **_config.yml**

```git
deploy:
    type: git
    repo: https://github.com/RongkangXiong/RongkangXiong.github.io.git
    branch: main
```

注意空格还有对齐

### 安装deploy-git

也就是部署的命令,这样你才能用命令部署到GitHub

```git
    npm install hexo-deployer-git --save
```

然后确认是否连接成功

```git
ssh -T git@github.com
```

会出现让你确认密码

```git
hexo clean
hexo generate
hexo deploy
```

其中**hexo clean**清除了你之前生成的东西，也可以不加。
**hexo generate** 顾名思义，生成静态文章，可以用**hexo g**缩写
**hexo deploy** 部署文章，可以用**hexo d**缩写

出现一下信息表示部署成功

```git
Branch 'master' set up to track remote branch 'main' from 'https://github.com/RongkangXiong/RongkangXiong.github.io'.
INFO  Deploy done: git
```

过一会儿就可以在 http://yourname.github.io 这个网站看到你的博客了

## 问题

### 出现 ***OpenSSL SSL_read: Connection was reset, errno 10054***

```git
    git config --global http.sslVerify "false"
```自己购买域名和服务器，搭建博客的成本比较高，光是搭建和维护，就对大多数人来说，没有这样的精力和时间。
直接在github平台上托管我们的博客，就可以安心写作，而不需要定期维护。

# Hexo简介

Hexo是一款基于Node.js的静态博客框架，依赖少，易于安装使用，可以方便生成静态网页托管在GitHub或者Coding上。

# HEXO搭建步骤

1. 安装[git](https://git-scm.com/download/win)
2. 安装[Node.js](https://nodejs.org/en/download/)，选择LTS版本就行
3. 安装Hexo
4. Github建立个人仓库
5. 生成SSH添加到GitHub
6. 将Hexo部署到GitHub
7. 设置个人域名
8. 发布文章

# 安装hexo

### Windows检查安装是否成功

```git
node -v
npm -v
```

前面git和nodejs安装好后，就可以安装hexo了，你可以先创建一个文件夹blog，然后cd到这个文件夹下(或者在这个文件夹下直接右键git bash打开)

### 开始安装Hexo

输入命令

```git
npm install -g hexo-cli
```

你会发现出现

```git

changed 57 packages in 6s

1 package is looking for funding
  run `npm fund` for details

```

这不是报错，只是开发者寻求捐赠支持
翻译：1个包正在寻找资金，运行<font color='red'> npm fund</font>了解详细信息

### 初始化Hexo

```git
hexo init myblog
```

#### 当下载很慢的时候可以更换源

- 淘宝npm镜像

    ```git
    npm install -g cnpm --registry=https://registry.npmmirror.com
    ```

- 阿里源

    ```git
    npm install -g cnpm --registry=https://registry.npm.taobao.orgnpm config set registry https://registry.npm.taobao.org
    npm config list
    ```

- 输入代码检查换源是否成功过

    ```git
    npm config list
    ```

然后

```git
cd myblog //进入这个myblog文件夹
npm install
hexo g
```

新建完成后，指定文件夹目录下有：

- node_modules: 依赖包
- public: 存放生成的页面
- scaffolds：生成文章的一些模板
- source：用来存放你的文章
- themes：主题
- **_config.yml: 博客的配置文件**

继续输入

```git
hexo g
hexo server
```

打开hexo的服务，在浏览器输入[localhost:4000](localhost:4000)就可以在本地看到你生成的博客

### 修改配置文件 **_config.yml**

```git
deploy:
    type: git
    repo: https://github.com/RongkangXiong/RongkangXiong.github.io.git
    branch: main
```

这里 repo内容可以换为：

```git
git@github.com:RongkangXiong/RongkangXiong.github.io.git
```

从而避免每次都要输入密码

注意空格还有对齐

### 安装deploy-git

也就是部署的命令,这样你才能用命令部署到GitHub

```git
    npm install hexo-deployer-git --save
```

然后确认是否连接成功

```git
ssh -T git@github.com
```

会出现让你确认密码

```git
hexo clean
hexo generate
hexo deploy
```

其中**hexo clean**清除了你之前生成的东西，也可以不加。
**hexo generate** 顾名思义，生成静态文章，可以用**hexo g**缩写
**hexo deploy** 部署文章，可以用**hexo d**缩写

快速代码为:

```git
hexo clean & hexo g & hexo d
```


出现一下信息表示部署成功

```git
Branch 'master' set up to track remote branch 'main' from 'https://github.com/RongkangXiong/RongkangXiong.github.io'.
INFO  Deploy done: git
```

过一会儿就可以在 <http://yourname.github.io> 这个网站看到你的博客了

## hexo基本配置

在文件根目录下的 *_config.yml*，就是整个hexo框架的配置文件了。可以在里面修改大部分的配置。详细可参考[官方的配置](https://hexo.io/zh-cn/docs/configuration)描述。

### 网站

| 参数 | 描述 |  作用
| - | :-: | -: | -: |
| title | 网站标题 | |
|subtitle|网站副标题| |
|description| 网站描述| 主要用于SEO，告诉搜索引擎一个关于您站点的简单描述，通常建议在其中包含您网站的关键词 |
|author |您的名字| 显示文章的作者 |
|language |网站使用的语言| |
|timezone |网站时区Hexo，比如说：America/New_York, Japan和 UTC| 默认使用您电脑的时区 |

### 网址

| 参数 | 描述 | 操作 |
| - | :-: | :-: | :-: |
|url|网址| url改成你的网站域名|
|root|网站根目录| |
|permalink |文章的 永久链接 格式| 生成某个文章时候的链接格式，官方给出的[永久链接变量](https://hexo.io/zh-cn/docs/permalinks)很多 |
|permalink_defaults |永久链接中各部分的默认值|

### 运行Hexo服务器
在127.0.0.1::8080 上启动服务器

```git
    hexo server -i 127.0.0.1 -p 8080
```

## 问题

### 出现 ***OpenSSL SSL_read: Connection was reset, errno 10054***

```git
    git config --global http.sslVerify "false"
```

# 更换主题

觉得默认的landscape主题不好看，那么可以在[官网的主题](https://hexo.io/themes/)中，选择你喜欢的一个主题进行修改就可以啦

## Hexo主题安装教程

进入[官网的主题](https://hexo.io/themes/)，选择喜欢主题，点击链接进入github界面
然后复制 **Code** 的 **HTTPS** 或者 **Github CLI**链接

```git
git clone https://github.com/ppoffice/hexo-theme-hueman.git themes/hueman
```
如果下载不了可以下载zip解压到 themes/hueman 下面
也可以用GitHub桌面端进行Clone





### 安装搜索系统


### 安装评论系统

```git
npm install valine --save
```


参考链接：
  - [Hexo 更换主题](https://www.jianshu.com/p/ec4e678f6cef)
  - [hexo史上最全搭建教程](https://blog.csdn.net/sinat_37781304/article/details/82729029?utm_source=wechat_session&utm_medium=social&utm_oi=1018674094685900800)
  - [aurora主题](https://aurora.tridiamond.tech/zh/)
  - [魔改aurora主题](https://blog.meerost.com/post/AuroraMagicChangeFirst)
  - [vuepress-theme-aurora主题](https://github.com/vuepress-aurora/vuepress-theme-aurora)
