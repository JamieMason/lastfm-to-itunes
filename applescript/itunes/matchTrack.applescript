to matchTrack(sArtist, sTrack)
  tell application "iTunes"
    set names to {}
    set matches to (search library playlist 1 for sTrack only songs)

    if (count of matches) > 0 then
      repeat with oTrack in matches
        if (name of oTrack equals sTrack) and (artist of oTrack equals sArtist)
          set names to names & (name of oTrack & " > " & " > " & artist of oTrack & " > " & played count of oTrack & " > " & rating of oTrack)
        end if
      end repeat
    end if
  end tell
  return names
end matchTrack

on run argv
  matchTrack(item 1 of argv, item 2 of argv)
end run
