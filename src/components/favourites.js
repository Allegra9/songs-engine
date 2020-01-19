// eslint-disable-next-line
import React from "react";

/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";

const Favourites = ({
  favourites,
  handleSelectSong,
  showFavourites,
  handleShowFavourites
}) => {
  return (
    <>
      {favourites.length > 0 && (
        <div>
          <SecondaryButton onClick={handleShowFavourites}>
            Favourites
          </SecondaryButton>

          {showFavourites && (
            <ResultsContainer>
              {favourites.map(song => (
                <Item key={song.trackId} onClick={() => handleSelectSong(song)}>
                  {song.trackName} - {song.artistName}
                </Item>
              ))}
            </ResultsContainer>
          )}
        </div>
      )}
    </>
  );
};

export default Favourites;

const mont = "Montserrat, serif";
const light = 400;
const small = "13px";
const lilac = "#E5C3EE";

const SecondaryButton = styled.button`
  background: ${props => props.theme.secondaryButtonBgColor};
  color: ${props => props.theme.secondaryButtonTextColor};
  border: 1px solid ${props => props.theme.secondaryButtonBorder};
  border-radius: 5px;
  padding: 7px 20px;
  font-size: ${small};
  font-weight: ${light};
  cursor: pointer;
  margin-bottom: 10px;
  font-family: ${mont};
  &:focus {
    outline: none !important;
  }
  &:hover {
    background: ${props => props.theme.secondaryButtonBgColorHover};
    color: ${props => props.theme.secondaryButtonTextColorHover};
    border: 1px solid ${props => props.theme.secondaryButtonBorderHover};
  }
`;

const Item = styled.div`
  color: ${props => props.theme.textColor};
  padding: 10px;
  font-size: ${small};
  cursor: pointer;
  &:hover {
    color: ${props => props.theme.style1Color};
    font-weight: 600;
  }
`;

const ResultsContainer = styled.div`
  width: 95%;
  margin-bottom: 10px;
  border: 1px solid ${lilac};
  border-radius: 5px;
`;
