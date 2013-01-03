var lastfm = require('./lastfm');

lastfm.user.getInfo('NakedIntruder', {
  end: function(data) {
    var date = new Date();
    date.setTime(parseInt(data.user.registered.unixtime, 10) * 1000);
    console.log('Registered on: ' + date.toUTCString());
  }
});

lastfm.user.getTracks('NakedIntruder', {
  page: 1,
  limit: 5,
  end: function(data) {
    console.log(JSON.stringify(data));
  }
});
