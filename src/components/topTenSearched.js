// eslint-disable-next-line
import React from "react";

/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";

const sortByFrequencyAndRemoveDuplicates = array => {
  let frequency = {},
    value;

  // compute frequencies of each value
  for (let i = 0; i < array.length; i++) {
    value = array[i];
    if (value in frequency) {
      frequency[value]++;
    } else {
      frequency[value] = 1;
    }
  }

  // make array from the frequency object to de-duplicate
  let uniques = [];
  for (value in frequency) {
    uniques.push(value);
  }

  // sort the uniques array in descending order by frequency
  const compareFrequency = (a, b) => {
    return frequency[b] - frequency[a];
  };

  const topSearches = uniques.sort(compareFrequency);

  if (topSearches.length > 10) {
    topSearches.length = 10;
  }

  return topSearches;
};

const TopTenSearched = ({
  searchQueryArray,
  handleTopTenSearched,
  showTopTenSearched
}) => {
  const topSearchesArray = sortByFrequencyAndRemoveDuplicates(searchQueryArray);
  return (
    <>
      {searchQueryArray.length >= 1 && (
        <div>
          <SecondaryButton onClick={handleTopTenSearched}>
            Top 10 searches
          </SecondaryButton>
          {showTopTenSearched && (
            <ResultsContainer>
              {searchQueryArray &&
                topSearchesArray.map(item => <Item key={item}>{item}</Item>)}
            </ResultsContainer>
          )}
        </div>
      )}
    </>
  );
};

export default TopTenSearched;

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
`;

const ResultsContainer = styled.div`
  width: 100%;
  margin-bottom: 10px;
  border: 1px solid ${lilac};
  border-radius: 5px;
`;
