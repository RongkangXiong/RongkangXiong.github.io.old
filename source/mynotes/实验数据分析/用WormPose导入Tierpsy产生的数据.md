---
title: 用WormPose导入用Tierpsy tracker产生的数据
author: 爱养虫的小熊
tags: [实验分析,线虫,MATLAB,Python]
categories:
    - [实验分析,线虫]
top: 1
feature: true
mathjx: true  #是否开启数学公式支持
comment: true
date: 2021-11-12 13:25:55
---


# 下载视频转换软件`Fiji`
[Fiji软件](https://imagej.net/software/fiji/)




通过将`loader`声明为`tierpsy`
```python
dataset_loader="tierpsy"
```

为实验创建一个根目录，里面包含记录的视频，目录结构如下
```md
+-- dataset_path
|   +-- video_name0
|   |   +-- video_name0.hdf5
|   |   +-- video_name0_features.hdf5  or video_name0_featuresN.hdf5
|   +-- video_name1
|   |   +-- video_name1.hdf5
|   |   +-- video_name1_features.hdf5 or video_name1_featuresN.hdf5
|   ...
```

## 限制
在Tierpsy中选取 `提取时间戳选项`(即 `is_extract_timestamp`)
以便在`hdf5`文件中设置字段`timestamp/raw`，没有时间戳的配置文件在`WormPose`中不支持
每个文件中包含多个线虫 `indexes`的 `Tierpsy files`，`WormPose`将只加载一个线虫文件，即具有最小的`index`的文件

## 高级使用
`Tierpsy` 数据集加载器使用默认的`SimpleFrameProcessing class`从背景对线虫进行分割。
如果这不适用于您的图像，并且您具有从后台分割蠕虫的自定义功能，则应实现自定义数据集加载器。您仍然可以使用提供的分层框架数据集和功能数据集，但您将需要重新执行帧预处理。
以`toy_dataset`为例，添加自定义数据集加载器，如下所示：
```python
from wormpose import BaseFramePreprocessing

# We use the Tierpsy loaders from WormPose
from wormpose.dataset.loaders.tierpsy import FramesDataset, FeaturesDataset

# But we redefine a custom frame preprocessing function
class FramePreprocessing(BaseFramePreprocessing):

    def process(self, frame)

        segmented_frame = #TODO segment the frame, or load if precalculated
        background_color = #TODO find the background color
        return segmented_frame, background_color
```


# WormPose函数使用手册

wormpose.dataset.loader