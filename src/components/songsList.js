// eslint-disable-next-line
import React from "react";

/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";

const SongsList = ({ songs, handleSelectSong }) => {
  return (
    <>
      {songs && (
        <Container>
          {songs.map(song => (
            <Item
              key={song.trackId}
              style={{ cursor: "pointer" }}
              onClick={() => handleSelectSong(song)}
            >
              {song.trackName} - {song.artistName}
            </Item>
          ))}
        </Container>
      )}
    </>
  );
};

export default SongsList;

const Container = styled.div`
  color: ${props => props.theme.textColor};
  margin-top: 10px;
`;

const Item = styled.div`
  padding: 10px;
  padding-left: 0;
  &:hover {
    color: ${props => props.theme.style1Color};
    font-weight: 600;
  }
`;
