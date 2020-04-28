# 1 Grammar

## 1.1 Expressions

### 	1.1.1 Member

- a.b

- a[b]

- foo\`string\`

  ```js
  function foo() {
      console.log(arguments);
  }
  var name = 'kaka';
  foo`hello ${name}!`;
  ```

  

- super.b

- super[b]

- new.target

  ```js
  function foo() {
      console.log(new.target);
  }
  
  var fakeFoo = {};
  Object.setPrototypeOf(fakeFoo, foo);
  fakeFoo.apply(foo);
  ```

- new Foo()

  ```js
  function cls1(s) {
  	console.log(s);
  }
  
  function cls2(s) {
      console.log('2', s);
      return cls1;
  }
  
  new new cls2('hello'); // 2 hello cls1 {}
  ```

### 1.1.2 Reference

  - Object
  - Key

  具有写引用能力的运算符

  - delete
  - assign

### 1.1.3 Call

- foo()
- super()
- foo()['b']
- foo().b
- foo()\`abc\`

example: new a()['b']

```js
class foo {
    constructor() {
        this.b = 1;
    }
}

new foo()['b'] // 1
```

### 1.1.4 Left Handside & Right Handside

​	Example:

- a.b = c;
- a+b = c;

#### update

- a++
- ++a
- a--
- --a

#### Unary(单目运算符)

- delete a.b

- void foo() 

  void 将后面的部分变为undefined 可以取代undefined

- typeof a

  ```js
  typeof null // object
  typeof function(){} // function
  ```

  

- +a

- -a

- ~a

- !a

- await a

#### Multiplicative

- */%

#### Addictive

- +-

#### Exponental

- **

#### Shift

- << >> >>>

#### Bitwise

- &^ |

#### Relationship

- \>= <= > < instanceof in

#### Equality

- === !==
- == !=

#### Logical

- &&
- ||

#### Conditional

- ? :

### 1.1.5 JavaScript有几种加法

- number类型的加法
- string 类型的加法

## 1.2 Boxing & Unboxing

### 1.2.1 Boxing

- String

- Number

- Boolean

- Symbol

  ```js
  Symbol("1")
  new Symbol("1") // Symbol 不支持new
  Object(Symbol("1")).constructor
  
  //也可以做装箱
  (function(){return this}).apply(Symbol("x")) Unboxing
  ```

### 1.2.2 Unboxing

```js
1 + {} // 1 [Object Object]

1 + {valueOf(){return 2}} // 3

1 + {toString(){return 2}} // 3

1 + {valueOf(){return 2}, toString(){return 3}} // 3

"1" + {valueOf(){return 2}, toString(){return 3}} // "12"

1 + {[Symbol.toPrimitive](){return 6},valueOf(){return 2}, toString(){return 3}} // 7

"1" + {valueOf(){return },toString(){return 3}} //'1undefined'

1 + {[Symbol.toPrimitive](){return {}},valueOf(){return 2}, toString(){return 3}} // error toPrimitive接管所有转换

