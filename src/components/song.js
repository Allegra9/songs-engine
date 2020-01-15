import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteOutlineIcon from "@material-ui/icons/FavoriteBorder";

/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";

const Song = ({
  song,
  toggleFavourite,
  isFavourite,
  showPlaylistsToAddSong,
  handleShowPlaylistsToAddSong,
  handleCreateNewPlaylist,
  showNewPlaylistForm,
  createNewPlaylist,
  addToExistingPlaylist,
  newPlaylistName,
  handleInputChange,
  playlists
}) => {
  const {
    artistName,
    collectionName,
    trackName,
    artistViewUrl,
    collectionViewUrl,
    trackViewUrl,
    previewUrl,
    artworkUrl100,
    releaseDate,
    country,
    primaryGenreName
  } = song;

  const dt = new Date(releaseDate);
  const dte = dt.getFullYear();

  //add to playlist - if no playlist, show a button Create a playlist, or show that button and list existing playlists
  //when user clicks on the playlist, song is added
  return (
    <Container>
      <a href={trackViewUrl}>
        <img src={artworkUrl100} alt="artwork" width="200" />
      </a>
      <button onClick={() => toggleFavourite(song)}>
        {isFavourite ? <FavoriteIcon /> : <FavoriteOutlineIcon />}
      </button>

      <button
        onClick={handleShowPlaylistsToAddSong}
        style={{ cursor: "pointer" }}
      >
        {showPlaylistsToAddSong ? "cancel" : "add to playlist"}
      </button>
      {showPlaylistsToAddSong ? (
        <div>
          <button onClick={handleCreateNewPlaylist}>create a playlist</button>
          {showNewPlaylistForm ? (
            <form onSubmit={e => createNewPlaylist(e, song)}>
              <input
                type="text"
                placeholder="name of new playlist"
                onChange={handleInputChange}
                value={newPlaylistName}
                name="newPlaylistName"
                autoFocus
              />
              <button type="submit" style={{ cursor: "pointer" }}>
                Create
              </button>
              <button onClick={handleCreateNewPlaylist}>cancel</button>
            </form>
          ) : null}
          {playlists &&
            playlists.map(playlist => (
              <div
                key={playlist.id}
                onClick={() => addToExistingPlaylist(song, playlist)}
                style={{ cursor: "pointer" }}
              >
                {playlist.name}
              </div>
            ))}
        </div>
      ) : null}

      <h1>{trackName}</h1>
      <h4>
        Artist:{" "}
        <a href={artistViewUrl} target="_blank" rel="noopener noreferrer">
          {artistName}
        </a>
      </h4>

      <h4>
        Collection:{" "}
        <a href={collectionViewUrl} target="_blank" rel="noopener noreferrer">
          {collectionName}
        </a>
      </h4>
      <h4>
        {primaryGenreName} • {dte} • {country}
      </h4>

      {previewUrl.charAt(previewUrl.length - 1) === "v" ? (
        <video
          controls
          autoPlay
          name="media"
          width="100%"
          style={{ border: "1px solid pink" }}
        >
          <source src={previewUrl} type="audio/x-m4a" />
        </video>
      ) : (
        <audio
          controls
          autoPlay
          name="media"
          width="330"
          height="70"
          style={{ border: "1px solid pink" }}
        >
          <source src={previewUrl} type="audio/x-m4a" />
        </audio>
      )}
    </Container>
  );
};
// video:
// https://video-ssl.itunes.apple.com/itunes-assets/Video125/v4/37/06/b0/3706b09f-21d6-38b5-3be8-a918c4e557c7/mzvf_5612497697990929684.640x480.h264lc.U.p.m4v

// audio:
// https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview128/v4/7e/fc/23/7efc234d-c6e8-d756-b9d6-5c9dad73e4e8/mzaf_79272927364963797.plus.aac.p.m4a

export default Song;

const Container = styled.div`
  border: 1px solid pink;
`;

// {
//   wrapperType: "track"
//   kind: "song"
//   artistId: 27044968
//   collectionId: 1206122676
//   trackId: 1206122805
//   artistName: "Pitbull"
//   collectionName: "Climate Change"
//   trackName: "Options (feat. Stephen Marley)"
//   collectionCensoredName: "Climate Change"
//   trackCensoredName: "Options (feat. Stephen Marley)"
//   artistViewUrl: "https://music.apple.com/us/artist/pitbull/27044968?uo=4
//***same
//   collectionViewUrl: "https://music.apple.com/us/album/options-feat-stephen-marley/1206122676?i=1206122805&uo=4"
//   trackViewUrl:      "https://music.apple.com/us/album/options-feat-stephen-marley/1206122676?i=1206122805&uo=4"
//***
//   previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview122/v4/af/52/69/af5269e0-13df-1ffe-ecef-1a7d5ba728c8/mzaf_8873910042996635548.plus.aac.p.m4a"
//   artworkUrl30: "https://is1-ssl.mzstatic.com/image/thumb/Music111/v4/bf/6a/84/bf6a842d-3610-5636-9a6e-908ea033a27c/source/30x30bb.jpg"
//   artworkUrl60: "https://is1-ssl.mzstatic.com/image/thumb/Music111/v4/bf/6a/84/bf6a842d-3610-5636-9a6e-908ea033a27c/source/60x60bb.jpg"
//   artworkUrl100: "https://is1-ssl.mzstatic.com/image/thumb/Music111/v4/bf/6a/84/bf6a842d-3610-5636-9a6e-908ea033a27c/source/100x100bb.jpg"
//   collectionPrice: 9.99
//   trackPrice: 1.29
//   releaseDate: "2017-03-21T07:00:00Z"
//   collectionExplicitness: "cleaned"
//   trackExplicitness: "cleaned"
//   discCount: 1
//   discNumber: 1
//   trackCount: 11
//   trackNumber: 8
//   trackTimeMillis: 239765
//   country: "USA"
//   currency: "USD"
//   primaryGenreName: "Pop"
//   contentAdvisoryRating: "Clean"
//   isStreamable: true}
