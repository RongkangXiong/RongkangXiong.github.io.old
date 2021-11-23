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
date: 2021-11-13 15:36:38
---

EM（Expectation-Maximum）算法也称期望最大化算法，由 `Dempster et al.(1977)`提出的一种最优化方法，常用于不完全数据求极大似然估计。

曾入选“数据挖掘十大算法”中，可见EM算法在机器学习、数据挖掘中的影响力。

EM算法是最常见的估计隐变量的方法，常被用来学习高斯混合模型(`Gaussian mixture model`,简称`GMM`)的参数；隐式马尔科夫算法(`HMM`)，`K-means`算法等



> 

# 简介

一般的用，，用极大似然估计得到对数似然函数 $L(\Theta|Y,Z)$
观测数据$Y$是我们可以直接看见并使用的，但是隐藏数据$Z$我们却不知道

> 若参数$\Theta$已知，则可以推断出最优的$Z$；而$Z$已知，则可以使用极大似然方法估计$\Theta$

所以我们只能求观测数据$Y$的对数似然函数$ln P(Y;θ)$的极大化来求最优参数$\theta$。

EM 算法的核心在于: $Q(\theta,\theta^{(i)})$，它是完全数据的对数似然函数$ln P(Y,Z|\theta)$关于给定



$$
\begin{align}
Q(\theta,\theta^{(i)}) &= E^{Z|Y,\theta^{(i)}}[ln(P(Y,Z|\theta))]\\
&= \int_{z} P(z|Y,\theta^{(i)})ln(P(y,z|\theta)) dz\\
& = \int_{z} P(z|Y,\theta^{(i)})ln(P(y|z;\theta)P(z;\theta)) dz \\
& = \int_{z} \frac{P(Y|z;\theta^{(i)})P(z;\theta)}{P(Y;\theta^{(i)})}ln(P(y|z;\theta)P(z;\theta)) dz
\end{align}
$$
设 $Y|\theta$有似然函数密度 $f(y|\theta)$,令$\theta$的先验分布为$\pi(\theta)$,由此得到后验分布$\pi(\theta|y)$

当计算$\pi(\theta|y)$的数字特征比较困难时(积分，求和不好算)，用``数据扩展``(data augmentation)可以解决此类困难

- 方法
  - 将观测数据 $y$ 与缺失数据或隐变量数据 $z$ 扩张为"完全"数据 $x=(y,z)$
  - 使得扩张后的后验分布$\pi(\theta|x)=\pi(\theta|y,z)$在计算上容易处理
  - 由于目的是最大化后验分布，E-M算法只能计算后验众数

- 记 $p(z|y,\hat{\theta})$为 $Z$ 在给定$y,\hat{\theta}$时候 $Z$ 的预测分布,$\hat{\theta}^{(i)}$ 为在第$i$次迭代的时候$\theta$的估计值,则E-M算法的计算按步骤：
  - （1）计算$Q(\theta|\theta^{(i)})=E[]$
  - （2）最大化
  - （3）重复（1）和（2）达到收敛要求












​	$l(\theta)$因为$l(\theta)$的式子已经固定，现在考虑怎么保证$ i+1$次 迭代时$l(\theta)$可以再增加，EM算法用了一个比较巧妙的方法，那就是求$l(\theta)$的下界，即$l(\theta)\geq 下界$，只要保证每次迭代时$l(\theta)$的下界取极大，就可以保证$l(\theta)$一直在增加。








# 例题

## 例1.三硬币模型

假设有3枚硬币A, B, C，我们先抛硬币A，根据硬币A的结果决定接下来抛硬币B还是硬币C。如果硬币A正面朝上，我们就抛硬币B，若硬币B正面朝上记$y_j=1$，若硬币B反面朝上记$y_j=0$；如果硬币A反面朝上，我们就抛硬币$C$，若硬币$C$正面朝上记$y_j=1$，若硬币C反面朝上记$y_j=0$。假设进行5次上述试验，我们得到 **观测数据Y=(1, 0, 0, 0, 1)**，如果用$Z=(z_1, z_2, z_3, z_4, z_5)$表示隐变量数据，那么每个$z_i$的所有可能取值的集合$Z=(A正，A反)$，所以$H$有$2^5 $种可能，**隐变量数据可以是$H=(A正，A正，A反，A正，A反)$** ，这只是$2^5 $中的一种。



