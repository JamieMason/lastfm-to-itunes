var lastfm = require('./lastfm');
var fs = require('fs');
var async = require('./async');
var child_process = require('child_process');
var matchTrackPath = require('path').resolve('applescript/itunes/matchTrack.applescript');

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
    var flattened = [];

    data.forEach(function (page) {
      page.lovedtracks.track.forEach(function (track) {
        flattened.push({
          lastfm: '"' + track.artist.name.replace(/"/g, '') + '" "' + track.name.replace(/"/g, '') + '"',
          itunes: ''
        });
      });
    });

    console.log('processing ', flattened.length, ' loved tracks...');

    async.map(flattened, function(done, el, ix) {
      child_process.exec('osascript ' + matchTrackPath + ' ' + el.lastfm, function(error, stdout, stderr) {
        if(stderr || error !== null) {
          console.error(error);
          process.exit(1);
        } else {
          el.itunes = stdout;
          done(el);
        }
      });
    }, {
      done: function(data) {
        console.log(JSON.stringify(data));
      }
    });

    // fs.writeFile('/Users/jdog/Desktop/loved.json', JSON.stringify(data), function(err) {
    //   if(err) {
    //     throw err;
    //   }
    //   console.log('SAVED: /Users/jdog/Desktop/loved.json');
    // });
  }
});
