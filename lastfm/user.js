var service = require('../service');
var template = require('../template');
var lastfm = require('./index');

/**
 * @param {String}   userName
 * @param {Function} options.end
 */
exports.getInfo = function(userName, options) {
  service.request(lastfm.api, {
    service: template.merge(lastfm.api.services.user.getInfo, {
      username: userName
    }),
    end: function(body) {
      options.end(JSON.parse(body));
    }
  });
};

/**
 * @param {String}   userName
 * @param {Function} options.end
 * @param {String|Number} options.page
 * @param {String|Number} options.limit
 */
exports.getTracks = function(userName, options) {
  service.request(lastfm.api, {
    service: template.merge(lastfm.api.services.user.getTracks, {
      username: userName,
      page: options.page || '',
      limit: options.limit || lastfm.api.defaults.limit
    }),
    end: function(body) {
      options.end(JSON.parse(body));
    }
  });
};
