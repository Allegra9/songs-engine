import React from "react";

const SelectedPlaylist = ({ selectedPlaylist, handleShowSelectedPlaylist }) => {
  const { name, songs } = selectedPlaylist;
  return (
    <>
      {name ? (
        <div>
          <button onClick={() => handleShowSelectedPlaylist("")}>back</button>
          <h2>{name}</h2>
          <div style={{ border: "1px solid red" }}>
            {songs &&
              songs.map(song => (
                <div key={song.trackId}>
                  <div>{song.trackName}</div>
                  <audio src={song.previewUrl} controls>
                    {" "}
                  </audio>
                  <a href={song.previewUrl}>{song.previewUrl}</a>
                </div>
              ))}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default SelectedPlaylist;
