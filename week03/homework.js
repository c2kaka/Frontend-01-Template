const convertStringToNumber = (string, hex = 10) => {
  const chars = string.split('');
  let number = 0;

  let i = 0;
  while (i < chars.length && chars[i] !== '.') {
    number = number * hex;
    number += chars[i].codePointAt(0) - '0'.codePointAt(0);
    i++;
  }

  if (chars[i] === '.') {
    i++;
  }

  let fraction = 1;
  while (i < chars.length) {
    fraction = fraction / hex;
    number += (chars[i].codePointAt(0) - '0'.codePointAt(0)) * fraction;
    i++;
  }

  return number;
}

const convertNumberToString = (number, hex = 10) => {
  let integer = Math.floor(number);
  let fraction = number - integer;
  let string = '';

  while (integer > 0) {
    string = integer % hex + string;
    integer = Math.floor(integer / hex);
  }

  if (fraction > 0) {
    string += '.';
  }


  while (fraction > 0) {
    let integer = Math.floor(fraction * hex);
    string += integer;
    fraction = fraction * hex - integer;
  }

  return string;
}
