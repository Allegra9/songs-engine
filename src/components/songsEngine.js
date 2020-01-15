import React from "react";
import { getSongs } from "../adapter/api";
import Switch from "./switch/Switch";
import SearchForm from "./searchForm";
import SongsList from "./songsList";
import Song from "./song";
import TopTenSearched from "./topTenSearched";
import Favourites from "./favourites";
import Playlists from "./playlists";
import SelectedPlaylist from "./selectedPlaylist";

/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";

// eslint-disable-next-line
const Montserrat = require("typeface-montserrat");
// eslint-disable-next-line
const Merriweather = require("typeface-merriweather");

class Songs extends React.Component {
  state = {
    searchQuery: "",
    searchQueryArray: [],
    selectedSong: "",
    showTopTenSearched: false,
    favourites: [], //array of song objects
    showFavourites: false,
    showPlaylistsToAddSong: false,
    playlists: [], //array of playlist objects {name: string, songs: array of objects, id: date stamp}
    selectedPlaylist: {},
    showNewPlaylistForm: false,
    newPlaylistName: "",
    songs: []
  };

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSelectSong = song => {
    console.log(song);
    this.setState({
      selectedSong: song
    });
  };

  unselectSong = () => {
    this.setState({
      selectedSong: ""
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { searchQuery, searchQueryArray } = this.state;
    const data = await getSongs(searchQuery);
    let songs = data.results;
    songs.length = 25;
    this.setState({
      songs,
      searchQueryArray: [...searchQueryArray, searchQuery],
      searchQuery: ""
    });
  };

  handleTopTenSearched = () => {
    this.setState({
      showTopTenSearched: !this.state.showTopTenSearched
    });
  };

  checkIfFavourite = song =>
    this.state.favourites.find(s => s.trackId === song.trackId);

  toggleFavourite = song => {
    const isFavourite = this.checkIfFavourite(song);

    if (isFavourite) {
      this.removeFromFavourites(song);
    } else {
      this.addToFavourites(song);
    }
  };

  addToFavourites = song => {
    console.log("fav");
    this.setState({
      favourites: [...this.state.favourites, song] //array of objects
    });
  };

  removeFromFavourites = song => {
    console.log("un-fav");
    const filteredFavourites = this.state.favourites.filter(
      s => s.trackId !== song.trackId
    );
    this.setState({
      favourites: filteredFavourites
    });
  };

  handleShowFavourites = () => {
    this.setState({
      showFavourites: !this.state.showFavourites
    });
  };

  // handleShowPlaylists = () => {
  //   this.setState({
  //     showPlaylists: !this.state.showPlaylists
  //   });
  // };

  handleShowPlaylistsToAddSong = () => {
    this.setState({
      showPlaylistsToAddSong: !this.state.showPlaylistsToAddSong
    });
  };

  handleCreateNewPlaylist = () => {
    this.setState({
      showNewPlaylistForm: !this.state.showNewPlaylistForm
    });
  };

  createNewPlaylist = (e, song) => {
    e.preventDefault();
    const { newPlaylistName } = this.state;
    //add current existing songs in the playlist when adding a new song to an existing playlist
    const newPlaylist = {
      id: Date.now(),
      name: newPlaylistName,
      songs: [song] // here we are creating a new playlist, so it will be the only song
    };
    this.setState({
      playlists: [...this.state.playlists, newPlaylist],
      newPlaylistName: "",
      showPlaylistsToAddSong: false
    });
    this.handleCreateNewPlaylist();
  };

  //show all existing playlists
  addToExistingPlaylist = (song, playlist) => {
    console.log(song);
    console.log(playlist);
    // check if the song already exists or allow to add the same song multiple times?
    //check if song exists in selected playlist

    // let currentPlaylist = this.state.playlists.find(p => p.id === playlist.id);
    // let isSongAlreadyInPlaylist =
    //   currentPlaylist &&
    //   currentPlaylist.songs.find(s => s.trackId === song.trackId);
    // console.log(isSongAlreadyInPlaylist);
    // if (isSongAlreadyInPlaylist) {
    //   //show a modal to ask if user still wants to add it
    //   console.log("song already exists in this playlist");
    // }

    playlist.songs = [...playlist.songs, song];

    let allPlaylistsMinusSelected = this.state.playlists.filter(
      p => p.id !== playlist.id
    );
    let updatedPlaylists = [...allPlaylistsMinusSelected, playlist];

    console.log("playlist", playlist);
    console.log("updated playlist", updatedPlaylists);
    this.setState({
      playlists: updatedPlaylists,
      newPlaylistName: "",
      showPlaylistsToAddSong: false
    });
  };

  handleShowSelectedPlaylist = playlist => {
    this.setState({
      selectedPlaylist: playlist
    });
  };

  render() {
    const {
      songs,
      selectedSong,
      searchQuery,
      searchQueryArray,
      showTopTenSearched,
      favourites,
      showFavourites,
      showNewPlaylistForm,
      newPlaylistName,
      showPlaylistsToAddSong,
      playlists,
      selectedPlaylist
    } = this.state;
    const { handleThemeChange, isDark } = this.props;

    // console.log(this.state.selectedSong);
    //playlists: [{id: 234238562, name: "top tracks", songs: [{song1}, {song2}, ...]}, {}] - array of objects
    // sort them by the order they were created? Newest on the top? "date created:" key
    return (
      <Container>
        <Content>
          <h1>
            Songs Engine{" "}
            <span role="img" aria-label="coffee cup">
              🎶
            </span>
          </h1>
          <Switch handleThemeChange={handleThemeChange} isDark={isDark} />

          {selectedSong ? (
            <>
              <button onClick={this.unselectSong}>back</button>
              <Song
                song={selectedSong}
                toggleFavourite={this.toggleFavourite}
                isFavourite={this.checkIfFavourite(selectedSong)}
                handleShowPlaylistsToAddSong={this.handleShowPlaylistsToAddSong}
                showPlaylistsToAddSong={showPlaylistsToAddSong}
                handleCreateNewPlaylist={this.handleCreateNewPlaylist}
                showNewPlaylistForm={showNewPlaylistForm}
                createNewPlaylist={this.createNewPlaylist}
                newPlaylistName={newPlaylistName}
                handleInputChange={this.handleInputChange}
                addToExistingPlaylist={this.addToExistingPlaylist}
                playlists={playlists}
              />
            </>
          ) : selectedPlaylist.name ? (
            <SelectedPlaylist
              handleShowSelectedPlaylist={this.handleShowSelectedPlaylist}
              selectedPlaylist={selectedPlaylist}
            />
          ) : (
            <>
              <SearchForm
                handleSubmit={this.handleSubmit}
                handleInputChange={this.handleInputChange}
                searchQuery={searchQuery}
              />
              <TopTenSearched
                searchQueryArray={searchQueryArray}
                handleTopTenSearched={this.handleTopTenSearched}
                showTopTenSearched={showTopTenSearched}
              />
              <Favourites
                favourites={favourites}
                showFavourites={showFavourites}
                handleShowFavourites={this.handleShowFavourites}
                handleSelectSong={this.handleSelectSong}
              />
              <Playlists
                playlists={playlists}
                handleShowSelectedPlaylist={this.handleShowSelectedPlaylist}
              />
              <SongsList
                songs={songs}
                handleSelectSong={this.handleSelectSong}
              />
            </>
          )}
        </Content>
      </Container>
    );
  }
}

export default Songs;

// const pink = "#d23669";
const purple = "#181bed";
const cream = "#fffcf2";
const lightGrey = "#c2c0c0";
// const dark = "#222";
const mont = "Montserrat, serif";
// const meri = "Merriweather, serif";
const thin = 400;
const demi = 600;
const thick = 900;

const Container = styled.div`
  background: ${props => props.theme.backgroundColor};
  border: 1px solid ${cream};
`;

const Content = styled.div`
  width: 45%;
  margin: auto;
  text-align: left;
  text-rendering: optimizeLegibility;
  padding-top: 1em;
  h1 {
    color: ${props => props.theme.textColor};
    font-size: 35px;
    font-weight: ${thick};
  }
  h3 {
    margin-top: auto;
    margin-bottom: 20px;
  }
  p {
    color: ${props => props.theme.textColor};
    font-family: ${mont};
    font-size: 15px;
    font-weight: ${thin};
    letter-spacing: 1px;
    margin-top: 0;
    margin-bottom: 30px;
  }
  form {
    margin-bottom: 20px;
    input {
      border: 0;
      border-bottom: 2px solid ${purple};
      font-family: ${mont};
      color: ${lightGrey};
      font-size: 17px;
      font-weight: ${demi};
      padding: 3px;
      background: transparent;
      &:focus {
        outline: none !important;
      }
      ::placeholder {
        color: ${lightGrey};
      }
    }
  }
  @media screen and (max-width: 1024px) {
    width: 60%;
  }
  @media screen and (max-width: 768px) {
    width: 80%;
  }
  @media screen and (max-width: 750px) {
    width: 90%;
    h1 {
      font-size: 30px;
    }
  }
  @media screen and (max-width: 360px) {
    h1 {
      font-size: 25px;
    }
  }
`;

// const pinkFont = css`
//   color: ${pink};
//   font-size: 25px;
//   font-weight: ${thick};
//   cursor: pointer;
//   font-family: ${mont};
// `;

// const CurrentPost = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 30px;
//   div {
//     display: flex;
//     justify-content: center;
//   }
//   h3 {
//     margin-top: auto;
//     margin-bottom: 20px;
//   }
// `;

// const IconContainer = styled.div`
//   padding: 2px;
//   cursor: pointer;
//   svg {
//     color: ${lightGrey};
//     &:hover {
//       color: ${purple};
//     }
//   }
// `;
