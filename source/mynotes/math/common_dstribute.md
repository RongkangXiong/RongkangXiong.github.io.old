---
title: 常见分布
author: 爱养虫的小熊
date: 2021-11-11 11:14:00
tags: [math,概率统计分布,R语言]
top: 98
feature: true
categories: [数学]
mathjax: true
---


# 基本概念

## 随机变量X的熵

$$
离散形式 \quad H(x) =-E^X[ln(p_i)]= - \sum_i p_i ln(p_i) , \quad 规定 0\cdot ln 0 =0 \\
连续形式 \quad H(x) =-E^X[ln(f(x))]= - \int f(x) ln(f(x)) dx
$$ \#\#\# 先验分布的熵
$$ 
先验参数: \quad \theta \sim \pi(\theta) \\
离散值: E_n(\pi) = -E\^\theta[ln(p_i)] =-\sum\_i p_i ln(p_i) \\ 连续值:
E_n(\pi) = -E\^\theta[ln(p_i)] =- \int\pi(\theta) ln(\pi(\theta))
d\theta
$$

## K-L距离

即K-L散度,一种量化两种概率分布P和Q之间差异的方式,又叫相对熵\
能帮助我们度量使用一个分布来近似另一个分布时所损失的信息

1.  定义 $$
    \begin{align}
    离散形式 \quad D(P||Q) &=E^{P}[lnP(x)-lnQ(x)] \\
                    & =\sum_{i=1}^{n} P(x) ln \frac{P(x)}{Q(x)} \\
    连续形式 \quad D(P||Q) &=E^{P}[lnP(x)-lnQ(x)] \\
                    & = \int P(x) ln \frac{P(x)}{Q(x)} dx
    \end{align}
    $$ 即数据的原始分布p和近似分布q之间的对数差值的期望\
    如果继续用2为底的对数计算，则K-L散度值表示信息损失的二进制位数

2.  相对熵的性质

```{=html}
<!-- -->
```
(1) 尽管KL散度从直观上是个度量或距离函数,但它并不是一个真正的度量或者距离,因为它不具有对称性,即$$D(P||Q) \neq D(Q||P)$$

(2) 相对熵的值为非负值,即$$D(P||Q)≥0$$

## 位置参数和刻度参数

## fisher信息阵求解

设样本分布族 $\{f(x| \theta),\theta \in \Theta \}$满足C-R正则条件,这里
$\theta=(\theta_1,...,\theta_p)$为p维参数向量.\
设$X=(X_1,...,X_n)$是从总体$f(x|\theta)$抽样的i.i.d.样本.\
当$\theta$无先验信息可用时,Jeffrey是用Fisher信息阵行列式的平方根作为$\theta$的无信息先验

1.  写出参数$\theta$的对数似然函数 $$
    \begin{align}
    l(\theta|x) = ln(\prod_{i=1}^{n} f(x_i|\theta)) = \sum_{i=1}^{n} ln f(x_i|\theta)
    \end{align}
    $$

2.  求fisher信息矩阵

$$
\begin{align}
&I(\theta) = (I_{ij}(\theta))_{p\times p}, \quad I_{ij}(\theta)=E^{X|\theta} (-\frac{\partial^2 l}{\partial\theta_i \partial \theta_j}) , \quad (i,j=1,...,p) \\
&特别的对于单参数情形 \\
& I(\theta) = E^{X|\theta} (-\frac{\partial^2 l}{\partial\theta^2})
\end{align}
$$

## Jeffreys无信息先验

参数是1维情形下,Jeffreys被证明是相当成功的
多参数不相关时使用Jeffreys时效果较好
[Bernardo(1979)]()找到了在多维场合修改的Jeffreys先验方法,即Reference先验

1.  求$\theta$的Jeffreys无信息先验密度 $$
    \begin{align}
    \pi(\theta) = [det I(\theta)]^{1/2}
    \end{align}
    $$

## 最大熵先验

先验均值被指定,寻找信息量最少的先验分布，即最大化熵的先验分布\
熵和K-L距离定义密切相关,因此可以看成带有约束的Reference先验

### 离散参数$\theta$最大熵先验定理

