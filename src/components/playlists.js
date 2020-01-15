import React from "react";
// import PlayIcon from "@material-ui/icons/PlayArrow";
// import StopIcon from "@material-ui/icons/Stop";

const Playlists = ({ playlists, handleShowSelectedPlaylist }) => {
  return (
    <div>
      {playlists.length > 0 ? <h3>My Playlists</h3> : null}
      {playlists.map(playlist => (
        <div
          key={playlist.id}
          onClick={() => handleShowSelectedPlaylist(playlist)}
          style={{ border: "1px solid red", cursor: "pointer" }}
        >
          <div>{playlist.name}</div>
          <div>
            {playlist.songs && playlist.songs.length}{" "}
            {playlist.songs && playlist.songs.length > 1 ? "songs" : "song"}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Playlists;
