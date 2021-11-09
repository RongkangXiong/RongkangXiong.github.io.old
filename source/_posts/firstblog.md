---
title: firstblog
date: 2021-11-09 23:02:32
tags:
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
```