$\theta$ 为离散型随机变量, 取值为 $\theta_{1}, \theta_{2}, \cdots$
(至多可列个值), $\theta$ 的先验分布满足 $$
E^{\pi}\left[g_{k}(\theta)\right]=\sum_{i} g_{k}\left(\theta_{i}\right) \pi\left(\theta_{i}\right)=\mu_{k} \quad(k=1, \cdots, m) \text {, } \tag{1}
$$ 其中 $g_{k}(\cdot), \mu_{k}(k=1, \cdots, m)$
分别表示已知的函数和已知的常数 (当然, 此时还隐含条件
$\left.\sum_{i} \pi\left(\theta_{i}\right)=1\right)$, 则满足条件上式且使
$E_{n}(\pi)$ 最大化的解为 $$
\bar{\pi}\left(\theta_{i}\right)=\frac{\exp \left\{\sum_{k=1}^{m} \lambda_{k} g_{k}\left(\theta_{i}\right)\right\}}{\sum_{i} \exp \left\{\sum_{k=1}^{m} \lambda_{k} g_{k}\left(\theta_{i}\right)\right\}} \quad(i=1,2, \cdots) \tag{2}
$$ 其中 $\lambda_{1}, \cdots, \lambda_{m}$ 使得当 $\pi=\bar{\pi}$
时(1)式成立, 即 $$
\sum_{i} g_{k}\left(\theta_{i}\right) \bar{\pi}\left(\theta_{i}\right)=\mu_{k} \quad(k=1, \cdots, m) \tag{3}
$$ 都成立.\
上述结果的推导超出本教材的范围,
其证明可在很多变分法的书中找到,如[(Calculus of Variations with
Applications M. Ewing)](https://1lib.us/book/2862293/1fb856)

### 连续参数$\theta$最大熵先验定理

设 $\theta$ 为 $\Theta=(-\infty, \infty)$ 上的连续型随机变量, $\theta$
的先验分布 $\pi(\theta)$ 满足 $$
E^{\pi}\left[g_{k}(\theta)\right]=\int_{\Theta} g_{k}(\theta) \pi(\theta) \mathrm{d} \theta=\mu_{k} \quad(k=1, \cdots, m)
$$ 其中 $g_{k}(\cdot), \mu_{k}(k=1, \cdots, m)$
分别表示已知的函数和已知的常数, 则满足条件 (2.6.5) 且 使 $E_{n}(\pi)$
最大化的解为 $$
\tilde{\pi}(\theta)=\frac{\pi_{0}(\theta) \cdot \exp \left\{\sum_{k=1}^{m} \lambda_{k} g_{k}(\theta)\right\}}{\int_{\Theta} \pi_{0}(\theta) \cdot \exp \left\{\sum_{k=1}^{m} \lambda_{k} g_{k}(\theta)\right\} \mathrm{d} \theta}
$$ 吉中 $\lambda_{1}, \cdots, \lambda_{m}$ 使得当 $\pi=\tilde{\pi}$ 时式
(2.6.5) 成立, 即 $$
\int_{\Theta} g_{k}(\theta) \tilde{\pi}(\theta) \mathrm{d} \theta=\mu_{k} \quad(k=1, \cdots, m)
$$ 都成立.

#### 求解步骤

1)  确定$m,g_1(\theta),\cdots,g_k(\theta)$
2)  化简$\pi_{0}(\theta) \cdot \exp \left\{\sum_{k=1}^{m} \lambda_{k} g_{k}(\theta)\right\}$
3)  $\bar{\pi}(\theta) \propto \pi_{0}(\theta) \cdot exp \{\sum_{k=1}^{m} \lambda_{k}g_{k}(\theta)\}$
4)  利用归一化常数A,带入$E^{\bar{\pi}}(g_k(\theta)) = \mu_k$求解$\lambda_k$
5)  得出$\bar{\pi}(\theta)$正比表达式
6)  求归一化常数A
7)  得出$\theta$的最大熵先验$\bar{\pi}(\theta)$

## Reference先验

