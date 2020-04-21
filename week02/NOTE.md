# 第二周学习总结

# 1.编程语言通识

## 1.1.语言按语法分类

- 非形式语言： 中文，英文
- 形式语言：

[乔姆斯基谱系](https://zh.wikipedia.org/wiki/乔姆斯基谱系)：是计算机科学中刻画形式文法表达能力的一个分类谱系，是由诺姆·乔姆斯基于 1956 年提出的。它包括四个层次：

- - 0- 型文法（无限制文法或短语结构文法）包括所有的文法。?::=?
  - 1- 型文法（上下文相关文法）生成上下文相关语言。?<A>?::=?<B>?
  - 2- 型文法（上下文无关文法）生成上下文无关语言。<A>::=?
  - 3- 型文法（正规文法）生成正则语言。<A>::=?



## 1.2.形式语言产生式

### 1.2.1BNF

BNF:[巴科斯诺尔范式](https://zh.wikipedia.org/wiki/巴科斯范式)：即巴科斯范式（英语：Backus Normal Form，缩写为 BNF）是一种用于表示上下文无关文法的语言，上下文无关文法描述了一类形式语言。它是由约翰·巴科斯（John Backus）和彼得·诺尔（Peter Naur）首先引入的用来描述计算机语言语法的符号集。



- 语法结构：

1. 基础结构终结符：引号和中间的字符表示终结符
2. 复合结构称非终结符：用尖括号括起来的名称表示非终结符

- 符号：()可以有括号；*表示可以重复多次；|表示或者；+表示至少一次；?表示0或1次

### 1.2.2EBNF

EBNF:**扩展巴科斯-瑙尔范式（EBNF, Extended Backus–Naur Form）**是表达作为描述计算机[编程语言](https://zh.wikipedia.org/wiki/编程语言)和[形式语言](https://zh.wikipedia.org/wiki/形式语言)的正规方式的[上下文无关文法](https://zh.wikipedia.org/wiki/上下文无关文法)的[元语法](https://zh.wikipedia.org/w/index.php?title=元语法&action=edit&redlink=1)(metalanguage)符号表示法。它是基本[巴科斯范式](https://zh.wikipedia.org/wiki/巴科斯-瑙尔范式)(BNF)元语法符号表示法的一种扩展。

它最初由[尼克劳斯·维尔特](https://zh.wikipedia.org/wiki/尼克劳斯·维尔特)开发，最常用的 EBNF 变体由标准，特别是 ISO-14977 所定义。



### 1.2.3ABNF

ABNF:在[计算机科学](https://zh.wikipedia.org/wiki/计算机科学)中，**扩充巴科斯-瑙尔范式**（ABNF）是一种基于[巴科斯-瑙尔范式](https://zh.wikipedia.org/wiki/巴科斯-瑙尔范式)（BNF）的[元语言](https://zh.wikipedia.org/wiki/元語言)，但它有自己的语法和派生规则。ABNF的原动原则是描述一种作为双向[通信协议](https://zh.wikipedia.org/wiki/通信协议)的语言的[形式系统](https://zh.wikipedia.org/wiki/形式系统)。它是由[*第68号互联网标准*](http://www.rfc-editor.org/std/std68.txt)（"STD 68"，大小写样式按照原文）定义的，也就是RFC 5234，经常用于[互联网工程任务组](https://zh.wikipedia.org/wiki/互联网工程任务组)（[IETF](https://zh.wikipedia.org/wiki/IETF)）通信协议的定义语言。[[1\]](https://zh.wikipedia.org/wiki/扩充巴科斯范式#cite_note-Internet_Standards-1)[[2\]](https://zh.wikipedia.org/wiki/扩充巴科斯范式#cite_note-STD_68-2)

RFC 5234取代了RFC 4234 (取代了RFC 2234).[[3\]](https://zh.wikipedia.org/wiki/扩充巴科斯范式#cite_note-RFC_Index-3)



## 1.3.图灵完备性

[图灵完备性](https://zh.wikipedia.org/wiki/圖靈完備性)：在可计算性理论里，如果一系列操作数据的规则（如指令集、编程语言、细胞自动机）可以用来模拟单带图灵机，那么它是图灵完全的。这个词源于引入图灵机概念的数学家艾伦·图灵。虽然图灵机会受到储存能力的物理限制，图灵完全性通常指“具有无限存储能力的通用物理机器或编程语言”。



实现图灵完备性的方法：

- 命令式-图灵机： 

1.用goto实现

2.用if和while实现

- 声明式-lamda：用递归实现

## 1.4.一般命令式编程语言

​	Atom

-  Identifier
-  Literal

​	Expression

-  Atom
-  Operator
-  Punctuator

​	Statement

-  Expression
-  Keyworkd
-  Punctuator

​	Structure

-  Function
-  Class
-  Process
-  Namespace

​	Program

-  Program
-  Module
-  Package
-  Library



## 1.5.类型系统

​	按动静划分

-  动态类型系统
-  静态类型系统

​	按是否隐式转换划分

-  强类型
-  弱类型

​	按复合类型划分

-  结构体
-  函数签名

​	加入继承后

-  逆变
-  协变



常见的语言类型分类：

![img](https://cdn.nlark.com/yuque/0/2020/jpeg/411860/1587469875516-8caeb91f-d521-4c2c-80fc-48f590c2d08c.jpeg)

## 1.6.个人感悟

学习语言应该重视语言特性而不是陷入语言的细节。