"1" + {valueOf(){return {} },toString(){return 3}} //'12' 默认会有顺序
```

## 2. Statement

### 2.1 Atom

Grammar

- 简单语句
- 组合语句
- 声明

Runtime

- Completion Record

- Lexical Environment

  

### 2.2 Completion Record 

• [[type]]: normal, break, continue, return, or throw 

• [[value]]: Types 

• [[target]]: label



### 2.3 简单语句 

• ExpressionStatement 

• EmptyStatement 

• DebuggerStatement 

• ThrowStatement 

• ContinueStatement 

• BreakStatement 

• ReturnStatement



## 2.4 复合语句 

• BlockStatement 

• IfStatement 

• SwitchStatement 

• IterationStatement 

• WithStatement 

• LabelledStatement 

• TryStatement



## 2.5 block 

• BlockStatement

[[type]]: normal 

• [[value]]: -- 

• [[target]]: --



## 2.6 标签、循环、break、continue 

• LabelledStatement 

• IterationStatement 

• ContinueStatement 

• BreakStatement 

• SwitchStatement 

• [[type]]: break continue 

• [[value]]: -- 

• **[[target]]: label**



### 2.7 除了throw语句还有哪些可以产生type为throw的statement

await

ExpressionStatement

### 2.8 作用域和上下文的区别

作用域是指源代码中的文本的范围

上下文指的是在用户电脑中，JS引擎内存中存变量的地方

## 3 Object

### 3.1 Object三要素

- state 状态 用状态描述对象
- behavior 行为 状态的改变即是行为
- identifier

### 3.2 Object-Class

类是一种常见的描述对象的方式。 

而”归类”和”分类”则是两个主要的流派。 

对于”归类”方法而言，多继承是非常自然的事情。 如C++ 

而采用分类思想的计算机语言，则是单继承结构。 并且会有一个基类Object。 

### 3.3 Object-Prototype

原型是一种更接近人类原始认知的描述对象的方法。 

我们并不试图做严谨的分类,而是采用“相似”这 样的方式去描述对象。 

任何对象仅仅需要描述它自己与原型的区别即可。

### 3.4 Object in JavaScript

- 在JavaScript运行时，原生对象的描述方式非常简单，我们只需要关 心原型和属性两个部分。
- JavaScript用属性来统一抽象对象状态和行为。一般来说,数据属性用于描述状态,访问器属性则用于描述行为。数据属性中如果存储函数，也 可以用于描述行为。 
- 当我们访问属性时，如果当前对象没有，则会沿着原型找原型对象是 否有此名称的属性，而原型对象还可能有原型，因此，会有“原型链” 这一说法。 Object 这一算法保证了，每个对象只需要描述自己和原型的区别即可

### 3. 5 Function Object

除了一般对象的属性和原型，函数对象还有一个行为[[call]]。 

我们用JavaScript中的function 关键字、箭头运算符或者Function构造器创建的对象，会有[[call]]这个行为。 

我们用类似 f() 这样的语法把对象当做函数调用时，会访问到[[call]]这个行为。如果对应的对象没有[[call]]行为，则会报错。

## 4 课后作业

 找出 JavaScript 标准里所有的对象，分析有哪些对象是我们无法实现出来的，这些对象都有哪些特性？ 

### 4.1 Array

Array有一个不可配置的属性'length',它总是一个小于2的32次方的非负整数。length的数值总是大于每个array index的值。无论是Array对象新增一个属性或是对象改变了，必要时都会调整其他属性来保证这个原则。

比如：

当有新的元素添加到列表中时，自动更新length属性

```js
var a = [];
a[100] = 1;
a.length //101
```

设置length为一个较小值将数组截断		

```js
var a = [];
a[100] = 1;
a.length = 50;
a[100] //undefined
```

### 4.2 String

String是一个类数组对象。String的code unit和length属性都是non-writable 和non-configurable的。

### 4.3 Arguments

实参对象也是一个类数组对象。每个实参对象都包含以数字为索引的一组元素以及length属性。

实参对象还定义了callee和caller属性。callee属性指代当前正在执行的函数；caller指代调用当前正在执行的函数的函数。

### 4.4 Proxy

Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”（meta programming），即对编程语言进行编程。

Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。Proxy 这个词的原意是代理，用在这里表示由它来“代理”某些操作，可以译为“代理器”。

对于可以设置、但没有设置拦截的操作，则直接落在目标对象上，按照原先的方式产生结果。

下面是 Proxy 支持的拦截操作一览，一共 13 种。

- **get(target, propKey, receiver)**：拦截对象属性的读取，比如`proxy.foo`和`proxy['foo']`。
- **set(target, propKey, value, receiver)**：拦截对象属性的设置，比如`proxy.foo = v`或`proxy['foo'] = v`，返回一个布尔值。
- **has(target, propKey)**：拦截`propKey in proxy`的操作，返回一个布尔值。
- **deleteProperty(target, propKey)**：拦截`delete proxy[propKey]`的操作，返回一个布尔值。
- **ownKeys(target)**：拦截`Object.getOwnPropertyNames(proxy)`、`Object.getOwnPropertySymbols(proxy)`、`Object.keys(proxy)`、`for...in`循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而`Object.keys()`的返回结果仅包括目标对象自身的可遍历属性。
- **getOwnPropertyDescriptor(target, propKey)**：拦截`Object.getOwnPropertyDescriptor(proxy, propKey)`，返回属性的描述对象。
- **defineProperty(target, propKey, propDesc)**：拦截`Object.defineProperty(proxy, propKey, propDesc）`、`Object.defineProperties(proxy, propDescs)`，返回一个布尔值。
- **preventExtensions(target)**：拦截`Object.preventExtensions(proxy)`，返回一个布尔值。
- **getPrototypeOf(target)**：拦截`Object.getPrototypeOf(proxy)`，返回一个对象。
- **isExtensible(target)**：拦截`Object.isExtensible(proxy)`，返回一个布尔值。
- **setPrototypeOf(target, proto)**：拦截`Object.setPrototypeOf(proxy, proto)`，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。
- **apply(target, object, args)**：拦截 Proxy 实例作为函数调用的操作，比如`proxy(...args)`、`proxy.call(object, ...args)`、`proxy.apply(...)`。
- **construct(target, args)**：拦截 Proxy 实例作为构造函数调用的操作，比如`new proxy(...args)`。

### 4.5 二进制数组

二进制数组由三类对象组成。

**（1）`ArrayBuffer`对象**：代表内存之中的一段二进制数据，可以通过“视图”进行操作。“视图”部署了数组接口，这意味着，可以用数组的方法操作内存。

**（2）`TypedArray`视图**：共包括 9 种类型的视图，比如`Uint8Array`（无符号 8 位整数）数组视图, `Int16Array`（16 位整数）数组视图, `Float32Array`（32 位浮点数）数组视图等等。

**（3）`DataView`视图**：可以自定义复合格式的视图，比如第一个字节是 Uint8（无符号 8 位整数）、第二、三个字节是 Int16（16 位整数）、第四个字节开始是 Float32（32 位浮点数）等等，此外还可以自定义字节序。

简单说，`ArrayBuffer`对象代表原始的二进制数据，`TypedArray`视图用来读写简单类型的二进制数据，`DataView`视图用来读写复杂类型的二进制数据。

`TypedArray`视图支持的数据类型一共有 9 种（`DataView`视图支持除`Uint8C`以外的其他 8 种）。

| 数据类型 | 字节长度 | 含义                             | 对应的 C 语言类型 |
| -------- | -------- | -------------------------------- | ----------------- |
| Int8     | 1        | 8 位带符号整数                   | signed char       |
| Uint8    | 1        | 8 位不带符号整数                 | unsigned char     |
| Uint8C   | 1        | 8 位不带符号整数（自动过滤溢出） | unsigned char     |
| Int16    | 2        | 16 位带符号整数                  | short             |
| Uint16   | 2        | 16 位不带符号整数                | unsigned short    |
| Int32    | 4        | 32 位带符号整数                  | int               |
| Uint32   | 4        | 32 位不带符号的整数              | unsigned int      |
| Float32  | 4        | 32 位浮点数                      | float             |
| Float64  | 8        | 64 位浮点数                      | double            |

二进制数组并不是真正的数组，而是类似数组的对象。