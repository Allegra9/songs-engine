import React from "react";

const Favourites = ({
  favourites,
  handleSelectSong,
  showFavourites,
  handleShowFavourites
}) => {
  //list of favourite songs
  return (
    <>
      {favourites.length > 0 ? (
        <div>
          {showFavourites ? (
            <div>
              <button onClick={handleShowFavourites}>back</button>
              <h2>Favourites</h2>
              {favourites.map(song => (
                <div
                  key={song.trackId}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSelectSong(song)}
                >
                  {song.trackName} - {song.artistName}
                </div>
              ))}
            </div>
          ) : (
            <button onClick={handleShowFavourites}>Favourites</button>
          )}
        </div>
      ) : null}
    </>
  );
};

export default Favourites;
