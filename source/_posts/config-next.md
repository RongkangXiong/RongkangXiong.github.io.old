---
title: Next配置
date: 2021-11-11 11:14:00
tags: [hexo,next]
categories: 
    - [个人博客]
    - [Hexo,NexT]
feature: true
---

<span id="begin">写在开头</span>
[点击跳转到文末](#end)

[Hexo搭建的GitHub博客之优化大全https://zhuanlan.zhihu.com/p/33616481](https://zhuanlan.zhihu.com/p/33616481)
[背景动画](https://blog.csdn.net/weixin_39345384/article/details/80785373)

# 新建文章时，在相同目录下创建同名文件夹（便于图片管理）

- 打开站点配置文件_config.yml，搜索post_asset_folder字段，设置其值为true
- 安装hexo-asset-image：npm install hexo-asset-image --save
- 此时hexo new "fileName"会在/source/_posts目录下创建同名的文件夹
- 只需在 md 文件里使用

```md
  ![title](图片名.jpg)
```

  无需路径名就可以插入图片。
ps: 发现这样就不能启用创建文件自动打开编辑器功能
自己创建文件夹即可
<!--more-->

# 启用预览功能

直接在文章中插入即可，此代码一下的需要点击 阅读更多 才能显示

```md
<!--more-->
```

# 文章内部锚点跳转

这个方式是由John Tsai给出的，分成两步：

1. 定义一个锚(id)：

```md
<span id="jump">跳转到的地方</span>
```

2. 使用markdown语法：

```md
[点击跳转](#jump)
```

# 自己写的文章的跳转

```md
[名称](/forder-to-you-file)
```

在 /mynotes/math 下的 common_dstribute.md文件可以通过一下代码实现跳转
[常用概率分布](/mynotes/math/common_dstribute.html)

[mynotes](/mynotes/index.html)

在 /mynotes/ 下的 index.md文件可以通过跳转

```md
[mynotes](/mynotes/index.html)
```

[Introduction](introduction.html)
在/source/_post/ 文件夹下面(和本文件同文件夹)的introduction.md的文件可以通过来跳转

```md
[Introduction](introduction.html) 
```

# 站点文章置顶

打开Myblog站点下node_modules/hexo-generator-index/lib/generator.js文件。代码全部替换为

```yml
'use strict';
var pagination = require('hexo-pagination');
module.exports = function(locals){
  var config = this.config;
  var posts = locals.posts;
    posts.data = posts.data.sort(function(a, b) {
        if(a.top && b.top) { // 两篇文章top都有定义
            if(a.top == b.top) return b.date - a.date; // 若top值一样则按照文章日期降序排
            else return b.top - a.top; // 否则按照top值降序排
        }
        else if(a.top && !b.top) { // 以下是只有一篇文章top有定义，那么将有top的排在前面（这里用异或操作居然不行233）
            return -1;
        }
        else if(!a.top && b.top) {
            return 1;
        }
        else return b.date - a.date; // 都没定义按照文章日期降序排
    });
  var paginationDir = config.pagination_dir || 'page';
  return pagination('', posts, {
    perPage: config.index_generator.per_page,
    layout: ['index', 'archive'],
    format: paginationDir + '/%d/',
    data: {
      __index: true
    }
  });
};
```

- 打开文章添加top字段,设置数值，数值越大文章越靠前

```yml
---
layout: layout
title: 标签1
date: 2017-08-18 15:41:18
tags: 标签1
top: 100
---
```

[参考链接https://www.jianshu.com/p/d23d67d318c7](https://www.jianshu.com/p/d23d67d318c7)

# Hexo博客NexT主题下添加字数统计和阅读时长

- 安装hexo-symbols-count-time

  ```python
    npm install hexo-symbols-count-time --save
  ```

- 如果安装完报如下提醒，还需安装eslint

  ```python
    npm install eslint --save
  ```

- 站点/_config.yml配置

```yml
symbols_count_time:
  symbols: true                # 文章字数统计
  time: true                   # 文章阅读时长
  total_symbols: true          # 站点总字数统计
  total_time: true             # 站点总阅读时长
  exclude_codeblock: false     # 排除代码字数统计
```

- Next主题文件 **themes/next/_config.yml**

```yml
# Post wordcount display settings
# Dependencies: https://github.com/theme-next/hexo-symbols-count-time
symbols_count_time:
  separated_meta: true     # 是否另起一行（true的话不和发表时间等同一行）
  item_text_post: true     # 首页文章统计数量前是否显示文字描述（本文字数、阅读时长）
  item_text_total: false   # 页面底部统计数量前是否显示文字描述（站点总字数、站点阅读时长）
  awl: 4                   # Average Word Length
  wpm: 275                 # Words Per Minute（每分钟阅读词数）
  suffix: mins.
```

[参考链接https://github.com/RongkangXiong/hexo-symbols-count-time](https://github.com/RongkangXiong/hexo-symbols-count-time)

# Hexo博客NexT主题下代码块复制功能

为了提高博客代码块的用户体验，仅仅代码高亮还不行，最好还能一键复制代码。故此文将讲述Hexo NexT主题博客的代码块复制功能配置。

- 在themes/next/layout/_third-party/下新建文件copy-code.swig，写入下面的内容：

```yml
{% if theme.codeblock.copy_button.enable %}
  <style>
    .copy-btn {
      display: inline-block;
      padding: 6px 12px;
      font-size: 13px;
      font-weight: 700;
      line-height: 20px;
      color: #333;
      white-space: nowrap;
      vertical-align: middle;
      cursor: pointer;
      background-color: #eee;
      background-image: linear-gradient(#fcfcfc, #eee);
      border: 1px solid #d5d5d5;
      border-radius: 3px;
      user-select: none;
      outline: 0;
    }

    .highlight-wrap .copy-btn {
      transition: opacity .3s ease-in-out;
      opacity: 0;
      padding: 2px 6px;
      position: absolute;
      right: 4px;
      top: 8px;
    }

    .highlight-wrap:hover .copy-btn,
    .highlight-wrap .copy-btn:focus {
      opacity: 1
    }

    .highlight-wrap {
      position: relative;
    }
  </style>
  
  <script>
    $('.highlight').each(function (i, e) {
      var $wrap = $('<div>').addClass('highlight-wrap')
      $(e).after($wrap)
      $wrap.append($('<button>').addClass('copy-btn').append('{{__("post.copy_button")}}').on('click', function (e) {
        var code = $(this).parent().find('.code').find('.line').map(function (i, e) {
          return $(e).text()
        }).toArray().join('\n')
        var ta = document.createElement('textarea')
        document.body.appendChild(ta)
        ta.style.position = 'absolute'
        ta.style.top = '0px'
        ta.style.left = '0px'
        ta.value = code
        ta.select()
        ta.focus()
        var result = document.execCommand('copy')
        document.body.removeChild(ta)
        {% if theme.codeblock.copy_button.show_result %}
          if(result)$(this).text('{{__("post.copy_success")}}')
          else $(this).text('{{__("post.copy_failure")}}')
        {% endif %}
        $(this).blur()
      })).on('mouseleave', function (e) {
        var $b = $(this).find('.copy-btn')
        setTimeout(function () {
          $b.text('{{__("post.copy_button")}}')
        }, 300)
      }).append(e)
    })
  </script>
{% endif %}
```

- 编辑themes/next/layout/_layout.njk文件，在文件末尾

  ```
  {{- next_inject('bodyEnd') }}
  ```

前面对齐添加一行代码：

```yml
{% include '_third-party/copy-code.swig' -%}
```

- 添加按钮上显示的语言 在themes/next/languages/zh-CN.yml文件的post板块中添加下列代码：

```yml
copy_button: 复制
copy_success: 复制成功
copy_failure: 复制失败
```

- 在主题配置文件themes/next/_config.yml中添加开关
  搜索codeblock

```yml
codeblock:
  border_radius:
  copy_button:
    enable: true
    # Show text copy result
    show_result: true
```

重新生成

```yml
hexo clean & hexo g
```

[参考链接https://blog.csdn.net/Awt_FuDongLai/article/details/107466848](https://blog.csdn.net/Awt_FuDongLai/article/details/107466848)

# 添加搜索功能

- 安装插件

```yml
npm install hexo-generator-search
```

- 查找主题配置文件themes/next/_config.yml中的local_search ：

```yml
local_search:
  enable: true
  # If auto, trigger search by changing input.
  # If manual, trigger search by pressing enter key or search button.
  trigger: manual  #手动，按回车键或搜索按钮触发搜索
  # Show top n results per article, show all results by setting to -1
  top_n_per_article: 1
  # Unescape html strings to the readable one.
  unescape: false
  # Preload the search data when the page loads.
  preload: false
```

# Hexo添加文章时自动打开编辑器

- 首先在Hexo目录下的scripts目录中创建一个JavaScript脚本文件(name.js)
- 如果没有这个scripts目录，则新建一个scripts目录
- 新建的JavaScript脚本文件可以任意取名
通过这个脚本，我们用其来监听hexo new这个动作，并在检测到hexo new之后，执行编辑器打开的命令
- 如果你是windows平台的Hexo用户，则将下列内容写入你的脚本：

```yml
var spawn = require('child_process').exec;
hexo.on('new', function(data){
  spawn('start  "markdown编辑器绝对路径.exe" ' + data.path);
});
```

- 如果你是Mac平台Hexo用户，则将下列内容写入你的脚本：

```yml
var exec = require('child_process').exec;
hexo.on('new', function(data){
    exec('open -a "markdown编辑器绝对路径.app" ' + data.path);
});
```

[参考链接https://blog.csdn.net/weixin_39345384/article/details/80785373](https://blog.csdn.net/weixin_39345384/article/details/80785373)

# 点击侧栏头像回到首页

<span id="end">文末</span>

[点击跳转到开头](#begin)
