---
title: MATLAB文件和文件夹操作
author: 爱养虫的小熊
date: 2021-11-13 16:54:30
tags: [MATLAB,错误处理机制]
categories:
    - [MATLAB,错误处理机制]
top: 1
feature: true
mathjx: true  #是否开启数学公式支持
comment: true
---


```matlab

A = exist(path,'dir');   %name为对应的路径 ,dir为指定值,照写
if A==0          %所在的路径不存在时，A的值为0  
   error('路径：%s 不存在！',path); %路径不存在就返回报错
en
```

这样错误输入路径就会报错

![image-20211113165232703](../../../images/blog/MATLAB错误处理机制/image-20211113165232703.png)