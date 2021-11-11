---
title: 配置博客过程中的各种问题
author: 爱养虫的小熊
tags: [个人博客,问题]
categories:
  - [个人博客,问题]
top: 1
feature: true
mathjx: true
comment: true
date: 2021-11-11 21:53:09
---

配置blog过程中遇到的一些问题

<!--more-->

# 点击``标签``和`分类`进去发现是空白

这时候需要打开主题配置文件`_config.yml`

```yml
menu:
  home: / || fa fa-home                      #首页
  about: /about/ || fa fa-user               #关于
  #tags: /tags/ || fa fa-tags                 #标签
  #categories: /categories/ || fa fa-th       #分类
```

将`tags`和`categories`给注释取消，然后用

```md
hexo new page tags
```

打开生成的tags文件夹下的`index.md`修改里面的内容添加一行`type:

```md
---
title: categories
date: 2021-11-10 23:11:21
type: "tags"  #新加的
---
```

分类`categories`同理

```md
---
title: categories
date: 2021-11-10 23:11:21
type: "categories"
---
```
