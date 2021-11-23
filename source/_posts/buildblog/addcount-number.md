---
title: addcount_number
author: 爱养虫的小熊
tags: [个人博客,hexo,访客统计,阅读统计]
categories:
  - 个人博客
top: 1
feature: true
mathjx: true
comment: true
date: 2021-11-11 20:02:48
---
## 
Next 主题已经合并
在NexT主题配置文件中找到
```md
# Post wordcount display settings
# Dependencies: https://github.com/next-theme/hexo-word-counter
symbols_count_time:
  symbols: true
  time: true
  total_symbols: true
  total_time: true
  exclude_codeblock: false  #允许排出代码块内所有内容，以便进行准确的单词计数
  separated_meta: true     # 是否另起一行（true的话不和发表时间等同一行）
  item_text_post: true     # 首页文章统计数量前是否显示文字描述（本文字数、阅读时长）
  item_text_total: true   # 页面底部统计数量前是否显示文字描述（站点总字数、站点阅读时长）
  awl: 2                   # Average Word Length
  wpm: 275                 # Words Per Minute（每分钟阅读词数）
  suffix: "mins."
```

# busuanzi统计
NexT已经集成了busuanzi统计功能，只需要在主题配置文件`_config.yml`文件中将如下代码中的
`enable: flase`改为`enable: true`即可

```njk
# Show Views / Visitors of the website / page with busuanzi.
# For more information: http://ibruce.info/2015/04/04/busuanzi/
busuanzi_count:
  enable: true
  total_visitors: true
  total_visitors_icon: fa fa-user
  total_views: true
  total_views_icon: fa fa-eye
  post_views: true
  post_views_icon: far fa-eye
```
然后
```md
hexo clean
hexo g
hexo d
```
输入密码部署上去可能要等待十分钟左右就可以显示了
<!--more-->