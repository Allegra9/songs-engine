// eslint-disable-next-line
import React from "react";

import ArrowBackIcon from "@material-ui/icons/ArrowBackIos";

/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";

const SelectedPlaylist = ({ selectedPlaylist, handleShowSelectedPlaylist }) => {
  const { name, songs } = selectedPlaylist;
  return (
    <>
      {name ? (
        <div>
          <BackButton onClick={() => handleShowSelectedPlaylist("")}>
            <ArrowBackIcon style={{ fontSize: 13, marginRight: 5 }} />
            back
          </BackButton>
          <Content>
            <h2>{name}</h2>
            <div>
              {songs &&
                songs.map(song => (
                  <Song key={song.trackId}>
                    <div>
                      {song.trackName} - {song.artistName}
                    </div>
                    <audio src={song.previewUrl} controls />
                  </Song>
                ))}
            </div>
          </Content>
        </div>
      ) : null}
    </>
  );
};

export default SelectedPlaylist;

const mont = "Montserrat, serif";
const light = 400;
const small = "13px";
const newLilac = "#efe3f5";

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

const Content = styled.div`
  border: 1px solid ${props => props.theme.style1Color};
  border-radius: 5px;
  padding: 20px;
  padding-bottom: 40px;
  background: ${newLilac};
  h2 {
    color: #000;
    margin-top: 0;
  }
`;

const Song = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;
  border-bottom: 1px solid #000;
  div {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
`;
