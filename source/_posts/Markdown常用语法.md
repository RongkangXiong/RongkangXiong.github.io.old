---
title: Markdown常用语法
author: 爱养虫的小熊
tags: [Markdown]
categories:
  - [常用,Markdown]
top: 1
feature: true
mathjx: true
comment: true
date: 2021-11-12 13:02:59
---

[Typora下载](https://www.typora.io/#windows)


## 小功能

## 启用预览功能

直接在文章中插入即可，此代码一下的需要点击 阅读更多 才能此代码下面的内容

```md
<!--more-->
```

## 文章内部锚点跳转

这个方式是由John Tsai给出的，分成两步：

- 定义一个锚(id)：

```md
<span id="jump">跳转到的地方</span>
```

- 使用markdown语法：

```md
[点击跳转](#jump)
```

## 自己写的文章的跳转

```md
[名称](/forder-to-you-file)
```

例子:

- 跳转到[我的第一篇博客](/post/Firstblog.html)

  ```md
    [我的第一篇博客](/post/Firstblog.html)
  ```

- 跳转到[我的笔记](/mynotes/math/common_dstribute.html)
    在内部的位置是`myblog/source/mynotes/math/common_dstribute.html`
    ```md
    [我的笔记](/mynotes/math/common_dstribute.html)
    ```

## 链接跳转

```md
[名称](链接)
```


# 显示图片


<!--more-->

# VSCode快捷键

## 快速修复

`Windows` 上是 `Ctrl + .`
