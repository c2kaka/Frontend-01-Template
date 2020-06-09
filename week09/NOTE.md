# WEEK09学习总结

## 重学HTML

### 1.必知必会的HTML特殊字符

```html
<!ENTITY quot    "&#34;"> <!--  quotation mark, U+0022 ISOnum -->
<!ENTITY amp     "&#38;#38;"> <!--  ampersand, U+0026 ISOnum -->
<!ENTITY lt      "&#38;#60;"> <!--  less-than sign, U+003C ISOnum -->
<!ENTITY gt      "&#62;"> <!--  greater-than sign, U+003E ISOnum -->
```

### 2.HTML标签-语义

用好了最好，不用比用错好

### 3.合法元素

- Element: <tagname>...</tagname>
- Text: text
- Comment <!-- comment -->
- DocumentType: <!DocType html>
- ProcessingInstruction: <?a 1?>
- CDATA: <![CDATA[]]>

### 4.导航类操作

- parentNode
- childNodes
- firstChild
- lastChild
- nextSiblings
- previousSiblings

### 5.修改操作

- appendChild
- insertBefore
- removeChild
- replaceChild

### 6.重要的知识点

- dom元素二次插入的时候，会自动执行remove，是一个挪过去的过程
- parentNode和childNodes是动态的类数组

### 7.高级操作

- compareDocumentPosition是一个用于比较两个节点中关系的函数
- contains检查一个节点是否包含另外一个节点
- isEqualNode检查两个节点是否完全相同
- isSameNode检查两个节点是否是同一个节点，实际上在JS中可以使用===
- cloneNode复制一个节点，如果传入参数为true，则会连同子元素一起做深拷贝

### 8.Event

addEventListener(event, listener, options)

