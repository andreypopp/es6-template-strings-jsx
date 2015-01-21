/**
 * Webpack Loader
 *
 * @copyright 2015, Andrey Popp <me@andreypopp.com>
 */
'use strict';

var transformer = require('./index');

function loader(source) {
  if (this.cacheable) {
    this.cacheable();
  }
  var result = transformer.transformString(source);
  return result.code;
}

module.exports = loader;
