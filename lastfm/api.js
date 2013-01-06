var developer = require('../developer');

exports.method = 'GET';
exports.key = developer.lastfm.key;
exports.secret = developer.lastfm.secret;
exports.protocol = 'http://';
exports.hostname = 'ws.audioscrobbler.com';
exports.defaults = {
  limit: 50
};
exports.services = {
  user: {
    getInfo: '/2.0/?method=user.getinfo&user=#{username}&api_key=#{apiKey}&format=json',
    getTracks: '/2.0/?method=library.gettracks&user=#{username}&api_key=#{apiKey}&format=json&page=#{page}&limit=#{limit}',
    getLovedTracks: '/2.0/?method=user.getlovedtracks&user=#{username}&api_key=#{apiKey}&format=json&page=#{page}&limit=#{limit}'
  }
};