最早由[Bernardo(1979)](https://people.eecs.berkeley.edu/~jordan/sail/readings/bernardo-1979.pdf)提出\
多维场合修改的Jeffreys先验,将多维参数分为感兴趣的参数和多余(nuisance)参数
基本思想:获得观测数据后,使得参数的先验分布和后验分布之间的K-L距离最大

1.  Reference先验定义\
    设样本 $X=\left(X_{1}, \cdots, X_{n}\right)$ 的分布族为
    $\{p(x \mid \theta), \theta \in$ $\theta\}$, 其中 $\theta$ 为参数
    (或参数向量), $\Theta$ 为参数空间; $\theta$ 的先验分布为
    $\pi(\theta)$.\
    令 $\mathscr{P}=\{\pi(\theta)>$
    $\left.0: \int_{\Theta} \pi(\boldsymbol{\theta} \mid x) d \boldsymbol{\theta}<\infty\right\}$,此处
    $\pi(\boldsymbol{\theta} \mid x)$ 为 $\theta$ 的后验分布.\
    设先验分布 $\pi(\boldsymbol{\theta})$ 与后验分布
    $\pi(\boldsymbol{\theta} \mid \boldsymbol{x})$ 的 $K-L$ 距离关于样本
    $X$ 的期望为 $$
    I_{\pi(\theta)}(\boldsymbol{\theta}, \boldsymbol{x})=\int_{\mathscr{X}^{(n)}} p(\boldsymbol{x})\left[\int_{\Theta} \pi(\boldsymbol{\theta} \mid x) \ln \frac{\pi(\boldsymbol{\theta} \mid \boldsymbol{x})}{\pi(\boldsymbol{\theta})} \mathrm{d} \boldsymbol{\theta}\right] \mathrm{d} \boldsymbol{x}
    \tag{1}$$ 其中
    $\mathscr{X}^{(n)}=\mathscr{X}_{1} \times \cdots \times \mathscr{X}_{1}$
    为样本空间,
    $p(x)=\int_{\Theta} p(x \mid \theta) \pi(\boldsymbol{\theta}) \mathrm{d} \boldsymbol{\theta}$
    为样本 $\mathrm{X}$ 的边缘密度. 若
    $\pi^{*}(\boldsymbol{\theta}) \in \mathscr{P}$, 且满足 $$
    I_{\pi^{*}(\theta)}(\theta, x)=\max _{\pi(\theta) \in \mathscr{P}} I_{\pi(\theta)}(\theta, x) \tag{2}
    $$ 则称
    $$\pi^{*}(\theta) = arg \max _{\pi(\theta) \in \mathscr{P}}I_{\pi(\theta)}(\theta, x) \tag{3}$$
    为参数$\theta$的Reference先验

2.  Reference先验的计算
    利用上式很难得到解析表达式,数值方法获得也很困难,替代办法是用渐进方法获得解析表达式\
    设X
    表示一个简单试验的观测结果,向量$X^{(k)}=(X_1,\cdots,X_k)$的分量由随机变量$X$的$k$个独立复制组成,令
    $$I_{\pi(\theta)}\left(\theta, x^{(k)}\right)=\int_{x^{(k)}} p\left(x^{(k)}\right)\left[\int_{\theta} \pi\left(\theta \mid x^{(k)}\right) \ln \frac{\pi\left(\theta \mid x^{(k)}\right)}{\pi(\theta)} \mathrm{d} \theta\right] \mathrm{d} x^{(k)} \tag{4}$$

通过最大化
$I_{\pi(\theta)}\left(\theta, x^{(k)}\right)$,得到$\pi_{k}(\theta)=\arg \max _{\pi(\theta)} I_{\pi(\theta)}\left(\theta,x^{(k)}\right)$为了找到$\pi_{k}$的更方便的形式,改写$I_{\pi(\theta)}\left(\theta, x^{(k)}\right)$
如下: $$
\begin{align}
I_{\pi(\theta)}\left(\theta, x^{(k)}\right) &=\int_{X^{(k)}} p\left(x^{(k)}\right)\left[\int_{\theta} \pi\left(\theta \mid x^{(k)}\right) \ln \frac{\pi\left(\theta \mid x^{(k)}\right)}{\pi(\theta)} \mathrm{d} \theta\right] \mathrm{d} x^{(k)} \\
&=\int_{\theta} \pi(\theta)\left\{\int_{X^{(k)}} p\left(x^{(k)} \mid \theta\right)\left[\ln \pi\left(\theta \mid x^{(k)}\right)-\ln \pi(\theta)\right] \mathrm{d} x^{(k)}\right\} \mathrm{d} \theta \\
&= \int_{\Theta} \pi(\theta) \ln \frac{f_{k}(\theta)}{\pi(\theta)} \mathrm{d} \theta\end{align} \tag{5}$$

此处 $$
\begin{align}
f_{k}(\theta)=\exp \left\{\int_{\mathscr{x}^{-(k)}} p\left(x^{(k)} \mid \theta\right) \ln \pi\left(\theta \mid x^{(k)}\right) \mathrm{d} x^{(k)}\right\} \tag{6} \\
此处 \pi(\theta|x^{(k)}) 近似 N(\hat{\theta},I(\theta))
\end{align}
$$
利用拉格朗日求条件极值的方法,在$\int \pi(\theta) \mathrm{d} \theta=1$的条件下求
$$
I_{\pi(\theta)}\left(\theta, x^{(k)}\right)=\int_{\Theta} \pi(\theta) \ln \frac{f_{k}(\theta)}{\pi(\theta)} \mathrm{d} \theta \tag{7}
$$ 的极大值.利用变分法求解,
可知其解$\pi_{k}(\theta) \propto f_{k}(\theta)$. [Berger 等(2009)]()
证明了在适当条件下 $\theta$ 的 Reference 先验为 $$
\pi^{*}(\theta)=\lim _{k \rightarrow \infty} \frac{f_{k}(\theta)}{f_{k}\left(\theta_{0}\right)} \tag{8}
$$ 此处 $\theta_{0}$ 是参数空间 $\theta$ 的一个内点, $f_{k}(\theta)$
由式(6)给出.

4.  当存在多余参数时 Reference 先验的计算
    在我们所讨论的统计模型中,当参数是多维时,我们感兴趣的参数常常是其中的一个参数(或某些参数的子集),其余的视为多余参数.此时求多参数情形下的无信息先验,可利用
    Reference 先验来处理.\
    其中的某些步聚可简化成一维的情形,通过计算 Jeffreys
    先验获得.具体说明如下.\
    设似然函数为 $p(x \mid \theta, \lambda)$, 此处 $\theta$
    为感兴趣的参数, 而 $\lambda$ 为多余参数. 我们希望找到
    联合的无信息先验分布 $\pi(\theta, \lambda)$.
    处理这种带有多余参数的方法按下列步骤:

```{=html}
<!-- -->
```
(1) 固定$\theta$,用标准的Reference先验方法获得$\pi(\lambda\mid\theta)$(如果$\lambda$是一维的,将$\theta$看成常数,计算Jeffreys
    先验, 获得$\pi(\lambda \mid \theta)$).

(2) 如果$\pi(\lambda\mid\theta)$是正常的先验,对$\lambda$积分得到 $$
    p(x \mid \theta)=\int p(x \mid \theta, \lambda) \pi(\lambda \mid \theta) \mathrm{d} \lambda \tag{9}
    $$

(3) 用$p(x \mid \theta)$计算Reffreys先验,获得$\pi(\theta)$)(如果$\theta$是一维的,利用$p(x|\theta)$)计算Jeffreys先验,获得$\pi(\theta)$

