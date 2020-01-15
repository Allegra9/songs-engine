import React from "react";

const SongsList = ({ songs, handleSelectSong }) => {
  return (
    <>
      {songs &&
        songs.map(song => (
          <div
            key={song.trackId}
            style={{ cursor: "pointer" }}
            onClick={() => handleSelectSong(song)}
          >
            {song.trackName} - {song.artistName}
          </div>
        ))}
    </>
  );
};

export default SongsList;
