var lastfm = require('./lastfm');
var fs = require('fs');

/*
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

lastfm.user.getLibrary('NakedIntruder', {
  end: function(data) {
    console.log(JSON.stringify(data));
  }
});
*/

// Download library to JSON
// lastfm.user.getLibrary('NakedIntruder', {
//   end: function(data) {
//     fs.writeFile('/Users/jdog/Desktop/library.json', JSON.stringify(data), function(err) {
//       if(err) {
//         throw err;
//       }
//       console.log('SAVED: /Users/jdog/Desktop/library.json');
//     });
//   }
// });

lastfm.user.getLovedTracks('NakedIntruder', {
  end: function(data) {
    data[0].lovedtracks.track.forEach(function (track) {
      console.log(track.artist.name + ' - ' + track.name);
    });

    // fs.writeFile('/Users/jdog/Desktop/loved.json', JSON.stringify(data), function(err) {
    //   if(err) {
    //     throw err;
    //   }
    //   console.log('SAVED: /Users/jdog/Desktop/loved.json');
    // });
  }
});
