---
title: 用在Hexo博客写作中用Typora快捷插入图像
author: 爱养虫的小熊
tags: [Typora,Hexo,插入图像]
categories:
  - [个人博客,Typora]
top: 3
feature: true
mathjx: true
comment: true
date: 2021-11-13 01:29:04
---





# 下载Typora

[Typora官网链接](https://www.typora.io/)

现在安装好后

打开`文件-设置偏好`

<!--more-->

<img src="../images/blog/用Typora快捷插入图像/image-20211113012957221.png" alt="image-20211113012957221"  />

点击`图像-选择操作 复制到指定路径`

![image-20211113013313305](../images/blog/用Typora快捷插入图像/image-20211113013313305.png)



输入一下代码，没有文件夹的可以选择创建文件夹：

```python
你的blog的路径\source\images\blog\${filename}
```

下面的两项打上勾

然后我们测试

直接复制一张图片粘贴到Typora中

![image-20211113013626874](../images/blog/用Typora快捷插入图像/image-20211113013626874.png)

效果如图

![image-20211113013709011](../images/blog/用Typora快捷插入图像/image-20211113013709011.png)

`Ctrl+s`保存一下`md`文件，然后我们打开网页查看是否有图片

```git
hexo s
```

![image-20211113014052910](../images/blog/用Typora快捷插入图像/image-20211113014052910.png)

Nice!

本地编辑器和网页都有了图像

尝试了路径各种排列组合，VScode伤透了我的心，同样的路径格式就是要么VScode有图像，要么网页没图像

最后终于尝试出了一种办法！