(4) $\theta$ 和 $\lambda$的联合先验为
    $\pi(\theta,\lambda)=\pi(\lambda|\theta)\pi(\theta)$

```{=html}
<!-- -->
```
5.  两参数的Reference 先验的计算
    设$\theta=(\theta_1,\theta_2)$,其中$\theta_1$为感兴趣的参数,$\theta_2$为多余参数,令
    $$
    I\left(\theta_{1}, \theta_{2}\right)=\left(\begin{array}{ll}
    I_{11}\left(\theta_{1}, \theta_{2}\right) & I_{12}\left(\theta_{1}, \theta_{2}\right) \\
    I_{21}\left(\theta_{1}, \theta_{2}\right) & I_{22}\left(\theta_{1}, \theta_{2}\right)
    \end{array}\right) \tag{10}
    $$ 为$\left(\theta_{1}, \theta_{2}\right)$ 的Fisher信息阵.
    $\left(\theta_{1}, \theta_{2}\right)$的Reference先验可按下面四个步骤获得

```{=html}
<!-- -->
```
(1) 求给定 $\theta_{1}$ 时 $\theta_{2}$ 的 Reference 先验
    $\pi\left(\theta_{2} \mid \theta_{1}\right)$由于在一维的情形下Reference先验与Jeffreys先验相同,
    所以取$\pi\left(\theta_{2} \mid \theta_{1}\right)=\left|I_{22}\left(\theta_{1}, \theta_{2}\right)\right|^{1 / 2}$.
