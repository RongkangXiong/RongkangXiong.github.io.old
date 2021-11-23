---
title: MATLAB文件和文件夹操作
author: 爱养虫的小熊
date: 2021-11-13 16:30:30
tags: [MATLAB,文件操作]
categories:
    - [MATLAB,文件操作]
top: 1
feature: true
mathjx: true  #是否开启数学公式支持
comment: true
---



## 弹出一个模态对话框，选择一个文件夹作为工作目录

```matl
selpath = uigetdir('path_to_your_folder')
```

![image-20211113163624565](../../../images/blog/MATLAB文件和文件夹操作/image-20211113163624565.png)

## 选择要处理的文件

选择刚刚选择的工作目录下的文件

```matl
[choosefiles,value] = fileChoose(selpath,'*.文件后缀');
```

![image-20211113163830189](../../../images/blog/MATLAB文件和文件夹操作/image-20211113163830189.png)

出来这样的效果，你可以单选，也可以多选，也可以全选

其中返回的`value =1`表示选择了文件，`choosefiles`信息如下：

![image-20211113164004182](../../../images/blog/MATLAB文件和文件夹操作/image-20211113164004182.png)

是一个struct结构，使用

```matl
choosefiles(i).folder
choosefiles(i).name
```

获取元素值
