---
title: MATLAB中使用CSV文件
author: 爱养虫的小熊
tags: [MATLAB,CSV,文件操作]
categories:
  - [MATLAB,CSV]
top: 2
feature: true
mathjx: true
comment: true
date: 2021-11-13 15:36:38
---

# 读取CSV文件

## `csvread`只能读取纯数值的`CSV`文件

查看帮助

```matla
help csvread
```

读取文件格式:

```matl
a = csvread('1.csv')
disp(a)
```

# 创建CSV文件

<!--more-->