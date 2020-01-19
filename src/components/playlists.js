// eslint-disable-next-line
import React from "react";

/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";

const Playlists = ({ playlists, handleShowSelectedPlaylist }) => {
  return (
    <>
      {playlists.length > 0 ? (
        <Container>
          <Content>
            <h3>My Playlists</h3>
            {playlists.map(playlist => (
              <Playlist
                key={playlist.id}
                onClick={() => handleShowSelectedPlaylist(playlist)}
              >
                <div>{playlist.name}</div>
                <Subtitle>
                  {playlist.songs && playlist.songs.length}{" "}
                  {playlist.songs && playlist.songs.length > 1
                    ? "songs"
                    : "song"}
                </Subtitle>
              </Playlist>
            ))}
          </Content>
        </Container>
      ) : null}
    </>
  );
};

export default Playlists;

const purple = "#670E99";
const newLilac = "#efe3f5";

const Container = styled.div`
  padding: 10px;
  padding-right: 0;
  h3 {
    color: ${purple};
  }
`;

const Content = styled.div`
  background: ${newLilac};
  border-radius: 5px;
  padding: 10px;
`;

const Playlist = styled.div`
  padding: 5px;
  padding-top: 10px;
  color: #000;
  border-bottom: 1px solid ${purple} !important;
  width: 250px;
  cursor: pointer;
  &:hover {
    font-weight: 600;
    background: ;
  }
`;

const Subtitle = styled.div`
  font-size: 11px;
`;
