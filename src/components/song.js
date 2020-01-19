import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteOutlineIcon from "@material-ui/icons/FavoriteBorder";
import ArrowBackIcon from "@material-ui/icons/ArrowBackIos";

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
  playlists,
  unselectSong
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
      <BackButton onClick={unselectSong}>
        <ArrowBackIcon style={{ fontSize: 13, marginRight: 5 }} />
        back
      </BackButton>
      <Content>
        <TopSection>
          <ImgContainer>
            <a href={trackViewUrl}>
              <img src={artworkUrl100} alt="artwork" width="200" />
            </a>
          </ImgContainer>
          <BtnContainer>
            <FavoriteButton onClick={() => toggleFavourite(song)}>
              {isFavourite ? (
                <FavoriteIcon style={{ color: "red" }} />
              ) : (
                <FavoriteOutlineIcon style={{ color: "red" }} />
              )}
            </FavoriteButton>
          </BtnContainer>

          <BtnContainer>
            <AddButton onClick={handleShowPlaylistsToAddSong}>
              {showPlaylistsToAddSong ? "cancel" : "add to playlist"}
            </AddButton>
          </BtnContainer>
        </TopSection>

        {showPlaylistsToAddSong ? (
          <AddToPlaylistContainer>
            <CreatePlaylistButton onClick={handleCreateNewPlaylist}>
              Create new playlist
            </CreatePlaylistButton>
            {showNewPlaylistForm ? (
              <NewPlaylistForm onSubmit={e => createNewPlaylist(e, song)}>
                <input
                  type="text"
                  placeholder="New playlist name"
                  onChange={handleInputChange}
                  value={newPlaylistName}
                  name="newPlaylistName"
                  autoFocus
                />
                <CreateButton type="submit">Create</CreateButton>
                <CancelButton onClick={handleCreateNewPlaylist}>
                  cancel
                </CancelButton>
              </NewPlaylistForm>
            ) : null}
            {playlists &&
              playlists.map(playlist => (
                <Playlist
                  key={playlist.id}
                  onClick={() => addToExistingPlaylist(song, playlist)}
                >
                  {playlist.name}
                </Playlist>
              ))}
          </AddToPlaylistContainer>
        ) : null}

        <SongInfoContainer>
          <h1>{trackName}</h1>
          <h4>
            Artist:{" "}
            <a href={artistViewUrl} target="_blank" rel="noopener noreferrer">
              {artistName}
            </a>
          </h4>

          <h4>
            Collection:{" "}
            <a
              href={collectionViewUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {collectionName}
            </a>
          </h4>
          <h4>
            {primaryGenreName} • {dte} • {country}
          </h4>

          {previewUrl.charAt(previewUrl.length - 1) === "v" ? (
            <video controls autoPlay name="media" width="100%">
              <source src={previewUrl} type="audio/x-m4a" />
            </video>
          ) : (
            <audio controls autoPlay name="media" width="330" height="70">
              <source src={previewUrl} type="audio/x-m4a" />
            </audio>
          )}
        </SongInfoContainer>
      </Content>
    </Container>
  );
};

export default Song;

const mont = "Montserrat, serif";
const light = 400;
const small = "13px";
const purple = "#670E99";
const newLilac = "#efe3f5";

const Container = styled.div``;

const Content = styled.div`
  border: 1px solid ${props => props.theme.style1Color};
  border-radius: 5px;
  padding: 20px;
  padding-bottom: 40px;
  background: ${newLilac};
  h1 {
    color: #000;
  }
  a {
    color: ${purple};
    text-decoration: none;
    &:hover {
      color: ${purple};
      text-decoration: underline;
    }
  }
`;

const BackButton = styled.button`
  padding: 5px 20px;
  background: transparent;
  border: 1px solid ${props => props.theme.textColor};
  border-radius: 5px;
  outline: none;
  font-family: ${mont};
  color: ${props => props.theme.textColor};
  font-size: ${small};
  font-weight: ${light};
  cursor: pointer;
  margin-bottom: 10px;
  &:focus {
    outline: none !important;
  }
  &:hover {
    font-weight: 600;
  }
`;

const TopSection = styled.div`
  display: grid;
  grid-template-columns: 220px 55px 150px;
  grid-gap: 10px;
  width: 100%;
`;

const ImgContainer = styled.div`
  border: 1px solid #000;
  border-radius: 5px;
  padding: 10px;
  padding-rigth: 15px;
  border: 1px solid #c2bdc5;
  background: #fff;
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
`;

const FavoriteButton = styled.button`
  border: 1px solid #000;
  background: #fff;
  border-radius: 5px;
  cursor: pointer;
  padding: 3px 10px;
  margin: 0 5px;
  margin-bottom: 10px;
  &:focus {
    outline: none !important;
  }
  &:hover {
    font-weight: 600;
    font-size: 15px;
  }
`;

const AddButton = styled.button`
  background: #fff;
  color: #000;
  border: 1px solid #000;
  border-radius: 5px;
  padding: 8px 20px;
  font-size: ${small};
  font-weight: ${light};
  cursor: pointer;
  margin-bottom: 10px;
  font-family: ${mont};
  &:focus {
    outline: none !important;
  }
  &:hover {
    font-weight: 600;
  }
`;

const AddToPlaylistContainer = styled.div`
  padding: 20px 0;
`;

const CreatePlaylistButton = styled.button`
  background: #fff;
  color: #000;
  border: 1px solid #000;
  border-radius: 5px;
  padding: 8px 20px;
  font-size: ${small};
  font-weight: ${light};
  cursor: pointer;
  margin-bottom: 20px;
  font-family: ${mont};
  &:focus {
    outline: none !important;
  }
  &:hover {
    font-weight: 600;
  }
`;

const Playlist = styled.div`
  padding: 5px 10px;
  color: #000;
  border-bottom: 1px solid ${purple} !important;
  width: 55%;
  cursor: pointer;
  &:hover {
    font-weight: 600;
  }
`;

const CreateButton = styled.button`
  background: ${purple};
  color: #fff;
  border: 0;
  border-radius: 5px;
  padding: 5px 25px;
  font-size: ${small};
  cursor: pointer;
  margin-bottom: 20px;
  font-family: ${mont};
  margin-right: 20px;
  &:focus {
    outline: none !important;
  }
  &:hover {
    font-weight: 600;
  }
`;

const CancelButton = styled.button`
  background: #fff;
  color: #000;
  border: 1px solid #000;
  border-radius: 5px;
  padding: 5px 25px;
  font-size: ${small};
  cursor: pointer;
  margin-bottom: 20px;
  font-family: ${mont};
  &:focus {
    outline: none !important;
  }
  &:hover {
    font-weight: 600;
  }
`;
const NewPlaylistForm = styled.form`
  margin-bottom: 0;
  input {
    font-family: ${mont};
    color: #000;
    font-size: ${small};
    background: transparent;
    border: 0 !important;
    border-bottom: 1px solid ${props => props.theme.style1Color} !important;
    width: 230px;
    padding: 10px;
    padding-bottom: 6px;
    margin-right: 6px;
    &:focus {
      outline: none !important;
    }
    ::placeholder {
      color: grey;
    }
  }
`;

const SongInfoContainer = styled.div`
  padding: 10px;
`;
