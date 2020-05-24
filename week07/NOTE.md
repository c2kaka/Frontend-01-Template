# 第七周学习总结

## 1.Flex布局

1.1分行

- 根据主轴尺寸，把元素分进行
- 如果设置了no-wrap，则强行塞入第一行

1.2 计算主轴

- 找出所有flex元素
- 把主轴方向的剩余尺寸按比例分配给这些元素
- 若剩余空间为负数，所有flex元素为0，等比压缩剩余元素

## 2.绘制

1.绘制单个元素

- 绘制需要依赖一个图形环境
- 我们这里采用了npm包images
- 绘制在一个viewport上进行
- 与绘制相关的属性：background-color、border、background-image等

2.绘制DOM

## 2.重学CSS

1.CSS总体结构

- @charset
- @import
- rules
  - @media
  - @page
  - rule 

2.CSS @rule 的研究

- @charset
- @import
- @media
- @page
- @counter-style
- @keyframes
- @font-face
- @supports
- @namespace

3.推荐使用vw解决兼容性问题

http://www.html-js.com/article/2402

4.CSS 规则

- Selector
- Key
  - Properties
  - varible
- Value

## 3.建立CSS知识体系