(2) 选取$\left(\theta_{1},\theta_{2}\right)$的参数空间$\Theta$上的紧子集(一维闭区间或多维有限闭集概念的推广)\
    $$
    \Theta_1\subset\Theta_2\subset\cdots,满足\bigcup_{i=1}^{\infty} \Theta_i = \Theta \\
    且对 \forall \theta_1,使得\pi(\theta_2|\theta_1) \quad 在集合 \quad \Omega_{i,\theta_1} = {\theta_2:(\theta_1,\theta_2)\in\Theta_i} \quad 上是有限的 \\ 
    将 \pi\left(\theta_{2} \mid \theta_{1}\right)在 \Omega_{i, \theta_{1}}上正则化,得到 \\
    $$ $$
    \pi_{i}\left(\theta_{2} \mid \theta_{1}\right)=K_{i}\left(\theta_{1}\right) \pi\left(\theta_{2} \mid \theta_{1}\right) I_{\Omega_{i, o_{1}}}\left(\theta_{2}\right)  \tag{11}
    $$

其中 $I_{A}(x)$ 表示集合 $A$ 上的示性函数,
而$K_{i}\left(\theta_{1}\right)=1 / \int_{\Omega_{i, 0},} \pi\left(\theta_{2} \mid \theta_{1}\right) \mathrm{d} \theta_{2} .$
(3) 求参数 $\theta_{1}$ 关于
$\pi_{i}\left(\theta_{2} \mid \theta_{1}\right)$ 的边缘Reference先验
$\pi_{i}\left(\theta_{1}\right)$, 其公式为

$$
\pi_{i} (\theta_1)=\exp \{\frac{1}{2}\int_{\Omega_{i,\theta_1}}\pi_{i}(\theta_{2} \mid \theta_{1})\ln\frac{|I(\theta_{1}, \theta_{2})|}{|I_{22}(\theta_{1},\theta_{2})|}d\theta_{2} \} \tag{12}
$$ 此处 $I\left(\theta_{1}, \theta_{2}\right)$ 和
$I_{22}\left(\theta_{1}, \theta_{2}\right)$ 由式(10)给出 (4) 求极限得到
$\left(\theta_{1}, \theta_{2}\right)$ 的 Reference 先验 $$
\pi\left(\theta_{1}, \theta_{2}\right)=\lim _{i \rightarrow \infty}\left[\frac{K_{i}\left(\theta_{1}\right) \pi_{i}\left(\theta_{1}\right)}{K_{i}\left(\theta_{10}\right) \pi_{i}\left(\theta_{10}\right)}\right] \pi\left(\theta_{2} \mid \theta_{1}\right) \tag{13}
$$ 比处假定极限存在, $\theta_{10}$ 为任一固定点

### 例题

#### 1.

设 $X \sim N\left(\mu, \sigma^{2}\right)$.
求$\theta=\left(\mu, \sigma^{2}\right)$的\
(1) Jeffreys 先验\
(2) Reference先验

# 数学函数及统计方法

## $\Gamma$函数

$$\Gamma(\alpha) = \int_{0}^{+\infty}x^{\alpha-1}e^{-x}dx$$

## $\beta$函数

# 离散分布

## 伯努利分布（又称之为二点分布或者0-1分布）

1.  密度分布函数

2.  数字特征

3.  性质 $\theta$为伯努利试验中成功概率,失败概率为$1-\theta$
    $P(x)= \theta^x(1-\theta)^{1-x}$

## 二项分布(N重伯努利实验)$X \sim B(n,\theta)$

1.  密度分布函数\
    $$
    \begin{align}
    f(x;) = 
    \end{align}
    $$

2.  数字特征 $$
    \begin{align}
    E[x] & =  \\
    Var[x] &=  \\
    mod[x] &=
    \end{align}
    $$

3.  性质
    $\theta$为伯努利试验中成功概率,失败概率为$1-\theta$,则在n次独立的伯努利试验中，成功次数$X \sim B(n,\theta)$
    $$P(X = k|\theta) = C_k^n \theta^k(1-\theta)^{n-k} \quad , k = 0,1,2,...,n $$
    \#\# 负二项分布$Nb(r,\theta)$,又称帕斯卡分布
    已知一个事件在伯努利试验中每次的出现概率是p,在一连串伯努利试验中,一件事件刚好在第r+x次试验出现第r次的概率

4.  密度分布函数\
    $$f(x;r,p) = C_{x}^{x+r-1}p^r(1-p)^x ,\quad x=0,1,...$$

