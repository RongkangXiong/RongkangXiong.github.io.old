---
title: Hexo-NexT主题添加相册
author: 爱养虫的小熊
tags: [Hexo,NexT]
categories:
  - 个人博客
top: 1
feature: true
mathjx: true
comment: true
date: 2021-11-11 22:09:55
---

相册期待实现效果
对于相册，在自己 基于Hexo NexT搭建 的博客上期待实现与豆瓣相册类似的效果，具体如下

- 主界面
  - 分类相册
  - 自定义相册名
  - 自定义封面
- 分类相册界面
  - 三等分列
  - 点击看大图
  - 本地图片源/图床外链均可
  - 与文章插图格式保持统一
- 其他
  - 每张图片都可以有对应的文字描述
  - 游客可以为图片添加评论
  - 相册里面也可以插入视频

<!--more-->
# Hexo+NexT博客搭建相册功能


## 创建相册目录
- 在 `git bash` 中输入命令 
```md
hexo new page gallery
```
- 在 `hexo/sourse/gallery` 目录下建立你需要的分类相册文件夹；
- 进入 `hexo/sourse/gallery` 目录，新建 `img` 文件夹用来存放相册封面；
在每个相册文件夹中创建 `img` 文件夹用来存放大图，以及 img/s 文件夹用来存放缩略图。
注意：`img/s` 文件夹可以省略不建，用`文件名-s.jpg` 的格式重命名缩略图即可。

## 图片处理
### 原图处理
将需要上传的图片放入 `gallery/相册名/img` 文件夹中，为了加载速度建议压缩至 `1mb` 以下，使用 `jpg` 格式保存；
除了文件大小以外没有其它要求，但是为了方便后续页面编辑，建议将文件以容易辨识的方式重命名，例如`日期-图片名.jpg`。

ps：可以写一个python的gui来搭配使用


[https://tding.top/archives/607c3b85.html](https://tding.top/archives/607c3b85.html)
