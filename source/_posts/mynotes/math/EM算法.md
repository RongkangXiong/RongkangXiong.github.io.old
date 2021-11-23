---
title: E-M算法
author: 爱养虫的小熊
tags: [Math,R]
categories:
  - [Math,R]]
top: 2
feature: true
mathjx: true
comment: true
date: 2021-11-16 11:36:38
---

EM（Expectation-Maximum）算法也称期望最大化算法，由 `Dempster et al.(1977)`提出的一种最优化方法，常用于不完全数据求极大似然估计。

曾入选“数据挖掘十大算法”中，可见EM算法在机器学习、数据挖掘中的影响力。

EM算法是最常见的估计隐变量的方法，常被用来学习高斯混合模型(`Gaussian mixture model`,简称`GMM`)的参数；隐式马尔科夫算法(`HMM`)，`K-means`算法等

>缺失数据的问题：
>
>- 调查数据
>- 电子健康记录数据
>- 隐藏马尔科夫模型
>- 混合模型
>- 生存模型
>- 因果推导
>- ...



> 条件概率公式:
> $$
> \begin{align}
> P(Y|X) &=\frac{P(Y,X)}{P(X)}=\frac{P(Y,X)}{E^Y[P(Y,X)]}\\
> P(Y,X) &= P(Y|X)P(X)
> \end{align}
> $$

> <span id = "Jensen不等式">Jensen不等式 </span>:
>
> ​	如果$f(x)$是(下)凸函数(二阶导在区间上大于等于0)(PS: 百度百科定义是错的)，$x_i,(i=1, 2,…, m)$来自$f(x)$的定义域，$λ_i,(i=1, 2,…, m) \geq 0$且相加之和等于$1$，则有如下不等式成立： 
> $$
> \sum_{i=1}^{m} \lambda_i f(x_i) \geq f(\sum_{i=1}^{m} \lambda_i x_i)\\
> s.t. \quad \lambda_i\geq 0,\sum_i^m \lambda_i =1 \\
> 当且仅当 x_i = const 时,“=”成立 \\
> f(x) 是凹函数时(二阶导在区间小于等于0)，不等号反向 \\
> f(\sum_{i=1}^{m} \lambda_i x_i)\geq \sum_{i=1}^{m} \lambda_i f(x_i) \\
> s.t. \quad \lambda_i\geq 0,\sum_i^m \lambda_i =1 \\
> $$

> Jensen不等式扩展到随机变量:
>
> ​	如果$f(x)$是凸函数,将Jensen不等式中的$x_i$看做随机变量$X$的取值，将$\lambda_i$看做随机变量$X$的每种取值对应的概率，则有如下不等式：
> $$
> E[f(X)] \geq f(E[X])
> $$
> ​	当且仅当随机变量 $X$取常数值的时候取等号