5.  数字特征 $$
    \begin{align}
    E[x] & = np \\
    Var[x] &= np(1-p) \\
    mod[x] &=[(n+1)p]
    \end{align}
    $$

6.  性质

## 多项分布

随机实验如果有k个可能结局$A_1,A_2,...,A_k$，分别将他们的出现次数记为随机变量$X_1,X_2,...,X_k$，它们的概率分布分别是$p_1,p_2,...,p_k$，那么在n次采样的总结果中，$A_1$出现$n_1$次、$A_2$出现$n_2$次、...、$A_k$出现$n_k$次的这种事件的出现概率$P$有下面公式

1.  密度分布函数\
    $$
    \begin{align}
    P(X_1=n_1,...,X_k=n_k;p_1,...,p_k) =&\left\{\begin{array}{l}
    \frac{n!}{n_1!\cdots n_k!} p_1^{n_1}\cdots p_n^{n_k}, \quad \sum_{i=1}^{k}n_i=n, \sum_{i=1}^{k}p_i=1\\
    0, otherwise
    \end{array}\right. \\
    \end{align}
    $$

2.  数字特征 $$
    \begin{align}
    E[x_1,\cdots,x_k] & = (np_1,\cdots,np_k) \\
    Var[x_i] &= np_i(1-p_i) , \quad i=1,\cdots,k\\
    mod[x] &=
    \end{align}
    $$

3.  性质

4.  最大似然估计 $$
    \begin{align}
    用拉格朗日陈志发，得到带参数限制的似然函数 \\
    l(D|p_1,...,p_n,n) & =ln(\prod_{i=1}^{N} \frac{n!}{n_{i1}!\cdots n_{ik}!} )+(\sum_{i=1}^{N}\sum_{j=1}^{k} n_{ij}ln(p_j)) + \alpha(1-\sum_{j=1}^{k}p_j)\\
    对 p 求导 \\
    \frac{\partial}{\partial p_j}ln P(x|p) &= \frac{\sum_{i=1}^{N}n_{ij}}{p_j}-\alpha = 0\\
     \Rightarrow p_j &= \frac{\sum_{i=1}^{N}n_{ij}}{\alpha}  \Rightarrow 1=\sum_{j=1}^{k}\frac{\sum_{i=1}^{N}n_{ij}}{\alpha}  \Rightarrow \alpha = N\cdot k\\
    p_j &= \frac{\sum_{i=1}^{N}n_{ij}}{N\cdot k}
    \end{align}
    $$

## 泊松分布(Poisson distribution)

1.  密度分布函数\
    $$
    \begin{align}
    P(x=k;\lambda)  = \frac{\lambda^k}{k!}e^{-\lambda},\quad \lambda>0,k=0,1,... 
    \end{align}
    $$

2.  数字特征 $$
    \begin{align}
    E[x] & = \lambda \\
    Var[x] &= \lambda
    \end{align}
    $$ 泊松分布的Jeffreys先验
    $\pi(\theta) = \sqrt{I(\theta)} = \sqrt{\frac{n}{\lambda}}$ $$
    \begin{align}
    f(x;\lambda)  &= \frac{\lambda^x}{x!}e^{-\lambda},\quad \lambda>0,x=0,1,... \\
    E[x] &= \lambda \\
    L(\lambda|x_1,...,x_n) &=  \frac{\lambda^{x_1+...+x_n}}{x_1!\cdots x_n!}e^{-n\lambda}  \\
    l(\lambda|x_1,...,x_n) &= \sum_{i=1}^n x_iln(\lambda)-n\lambda+ln(x_1!\cdots x_n!)   \\
    \frac{\partial}{\partial \lambda}ln f(x|\lambda) &= \frac{\sum_{i=1}^{n} x_i}{\lambda}-n \\
    \frac{\partial^2}{\partial \lambda^2}ln f(x|\lambda) &= -\frac{\sum_{i=1}^n x_i}{\lambda^2}\\
    I(\lambda) & = \sum_{x_1,\cdots,x_n =0}^{\infty} \frac{\sum_{i=1}^n x_i}{\lambda^2}\frac{\lambda^{x_1+...+x_n}}{x_1!\cdots x_n!}e^{-n\lambda} \\
         & = \frac{1}{\lambda^2} \sum_{i=1}^{n} [(\sum_{x_i=0}^{\infty} \frac{x_i\lambda^{x_i}e^{-\lambda}}{x_i!}) \prod_{j\neq i}^{n} (\sum_{x_j=0}^{\infty}\frac{\lambda^{x_j}e^{-\lambda}}{x_j!})] \\
         & =  \frac{1}{\lambda^2} \sum_{i=1}^{n} (\sum_{x_i=0}^{\infty} \frac{x_i\lambda^{x_i}e^{-\lambda}}{x_i!})\\
         & = \frac{1}{\lambda^2}\sum_{i=1}^{n} \lambda \\
         & = \frac{n}{\lambda} \\
    \pi(\theta) &= \sqrt{I(\theta)} = \sqrt{\frac{n}{\lambda}}
    \end{align}
    $$

3.  性质

# 连续分布

## 均匀分布

1.  密度分布函数\
    $$
    \begin{align}
    f(x;) = 
    \end{align}
    $$

2.  数字特征 $$
    \begin{align}
    E[x] & =  \\
    Var[x] &=  \\
    mod[x] &=
    \end{align}
    $$

3.  性质

## 指数分布

1.  密度分布函数\
    $$
    \begin{align}
    f(x;\lambda) = \left\{\begin{array}{l}
    0 ,\quad x \leq 0 \\
    \lambda e^{-\lambda x}, \theta > 0
    \end{array}\right. 
    \end{align}
    $$

2.  分布函数 $$
    \begin{align}
    F(x;\lambda) = \left\{\begin{array}{l}
    0 ,\quad x \leq 0 \\
    1-e^{-\lambda x}, x > 0
    \end{array}\right. 
    \end{align}
    $$

3.  数字特征 $$
    \begin{align}
    E[x] & = \frac{1}{\lambda} \\
    Var[x] &=  \frac{1}{\lambda^2}\\
    \end{align}
    $$

4.  性质 无记忆性: $s,t\geq 0 \Rightarrow P(T>s+t|T>t) = P(T>s)$

## 正态分布

1.  密度分布函数\
    $$
    \begin{align}
    f(x;) = 
    \end{align}
    $$

2.  数字特征 $$
    \begin{align}
    E[x] & =  \\
    Var[x] &=  \\
    mod[x] &=
    \end{align}
    $$

3.  性质

## 对数正态分布$LN(x;\mu,\sigma^2)$

1.  密度分布函数 $$
    \begin{align}
    &LN(x;\mu,\sigma^2) = \frac{1}{x\sqrt{2\pi\sigma^2}}exp\{-\frac{1}{2\sigma^2}(ln(x)-\mu)^2 \},\quad x>0 \\
    &\mu是位置参数,\sigma>0 是刻度参数
    \end{align}
    $$

2.  数字特征 $$
    \begin{align}
    & E(x)=e^{\mu+\frac{1}{2}\sigma^2}, \quad n>1 \\
    & Var(x) = (e^{\sigma^2}-1)e^{2\mu+\sigma^2}, \quad n>2\\
    & Mode(x) = e^{\mu-\sigma^2}
    \end{align}
    $$

3.  性质

## t分布 $\tau(x;n,\mu,\sigma)$

1.  密度分布函数 $$
    \begin{align}
    \tau(x;n,\mu,\sigma) = \frac{1}{\sigma}\frac{\Gamma(\frac{n+1}{2})}{\sqrt{n\pi}\Gamma(\frac{n}{2})}(1+\frac{1}{n}(\frac{x-\mu}{\sigma})^2)^{-\frac{n+1}{2}} \\
    n>0 为自由度, \mu为位置参数,\sigma>0为刻度参数
    \end{align}
    $$

2.  数字特征 $$
    \begin{align}
    &E[x]=\mu,n>1 \\
    &Var[x] = \frac{n\sigma^2}{n-2},n>2\\
    &Mode[x] = x \\
    \end{align}
    $$

## 卡方分布$\chi_{n}^2$

1.  密度分布函数\
    $$
    \begin{align}
    f(x;) = 
    \end{align}
    $$

2.  数字特征 $$
    \begin{align}
    E[x] & =  \\
    Var[x] &=  \\
    mod[x] &=
    \end{align}
    $$

3.  性质

## F分布

1.  密度分布函数\
    $$
    \begin{align}
    f(x;) = 
    \end{align}
    $$

2.  数字特征 $$
    \begin{align}
    E[x] & =  \\
    Var[x] &=  \\
    mod[x] &=
    \end{align}
    $$

3.  性质

## 伽马分布$\Gamma(x;\alpha,\lambda)$

1.  密度分布函数\
    $$
    \begin{align}
    \Gamma(x;\alpha,\lambda) =&\left\{\begin{array}{l}
    \frac{\lambda^{\alpha}}{\Gamma(\alpha)} x^{\alpha-1} e^{-\lambda x}, x \geq 0 \\
    0, x<0
    \end{array}\right. \\
    \Gamma(\alpha) =& \int_{0}^{+\infty}x^{\alpha-1}e^{-x}dx
    \end{align}
    $$

2.  数字特征 $$
    \begin{align}
    E[x] & = \frac{\alpha}{\lambda} \\
    Var[x] &= \frac{\alpha}{\lambda^2} \\
    mod[x] &=
    \end{align}
    $$

3.  性质

## 逆伽马分布

1.  密度分布函数\
    $$
    \begin{align}
    \Gamma^{-1}(\theta;\alpha,\lambda)=&
    \left\{\begin{array}{l}
    \frac{\lambda^{\alpha}}{\Gamma(\alpha)} \theta^{-(\alpha+1)} \exp \left(-\frac{\lambda}{\theta}\right) \quad, \theta \geq 0 \\
    0 \quad, \theta<0
    \end{array}\right. \\
    \Gamma(\alpha) =& \int_{0}^{+\infty}x^{\alpha-1}e^{-x}dx
    \end{align}
    $$

2.  数字特征 $$
    \begin{align}
    E[x] & =  \\
    Var[x] &=  \\
    mod[x] &=
    \end{align}
    $$

3.  性质

## 帕雷托分布$Pa(\theta_0,\alpha)$

1.  密度分布函数\
    $$
    \begin{align}
    \pi(\theta;x_{min},k) &=\left\{\begin{array}{l}
    0 ,\quad \theta \leq x_{min}\\
    \frac{kx_{min}^{k}}{\theta^{k+1}}, \theta > x_{min}
    \end{array}\right. 
    \end{align}
    $$

2.  数字特征 $$
    \begin{align}
    E[x] & =  \\
    Var[x] &=  \\
    mod[x] &=
    \end{align}
    $$

3.  性质

## 柯西分布

1.  密度分布函数\
    $$
    \begin{align}
    f(x;) = 
    \end{align}
    $$

2.  数字特征 $$
    \begin{align}
    E[x] & =  \\
    Var[x] &=  \\
    mod[x] &=
    \end{align}
    $$

3.  性质

# 统计检验量

## 单变量偏度系数(Skewness test of normality)

$$
\sqrt{\beta_1} = \frac{E[(X-\mu)^3]}{\sigma_X^3}, \mu_X= E[X],\sigma_X^2=Var[X] \\
样本偏度 :\sqrt{b_1}=\frac{\frac{1}{n}\sum_{i=1}^n (X_i-\bar{X})^3}{(\frac{1}{n}\sum_{i=1}^n(X_i-\bar{X})^2)^{3/2}} \\
如果X是正态的,那么\sqrt{b_1} \sim N(0,\frac{6}{n}) \\
而对于有限的采样 Var(\sqrt{b_1}) = \frac{6(n-2)}{(n+1)(n+3)} 会使得 Type \ I\ error\ rate与\alpha相当
$$ \#\# 多变量偏度系数 $$
\begin{align}
\beta_{1, d}=E[(X-\mu)^{T} \Sigma^{-1}(Y-\mu)]^{3}
\end{align}
$$

Under normality, $\beta_{1, d}=0 .$ The multivariate skewness statistic
is $$
b_{1, d}=\frac{1}{n^{2}} \sum_{i, j=1}^{n}\left(\left(X_{i}-\bar{X}\right)^{T} \widehat{\Sigma}^{-1}\left(X_{j}-\bar{X}\right)\right)^{3}
$$

## t检验

### 两正态样本t检验

$$
T(x, y)=\frac{\sqrt{\frac{m n}{m+n}}(\bar{x}-\bar{y})}{\sqrt{\frac{1}{m+n-2}\left[\sum_{i=1}^{m}\left(x_{i}-\bar{x}\right)^{2}+\sum_{j=1}^{n}\left(y_{i}-\bar{y}\right)^{2}\right]}}
$$
