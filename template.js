/**
 * @param  {String} tpl
 * @param  {Object} data
 * @return {String}
 */
exports.merge = function(tpl, data) {
  for(var token in data) {
    tpl = tpl.split('#{' + token + '}').join(data[token]);
  }
  return tpl;
};
