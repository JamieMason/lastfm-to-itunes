var http = require('http');
var template = require('./template');

/**
 * @param {String}   api.method
 * @param {String}   api.hostname
 * @param {String}   api.service
 * @param {String}   api.key
 * @param {String}   options.service
 * @param {Function} options.end
 * @param {Function} options.error
 */
exports.request = function(api, options) {
  http.request({
    method: api.method,
    hostname: api.hostname,
    path: template.merge(options.service, {
      apiKey: api.key
    })
  }, function(response) {
    var data = [];
    response.on('data', function(chunk) {
      data.push(chunk);
    }).on('end', function() {
      options.end(data.join(''));
    });
  }).end();
};
