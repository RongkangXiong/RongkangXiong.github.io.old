---
title: addcount_number
author: 爱养虫的小熊
tags: []
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
在 `/theme/next/layout/_partial/footer.njk` 文档开头添加下面的代码：
```njk
<script async src="//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"></script>
```
- 显示统计标签
  编辑 /themes/next/_config.yml（主题配置文档）文档：
  在 footer（通过查找定位）下面添加如下内容，注意缩进：
<!--more-->