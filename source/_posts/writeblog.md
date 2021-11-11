---
title: 如何书写博客
date: 2021-11-11 17:08:25
tags:
---

# 创建新文章
`git` 中进入根目录输入 `hexo new <模板> <文章名>` 新建文章
其中`<模板>`在`source`文件夹下面，默认有三个模板 `post`,`draft`,`page`

命令行输入
```md
hexo new post aiticle_title
```
此时会在 `source/_posts/` 文件夹中多了一个 `aiticle_title.md` 文件
打开后可以看到 `---`之间的内容为文章的配置内容

模板配置文件可以在`/scaffolds/post.md`修改`post.md`模板
```md
---
title: {{ title }}
author: 爱养虫的小熊
date: {{ date }}
tags: []
categories:
    - [个人博客,Hexo]
top: 1
feature: true
mathjx: true  #是否开启数学公式支持
common: true
---



<!--more-->
```


# hexo-admin插件管理博客写作
每次新建文章和写作文章都在`git`命令行中，很不方便，于是可以安装这款插件