> 解:

观测数据 $Y =\{y_1,...,y_n\}$，隐变量$Z=(z_1, z_2, ..., z_r)$

设 $P(z=A正)=q,p(z=A反) = 1-q$


$$
\begin{align}
Q(\theta,\theta^{(i)}) & = \sum_{i=1}^n \sum_{j=1}^r P(z_j|y_i;\theta^{(i)}) ln[P(y_i|z_j;\theta)P(z_j;\theta)] \\
& = \sum_{i=1}^n \sum_{j=1}^r \frac{P(z_j,y_i;\theta^{(i)}) }{P(y_i;\theta^{(i)})}ln[P(y_i|z_j;\theta)P(z_j;\theta)] \\
& = \sum_{i=1}^n \sum_{j=1}^r \frac{P(z_j,y_i;\theta^{(i)}) }{\sum _{k=1}^{r} P(y_i,z_j;\theta^{(i)})}ln[P(y_i|z_j;\theta)P(z_j;\theta)] \\
& = \sum_{i=1}^n \sum_{j=1}^r \frac{P(y_i|z_j;\theta^{(i)})P(z_j;\theta^{(i)}) }{\sum _{k=1}^{r} P(y_i,z_j;\theta^{(i)})}ln[P(y_i|z_j;\theta)P(z_j;\theta)] \\
& = \sum_{i=1}^n \sum _{j=1}^{r}[ \frac{P(y_i|z_j;\theta^{(i)})P(z_j;\theta^{(i)}) }{\sum _{k=1}^{r} P(y_i,z_j;\theta^{(i)})}ln[P(y_i|z_j;\theta)P(z_j;\theta)] ]\\
& = \sum_{i=1}^n \sum _{j=1}^{r}[ \frac{P(y_i|z_j;\theta^{(i)})P(z_j;\theta^{(i)}) }{\sum _{k=1}^{r} P(y_i,z_j;\theta^{(i)})}ln [\theta_{z_j}^{y_i}(1-\theta_{z_j})^{5-y_i}]
\end{align}
$$








参考资料：

​	[《统计学习方法》相关数理知识讲解——EM算法(3)三硬币问题](https://www.bilibili.com/video/BV1yv411P7dq?from=search&seid=14501063009661654482&spm_id_from=333.337.0.0)





## 例2.(基因连锁模型)

考虑[Linear Statistical Inference and Its Application, Rao(1973)](https://1lib.us/book/839192/0587c2)关于特定基因组合率的数据（下表），详细介绍可以参看 [Likelihood, Bayesian, and MCMC Methods in Quantitative Genetics, Sorensen et al.(2002)](https://1lib.us/book/611009/bd7e5f)，这里197个观测值分为4类: `{1,2,3,4`.见下表：

| 计数 |   $y_1=125$    |        $y_2=18$         |        $y_3=20$         |      $y_4=34$      |
| :--: | :------------: | :---------------------: | :---------------------: | :----------------: |
| 概率 | $1/2+\theta/4$ | $\frac{1}{4}(1-\theta)$ | $\frac{1}{4}(1-\theta)$ | $\frac{\theta}{4}$ |

用E-M方法求参数$\theta$的众数估计

解：

似然函数为：
$$
L(y|\theta) \propto (2+\theta)^{y_1}(1-\theta)^{y_2+y_3}\theta^{y_4}
$$
当先验分布为均匀分布$U(0,1)$时，容易得到后验分布为：
$$
\pi(\theta|y) \propto (2+\theta)^{y_1}(1-\theta)^{y_2+y_3}\theta^{y_4}
$$
由于$2+\theta$项的存在，这个分布不是一个标准分布，因此我们把第一类拆成两个分类，概率分变为$\frac{1}{2}$和$\frac{\theta}{4}$

则完全数据为$x={x_1,x_2,x_3,x_4,x_5},x_1+x_2=y_1,x_3=y_2,x_4=y_3,x_5=y_4$

扩张后的分布为





## 例3.





先随机初始化一个P1和P2，用它来估计 $z$，然后基于$z$，还是按照最大似然概率法则去估计新的P1和P2

>如果新的P1和P2和我们初始化的P1和P2一样，请问这说明了什么？（此处思考1分钟）

> > 这说明我们初始化的P1和P2是一个相当靠谱的估计！

### E-M初级版

先随便给P1和P2赋一个值，比如：

```markdown
P1 = 0.2
P2 = 0.7
```

然后，我们看看第一轮抛掷最可能是哪个硬币。
如果是硬币1，得出3正2反的概率为$ 0.2*0.2*0.2*0.8*0.8 = 0.00512$
如果是硬币2，得出3正2反的概率为$0.7*0.7*0.7*0.3*0.3=0.03087$
然后依次求出其他4轮中的相应概率。做成表格如下：

| 轮数 | **若是硬币1** | **若是硬币2** |
| :--: | :-----------: | :-----------: |
|  1   |    0.00512    |    0.03087    |
|  2   |    0.02048    |    0.01323    |
|  3   |    0.08192    |    0.00567    |
|  4   |    0.00512    |    0.03087    |
|  5   |    0.02048    |    0.01323    |

按照最大似然法则：
第1轮中最有可能的是硬币2
第2轮中最有可能的是硬币1
第3轮中最有可能的是硬币1
第4轮中最有可能的是硬币2
第5轮中最有可能的是硬币1

我们就把上面的值作为z的估计值。然后按照最大似然概率法则来估计新的 P1,P2
$$
P_1 = \frac{2+1+2}{15} = 0.33 \\
P_2 = \frac{3+3}{10} =0.6
$$
然后继续重复迭代

### EM算法

给定 m 个训练样本$ \{ x_1 , x_2 , … , x_m \},x_j表示第i次实验有几枚硬币正面朝上,0\leq x_j \leq 5$，假设样本间相互独立，A,B两枚硬币正面朝上的概率分别为$p,q$，A出现的概率是$\pi$，B出现的概率是$1-\pi$

隐变量$z=\{A,B\}$,$\theta^{(i)} = (\pi^{(i)},p^{(i)},q^{(i)})$是参数$\theta$第$i$次迭代时的估计值

得到似然函数:
$$
\begin{align}
l(\theta)& = \sum_{i=1}^m ln P(x_i;\theta) \\
& = \sum_{i=1}^m ln \sum_{j=1}^r P(x_i,z_j;\theta) \\
& \geq \sum_{i=1}^n\sum_{j=1}^r  P(z_j|x_i;\theta^{(i)})ln  P(x_i|z_j;\theta)P(z_j;\theta) 
\end{align}
$$

$$
\begin{align}
Q(\theta,\theta^{(i)}) &= \sum_{j=1}^n\sum_{k=1}^r  P(z_k|x_j;\theta^{(i)})ln  P(x_j|z_k;\theta)P(z_k;\theta) \\
& = \sum_{j=1}^n\sum_{k=1}^r  \frac{P(z_k,x_j;\theta^{(i)})}{P(x_j;\theta^{(i)})}ln  P(x_j|z_k;\theta)P(z_k;\theta) \\
& = \sum_{j=1}^n\sum_{k=1}^r  \frac{P(z_k,x_j;\theta^{(i)})}{\sum_{k=1}^{r} P(x_j|z_k;\theta^{(i)})P(z_k;\theta^{(i)})}ln  P(x_j|z_k;\theta)P(z_k;\theta) \\
& = \sum_{j=1}^n\sum_{k=1}^r  \frac{P(x_j|z_k;\theta^{(i)})P(z_k;\theta^{(i)})}{\sum_{k=1}^{r} P(x_j|z_k;\theta^{(i)})P(z_k;\theta^{(i)})}ln  P(x_j|z_k;\theta)P(z_k;\theta) \\
& = \sum_{j=1}^n \{\frac{P(x_j|A;\theta^{(i)})P(A;\theta^{(i)})}{ P(x_j|A;\theta^{(i)})P(A;\theta^{(i)})+P(x_j|B;\theta^{(i)})P(B;\theta^{(i)})}ln  P(x_j|A;\theta)P(A;\theta) \\
&+\frac{P(x_j|B;\theta^{(i)})P(B;\theta^{(i)})}{ P(x_j|A;\theta^{(i)})P(A;\theta^{(i)})+P(x_j|B;\theta^{(i)})P(B;\theta^{(i)})}ln  P(x_j|B;\theta)P(B;\theta) \}\\
& = \sum_{j=1}^n \frac{\pi^{(i)} (p^{(i)})^{x_j}(1-p^{(i)})^{1-x_j}  }{ \pi^{(i)} (p^{(i)})^{x_j}(1-p^{(i)})^{1-x_j}+(1-\pi^{(i)}) (q^{(i)})^{x_j}(1-q^{(i)})^{1-x_j}}ln  \pi(p)^{x_j}(1-p)^{1-x_j} \\
&+\frac{(1-\pi^{(i)}) (q^{(i)})^{x_j}(1-q^{(i)})^{1-x_j}  }{ \pi^{(i)} (p^{(i)})^{x_j}(1-p^{(i)})^{1-x_j}+(1-\pi^{(i)}) (q^{(i)})^{x_j}(1-q^{(i)})^{1-x_j}}ln  (1-\pi)(q)^{x_j}(1-q)^{1-x_j} \}\\
\end{align}
$$


$$
令\mu_j^{(i+1)}=\frac{\pi^{(i)} (p^{(i)})^{x_j}(1-p^{(i)})^{1-x_j}  }{ \pi^{(i)} (p^{(i)})^{x_j}(1-p^{(i)})^{1-x_j}+(1-\pi^{(i)}) (q^{(i)})^{x_j}(1-q^{(i)})^{1-x_j}}
$$


得:
$$
Q(\theta,\theta^{(i)}) = \sum_{i=1} \mu_j^{(i+1)} ln  \pi(p)^{x_j}(1-p)^{1-x_j} +(1-\mu_j^{(i+1)})ln  \pi(q)^{x_j}(1-q)^{1-x_j}
$$
接着求出参数在第$i+1$时的迭代更新公式，分别对$\pi,p,q$求导
$$
\frac{\partial Q(\theta,\theta^{(i)})}{\partial \pi} = \sum_{j=1}^n (\frac{\mu_j^{(i+1)}}{\pi}-\frac{1-\mu_j^{(i+1)}}{1-\pi}) =0 \\
\Rightarrow \pi^{(i+1)}=\frac{\sum_{j=1}^n \mu_j^{(i+1)}}{n}
$$

$$
\frac{\partial Q(\theta,\theta^{(i)})}{\partial p} = \sum_{j=1}^n \mu_j^{(i+1)}(\frac{x_j}{p}-\frac{1-x_j}{1-p})=0 \\
\Rightarrow p^{(i+1)}=\frac{\sum_{j=1}^n \mu_j^{(i+1)}x_j}{\sum_{j=1}^n \mu_j^{(i+1)}}
$$

$$
\frac{\partial Q(\theta,\theta^{(i)})}{\partial q} = \sum_{j=1}^n (1-\mu_j^{(i+1)})(\frac{x_j}{q}-x_j)-\frac{1-x_j}{1-q})=0 \\
\Rightarrow q^{(i+1)}=\frac{\sum_{j=1}^n (1-\mu_j^{(i+1)})x_j}{\sum_{j=1}^n (1-\mu_j^{(i+1)})}
$$

初始赋值$\theta^{(0)} = (0.5,0.5,0.5),X=(3,2,1,3,2)$





不断建立  $l(\theta)$的下界(E-Step),再优化下界(M-Step)





参考链接：

​	[如何感性地理解EM算法？](https://www.jianshu.com/p/1121509ac1dc)



## 例3.男生，女生身高分布模型

$m$个男生和$n$个女生的身高统计量 $z={x_1,...,x_m,y_1,...,y_n}$

我们独立地按照概率密度$p(x|θ)$抽取$n$了个（身高），组成样本集X，我们想通过样本集X来估计出未知参数$\theta$

$p(x|θ)$我们知道了是高斯分布$N(\mu_1,\sigma_1^2),N(\mu_2,\sigma_2^2)$的形式，未知参数$\theta=[\mu,\sigma^2 ]$，抽到的样本集$X = [x_1,...,x_n]$

我们测量得到的身高不知道是男生或者女生，表示抽到的第$i$个人的身高





解答：

> 只有当我们知道了哪些人属于同一个高斯分布的时候，我们才能够对这个分布的参数作出靠谱的预测
>
> EM算法就是，假设我们想估计知道A和B两个参数，在开始状态下二者都是未知的，但如果知道了A的信息就可以得到B的信息，反过来知道了B也就得到了A。可以考虑首先赋予A某种初值，以此得到B的估计值，然后从B的当前值出发，重新估计A的取值，这个过程一直持续到收敛为止
>
> 所以我们可以先给这个给隐含变量分布弄一个初始值，然后求这个隐含变量的期望，当成是这个隐含变量的已知值



参考链接：

​	- [](https://www.cnblogs.com/nolonely/p/6439344.html)



## 例3.公司职场关系猜测

背景：公司有很多领导=[A总，刘总，C总]，同时有很多漂亮的女职员=[小甲，小章，小乙]。（请勿对号入座）你迫切的怀疑这些老总跟这些女职员有问题。为了科学的验证你的猜想，你进行了细致的观察。于是，

观察数据：
1）A总，小甲，小乙一起出门了；
2）刘总，小甲，小章一起出门了；
3）刘总，小章，小乙一起出门了；
4）C总，小乙一起出门了；

收集到了数据，你开始了神秘的EM计算：
初始化，你觉得三个老总一样帅，一样有钱，三个美女一样漂亮，每个人都可能跟每个人有关系。所以，每个老总跟每个女职员“有问题”的概率都是1/3;

这样，（E step）
1） A总跟小甲出去过了 1/2 * 1/3 = 1/6 次，跟小乙也出去了1/6次；（所谓的fractional count）
2）刘总跟小甲，小章也都出去了1/6次
3）刘总跟小乙，小章又出去了1/6次
4）C总跟小乙出去了1/3次

总计，A总跟小甲出去了1/6次，跟小乙也出去了1/6次 ; 刘总跟小甲，小乙出去了1/6次，跟小章出去了1/3次；C总跟小章出去了1/3次；

你开始跟新你的八卦了(M step), 
A总跟小甲，小乙有问题的概率都是1/6 / (1/6 + 1/6) = 1/2； 
刘总跟小甲，小乙有问题的概率是1/6 / (1/6+1/6+1/6+1/6) = 1/4; 跟小章有问题的概率是(1/6+1/6)/(1/6 * 4) = 1/2;
C总跟小乙有问题的概率是 1。

然后，你有开始根据最新的概率计算了；（E-step）
1）A总跟小甲出去了 1/2 * 1/2 = 1/4 次，跟小乙也出去 1/4 次；
2）刘总跟小甲出去了1/2 * 1/4 = 1/12 次， 跟小章出去了 1/2 * 1/2 = 1/4 次；
3）刘总跟小乙出去了1/2 * 1/4 = 1/12 次， 跟小章又出去了 1/2 * 1/2 = 1/4 次；
4）C总跟小乙出去了1次；

重新反思你的八卦（M-step）:
A总跟小甲，小乙有问题的概率都是1/4/ (1/4 + 1/4) = 1/2； 
B总跟小甲，小乙是 1/12 / (1/12 + 1/4 + 1/4 + 1/12) = 1/8 ; 跟小章是 3/4 ;
C总跟小乙的概率是1。

你继续计算，反思，总之，最后，你得到了真相！（马总表示我早就知道真相了）

你知道了这些老总的真相，可以开始学习机器翻译了。



参考链接：

​	[知乎-史兴 https://www.zhihu.com/question/27976634/answer/39132183](https://www.zhihu.com/question/27976634/answer/39132183)



## 高斯混合聚类

假设数据可以分为k个簇，每个簇满足高斯分布

混合系数$\alpha_i > 0,\sum_{i=1}^k=1$

$\alpha_i$表示样本属于第$i$个高斯模型的概率

定义高斯混合分布：
$$
P_M(\mathbf{x})=\sum_{i=1}^k \alpha_i P(\mathbf{x}|\mathbf{\mu_i},\mathbf{\Sigma_i})
$$
设训练集$D=\{\mathbf{x_1},\mathbf{x_2},...,\mathbf{x_n}\}$由高斯混合模型生成

$z_j\in \{1,2,...,k \}$表示$\mathbf{x_j}$属于高斯混合模型中某个高斯模型
$$
P_M(z_j=i|\mathbf{x_j})= \frac{P(z_j=i,\mathbf{x_j})}{P_M(\mathbf{x_j})}=\frac{P(z_j=i)P_M(\mathbf{x_j}|z_j=i)}{P_M(\mathbf{x_j})}=\frac{\alpha_i\cdot P(\mathbf{x_j}|\mathbf{\mu_i},\mathbf{\Sigma_i})}{\sum_{l=1}^k \alpha_l P(\mathbf{x_j}|\mathbf{\mu_l},\mathbf{\Sigma_l})}
$$

- $P_M(z_j=i|x_j)=\gamma_{ji}$表示样本$x_j$由第$i$个高斯模型生成的概率

- 若$P_M(x)$已知，那么对于一个样本$\mathbf{x_j}$，计算$\gamma_{ji}$，找到其中最大的$\gamma$,记为$\gamma_{ji^*}$，那么就把$\mathbf{x_j}$归为第$i^*$个高斯簇

参数 $\{\alpha_i,\mathbf{\mu_i},\mathbf{\Sigma_i} \}_{i=1}^k$一共$3k$个参数

对数似然函数：
$$
l=ln( \prod_{j=1}^n P_M(\mathbf{x_j})) = \sum_{j=1}^n ln(\sum_{i=1}^k \alpha_i \cdot p(\mathbf{x_j}|\mathbf{\mu_i},\mathbf{\Sigma_i}))
$$
$\frac{\partial l}{\partial \mathbf{\mu_i}}=0$
$$
\sum_{j=1}^n \frac{\alpha_i \cdot p(\mathbf{x_j}|\mathbf{\mu_i},\mathbf{\Sigma_i})}{\sum_{l=1}^k \alpha_l \cdot p(\mathbf{x_j}|\mathbf{\mu_l},\mathbf{\Sigma_l})} （x_j-\mu_i)=0
$$

$$
\Rightarrow \sum_{j=1}^n \gamma_{ji}(x_j-\mu_i) =0 \\
\Rightarrow \mu_i =\frac{\sum_{j=1}^n \gamma_{ji}x_j}{\sum_{j=1}^n \gamma_{ji}}
$$

$\frac{\partial l}{\partial \mathbf{\Sigma_i}}=0$
$$
\Sigma_i = \frac{\sum_{j=1}^n \gamma_{ji}(\mathbf{x_j}-\mathbf{\mu_i})(\mathbf{x_j}-\mathbf{\mu_i})^T}{\sum_{j=1}^n \gamma_{ji}}
$$
用拉格朗日乘子法求解$\alpha_i$
$$
L' = l + \lambda(\sum_{i=1}^k \alpha_i -1)
$$