$$
\begin{align}
Q(\theta,\theta^{(i)}) &= E^{Z|Y,\theta^{(i)}}[ ln(P(Y,z;\theta))]\\
& = E^{Z|Y,\theta^{(i)}}[\sum_{j=1}^n ln(P(y_j,z;\theta))]\\
&= \left\{ \begin{array}{rcl}    
\sum_{j=1}^n\int_{z\in D}  P(z|y_j;\theta^{(i)})ln  P(y_j|z;\theta)P(z;\theta)dz, &隐变量z连续取值D \\
\sum_{j=1}^n\sum_{k=1}^m  P(z_k|y_j;\theta^{(i)})ln  P(y_j|z_k;\theta)P(z_k;\theta),&隐变量z离散取值\{z_1,...,z_m \} \\
\end{array} \right.\\
&= E^{Z|Y,\theta^{(i)}}[\sum_{j=1}^n ln(P(y_j|z;\theta)P(z;\theta))]\\
\end{align}
$$


# 离散情况下的推导

当我们不知道观测数据是从哪个聚类或者分布抽取出来的时候

$Y=(y_1, y_2,…, y_n)$表示**观测数据**，用$H=(h_1,h_2,...,h_n)$  表示**隐变量数据**$Z=(z_1, z_2,…,z_m)$表示每个$h_k$的所有可能取值的集合(可以称为隐变量分布），$\Theta=(\theta_1,...,\theta_K)$表示需要求解的参数

观测数据$Y$是可以直接看见并使用的，隐藏数据$Z$并不知道，只能通过观测数据的对数似然函数$ ln P(Y;\theta)$的极大化来求最优参数

先来求一下观测数据$Y=(y_1, y_2,…, y_n)$的似然函数：
$$
\begin{align}
P(Y;\theta) & =E^Z[P(Y,Z;\theta)] ,联合概率与边缘概率的转换  \\
& = \sum_{k=1}^{m} P(Y,z_k;\theta) \\
L(Y|\theta) &= \prod_{j=1}^n P(y_j;\theta) \\
& = \prod_{j=1}^n\sum_{k=1}^m P(y_j,z_k;\theta) \\
& = \prod_{j=1}^n\sum_{k=1}^m P(y_j|z_k;\theta)P(z_k;\theta) 
\end{align}
$$
所以观测数据Y的对数似然函数$ln P(Y|\theta)$可以表示为:
$$
l(Y|\theta) = \sum_{j=1}^n ln \sum_{k=1}^m P(y_j|z_k;\theta)P(z_k;\theta)
$$
​	EM算法通过迭代逐步极大化$l(\theta)$来一步步优化参数$\theta$，比如第  $ i $ 次迭代我们得到参数的估计值为$θ^{(i)}$，那么我们希望在第$i+1$次迭代得到的参数估计值$\theta^{(i+1)}$能使得能再次增加，$l(\theta)$即$l(\theta^{(i+1)}) \geq  l(\theta^{(i)})$，就这样一步步使得$l(\theta)$达到极大。

## 现在来求一下在第 $i+1$次迭代时$l(\theta)$的下界

只要保证每一次迭代$l(\theta)$的下界都取极大，就能保证$l(\theta)$ 在每一次迭代过程中有尽可能的增长。
$$
\begin{align}
l(\theta,\theta^{(i)}) =l(Y|\theta) &= \sum_{j=1}^n ln \sum_{k=1}^m P(y_j|z_j;\theta)P(z_j;\theta),取概率密度函数T(z_k,\theta^{(j)}) \tag{1}\\
& = \sum_{j=1}^n ln \sum_{k=1}^m T(z_k;\theta^{(j)}) \frac{P(y_j|z_k;\theta)P(z_k;\theta)}{T(z_k;\theta^{(i)})},利用Jenson不等式凹函数形式 \tag{2}\\
& \geq \sum_{j=1}^n\sum_{k=1}^m  T(z_k;\theta^{(i)})ln  \frac{P(y_j|z_k;\theta)P(z_k;\theta)}{T(z_k;\theta^{(i)})}, 取T(z_k;\theta^{(i)}) =P(z_k|y_j;\theta^{(i)}) \tag{3}\\
& = \sum_{j=1}^n\sum_{k=1}^m  P(z_k|y_j;\theta^{(i)})ln  P(y_j|z_k;\theta)P(z_k;\theta) \tag{4}
\end{align}
$$
[Jenson不等式](#Jensen不等式)

在上式中
$$
\begin{align}
Jenson不等式成立的条件是 x_i =const,即(3)式中 \\
\frac{P(y_j|z_k;\theta)P(z_k;\theta)}{T(z_k;\theta^{(i)})} = C\\
另外有约束: T(z_k;\theta^{(i)}) \geq 0, \sum_{j} T(z_k;\theta^{(i)})=1 \\
联合可得约束条件: \sum_{j} T(z_k;\theta^{(i)}) = \sum_{j} \frac{P(y_j|z_k;\theta)P(z_k;\theta)}{C} =1 \\
即 \sum_{j} P(y_j|z_k;\theta)P(z_k;\theta)=C \\
第 i+1次迭代时\theta取值 \theta^{(i)}\\
\Rightarrow \sum_{j} P(y_j|z_k;\theta)P(z_k;\theta) = \sum_{j} P(y_j|z_k;\theta^{(i)})P(z_k;\theta^{(i)}) =C
\end{align}
$$

$$
\begin{align}
所以取: T(z_k;\theta^{(i)}) &= \frac{P(y_j|z_k;\theta^{(i)})P(z_k;\theta^{(i)})}{\sum_{j}P(y_j|z_k;\theta^{(i)})P(z_k;\theta^{(i)})}\\
& = \frac{P(y_j|z_k;\theta^{(i)})P(z_k;\theta^{(i)})}{\sum_{j}P(y_j,z_k;\theta^{(i)})}\\
& = \frac{P(y_j,z_k;\theta^{(i)})}{P(y_j;\theta^{(i)})}\\
& = P(z_k|y_j;\theta^{(i)})   \\
可以满足取等式的条件得到 l(\theta)的下界
\end{align}
$$

$$
(3)\rightarrow(4): 这是第i+1次迭代时 l(\theta)的下界,所以第i次迭代参数的估计值 \theta^{(i)}是已知的\\
所以 P(z_j|y_i,\theta^{(i)}) 和 ln P(z_j|y_i,\theta^{(i)}) 是常数项，去掉(3)式中的常数项就得到了(4)
$$

$E-Step:$令 $Q(\theta,\theta^{(i)})$表示第$i+1$次迭代时$l(\theta)$的下界，即为
$$
\begin{align}
Q(\theta,\theta^{(i)}) &= \sum_{j=1}^n\sum_{k=1}^m  P(z_k|y_j;\theta^{(i)})ln  P(y_j|z_k;\theta)P(z_k;\theta) \\
&= E^{Z|Y,\theta^{(i)}}[\sum_{j=1}^n ln(P(y_j|z;\theta)P(z;\theta))]\\
&=E^{Z|Y,\theta^{(i)}}[\sum_{j=1}^n ln(P(y_j,z;\theta))]
\end{align}
$$
在计算时要改变形式：
$$
\begin{align}
Q(\theta,\theta^{(i)}) &= \sum_{j=1}^n\sum_{k=1}^m  P(z_k|y_j;\theta^{(i)})ln  P(y_j|z_k;\theta)P(z_k;\theta) \\
&= \sum_{j=1}^n\sum_{k=1}^m \frac{P(z_k,y_j;\theta^{(i)})}{P(y_j;\theta^{(i)})}ln  P(y_j|z_k;\theta)P(z_k;\theta) \\
& = \sum_{j=1}^n\sum_{k=1}^m \frac{P(y_j|z_k;\theta^{(i)})P(z_k;\theta^{(i)})}{\sum_{r=1}^{m}P(y_j|z_r;\theta^{(i)})P(z_r;\theta^{(i)})}ln  P(y_j|z_k;\theta)P(z_k;\theta) \\
令 \gamma_{jk} &= \frac{P(y_j|z_k;\theta^{(i)})P(z_k;\theta^{(i)})}{\sum_{r=1}^{m}P(y_j|z_r;\theta^{(i)})P(z_r;\theta^{(i)})} \\
则 Q(\theta,\theta^{(i)}) &= \sum_{j=1}^n\sum_{k=1}^m \gamma_{jk} ln  P(y_j|z_k;\theta)P(z_k;\theta) \\
\end{align}
$$
$M-Step:$对$\theta$求导可以得到下一次的更新值$\theta=\theta^{(i+1)}$
$$
\frac{\partial Q(\theta,\theta^{(i)})}{\partial \theta} = 0 \\
\frac{\partial Q(\theta,\theta^{(i)})}{\partial \theta} = \sum_{j=1}^n\sum_{k=1}^m \gamma_{jk} \{\frac{1}{P(y_j|z_k;\theta)} \frac{\partial P(y_j|z_k;\theta)}{\partial \theta}+ \frac{1}{P(z_k;\theta)}\frac{\partial P(z_k;\theta)}{\partial \theta}\} =0
$$
一般离散情况下参数为 $\theta=\{数据分布函数的参数\}+\{h取z_k的概率p_k  \}$



# 连续情况下的推导

当我们不知道观测数据是从哪个聚类或者分布抽取出来的时候

$Y=(y_1, y_2,…, y_n)$表示**观测数据**，用$H=(h_1,h_2,...,h_n)$  表示**隐变量数据**$f(z)$表示每个$h_k$的取值的分布(可以称为隐变量分布，取值域为$D$），$\Theta=(\theta_1,...,\theta_K)$表示需要求解的参数

观测数据$Y$是可以直接看见并使用的，隐藏数据$Z$并不知道，只能通过观测数据的对数似然函数$ ln P(Y;\theta)$的极大化来求最优参数

先来求一下观测数据$Y=(y_1, y_2,…, y_n)$的似然函数：
$$
\begin{align}
P(Y;\theta) & =E^Z[P(Y,Z;\theta)] ,联合概率与边缘概率的转换  \\
& = \int_{z\in D} P(Y,z;\theta)dz \\
L(Y|\theta) &= \prod_{j=1}^n P(y_j;\theta) \\
& = \prod_{j=1}^n\int_{z\in D} P(y_j,z;\theta)dz \\
& = \prod_{j=1}^n\int_{z\in D} P(y_j|z;\theta)P(z_k;\theta)dz 
\end{align}
$$
所以观测数据Y的对数似然函数$ln P(Y|\theta)$可以表示为:
$$
l(Y|\theta) = \sum_{j=1}^n ln \int_{z\in D} P(y_j|z;\theta)P(z;\theta)dz
$$
​	EM算法通过迭代逐步极大化$l(\theta)$来一步步优化参数$\theta$，比如第  $ i $ 次迭代我们得到参数的估计值为$θ^{(i)}$，那么我们希望在第$i+1$次迭代得到的参数估计值$\theta^{(i+1)}$能使得能再次增加，$l(\theta)$即$l(\theta^{(i+1)}) \geq  l(\theta^{(i)})$，就这样一步步使得$l(\theta)$达到极大。

## 现在来求一下在第 $i+1$次迭代时$l(\theta)$的下界

只要保证每一次迭代$l(\theta)$的下界都取极大，就能保证$l(\theta)$ 在每一次迭代过程中有尽可能的增长。
$$
\begin{align}
l(\theta,\theta^{(i)}) =l(Y|\theta) &= \sum_{j=1}^n ln \int_{z\in D} P(y_j|z;\theta)P(z;\theta)dz,取概率密度函数T(z,\theta^{(j)}) \tag{1}\\
& = \sum_{j=1}^n ln \int_{z\in D} T(z;\theta^{(j)}) \frac{P(y_j|z;\theta)P(z;\theta)}{T(z;\theta^{(i)})}dz,利用Jenson不等式凹函数形式 \tag{2}\\
& \geq \sum_{j=1}^n\int_{z\in D}  T(z;\theta^{(i)})ln  \frac{P(y_j|z;\theta)P(z;\theta)}{T(z;\theta^{(i)})}dz, 取T(z;\theta^{(i)}) =P(z|y_j;\theta^{(i)}) \tag{3}\\
& = \sum_{j=1}^n\int_{z\in D}  P(z|y_j;\theta^{(i)})ln  P(y_j|z;\theta)P(z;\theta) dz\tag{4}
\end{align}
$$
[Jenson不等式](#Jensen不等式)

在上式中
$$
\begin{align}
Jenson不等式成立的条件是 x_i =const,即(3)式中 \\
\frac{P(y_j|z;\theta)P(z;\theta)}{T(z;\theta^{(i)})} = C\\
另外有约束: T(z;\theta^{(i)}) \geq 0, \int_{z\in D} T(z;\theta^{(i)})dz=1 \\
联合可得约束条件: \int_{z\in D} T(z;\theta^{(i)})dz = \int_{z\in D} \frac{P(y_j|z;\theta)P(z;\theta)}{C}dz =1 \\
即 \int_{z\in D} P(y_j|z;\theta)P(z;\theta)dz=C \\
第 i+1次迭代时\theta取值 \theta^{(i)}\\
\Rightarrow \int_{z\in D} P(y_j|z;\theta)P(z;\theta) dz= \int_{z\in D} P(y_j|z;\theta^{(i)})P(z;\theta^{(i)}) dz=C
\end{align}
$$

$$
\begin{align}
所以取: T(z;\theta^{(i)}) &= \frac{P(y_j|z;\theta^{(i)})P(z;\theta^{(i)})}{\int_{z\in D}P(y_j|z;\theta^{(i)})P(z;\theta^{(i)})dz}\\
& = \frac{P(y_j|z;\theta^{(i)})P(z;\theta^{(i)})}{\int_{z\in D}P(y_j,z;\theta^{(i)})dz}\\
& = \frac{P(y_j,z;\theta^{(i)})}{P(y_j;\theta^{(i)})}\\
& = P(z|y_j;\theta^{(i)})   \\
可以满足取等式的条件得到 l(\theta)的下界
\end{align}
$$

$$
(3)\rightarrow(4): 这是第i+1次迭代时 l(\theta)的下界,所以第i次迭代参数的估计值 \theta^{(i)}是已知的\\
所以 P(z|y_i,\theta^{(i)}) 和 ln P(z|y_i,\theta^{(i)}) 是常数项，去掉(3)式中的常数项就得到了(4)
$$

令 $Q(\theta,\theta^{(i)})$表示第$i+1$次迭代时$l(\theta)$的下界，即$E-Step$为
$$
\begin{align}
Q(\theta,\theta^{(i)}) &= \sum_{j=1}^n\int_{z\in D}  P(z|y_j;\theta^{(i)})ln  P(y_j|z;\theta)P(z;\theta)dz \\
&= E^{Z|Y,\theta^{(i)}}[\sum_{j=1}^n ln(P(y_j|z;\theta)P(z;\theta))]\\
&=E^{Z|Y,\theta^{(i)}}[\sum_{j=1}^n ln(P(y_j,z;\theta))]
\end{align}
$$




# 例题

## 例1.两枚硬币模型

有两枚硬币，随机抛掷后正面朝上的概率分别为$P_1 ,P_2 $ 为了估计两个概率，每次取一枚硬币，连续投掷5下，结果如下

| 硬币    | 结果       | 统计    |
| ------- | ---------- | ------- |
| Unknown | 正正反正反 | 3正-2反 |
| Unknown | 反反正正反 | 2正-3反 |
| Unknown | 正反反反反 | 1正-4反 |
| Unknown | 正反反正正 | 3正-2反 |
| Unknown | 反正正反反 | 2正-3反 |

此时多了一个隐变量$h$，可以把它认为是5维的向量 $h=(z_1,...,z_5)$,代表每次投掷时所用的硬币,$z_k = \{ 1,2\}$

解:
$$
\begin{align}
Q(\theta,\theta^{(i)}) &= \sum_{j=1}^n\sum_{k=1}^m  P(z_k|y_j;\theta^{(i)})ln  P(y_j|z_k;\theta)P(z_k;\theta) \\
&= \sum_{j=1}^n\sum_{k=1}^m \frac{P(z_k,y_j;\theta^{(i)})}{P(y_j;\theta^{(i)})}ln  P(y_j|z_k;\theta)P(z_k;\theta) \\
& = \sum_{j=1}^n\sum_{k=1}^m \frac{P(y_j|z_k;\theta^{(i)})P(z_k;\theta^{(i)})}{\sum_{r=1}^{m}P(y_j|z_r;\theta^{(i)})P(z_r;\theta^{(i)})}ln  P(y_j|z_k;\theta)P(z_k;\theta) \\
令 \gamma_{jk} &= \frac{P(y_j|z_k;\theta^{(i)})P(z_k;\theta^{(i)})}{\sum_{r=1}^{m}P(y_j|z_r;\theta^{(i)})P(z_r;\theta^{(i)})} = \\
则 Q(\theta,\theta^{(i)}) &= \sum_{j=1}^n\sum_{k=1}^m \gamma_{jk} ln  P(y_j|z_k;\theta)P(z_k;\theta) \\
\end{align}
$$




## 例2.三硬币模型











## 例3.男生，女生身高分布模型









## 例4.公司职场关系猜测









## 例5.高斯混合模型











## 例6.高斯混合聚类

