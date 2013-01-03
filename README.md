# last.fm to iTunes

A node.js version of the popular [LastFM2Itunes Perl Script](http://lastfm.igrenier.com/?q=node/5) but more generally just an exercise in playing with the [last.fm api](http://www.last.fm/api).

In the unlikely event you want to join in, you'll need to create a `/developer.js` containing your credentials obtained from [http://www.last.fm/api/account/create](http://www.last.fm/api/account/create).

    exports.lastfm = {
      key: "I've got the key!",
      secret: "I've got the secre-e-et!"
    };

Some sample calls are in

    $ node index.js

Project started: Thu 3 Jan
