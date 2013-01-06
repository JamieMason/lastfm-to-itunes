var service = require('../service');
var template = require('../template');
var lastfm = require('./index');
var async = require('../async');

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
 * @param {String} options.service
 * @param {String|Number} options.page
 * @param {String|Number} options.limit
 */
exports.getPage = function(userName, options) {
  service.request(lastfm.api, {
    service: template.merge(options.service, {
      username: userName,
      page: options.page || '',
      limit: options.limit || lastfm.api.defaults.limit
    }),
    end: function(body) {
      options.end(JSON.parse(body));
    }
  });
};

exports.countPages = function(userName, options) {
  exports.getPage(userName, {
    service: options.service,
    page: 1,
    limit: options.limit || lastfm.api.defaults.limit,
    end: function(data) {
      options.end(parseInt(data[options.rootNode]['@attr'].totalPages, 10));
    }
  });
};

exports.getPagesFromLibrary = function(userName, options) {
  async.map(new Array(options.lastPage - options.firstPage), function(done, el, pageIndex) {
    var pageNumber = options.firstPage + (pageIndex + 1);
    exports.getPage(userName, {
      service: options.service,
      page: pageNumber,
      limit: options.limit || lastfm.api.defaults.limit,
      end: function(data) {
        done(data);
      }
    });
  }, {
    done: options.end
  });
};

exports.getLibrary = function(userName, options) {
  exports.countPages(userName, {
    rootNode: 'tracks',
    service: lastfm.api.services.user.getTracks,
    limit: options.limit || lastfm.api.defaults.limit,
    end: function(totalPages) {
      exports.getPagesFromLibrary(userName, {
        service: lastfm.api.services.user.getTracks,
        firstPage: 1,
        lastPage: totalPages,
        limit: options.limit || lastfm.api.defaults.limit,
        end: options.end
      });
    }
  });
};

exports.getLovedTracks = function(userName, options) {
  exports.countPages(userName, {
    rootNode: 'lovedtracks',
    service: lastfm.api.services.user.getLovedTracks,
    limit: options.limit || lastfm.api.defaults.limit,
    end: function(totalPages) {
      exports.getPagesFromLibrary(userName, {
        service: lastfm.api.services.user.getLovedTracks,
        firstPage: 1,
        lastPage: totalPages,
        limit: options.limit || lastfm.api.defaults.limit,
        end: options.end
      });
    }
  });
};
