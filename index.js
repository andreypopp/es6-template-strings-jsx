/**
 * @copyright 2015, Andrey Popp <me@andreypopp.com>
 */
'use strict';

var ReactTools  = require('react-tools');
var recast      = require('recast');
var types       = recast.types;
var n           = types.namedTypes;
var b           = types.builders;

function transform(node) {
  recast.visit(node, {
    visitTaggedTemplateExpression: function(path) {
      this.traverse(path);
      var node = path.value;
      if (node.tag.name === 'jsx') {
        var nodes = node.quasi.quasis.concat(node.quasi.expressions);
        nodes.sort(compareLocation);
        var source = nodes
          .map(function(node) {
            if (node.type === 'TemplateElement') {
              return node.value.raw;
            } else {
              return '{' + recast.print(node) + '}';
            }
          })
          .join('');
        var result = ReactTools.transform(source);
        var nextNode = recast.parse(result).program.body[0].expression;
        path.replace(nextNode);
      }
    }
  });
}

function transformString(source, options) {
  var node = recast.parse(source, options);
  transform(node);
  return recast.print(node, options)
}

function compareLocation(a, b) {
  a = a.loc.start;
  b = b.loc.start;
  if (a.line < b.line) {
    return -1;
  } else if (a.line > b.line) {
    return 1;
  // Nodes are on the same line.
  } else if (a.column < b.column) {
    return -1;
  } else if (a.column > b.column) {
    return 1;
  // Impossible.
  } else {
    throw new Error(
      'Invariant violation: invalid AST structure, nodes have same location');
  }
}

module.exports = {
  transform: transform,
  transformString: transformString
};
