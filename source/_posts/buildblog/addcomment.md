title: Hexo的Next主题配置Utterances评论系统
tags:
  - hexo
  - NexT
  - 评论系统
  - 个人博客
categories: []
date: 2021-11-11 16:41:00
---

写作前面
最新版本的NexT默认不内置gitment评论系统
选用目前NexT 8+版本的内置Utterances

# 创建GitHub仓库
在自己的github账号下创建一个仓库来存放评论，仓库名最好为`utterances`，方便后续自己识别，仓库设置为public
设置一个readme文件

## 安装Utterances
安装地址：[https://github.com/apps/utterances](https://github.com/apps/utterances)
访问安装地址，进入安装页面，点击`Install`按钮
权限选择，可以选择访问全部仓库，或者刚才指定仓库

## 配置Utterances
打开/blog/themes/next/_config.yml
查找`utterances`字段并修改如下
```yml
# Utterances
# For more information: https://utteranc.es
utterances:
  enable: true
  repo: SantaJiang/utterances	#格式是 user_name/repo_name
  # Available values: pathname | url | title | og:title
  issue_term: pathname
  # Available values: github-light | github-dark | preferred-color-scheme | github-dark-orange | icy-dark | dark-blue | photon-dark | boxy-light
  theme: github-light
```
完成后重新部署:
```md
hexo clean
hexo g
hexo d
```
一个一个运行，不然可能部署会报错

参考链接:
    [utterance](https://utteranc.es/?installation_id=20644453&setup_action=install)
    [Santa的个人博客](https://santajiang.github.io/2021/08/18/Next%E4%B8%BB%E9%A2%98%E9%85%8D%E7%BD%AEUtterances%E8%AF%84%E8%AE%BA%E7%B3%BB%E7%BB%9F/#more)