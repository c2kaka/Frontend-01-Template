const css = require('css');

module.exports.addCSSRules = function addCSSRules(text) {
  let ast = css.parse(text);
  console.log(JSON.stringify(ast, null, ' '));
  return ast.stylesheet.rules;
};
