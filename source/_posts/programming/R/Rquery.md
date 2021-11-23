---
title: R语言常用代码
date: 2021-11-10 11:14:00
tags: [R,常用,Code]
categories: [常用,R,Code]
feature: true
---

## tabel输出

```r
library(knitr)
result <- cbind(theta.hat, boot.theta.hat, bias,standard.error)  #合并计算结果,theta.hat,bott.theta.hat等都要是同等维度的向量
dimnames(result)[[2]] <- c("theta", "Bootstrap theta.hat", "bias", "standard error") #重命名各列
kable(result, caption = "表1：用bootstrap估计theta.hat的bias和standard error")
```

表1.1：用bootstrap估计theta.hat的bias和standard error
|theta| Bootstrap | theta.hat | bias standard error |
| - | :-: | -: | -: |
|0.619115| 0.6199636| 0.0008486| 0.0477611|
