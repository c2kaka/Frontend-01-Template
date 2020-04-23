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

