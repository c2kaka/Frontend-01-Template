// 1.写一个正则表达式 匹配所有 Number 直接量
const numberLiteralRegExp = /(^-?\(0|[1-9]+[0-9]*)\.?\d*(?:e[+-]\d+)$)|(0^[0-7]+$)|(^0[Bb]?[01]+$)|(^0[oO]?[0-7]+$)|(^0[xX]?[0-9a-fA-F]+$)/g;

// 2.写一个 UTF-8 Encoding 的函数
var stringFromCharCode = String.fromCharCode;

function ucs2decode(string) {
  var output = [];
  var counter = 0;
  var length = string.length;
  var value;
  var extra;
  while (counter < length) {
    value = string.charCodeAt(counter++);
    if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
      // high surrogate, and there is a next character
      extra = string.charCodeAt(counter++);
      if ((extra & 0xFC00) == 0xDC00) { // low surrogate
        output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
      } else {
        // unmatched surrogate; only append this code unit, in case the next
        // code unit is the high surrogate of a surrogate pair
        output.push(value);
        counter--;
      }
    } else {
      output.push(value);
    }
  }
  return output;
}

function checkScalarValue(codePoint) {
  if (codePoint >= 0xD800 && codePoint <= 0xDFFF) {
    throw Error(
      'Lone surrogate U+' + codePoint.toString(16).toUpperCase() +
      ' is not a scalar value'
    );
  }
}

function createByte(codePoint, shift) {
  return stringFromCharCode(((codePoint >> shift) & 0x3F) | 0x80);
}

function encodeCodePoint(codePoint) {
  if ((codePoint & 0xFFFFFF80) == 0) { // 1-byte sequence
    return stringFromCharCode(codePoint);
  }
  var symbol = '';
  if ((codePoint & 0xFFFFF800) == 0) { // 2-byte sequence
    symbol = stringFromCharCode(((codePoint >> 6) & 0x1F) | 0xC0);
  }
  else if ((codePoint & 0xFFFF0000) == 0) { // 3-byte sequence
    checkScalarValue(codePoint);
    symbol = stringFromCharCode(((codePoint >> 12) & 0x0F) | 0xE0);
    symbol += createByte(codePoint, 6);
  }
  else if ((codePoint & 0xFFE00000) == 0) { // 4-byte sequence
    symbol = stringFromCharCode(((codePoint >> 18) & 0x07) | 0xF0);
    symbol += createByte(codePoint, 12);
    symbol += createByte(codePoint, 6);
  }
  symbol += stringFromCharCode((codePoint & 0x3F) | 0x80);
  return symbol;
}

function utf8encode(string) {
  var codePoints = ucs2decode(string);
  var length = codePoints.length;
  var index = -1;
  var codePoint;
  var byteString = '';
  while (++index < length) {
    codePoint = codePoints[index];
    byteString += encodeCodePoint(codePoint);
  }
  return byteString;
}

// 写一个正则表达式，匹配所有的字符串直接量，单引号和双引号
const doubleStringCharacters = /(?:[^"\n\\\r\u2028\u2029]|\\(?:['"\\bfnrtv\n\r\u2028\u2029]|\r\n)|\\x[0-9a-fA-F]{2}|\\u[0-9a-fA-F]{4}|\\[^0-9ux'"\\bfnrtv\n\\\r\u2028\u2029])*/;
const SingleStringCharacters = /(?:[^'\n\\\r\u2028\u2029]|\\(?:['"\\bfnrtv\n\r\u2028\u2029]|\r\n)|\\x[0-9a-fA-F]{2}|\\u[0-9a-fA-F]{4}|\\[^0-9ux'"\\bfnrtv\n\\\r\u2028\u2029])*/;