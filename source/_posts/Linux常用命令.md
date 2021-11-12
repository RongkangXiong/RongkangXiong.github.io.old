---
title: Linux常用命令
author: 爱养虫的小熊
tags: [Linux,命令,常用]
categories:
  - [常用,Linux]
top: 1
feature: true
mathjx: true
comment: true
date: 2021-11-12 13:34:35
---

# Linux进程管理

## 清除Terminal界面

```md
clear
```

## 显示正在运行的CPU进程

```md
htop
```

<img src="_post/../Linux常用命令/cpu进程.png" alt="cpu进程" style="zoom:50%;" />



## 显示正在运行的GPU进程

显示正在运行的GPU进程

```md
nvidia-smi
```

<img src="_post/../Linux常用命令/GUP进程.png" alt="GPU进程"  />

## 清理进程

```linux
kill -9 PID
```

其中`PID` 是你的进程编号

# 文件操作

## 统计文件夹下面文件个数

长列表输出该目录下文件信息(注意这里的文件是指目录、链接、设备文件等)，每一行对应一个文件或目录

```linux
ls -l
```

统计当前目录下文件的个数包括子目录

```linux
ls -lR
```
<!--more-->
