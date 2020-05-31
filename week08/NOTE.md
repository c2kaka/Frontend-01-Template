# 第八周学习总结

## 选择器

### 1.选择器语法

#### 1.1简单选择器

- *
- div svg|a //(namespace)
- .class
- #id
- [attr=value]
- :hover
- ::before

#### 1.2复合选择器

- <简单选择器><简单选择器><简单选择器>
- *或者div必须写在最前面

#### 1.3复杂选择器

- <复合选择器><sp>复合选择器
- <复合选择器>">"<复合选择器>
- <复合选择器>"~"<复合选择器>
- <复合选择器>"+"<复合选择器>
- <复合选择器>"||"<复合选择器>



## 2.选择器优先级

### 2.1优先级计算练习

- div#a.b .c[id=x] 0 1 3 1
- #a:not(#b) 0 2 0 0
- *.a 0 0 1 0
- div.a 0 0 1 1



### 3.伪类

#### 3.1链接/行为

- :any-link
- :link :visited
- :hover
- :active
- :focus
- :target

#### 3.2树结构

- :empty
- :nth-child
- :nth-last-child
- :first-child :last-child :only-child

#### 3.3逻辑性

- :not伪类
- :where :has

### 4.伪元素

- ::before
- ::after
- ::first-line ::first-letter

### 小TIPS

1. transform属性在绘制的最后一步生效，可以认为不改变width,height,top,left等属性 
2. :nth-last-child,:last-child :only-child伪类选择器会引起css计算的回溯，一般不推荐使用



## 排版

排版盒渲染的基本单位是盒

- 源代码-标签
- 语义-元素
- 表现-盒

### 1.盒

#### 1.1盒模型

box-sizing: 

- content-box
- border-box

### 2.正常流

#### 2.1正常流排版

- 收集盒进行
- 计算盒在行中的排布
- 计算行的排布

inline-formating-context

Block-formating-context

#### 2.2行模型

inline-block元素的Vertical-align建议只用top,bottom,middle中的一种

#### 2.3float与clear

#### 2.4margin折叠

只会发生在BFC中

BFC中的合并：overflow:visible的block元素会和父元素margin折叠



block-level : 表示可以被放入BFC

block-container:表示可以容纳BFC

block-box=block-level + block-container

block-box如果overflow是visible，那么就跟父BFC合并