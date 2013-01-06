to matchAlbumTrack(sArtist, sAlbum, sTrack)
  tell application "iTunes"
    set names to {}
    set matches to (search library playlist 1 for sTrack only songs)

    if (count of matches) > 0 then
      repeat with oTrack in matches
        if (name of oTrack equals sTrack) and (album of oTrack equals sAlbum) and (artist of oTrack equals sArtist)
          set names to names & (name of oTrack & " > " & album of oTrack & " > " & artist of oTrack & " > " & played count of oTrack & " > " & rating of oTrack)
        end if
      end repeat
    end if
  end tell
  return names
end matchAlbumTrack

on run argv
  matchAlbumTrack(item 1 of argv, item 2 of argv, item 3 of argv)
end run
